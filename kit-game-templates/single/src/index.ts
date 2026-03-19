import { Kit } from '@evitcastudio/kit';
import resourceJSON from 'resource.json';
import './map-types';

await Kit.setResources(resourceJSON);

VYLO.setType('World', {
    gameWidth: 1280,
    gameHeight: 720,
    mainMob: 'Mob/Player',
    mainMap: '',
    mainMacro: 'default-macro',
});

VYLO.setType('Client', {
    hideFPS: false,
    screenView: {
        scaleTo: 'normal',
        scaleNearest: true,
        disableImageSmoothing: true
    },
    mainMap: '',
    mainOutput: '',
    mapView: {
        preventAutoScale: true,
        xPos: 0,
        yPos: 0,
        zoom: { x: 3, y: 3 },
        anchor: { x: 0.5, y: 0.5 }
    },
    onConnect(this: Client) {
        console.log('Client.onConnect');
        this.mob.setPos(10, 10, 'main-map');
    }
});

await VYLO.load();