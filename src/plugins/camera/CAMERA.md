---
title: Camera Plugin
group: Plugins
---

# Camera Plugin

The **Camera Plugin** integrates high-performance 2D camera controls into Kit, powered under the hood by [`@evitcastudio/lens`](https://github.com/EvitcaStudio/Lens). It provides smooth entity tracking, 29 built-in screen shake presets, cinematic zooms, spectator panning, multi-target influence framing, zero-pop transitions, native canvas debug overlays, and automatic event forwarding to Kit's global event bus.

---

## Installation & Setup

Import `Camera` (or `CameraPlugin`) directly from `@evitcastudio/kit` (or optionally from `@evitcastudio/kit/camera`):

```typescript
import { Kit, Camera } from '@evitcastudio/kit';

// Register the camera plugin with Kit
const camera = Kit.registerPlugin(Camera);
```

You can retrieve the registered plugin instance anywhere across your codebase:

```typescript
const camera = Kit.getPlugin<Camera>('Camera');
```

---

## Quickstart: Following a Player

To create a camera that follows the player entity with smooth lerping and deadzone bounding:

```typescript
import { Kit, Camera } from '@evitcastudio/kit';

const camera = Kit.registerPlugin(Camera);

VYLO.setType('Client', {
    onConnect(this: Client) {
        const player = VYLO.newDiob('Mob/Player');
        this.setPlayerMob(player);

        // Create and immediately activate a follow camera
        camera.createFollowCamera('main', player, {
            lerp: 0.1,
            deadzone: { width: 64, height: 64 },
            lead: 0.2
        });
    }
});
```

---

## Camera Types

The Camera plugin supports multiple specialized camera behaviors:

### 1. FollowCamera
Smooth target tracking with customizable 3D offsets (`x`, `y`, `z` height), look-ahead leading, and deadzones.

```typescript
camera.createFollowCamera('playerCam', playerMob, {
    lerp: 0.1,
    offset: { x: 0, y: -32 },
    lead: 0.3,
    deadzone: { width: 100, height: 100 }
});
```

### 2. PanCamera
Directed camera pans to coordinates or entities with configurable hold duration and auto pan-back.

```typescript
camera.panTo({ x: 1200, y: 800 }, {
    duration: 800,
    pauseDuration: 1000,
    panBack: true,
    ease: 'easeInOutCubic'
});
```

### 3. SpectateCamera
Cinematic entity or coordinate spectating with instant snap or smooth easing.

```typescript
await camera.spectateTarget(bossEntity, {
    duration: 600,
    ease: 'easeOutQuad'
});
```

### 4. InfluenceCamera
Dynamic framing that calculates weighted focus positions and auto-zooms between multiple entities (party members, arenas, boss fights).

```typescript
camera.createInfluenceCamera('bossArena', {
    targets: [player1, player2, boss],
    padding: 100,
    minZoom: 0.5,
    maxZoom: 1.5
});
```

### 5. TransitionCamera
Smoothly tweens between two camera states or perspectives with Hermite splines and spring damping (zero visual pop).

```typescript
await camera.switchTo(bossCamera, {
    duration: 800,
    smoothing: 'smoothDamp', // or 'cubicSpline'
    springTension: 170,
    springFriction: 26
});
```

---

## Screen Shakes & Presets

Trigger any of the 29 built-in presets or configure custom procedural shakes:

```typescript
// Built-in presets: 'gunshot', 'explosion-large', 'impact-heavy', 'earthquake-hard', etc.
camera.shakePreset('explosion-large');

// Infinite ambient shake (e.g. earthquake or moving vehicle)
camera.shakePreset('rumble', undefined, true);

// Stop shake
camera.stopShake();

// Custom multi-axis screen shake
camera.shake({
    strength: { x: 6, y: 6 },
    duration: { x: 350, y: 350 },
    vibrato: 15,
    curve: 0.5
});
```

### Available Presets by Category

| Category | Presets |
| :--- | :--- |
| **Combat & Explosions** | `gunshot`, `recoil`, `explosion-small`, `explosion-large`, `impact`, `impact-light`, `impact-heavy`, `crash` |
| **Environmental** | `earthquake-soft`, `earthquake-hard`, `rumble`, `tremor`, `thunder`, `wind`, `wave` |
| **Atmospheric & Camera** | `handheld-soft`, `handheld-hard`, `breathing`, `heartbeat`, `pulse`, `sway`, `dizzy`, `nervous`, `jitter`, `vibration` |
| **Movement & Actions** | `footstep`, `landing`, `door-slam`, `bounce` |

---

## Dynamic Zooming

Smoothly animate zoom levels with 30+ easing equations:

```typescript
// Zoom in 2x over 500ms
camera.zoom(2, 500, 'easeOutCubic');

// Independent per-axis zoom
camera.zoom({ x: 1.5, y: 1.5 }, 300);

// Reset zoom back to default
camera.zoom(1, 400, 'easeInOutQuad');
```

---

## Global Event Bus Integration

The camera plugin automatically dispatches all lifecycle events to Kit's global event bus (`Kit.on`), allowing audio, gamepad vibration, or UI systems to decouple from the camera:

```typescript
// Listen for camera shake events anywhere in your game
Kit.on('Camera', 'shake-start', (event) => {
    console.log('Shake started:', event.data.preset);
    // e.g., trigger gamepad rumble
});

Kit.on('Camera', 'shake-end', () => {
    // e.g., stop gamepad rumble
});

// Camera transitions (e.g., animate cinematic letterbox bars)
Kit.on('Camera', 'transition-start', (event) => {
    showCinematicBars();
});

Kit.on('Camera', 'transition-end', () => {
    hideCinematicBars();
});
```

You can also subscribe directly to the plugin instance:

```typescript
const unsubscribe = camera.on('view-eye-changed', (data) => {
    console.log('Active camera changed:', data.camera.id);
});
```

---

## Native Debug Overlay & Gizmos

Lens includes a built-in, lightweight 2D canvas overlay for visualizing camera bounds, target vector lines, center crosshairs, and spatial relationships with zero WebGL scene graph overhead:

```typescript
camera.setDebugMode({
    enabled: true,
    showCameraMarkers: true,
    showTargetLines: true,
    showBounds: true,
    showCenterCrosshair: true,
    bounds: { minX: 0, maxX: 2000, minY: 0, maxY: 2000 },
    // Custom render hook for application-specific nametags, reticles, or badges
    onCustomRender: (ctx, worldToScreen, width, height) => {
        // Custom rendering code here
    }
});
```
