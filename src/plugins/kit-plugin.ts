import type { EventEmitter } from '../events/event-system';
import type { EmitterEvent } from '../types/shared-types';

export abstract class KitPlugin {
    /**
     * The name of this plugin.
     */
    abstract name: string;
    /**
     * The emitter that belongs to this plugin.
     */
    protected _emitter: EventEmitter | null = null;

    /**
     * Register this plugin with the event system.
     * @param pEmitter - The emitter that belongs to this plugin.
     */
    _register(pEmitter: EventEmitter) {
        this._emitter = pEmitter;
    }

    /**
     * The entry point for custom behavior after registration for custom plugins.
     */
    abstract onRegistered(): void

    /**
     * Emit an event.
     * @param pEvent - The event to emit.
     */
    emit(pEvent: EmitterEvent) {
        if (!this._emitter) {
            console.error('[Kit Plugin] emitter not set. This is an indication that the plugin is not registered.');
            return;
        }
        this._emitter.emit(pEvent);
    }
}