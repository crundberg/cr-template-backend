const isObject = (obj) => {
	return (
		obj &&
		Object.keys(obj).length > 0 &&
		Object.getPrototypeOf(obj) === Object.prototype
	);
};

const prettyJson = (obj) => {
	try {
		return JSON.stringify(obj, null, 2);
	} catch (error) {
		return null;
	}
};

module.exports = {
	isObject,
	prettyJson,
};
