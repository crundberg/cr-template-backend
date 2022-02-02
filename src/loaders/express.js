const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { express: config } = require('../config');

const expressLoader = ({ logging }) => {
	const app = express();

	// Configure app
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(
		cors({
			origin: [config.cors.local, config.cors.remote],
			credentials: true,
		})
	);

	// Handle error
	app.use((err, _req, res, next) => {
		if (err.name === 'UnauthorizedError') {
			res.status(401).json({ success: false, error: err.message });
		} else {
			logging.error('express.error', err);
			res.status(500).json({ success: false, error: err.message });
		}

		next(err);
	});

	return app;
};

module.exports = expressLoader;
