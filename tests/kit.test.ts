import { describe, expect, test, beforeEach, mock } from "bun:test";
import { Kit } from '../src/kit';

describe('Kit Framework', () => {
    let kit: typeof Kit;

    // Reset Kit for each test
    beforeEach(() => {
        kit = Kit;
    });

    test('should listen for an event and remove the listener', () => {
        const mockListener = mock(() => {});
        const pluginName = 'FakePlugin';
        const eventName = 'testEvent';
        
        kit.on(pluginName, eventName, mockListener);
        kit.off(pluginName, eventName, mockListener);
        /** @ts-ignore (accessing private field)*/
        expect(kit.events[`${pluginName}-${eventName}`].length).toBe(0);
    });

    test('should listen for an event and should not remove the listener due to a different func being passed.', () => {
        const mockListener = mock(() => {});
        const pluginName = 'FakePlugin';
        const eventName = 'testEvent';
        
        kit.on(pluginName, eventName, mockListener);
        kit.off(pluginName, eventName, ()=>{});
        /** @ts-ignore (accessing private field)*/
        expect(kit.events[`${pluginName}-${eventName}`].length).toBe(1);
    });

    test('should register and retrieve a custom plugin without requiring KitPlugin subclassing', () => {
        class CustomPlugin {
            name = 'CustomTest';
            registered = false;
            onRegistered() {
                this.registered = true;
            }
            customMethod() {
                return 42;
            }
        }

        const instance = Kit.registerPlugin(CustomPlugin);
        expect(instance).toBeInstanceOf(CustomPlugin);
        expect(instance.registered).toBe(true);

        const retrieved = Kit.getPlugin<CustomPlugin>('CustomTest');
        expect(retrieved).toBe(instance);
        expect(retrieved?.customMethod()).toBe(42);
    });
});
