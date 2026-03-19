import { Kit, Network } from '@evitcastudio/kit';
import { serverPackets } from './packets/s-packets';

Kit.registerPlugin(Network);

const networkPlugin = Kit.getPlugin<Network>('Network');

if (!networkPlugin) {
    throw new Error('Network plugin not found.');
}

networkPlugin.registerPackets(serverPackets);

networkPlugin.on('SERVER_EXAMPLE3_PACKET', (pClient: Client, pData: number, pData2: number, pData3: number) => {
    console.log('data', pData, pData2, pData3);
});

VYLO.setType('Client', {
    onPacket(this: Client, pPacketName: string, pData: unknown[]) {
        networkPlugin?.onNetwork(this, pPacketName, pData, true);
    }
});