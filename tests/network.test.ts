import { describe, expect, test, mock } from "bun:test";
import { Network } from '../src/plugins/network';
import { Kit } from '../src/kit';

describe('Network Plugin', () => {
    test('should register and trigger a packet listener using onPacket', () => {
        const network = Kit.registerPlugin(Network);
        const mockListener = mock((client, data) => {});
        const packetName = 'testPacket';
        
        network.registerPackets([packetName]);
        network.onPacket(packetName, mockListener);
        
        const mockClient = { id: '123' } as any;
        const mockData = ['hello'];
        
        // Simulating receiving a network packet (index 0 for testPacket)
        network.onNetwork(mockClient, 0, mockData);
        
        expect(mockListener).toHaveBeenCalledTimes(1);
        expect(mockListener).toHaveBeenCalledWith(mockClient, ...mockData);
    });

    test('should still work with deprecated on() method', () => {
        const network = Kit.getPlugin<Network>('Network')!;
        const mockListener = mock(() => {});
        const packetName = 'legacyPacket';
        
        network.registerPackets([packetName]);
        network.on(packetName, mockListener); // Using deprecated method
        
        network.onNetwork({} as any, 0, []);
        
        expect(mockListener).toHaveBeenCalledTimes(1);
    });

    test('should throw error if packet is not registered', () => {
        const network = Kit.getPlugin<Network>('Network')!;
        expect(() => network.onPacket('unknown', () => {})).toThrow();
    });
});
