'use strict';
const env = require('../env'),
  HttpError = require('http-error-constructor'),
  core = require('../core');

exports = module.exports = (req, res, next) => core.Auth
  .verifyToken(req.cookies[env.loginCookieName()])
  .then(decoded => {
    req.jwt = decoded;
    next();
  })
  .catch(err => next(new HttpError(401, err.message)));
