import { EventData } from './types/shared-types';

export class EventEmitter {
    private static events: Record<string, Array<(pData: any) => void>> = {};
    
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    static emit(pEvent: EventData): void {
        const { name, plugin } = pEvent;
        let pluginName = plugin;

        if (!pluginName) {
            pluginName = 'Kit';
            pEvent.plugin = 'Kit';
        }

        const eventScope = `${pluginName}-${name}`;

        if (!EventEmitter.events[eventScope]) {
            return;
        }

        EventEmitter.events[eventScope].forEach(pListener => pListener(pEvent));
    }

    /**
     * Listen for an event.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to call when the event is emitted.
     */
    static on(pPluginName: string, pEventName: string, pListener: (pData: EventData) => void): void {
        let pluginName = pPluginName;
        if (!pluginName) {
            pluginName = 'Kit';
        }
        const eventScope = `${pluginName}-${pEventName}`;
        if (!EventEmitter.events[eventScope]) {
            EventEmitter.events[eventScope] = [];
        }
        EventEmitter.events[eventScope].push(pListener);
    }

    /**
     * Removes an event listener.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to remove.
     */
    static off(pPluginName: string, pEventName: string, pListener: (pData: EventData) => void): void {
        let pluginName = pPluginName;
        if (!pluginName) {
            pluginName = 'Kit';
        }
        const eventScope = `${pluginName}-${pEventName}`;
        if (EventEmitter.events[eventScope].includes(pListener)) {
            EventEmitter.events[eventScope].splice(EventEmitter.events[eventScope].indexOf(pListener), 1);
        }
    }
}