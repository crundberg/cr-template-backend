/**
 * Event service
 * @function
 */
const EventService = () => {
	let subscriptions = [];

	/**
	 * Publish an event
	 *
	 * @param {string} event - Name of event (E.g namespace.event)
	 * @param {object} data - Optional data to subscribers
	 */
	const publish = (event, data = {}) => {
		if (event.indexOf('.') < 0) {
			throw new Error(
				'Publish event must contain a namespace. (E.g. namespace.event)'
			);
		}

		const [namespace] = event.split('.');

		subscriptions
			.filter((sub) => sub.event === event || sub.event === namespace)
			.map((cb) => {
				return cb.callback(data);
			});
	};

	/**
	 * Subscribe to an event
	 *
	 * @param {string} event - Event to subscribe to. (E.g namespace or namespace.event)
	 * @param {function} callback - Callback function when event fires.
	 */
	const subscribe = (event, callback) => {
		if (!callback) {
			throw new Error(`Callback is missing from subscribe: ${event}`);
		}

		subscriptions = [
			...subscriptions,
			{
				callback,
				event,
			},
		];
	};

	/**
	 * Event to unsubscribe from
	 *
	 * @param {string} event - Event to unsubscribe to. (E.g namespace or namespace.event)
	 */
	const unsubscribe = (event) => {
		subscriptions = subscriptions.filter(
			(subscription) => subscription.event !== event
		);
	};

	/**
	 * Get subscriptions
	 *
	 * @returns {Array.<Object>} List of subscriptions currently in use
	 */
	const getSubscriptions = () => {
		return subscriptions;
	};

	return {
		publish,
		subscribe,
		unsubscribe,
		getSubscriptions,
	};
};

module.exports = EventService;
