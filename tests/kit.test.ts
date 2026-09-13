import { describe, expect, test, beforeEach, mock } from "bun:test";
import { Kit } from '../src/kit';
import { CameraPlugin } from '../src/plugins/camera';

describe('Kit Framework', () => {
    let kit: typeof Kit;

    // Reset Kit for each test
    beforeEach(() => {
        kit = Kit;
        // @ts-ignore
        kit.plugins = {};
        // @ts-ignore
        kit.events = {};
        // @ts-ignore
        kit.emitters = new Map();
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

    test('should register CameraPlugin constructor with optional constructor parameters', () => {
        globalThis.requestAnimationFrame = globalThis.requestAnimationFrame || ((cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16) as unknown as number);
        globalThis.cancelAnimationFrame = globalThis.cancelAnimationFrame || ((id: number) => clearTimeout(id));

        const camera = Kit.registerPlugin(CameraPlugin);
        expect(camera).toBeDefined();
        expect(camera.name).toBe('Camera');
    });

    test('should pass optional constructor arguments when registering a plugin constructor', () => {
        interface Config {
            multiplier: number;
            tag: string;
        }

        class ConfigurablePlugin {
            name = 'ConfigurablePlugin';
            config: Config;
            label: string;

            constructor(config: Config, label: string = 'default') {
                this.config = config;
                this.label = label;
            }
        }

        const plugin = Kit.registerPlugin(ConfigurablePlugin, { multiplier: 2.5, tag: 'v1' }, 'custom-label');
        expect(plugin).toBeInstanceOf(ConfigurablePlugin);
        expect(plugin.config.multiplier).toBe(2.5);
        expect(plugin.config.tag).toBe('v1');
        expect(plugin.label).toBe('custom-label');

        const retrieved = Kit.getPlugin<ConfigurablePlugin>('ConfigurablePlugin');
        expect(retrieved).toBe(plugin);
    });

    test('should register an already instantiated plugin instance', () => {
        class PreInstantiatedPlugin {
            name = 'PreInstantiated';
            initializedVia: string;

            constructor(via: string) {
                this.initializedVia = via;
            }
        }

        const existingInstance = new PreInstantiatedPlugin('manual-new');
        const registered = Kit.registerPlugin(existingInstance);

        expect(registered).toBe(existingInstance);
        expect(registered.initializedVia).toBe('manual-new');

        const retrieved = Kit.getPlugin<PreInstantiatedPlugin>('PreInstantiated');
        expect(retrieved).toBe(existingInstance);
    });

    test('should register an array containing plugin constructors and instances', () => {
        class ArrayPluginA {
            name = 'ArrayPluginA';
        }
        class ArrayPluginB {
            name = 'ArrayPluginB';
        }

        const instanceB = new ArrayPluginB();
        const results = Kit.registerPlugin([ArrayPluginA, instanceB]);

        expect(results).toHaveLength(2);
        expect(results[0]).toBeInstanceOf(ArrayPluginA);
        expect(results[1]).toBe(instanceB);
        expect(Kit.getPlugin('ArrayPluginA')).toBe(results[0]);
        expect(Kit.getPlugin('ArrayPluginB')).toBe(instanceB);
    });

    test('should register CameraPlugin with CameraManagerOptions constructor arguments', () => {
        globalThis.requestAnimationFrame = globalThis.requestAnimationFrame || ((cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16) as unknown as number);
        globalThis.cancelAnimationFrame = globalThis.cancelAnimationFrame || ((id: number) => clearTimeout(id));

        const camera = Kit.registerPlugin(CameraPlugin, { autoStart: false });
        expect(camera).toBeDefined();
        expect(camera.name).toBe('Camera');
        expect(camera.manager).toBeDefined();
        camera.stopRAF();
    });
});

