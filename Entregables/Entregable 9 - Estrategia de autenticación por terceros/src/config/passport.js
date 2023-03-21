import passport from 'passport'
import passportLocal from 'passport-local'
import { hashPassword, validPassword } from '../utils/passwordEncryptor'


const LocalStrategy = passportLocal.Strategy;

const initializePassport = () => {
    passport.use('register',
        new LocalStrategy(
            {
                passReqToCallback: true, usernameField:'email', passwordField:'pass'},
                async (req, username, password, done) => {
                    const { name, email, pass } = req.body
                try {
                    
                } catch (error) {
                    
                }
                }
        ))
}
