import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2'
import { hashPassword, validPassword } from '../utils/passwordEncryptor.js'
import UserService from '../services/users.service.js';
import dotenv from "dotenv";
import CartService from '../services/carts.service.js';
import cookieExtractor from '../utils/cookieExtractor.js';

//Variables de entorno:
dotenv.config({ path: "../../.env" });
const serverURL = process.env.SERVER_IP;
const jwtSECRET= process.env.JWT_SECRET;

const userService=new UserService();
const cartService=new CartService();
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const initializePassport = () => {
        passport.use(
          'jwt',
          new JWTStrategy(
            {
              jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
              secretOrKey: jwtSECRET,
            },
            async (jwt_payload, done) => {
              try {
                done(null, jwt_payload);
              } catch (error) {
                done(error);
              }
            }
          )
        );

    passport.use('register',
        new LocalStrategy(
            {
                passReqToCallback: true, usernameField: 'email', passwordField: 'pass'
            },
            async (req, username, password, done) => {
                const { name, email, pass } = req.body 
                try {
                    const user = await userService.findUserByEmail( username );

                    if (user) {
                        req.logger.warning('user exists');
                        return done(null, false);
                    }

                    let cartId=null;
                    try {
                        const cart = await cartService.createCart()
                        cartId=cart._id;
                    } catch (error) {
                        req.logger.warning('error creating cart');
                    }

                    const newUserInfo = {
                        name,
                        email,
                        pass: hashPassword(password),
                        cart: cartId,
                        last_connection:new Date()
                    }

                    const newUser = await userService.createUser(newUserInfo)
                    return done(null, newUser);
                } catch (error) {
                    return done(error);
                }
            }
        ))


    passport.use('login',
        new LocalStrategy(
            {
                usernameField: 'email', passwordField: 'pass'
            },
            async (username, password, done) => {
                try {
                    const user = await userService.findUserByEmail(username)

                    if (!user) {
                        console.log('Usuario no existe');
                        return done(null, false);
                    }
                    
                    if (!validPassword(user, password)) return done(null, false);

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        ))


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.findById(id);
        done(null, user);
    });

    passport.use('github',
        new GitHubStrategy({
            clientID: 'Iv1.f533d90f13aba87c',
            clientSecret: '6a23f0193bb0739140f5aaeba60da0dba007a265',
            callbackURL: "/auth/gitHubCallBack",
            proxy: true
        },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await userService.findUserByEmail( profile._json.email);
                    if (!user) {
                        const userLoginWGit = {
                            name: profile._json.name?profile._json.name: "gitHubUser",
                            email: profile._json.email,
                            last_connection:new Date(),
                            pass: ''
                        };
                        let cartId=null;
                    try {
                        const cart = await cartService.createCart()
                        cartId=cart._id;
                    } catch (error) {
                        req.logger.warning('error creating cart');
                    }
                    //Le asignamos un carrito
                    userLoginWGit.cart=cartId;
                        //Si no tiene mail publico no lo registramos en nuestra base de datos
                        if(!profile._json.email) return done(null, userLoginWGit);
                        const newUser = await userService.createUser(userLoginWGit);
                        return done(null, newUser);
                    }
                    done(null, user);
                } catch (error) {
                    req.logger.warning('error en passport de github'+error)
                    done(error);
                }
            }
        ));

}

export { initializePassport };
