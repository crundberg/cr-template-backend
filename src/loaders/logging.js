const { logging: config } = require('../config');
const loggingService = require('../services/logging');

const loggingLoader = () => {
	const logging = loggingService({ config });

	return logging;
};

module.exports = loggingLoader;
