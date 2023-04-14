import passport from 'passport'
import passportLocal from 'passport-local'
import UserModel from '../models/users.models.js';
import GitHubStrategy from 'passport-github2'
import { hashPassword, validPassword } from '../utils/passwordEncryptor.js'


const LocalStrategy = passportLocal.Strategy;

const initializePassport = () => {
    passport.use('register',
        new LocalStrategy(
            {
                passReqToCallback: true, usernameField: 'email', passwordField: 'pass'
            },
            async (req, username, password, done) => {
                const { name, email, pass } = req.body
                try {
                    const user = await UserModel.findOne({ email: username });

                    if (user) {
                        console.log('user exists');
                        return done(null, false);
                    }

                    const newUserInfo = {
                        name,
                        email,
                        pass: hashPassword(password)
                    }

                    const newUser = await UserModel.create(newUserInfo)

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
                    const user = await UserModel.findOne({ email: username });

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
        const user = await UserModel.findById(id);
        done(null, user);
    });

    passport.use('github',
        new GitHubStrategy({
            clientID: 'Iv1.f533d90f13aba87c',
            clientSecret: '6a23f0193bb0739140f5aaeba60da0dba007a265',
            callbackURL: "http://localhost:8080/auth/gitHubCallBack"
        },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await UserModel.findOne({ email: profile._json.email });

                    if (!user) {
                        const userLoginWGit = {
                            name: profile._json.name,
                            email: profile._json.email,
                            pass: ''
                        };

                        const newUser = await UserModel.create(userLoginWGit);
                        return done(null, newUser);
                    }
                    done(null, user);
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            }
        ));

}

export { initializePassport };
