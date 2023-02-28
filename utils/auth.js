const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// initialize passport and restore auth state (if applicable)
app.use(passport.initialize());
app.use(passport.session());

// local strategy config
passport.use(new LocalStrategy(async (email, password, done) => {
    try {
        const user = await User.findOne({where: {email} });
            if(!user) {
                return done(null, false, {message: 'Email incorrect.'});
            }

        const passwordMatch = await user.checkPassword(password);
            if(!passwordMatch) {
                return done(null, false, {message: 'Password incorrect.'});
            }

            return done(null, user);
    } catch (err) {
        return done(err);
        console.log('Error: could not log in');
    }
}));

// serialize, deserialize for persistent login
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
            done(null, user);
    } catch (err) {
        done(err);
        console.log('deserialize error');
    }
});