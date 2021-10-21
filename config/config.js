require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'development',
	isProd: process.env.NODE_ENV === 'production',
	pgHost: process.env.PGHOST,
	pgPort: process.env.PGPORT,
	pgUser: process.env.PGUSER,
	pgPassword: process.env.PGPASSWORD,
	pgDatabase: process.env.PGDATABASE,
	databaseUrl: process.env.DATABASE_URL,
};

module.exports = { config };
