/* eslint-env jasmine */

const Events = require('./events');

describe('Event Dispatcher', function() {
    const createListeners = l => [...Array(l)].map(
        () => jasmine.createSpy()
    );

    let events;
    beforeEach(function() {
        events = new Events();
    });

    it('is a function', function() {
        expect(typeof Events).toBe('function');
    });

    xit('can register a callback', function() {
        events.on('foo', function() {});
    });

    xit('can register a callback with a scope', function() {
        events.on('foo', function() {}, this);
    });

    xit('can trigger an event', function() {
        const [ listener ] = createListeners(1);
        events.on('foo', listener);

        events.trigger('foo');

        expect(listener).toHaveBeenCalled();
    });

    xit('can trigger an event registered with scope', function(done) {
        const scope = {};

        events.on('foo', function() {
            expect(this).toBe(scope);
            done();
        }, scope);

        events.trigger('foo');
    });

    xit('can trigger an event with arguments', function() {
        const [ listener ] = createListeners(1);
        events.on('foo', listener);

        events.trigger('foo', 'bar', 'baz');

        expect(listener).toHaveBeenCalledWith('bar', 'baz');
    });

    xit('can trigger multiple callbacks on an event', function() {
        const listeners = createListeners(3);

        listeners.forEach(l => events.on('foo', l));

        events.trigger('foo');

        listeners.forEach(l => {
            expect(l).toHaveBeenCalled();
        });
    });

    xit('can remove all callbacks from an event', function() {
        const listeners = createListeners(3);

        listeners.forEach(l => events.on('foo', l));

        events.trigger('foo');

        listeners.forEach(l => {
            expect(l.calls.length).toBe(1);
            l.reset();
        });

        events.off('foo');
        events.trigger('foo');

        listeners.forEach(l => {
            expect(l.calls.length).toBe(0);
        });
    });

    xit('can remove a specific callback from an event', function() {
        const listeners = createListeners(3);

        listeners.forEach(l => events.on('foo', l));

        events.trigger('foo');

        listeners.forEach(l => {
            expect(l.calls.length).toBe(1);
            l.reset();
        });

        const listener2 = listeners[1];

        events.off('foo', listener2);
        events.trigger('foo');

        listeners.forEach((l) => {
            expect(l.calls.length).toBe(
                l === listener2 ? 0 : 1
            );
        });
    });

    xit('can remove a specific callback registered with a scope from an event', function() {
        const listeners = createListeners(3);

        listeners.forEach(l => events.on('foo', l, {}));

        events.trigger('foo');

        listeners.forEach(l => {
            expect(l.calls.length).toBe(1);
            l.reset();
        });

        const listener2 = listeners[1];

        events.off('foo', listener2);
        events.trigger('foo');

        listeners.forEach((l) => {
            expect(l.calls.length).toBe(
                l === listener2 ? 0 : 1
            );
        });
    });
});
