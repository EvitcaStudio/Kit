import { EventData } from './types/shared-types';

export class EventEmitter {
    private static events: Record<string, Set<(pData: any) => void>> = {};
    
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    static emit(pEvent: EventData): void {
        const { name, plugin, data } = pEvent;
        const eventScope = `${plugin}-${name}`;

        data.timestamp = Date.now();

        if (!EventEmitter.events[eventScope]) {
            return;
        }

        EventEmitter.events[eventScope].forEach(pListener => pListener(data));
    }

    /**
     * Listen for an event.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to call when the event is emitted.
     */
    static on(pPluginName: string, pEventName: string, pListener: (pData: EventData['data']) => void): void {
        const eventScope = `${pPluginName}-${pEventName}`;
        if (!EventEmitter.events[eventScope]) {
            EventEmitter.events[eventScope] = new Set();
        }
        EventEmitter.events[eventScope].add(pListener);
    }

    /**
     * Removes an event listener.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to remove.
     */
    static off(pPluginName: string, pEventName: string, pListener: (pData: EventData['data']) => void): void {
        const eventScope = `${pPluginName}-${pEventName}`;
        EventEmitter.events[eventScope].delete(pListener);
    }
}