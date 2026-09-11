import { describe, expect, test } from "bun:test";
import { Kit } from '../src/kit';
import { Camera } from '../src/plugins/camera';
import { CameraManager } from '@evitcastudio/lens';

if (!globalThis.HTMLCanvasElement) {
    (globalThis as any).HTMLCanvasElement = class HTMLCanvasElement {};
}

if (!globalThis.window) {
    (globalThis as any).window = {
        innerWidth: 1280,
        innerHeight: 720,
        addEventListener: () => {},
        removeEventListener: () => {}
    };
}

if (!globalThis.document) {
    (globalThis as any).document = {
        createElement: () => {
            const canvas = new (globalThis as any).HTMLCanvasElement();
            canvas.style = {};
            canvas.width = 1280;
            canvas.height = 720;
            canvas.getContext = () => ({
                clearRect: () => {},
                save: () => {},
                restore: () => {},
                beginPath: () => {},
                moveTo: () => {},
                lineTo: () => {},
                stroke: () => {},
                arc: () => {},
                fill: () => {},
                strokeRect: () => {},
                fillRect: () => {},
                fillText: () => {},
                setLineDash: () => {},
                measureText: () => ({ width: 50 })
            });
            return canvas;
        },
        getElementById: () => null,
        body: {
            appendChild: () => {}
        }
    };
}

if (!globalThis.VYLO) {
    (globalThis as any).VYLO = {
        newDiob: (type: string) => ({
            id: type,
            x: 0,
            y: 0,
            z: 0,
            mapName: 'default'
        }),
        World: {
            createDiob: () => ({
                id: 'test-diob',
                x: 0,
                y: 0,
                z: 0,
                mapName: 'default'
            }),
            delDiob: () => {}
        },
        Client: {
            mob: {
                x: 0,
                y: 0,
                z: 0,
                mapName: 'default'
            },
            viewEye: null,
            setViewEye: (diob: any) => {
                (globalThis as any).VYLO.Client.viewEye = diob;
            },
            mapView: {
                xPos: 0,
                yPos: 0,
                zoom: { x: 1, y: 1 },
                angle: 0
            }
        }
    };
}

// Polyfill requestAnimationFrame in test environment if needed
if (!globalThis.requestAnimationFrame) {
    (globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 16);
    (globalThis as any).cancelAnimationFrame = (id: number) => clearTimeout(id);
}

describe('Camera Plugin', () => {
    test('should register successfully with Kit and be retrievable', () => {
        const camera = Kit.registerPlugin(Camera);
        expect(camera).toBeInstanceOf(Camera);
        expect(camera.name).toBe('Camera');
        expect(camera.isInitiated()).toBe(true);

        const retrieved = Kit.getPlugin<Camera>('Camera');
        expect(retrieved).toBe(camera);
        expect(camera.manager).toBeInstanceOf(CameraManager);
    });

    test('should provide direct delegate methods for camera creation', () => {
        const camera = Kit.getPlugin<Camera>('Camera')!;

        const followCam = camera.createFollowCamera();
        expect(followCam).toBeDefined();
        expect(followCam.type).toBe('follow');

        const spectateCam = camera.createSpectateCamera();
        expect(spectateCam).toBeDefined();
        expect(spectateCam.type).toBe('spectate');

        const panCam = camera.createPanCamera();
        expect(panCam).toBeDefined();
        expect(panCam.type).toBe('pan');

        const influenceCam = camera.createInfluenceCamera(100, 200, 'map1');
        expect(influenceCam).toBeDefined();
        expect(influenceCam.type).toBe('influence');

        // Can retrieve created cameras
        expect(camera.getCamera(followCam.id)).toBe(followCam);
        expect(camera.getAllCameras().length).toBeGreaterThanOrEqual(4);
        expect(camera.getCamerasByType('follow')).toContain(followCam);
    });

    test('should manage main follow camera and auto cameras', () => {
        const camera = Kit.getPlugin<Camera>('Camera')!;
        const followCam = camera.createFollowCamera();
        const dummyTarget = { x: 50, y: 50, mapName: 'default' };

        camera.setMainFollowCamera(followCam, dummyTarget as any, { x: 0, y: 0, z: 0 }, true);
        expect(camera.getMainFollowCamera()).toBe(followCam);
        expect(camera.getCurrentViewEye()).toBe(followCam);
    });

    test('should delegate shake and zoom controls seamlessly', () => {
        const camera = Kit.getPlugin<Camera>('Camera')!;

        // Check presets can be retrieved
        const preset = camera.getShakePreset('gunshot');
        expect(preset).toBeDefined();
        expect(preset?.strength).toBeDefined();

        // Trigger shake preset
        camera.shakePreset('pulse');
        expect(camera.isShaking()).toBe(true);

        camera.stopShake();
        expect(camera.isShaking()).toBe(false);

        // Zoom API
        camera.zoom(2, 500);
        expect(camera.isZooming()).toBe(true);
        camera.stopZoom();
        expect(camera.isZooming()).toBe(false);
    });

    test('should support global time scale and gizmo toggles', () => {
        const camera = Kit.getPlugin<Camera>('Camera')!;

        camera.setGlobalTimeScale(0.5);
        expect(camera.getGlobalTimeScale()).toBe(0.5);
        camera.setGlobalTimeScale(1.0);
        expect(camera.getGlobalTimeScale()).toBe(1.0);

        camera.setGlobalGizmos(true);
        expect(camera.getGlobalGizmos()).toBe(true);
        camera.setGlobalGizmos(false);
        expect(camera.getGlobalGizmos()).toBe(false);

        camera.setDebugCenterLines(true);
        expect(camera.getDebugCenterLines()).toBe(true);
        camera.setDebugCenterLines(false);
        expect(camera.getDebugCenterLines()).toBe(false);
    });

    test('should support manual updates', () => {
        const camera = Kit.getPlugin<Camera>('Camera')!;
        expect(() => camera.update(16.6)).not.toThrow();
    });

    test('should support seamless camera transitions via switchTo and TransitionCamera', async () => {
        const camera = Kit.getPlugin<Camera>('Camera')!;

        const transCam = camera.createTransitionCamera();
        expect(transCam).toBeDefined();
        expect(transCam.type).toBe('transition');

        const cam1 = camera.createFollowCamera();
        cam1.position.x = 0;
        cam1.position.y = 0;
        cam1.setAsViewEye({ duration: 0 });
        expect(camera.getCurrentViewEye()).toBe(cam1);

        const cam2 = camera.createFollowCamera();
        cam2.position.x = 200;
        cam2.position.y = 400;

        let completed = false;
        const switchPromise = camera.switchTo(cam2, {
            duration: 500,
            ease: 'linear',
            onComplete: () => {
                completed = true;
            }
        });

        // View eye switches immediately to TransitionCamera (0-frame pop)
        const autoTrans = camera.getAutoTransitionCamera();
        expect(camera.getCurrentViewEye()).toBe(autoTrans);
        expect(autoTrans?.position.x).toBe(0);
        expect(autoTrans?.position.y).toBe(0);

        // Advance 250ms (halfway)
        camera.update(250);
        expect(autoTrans?.position.x).toBeCloseTo(100, 0);
        expect(autoTrans?.position.y).toBeCloseTo(200, 0);

        // Complete transition (250ms more)
        camera.update(250);
        await switchPromise;

        expect(completed).toBe(true);
        expect(camera.getCurrentViewEye()).toBe(cam2);
    });

    test('should automatically transition smoothly on setAsViewEye() with default settings', () => {
        const camera = Kit.getPlugin<Camera>('Camera')!;
        const camA = camera.createFollowCamera();
        camA.position.x = 0;
        camA.position.y = 0;
        camA.setAsViewEye({ duration: 0 });
        expect(camera.getCurrentViewEye()).toBe(camA);

        const camB = camera.createFollowCamera();
        camB.position.x = 300;
        camB.position.y = 300;

        // Calling setAsViewEye with zero arguments automatically transitions smoothly!
        camB.setAsViewEye();
        const transCam = camera.getAutoTransitionCamera();
        expect(camera.getCurrentViewEye()).toBe(transCam);
        expect(transCam?.position.x).toBe(0);

        // Halfway through default 500ms
        camera.update(250);
        expect(transCam?.position.x).toBeGreaterThan(0);

        // Finish transition
        camera.update(250);
        expect(camera.getCurrentViewEye()).toBe(camB);
    });
});
