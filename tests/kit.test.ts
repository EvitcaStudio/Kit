import { describe, expect, test, beforeEach, mock } from "bun:test";
import { Kit } from '../src/kit';

describe('Kit Framework', () => {
    let kit: typeof Kit;

    // Reset Kit for each test
    beforeEach(() => {
        kit = Kit;
    });

    test('should listen for an event and emit the event', () => {
        const mockListener = mock(() => {});
        const pluginName = '';
        const eventName = 'testEvent';

        kit.on(pluginName, eventName, mockListener);

        kit.emit({
            name: eventName,
            plugin: pluginName,
            data: {
                foo: 'bar'
            }
        });

        expect(mockListener).toHaveBeenCalledWith({ name: eventName, plugin: 'Kit', data: { foo: 'bar' } });
    });

    test('should listen for an event and emit the event', () => {
        const mockListener = mock(() => {});
        const pluginName = '';
        const eventName = 'testEvent';

        kit.on(pluginName, eventName, mockListener);

        kit.emit({
            name: eventName,
            plugin: pluginName,
            data: {
                foo: 'bar'
            }
        });

        expect(mockListener).toHaveBeenCalledWith({ name: eventName, plugin: 'Kit', data: { foo: 'bar' } });
    });

    test('should listen for an event and remove the listener', () => {
        const mockListener = mock(() => {});
        const pluginName = 'Kit';
        const eventName = 'testEvent2';
        
        kit.on(pluginName, eventName, mockListener);
        kit.off(pluginName, eventName, mockListener);
        /** @ts-ignore (accessing private field)*/
        expect(kit.emitter.events[`${pluginName}-${eventName}`].length).toBe(0);
    });

    test('should listen for an event and remove the listener when no plugin name is used', () => {
        const mockListener = mock(() => {});
        const pluginName = '';
        const eventName = 'testEvent2';
        
        kit.on(pluginName, eventName, mockListener);
        kit.off(pluginName, eventName, mockListener);
        /** @ts-ignore (accessing private field)*/
        expect(kit.emitter.events[`Kit-${eventName}`].length).toBe(0);
    });

    test('should listen for an event and should not remove the listener due to a different func being passed.', () => {
        const mockListener = mock(() => {});
        const pluginName = 'Kit';
        const eventName = 'testEvent3';
        
        kit.on(pluginName, eventName, mockListener);
        kit.off(pluginName, eventName, ()=>{});
        /** @ts-ignore (accessing private field)*/
        expect(kit.emitter.events[`${pluginName}-${eventName}`].length).toBe(1);
    });
});
