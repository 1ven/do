const jwt = require('jsonwebtoken');
const sanitize = require('../utils/sanitize');
const config = require('../config');
const User = require('../models/User');

exports.signInLocal = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.findByUsername(username)
        .then(user => {
            if (!User.isValidPassword(user.hash, user.salt, password)) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            authenticate(user, req, res);
        }).catch(err => {
            if (err.message.match(/no data returned/i)) {
                return res.status(400).json({ message: 'Incorrect username' });
            }

            next(err);
        });
};

exports.signUp = function (req, res, next) {
    const props = sanitize(req.body);

    User.create(props).then(user => {
        authenticate(user, req, res);
    }, next);
};

exports.signOut = function (req, res, next) {
    res.clearCookie('access_token');
    res.clearCookie('authenticated');
    res.json({ redirectTo: '/sign-in' });
};

exports.ensureSignedIn = function (req, res, next) {
    jwt.verify(req.cookies.access_token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.json({ redirectTo: '/sign-in' });
        }

        req.user = user;
        next();
    });
};

exports.ensureSignedOut = function (req, res, next) {
    if (req.cookies.access_token) {
        return res.json({ redirectTo: '/' });
    }
    next();
};

function authenticate(user, req, res) {
    const token = jwt.sign(user, config.jwtSecret);
    const maxAge = 30 * 24 * 60 * 60 * 1000;

    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge
    });
    res.cookie('authenticated', true, { maxAge });

    res.json({ redirectTo: '/' });
};
