const mariadb = require('mariadb');
const { database: config } = require('../config');

const databaseLoader = () => {
	const { socketPath, host, port, user, password, database } = config;

	const pool = mariadb.createPool({
		connectionLimit: 10,
		socketPath,
		host,
		port,
		user,
		password,
		database,
	});

	return pool;
};

module.exports = databaseLoader;
