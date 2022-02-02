/* eslint-disable global-require */
const loggingLoader = require('./logging');
const databaseLoader = require('./database');
const expressLoader = require('./express');
const serverLoader = require('./server');

const init = async () => {
	const logging = loggingLoader();

	databaseLoader();

	logging.info('loaders', 'Start loading API');
	const expressApp = expressLoader({ logging });
	const apiRoutes = require('../api/routes');
	apiRoutes(expressApp);

	logging.info('loaders', 'Start loading server');
	serverLoader({ expressApp, logging });

	logging.info('loaders', 'Loading done');
};

module.exports = init;
