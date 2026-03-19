import { Kit, Network } from '@evitcastudio/kit';
import { clientPackets } from './packets/c-packets';

const networkPlugin = Kit.registerPlugin(Network);

networkPlugin.registerPackets(clientPackets);

networkPlugin.on('CLIENT_EXAMPLE3_PACKET', (pClient: Client, pData: number, pData2: number, pData3: number) => {
    console.log('data', pData, pData2, pData3);
});

VYLO.setType('Client', {
    onPacket(this: Client, pPacketName: string, pData: unknown[]) {
        networkPlugin.onNetwork(this, pPacketName, pData, true);
    }
});