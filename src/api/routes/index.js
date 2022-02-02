const status = require('./status');

const Routes = (app) => {
	status({ app });
};

module.exports = Routes;
