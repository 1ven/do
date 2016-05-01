const passport = require('passport');
const User = require('../models/User');
const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    User.getOne({ username }, true)
        .then(user => {
            if (_.isEmpty(user) || !User.isValidPassword(user.hash, user.salt, password)) {
                return done(null, false, { message: 'Incorrect username or password' });
            }

            done(null, user);
        }).catch(done);
}));

passport.serializeUser((user, done) => {
    const id  = User.serialize(user);
    done(null, id);
});

passport.deserializeUser((id, done) => {
    User.deserialize(id)
        .then(user => done(null, user))
        .catch(done);
});

module.exports = passport;
