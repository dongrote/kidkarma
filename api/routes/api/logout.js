'use strict';
const env = require('../../env');

exports = module.exports = (req, res) => res.clearCookie(env.loginCookieName(), {httpOnly: true}).sendStatus(204);
