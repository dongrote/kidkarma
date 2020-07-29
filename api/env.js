'use strict';
const _ = require('lodash');

exports = module.exports = {
  port: () => Number(_.get(process.env, 'PORT', 3000)),
  jwtSigningKey: () => _.get(process.env, 'JWT_SIGNING_KEY', 'secret'),
  jwtSigningAlgorithm: () => _.get(process.env, 'JWT_SIGNING_ALGORITHM', 'HS256'),
  jwtExpiresIn: () => Number(_.get(process.env, 'LOGIN_COOKIE_AGE_IN_SECONDS', 3600)),
  loginCookieMaxAge: () => Number(_.get(process.env, 'LOGIN_COOKIE_AGE_IN_SECONDS', 3600)) * 1000,
  loginCookieName: () => _.get(process.env, 'LOGIN_COOKIE_NAME', 'jwt'),
  thermalZoneFilePath: () => _.get(process.env, 'THERMAL_ZONE_PATH'),
  thermalZoneCritical: () => Number(_.get(process.env, 'THERMAL_ZONE_CRITICAL')),
};
