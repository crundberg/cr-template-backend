const http = require('http');
const { server: config } = require('../config');

const serverLoader = ({ expressApp, logging }) => {
	const { port } = config;
	const httpServer = http.createServer(expressApp);

	logging.info('serverLoader', `Starting server on port ${port}`);
	httpServer.listen(port);
	return httpServer;
};

module.exports = serverLoader;
