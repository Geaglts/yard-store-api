const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const { config } = require('../../../config/config');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.jwtSecret;

const jwtStrategy = new Strategy(options, async (jwtPayload, done) => {
	try {
		done(null, jwtPayload);
	} catch (error) {
		done(boom.unauthorized(), false);
	}
});

module.exports = jwtStrategy;
