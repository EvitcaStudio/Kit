import { EventEmitter } from './event-system';
import type { EmitterEvent, Listener } from './types/shared-types';

export class Kit {
    /**
     * A record of all plugins registered with the Kit class.
     */
    private static plugins: Record<string, /*KitPlugin*/any> = {};
    /**
     * A set of all plugin emitters.
     */
    private static emitters = new Map<string, EventEmitter>();
    /**
     * A record of all event listeners.
     */
    private static events: Record<string, Array<(pData: any) => void>> = {};

    /**
     * Initialize the Kit class with plugins.
     * @param pPlugins - An array of plugins to initialize.
     */
    static async init(pPlugins: /* KitPlugin[]*/any[]): Promise<void> {
        const plugins = pPlugins.map(pPlugin => new pPlugin());
        
        await Promise.all(plugins.map(pPlugin => {
            if (Kit.plugins[pPlugin.name]) {
                throw new Error(`Plugin with name '${pPlugin.name}' is already registered.`);
            }
            
            pPlugin.register().then(() => {
                Kit.postRegister(pPlugin);
            });
        }));
    }

    /**
     * Register a plugin with the Kit class.
     * @param pPlugin - The plugin to register.
     */
    static async registerPlugin(pPlugin: /* KitPlugin[]*/any): Promise<void> {
        const plugin = new pPlugin();

        if (Kit.plugins[plugin.name]) {
            throw new Error(`Plugin with name '${plugin.name}' is already registered.`);
        }

        plugin.register().then(() => {
            Kit.postRegister(plugin);           
        });
    }

    private static postRegister(pPlugin: /*KitPlugin*/any): void {
        const listener: Listener = (pEvent: EmitterEvent) => {
            Kit.emit(pEvent);
        }
        
        const emitter = new EventEmitter(listener, pPlugin);
        Kit.emitters.set(pPlugin.name, emitter);

        pPlugin.onRegistered(emitter);
        Kit.plugins[pPlugin.name] = pPlugin;
    }

    /**
     * Gets a plugin by name.
     * @param pName - String name of the plugin to retrieve.
     */
    static getPlugin<T /* extends KitPlugin */>(pName: string): T | undefined {
        return Kit.plugins[pName] as T;
    }

    /**
     * Lists all registered plugins.
     */
    static getPlugins(): string[] {
        return Object.keys(Kit.plugins);
    }

    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    private static emit(pEvent: EmitterEvent): void {
        const { plugin, name } = pEvent;
        const eventScope = `${plugin}-${name}`;

        if (!Kit.events[eventScope]) {
            return;
        }

        Kit.events[eventScope].forEach(pListener => pListener(pEvent));
    }
    
     /**
     * Listen for an event.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to call when the event is emitted.
     */
    static on(pPluginName: string, pEventName: string, pListener: Listener): void {
        const eventScope = `${pPluginName}-${pEventName}`;
        if (!Kit.events[eventScope]) {
            Kit.events[eventScope] = [];
        }
        Kit.events[eventScope].push(pListener);
    }

    /**
     * Removes an event listener.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to remove.
     */
    static off(pPluginName: string, pEventName: string, pListener: (pData: EmitterEvent) => void): void {
        const eventScope = `${pPluginName}-${pEventName}`;
        if (Kit.events[eventScope].includes(pListener)) {
            Kit.events[eventScope].splice(Kit.events[eventScope].indexOf(pListener), 1);
        }
    }
}