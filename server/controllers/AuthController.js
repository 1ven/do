const passport = require('../lib/passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.signInLocal = function (req, res, next) {
    authenticate('local', req, res, next);
};

exports.signOut = function (req, res, next) {
    res.clearCookie('access_token');
    res.clearCookie('authenticated');
    res.redirect('/sign-in');
};

exports.ensureSignedIn = function (req, res, next) {
    jwt.verify(req.cookies.access_token, config.jwtSecret, (err, decoded) => {
    });
    next();
};

exports.ensureSignedOut = function (req, res, next) {
    if (req.cookies.access_token) {
        return res.redirect('/');
    }
    next();
};

function authenticate(strategy, req, res, next) {
    passport.authenticate(strategy, (err, user) => {
        if (err) { return next(err); }

        if (!user) {
            return res.sendStatus(401);
        }

        const token = jwt.sign(user, config.jwtSecret);
        const maxAge = 30 * 24 * 60 * 60 * 1000;

        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge
        });
        res.cookie('authenticated', true, { maxAge });

        res.redirect('/');
    })(req, res, next);
};
