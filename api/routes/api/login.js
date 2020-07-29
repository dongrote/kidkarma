'use strict';
const _ = require('lodash'),
  core = require('../../core'),
  HttpError = require('http-error-constructor');
const env = require('../../env');

exports = module.exports = (req, res, next) => core.Auth.generateLoginToken(req.body.username, req.body.password)
  .then(token => token
    ? res.cookie(env.loginCookieName(), token, {httpOnly: true, maxAge: env.loginCookieMaxAge()}).sendStatus(204)
    : Promise.reject(new HttpError(400)))
  .catch(next);
