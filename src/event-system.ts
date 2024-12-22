import { EmitterEvent, Listener } from './types/shared-types';
export class EventEmitter {
    private listener: Listener;
    private plugin: /*KitPlugin*/any;

    constructor(pListener: Listener, pPlugin: /*KitPlugin*/any) {
        this.listener = pListener;
        this.plugin = pPlugin;
    }
    
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    emit(pEvent: EmitterEvent): void {
        if (pEvent?.plugin !== this.plugin.name) {
            throw new Error(`Event mismatch: ${this.plugin.name} tried to emit an event from the ${pEvent.plugin} namespace.`);
        }

        const event: EmitterEvent = {
            plugin: this.plugin.name,
            name: pEvent.name,
            data: pEvent?.data,
            timestamp: Date.now()
        }
        Object.freeze(event);
        this.listener(event);
    }
}