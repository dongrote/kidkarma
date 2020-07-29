'use strict';
const env = require('../../env'),
  core = require('../../core');

exports = module.exports = (req, res, next) => core.Auth.verifyToken(req.cookies[env.loginCookieName()])
  .then(() => true)
  .catch(() => false)
  .then(loggedIn => res.json({loggedIn}))
  .catch(next);
