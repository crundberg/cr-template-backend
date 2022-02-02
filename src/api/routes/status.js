const express = require('express');

const router = express.Router();

module.exports = ({ app }) => {
	router.get('/', async (_req, res) => {
		res.json({ success: true });
	});

	app.use('/api/status', router);
};
