import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from "bcrypt";
//MongoDb
import User from "../db/models/user.js";

function configurePassport(passport) {
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false);
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

export default configurePassport;