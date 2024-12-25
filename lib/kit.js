import { EventEmitter } from './event-system';
export class Kit {
    /**
     * A record of all plugins registered with the Kit class.
     */
    static plugins = {};
    /**
     * A set of all plugin emitters.
     */
    static emitters = new Map();
    /**
     * A record of all event listeners.
     */
    static events = {};
    /**
     * Initialize the Kit class with plugins.
     * @param pPlugins - An array of plugins to initialize.
     */
    static init(pPlugins) {
        pPlugins.forEach(pPlugin => {
            this.registerPlugin(pPlugin);
        });
    }
    /**
     * Register a plugin with the Kit class.
     * @param pPlugin - The plugin to register.
     */
    static registerPlugin(pPlugin) {
        const plugin = new pPlugin();
        if (Kit.plugins[plugin.name]) {
            throw new Error(`[Kit] plugin with name '${plugin.name}' is already registered.`);
        }
        const listener = (pEvent) => {
            Kit.emit(pEvent);
        };
        const emitter = new EventEmitter(listener, plugin);
        Kit.emitters.set(plugin.name, emitter);
        Kit.plugins[plugin.name] = plugin;
        plugin._register(emitter);
    }
    /**
     * Gets a plugin by name.
     * @param pName - String name of the plugin to retrieve.
     */
    static getPlugin(pName) {
        return Kit.plugins[pName];
    }
    /**
     * Lists all registered plugins.
     */
    static getPlugins() {
        return Object.keys(Kit.plugins);
    }
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    static emit(pEvent) {
        const { plugin, event } = pEvent;
        const eventScope = `${plugin}-${event}`;
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
    static on(pPluginName, pEventName, pListener) {
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
    static off(pPluginName, pEventName, pListener) {
        const eventScope = `${pPluginName}-${pEventName}`;
        if (Kit.events[eventScope].includes(pListener)) {
            Kit.events[eventScope].splice(Kit.events[eventScope].indexOf(pListener), 1);
        }
    }
}
