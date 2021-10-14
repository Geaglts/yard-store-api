const whitelist = require('./whitelist');

const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('no permitido'));
		}
	},
};

module.exports = options;
