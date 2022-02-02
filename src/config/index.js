require('dotenv').config();

const config = {
	general: {
		environment: process.env.NODE_ENV || 'development',
		isProduction: process.env.NODE_ENV === 'production',
		isDevelopment: process.env.NODE_ENV === 'development',
	},
	server: {
		port: process.env.serverPort || 8080,
	},
	express: {
		cors: {
			local: process.env.expressCorsLocal || null,
			remote: process.env.expressCorsRemote || null,
		},
	},
	database: {
		socketPath: process.env.dbSocketPath,
		host: process.env.dbHost,
		port: process.env.dbPort,
		user: process.env.dbUser,
		password: process.env.dbPass,
		database: process.env.dbName,
	},
	logging: {
		console: {
			level: process.env.loggingConsoleLevel || 'debug',
		},
		file: {
			level: process.env.loggingFileLevel || 'debug',
			path: process.env.loggingFilePath || '.logs/app.log',
		},
		sentry: {
			level: process.env.loggingSentryLevel || 'warn',
			dsn: process.env.loggingSentryDsn,
		},
		database: {
			level: process.env.loggingDbLevel || 'debug',
		},
	},
};

module.exports = config;
