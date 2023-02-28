const express = require('express');
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

// fxns to check user auth status
const loggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({message: 'Could not authenticate. Please log in again.'});
        return res.render('/login'); //redirect to login if not logged in
};

const notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.json({message: 'Please log in to continue.'});
        return res.render('/login');
};

module.exports = {
    loggedIn: (req, res, next) => {},
    notLoggedIn: (req, res, next) => {}
};