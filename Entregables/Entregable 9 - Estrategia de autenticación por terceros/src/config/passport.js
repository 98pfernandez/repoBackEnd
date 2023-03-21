import passport from 'passport'
import passportLocal from 'passport-local'
import UserModel from '../dao/models/users.models';
import { hashPassword, validPassword } from '../utils/passwordEncryptor'


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
}

export {initializePassport};
