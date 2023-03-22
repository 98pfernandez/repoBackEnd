import passport from 'passport'
import passportLocal from 'passport-local'
import UserModel from '../dao/models/users.models.js';
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

                    console.log(password)

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
}


passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
  });


export  {initializePassport};
