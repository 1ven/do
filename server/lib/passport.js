const passport = require('passport');
const User = require('../models/User');
const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    User.findByUsername(username)
        .then(user => {
            if (!User.isValidPassword(user.hash, user.salt, password)) {
                return done(null, false, { message: 'Incorrect password' });
            }

            done(null, user);
        }).catch(err => {
            if (err.message.match(/no data returned/i)) {
                return done(null, false, { message: 'Incorrect username' });
            }

            done(err);
        });
}));

module.exports = passport;
