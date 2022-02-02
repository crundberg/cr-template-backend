/* eslint-disable new-cap */
const { createLogger, format, transports } = require('winston');
const { isObject, prettyJson } = require('../helpers');

const LoggingService = ({ config }) => {
	const { combine, colorize, splat, timestamp, printf, errors, json } = format;

	const consoleFormat = printf((loggedData) => {
		const { level, message, timestamp: ts, namespace, data } = loggedData;
		const additionalData = isObject(data) ? `\r\n${prettyJson(data)}` : '';

		return `${ts} ${level}: [${namespace}] ${message} ${additionalData}`;
	});

	const fileTransport = new transports.File({
		level: config.file.level,
		filename: config.file.path,
		format: combine(errors(), timestamp(), json()),
		handleExceptions: true,
	});

	const consoleTransport = new transports.Console({
		level: config.console.level,
		format: combine(colorize(), splat(), timestamp(), consoleFormat),
		handleExceptions: true,
	});

	const logger = new createLogger();
	logger.add(consoleTransport);
	logger.add(fileTransport);

	/**
	 * Log a error message
	 *
	 * @param {string} namespace Namespace (e.g. module.function)
	 * @param {string} message Message
	 * @param {object} data Additional data
	 */
	const error = (namespace, message, data) => {
		writeToLog('error', namespace, message, data);
	};

	/**
	 * Log a warning message
	 *
	 * @param {string} namespace Namespace (e.g. module.function)
	 * @param {string} message Message
	 * @param {object} data Additional data
	 */
	const warn = (namespace, message, data) => {
		writeToLog('warn', namespace, message, data);
	};

	/**
	 * Log a info message
	 *
	 * @param {string} namespace Namespace (e.g. module.function)
	 * @param {string} message Message
	 * @param {object} data Additional data
	 */
	const info = (namespace, message, data) => {
		writeToLog('info', namespace, message, data);
	};

	/**
	 * Log a debug message
	 *
	 * @param {string} namespace Namespace (e.g. module.function)
	 * @param {string} message Message
	 * @param {object} data Additional data
	 */
	const debug = (namespace, message, data) => {
		writeToLog('debug', namespace, message, data);
	};

	/**
	 * Write to log
	 *
	 * @param {string} level Logging level (e.g. emerg, alert, crit, error, warning, notice, info, debug)
	 * @param {string} namespace Namespace (e.g. module.function)
	 * @param {string} message Message
	 * @param {object} data Additional data
	 * @private
	 */
	const writeToLog = (level, namespace, message, data) => {
		logger.log({
			level,
			message: data instanceof Error ? data : message,
			namespace,
			data,
		});
	};

	return {
		error,
		warn,
		info,
		debug,
	};
};

module.exports = LoggingService;
