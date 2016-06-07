const jwt = require('jsonwebtoken');
const _ = require('lodash');
const validator = require('../utils/validator');
const sanitize = require('../utils/sanitize');
const config = require('../config');
const User = require('../models/User');

function validateLocalAuth(formData, user) {
  return validator.validate({
    username: formData.username,
    password: formData.password,
  }, {
    username: [{
      assert: value => User.isExists('username', value),
      message: 'Incorrect username',
    }],
    password: [{
      assert: value => User.isValidPassword(user.hash, user.salt, value),
      message: 'Incorrect password',
    }],
  });
}

function authenticate(user, req, res) {
  const token = jwt.sign(user, config.jwtSecret);
  const options = req.body.remember ? {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  } : {};

  res.cookie('access_token', token, _.assign({}, options, {
    httpOnly: true,
  }));
  res.cookie('authenticated', true, options);

  res.json({});
}

exports.signInLocal = (req, res, next) => {
  const username = req.body.username;

  User.findByUsername(username, ['hash', 'salt'])
    .catch(err => {
      if (err.message.match(/no data returned/i)) {
        return {};
      }
      throw err;
    })
    .then(user =>
      validateLocalAuth(req.body, user)
        .then(() => authenticate(user, req, res))
    )
    .catch(next);
};

exports.signUp = (req, res, next) => {
  const props = sanitize(req.body);

  User.create(props).then(user => {
    authenticate(user, req, res);
  }, next);
};

exports.signOut = (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('authenticated');
  res.json({});
};

exports.ensureSignedIn = (req, res, next) => {
  jwt.verify(req.cookies.access_token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.json({});
    }

    req.user = user;

    next();
  });
};

exports.ensureSignedOut = (req, res, next) => {
  if (req.cookies.access_token) {
    return res.json({});
  }
  next();
};
