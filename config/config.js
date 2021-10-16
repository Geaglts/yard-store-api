require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'development',
	pgHost: process.env.PGHOST,
	pgPort: process.env.PGPORT,
	pgUser: process.env.PGUSER,
	pgPassword: process.env.PGPASSWORD,
	pgDatabase: process.env.PGDATABASE,
};

module.exports = { config };
