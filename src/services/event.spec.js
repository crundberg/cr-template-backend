const { expect } = require('chai');
const EventService = require('./event');

describe('Event Service', () => {
	describe('Subscribe', () => {
		it('should add a subscription to an event', () => {
			const eventService = EventService();
			eventService.subscribe('namespace.event1', {});

			const items = eventService.getSubscriptions();
			expect(items).to.have.length(1);
			expect(items[0].event).to.be.equal('namespace.event1');
		});

		it('should add a subscription to an namespace', () => {
			const eventService = EventService();
			eventService.subscribe('namespace', {});

			const items = eventService.getSubscriptions();
			expect(items).to.have.length(1);
			expect(items[0].event).to.be.equal('namespace');
		});

		it('should throw an error if callback is missing', () => {
			const eventService = EventService();

			expect(() => {
				eventService.subscribe('namespace.event1');
			}).to.throw('Callback is missing from subscribe: namespace.event1');
		});
	});

	describe('Unsubscribe', () => {
		it('should add a subscription to an event', () => {
			const eventService = EventService();
			eventService.subscribe('namespace.event1', {});
			eventService.subscribe('namespace.event2', {});
			eventService.unsubscribe('namespace.event1');

			const items = eventService.getSubscriptions();
			expect(items).to.have.length(1);
			expect(items[0].event).to.be.equal('namespace.event2');
		});

		it('should add a subscription to an namespace', () => {
			const eventService = EventService();
			eventService.subscribe('namespace', {});
			eventService.subscribe('namespace.event1', {});
			eventService.subscribe('namespace2.event', {});
			eventService.unsubscribe('namespace');

			const items = eventService.getSubscriptions();
			expect(items).to.have.length(2);
			expect(items[0].event).to.be.equal('namespace.event1');
			expect(items[1].event).to.be.equal('namespace2.event');
		});
	});

	describe('Publish', () => {
		it('should publish an event to subscribers with exact name', () => {
			let calls = 0;
			let data;

			const eventService = EventService();
			eventService.subscribe('namespace.event1', (eventData) => {
				calls += 1;
				data = eventData;
			});

			eventService.publish('namespace.event1', { test: 'testing' });

			expect(calls).to.be.equal(1);
			expect(data.test).to.be.equal('testing');
		});

		it('should publish an event to subscribers using namespace', () => {
			let nsCalls = 0;
			let nsData;
			let evCalls = 0;
			let evData;

			const eventService = EventService();
			eventService.subscribe('namespace', (eventData) => {
				nsCalls += 1;
				nsData = eventData;
			});
			eventService.subscribe('namespace.event1', (eventData) => {
				evCalls += 1;
				evData = eventData;
			});

			eventService.publish('namespace.event1', { test: 'testing' });

			expect(nsCalls).to.be.equal(1);
			expect(nsData.test).to.be.equal('testing');
			expect(evCalls).to.be.equal(1);
			expect(evData.test).to.be.equal('testing');
		});

		it('should throw an error if event do not contain a namespace', () => {
			const eventService = EventService();

			expect(() => {
				eventService.publish('event');
			}).to.throw(
				'Publish event must contain a namespace. (E.g. namespace.event)'
			);
		});
	});
});
