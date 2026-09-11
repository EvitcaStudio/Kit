// Re-export Camera plugin and classes directly from @evitcastudio/lens
export {
    CameraPlugin,
    CameraPlugin as Camera,
    CameraManager,
    BaseCamera,
    FollowCamera,
    SpectateCamera,
    PanCamera,
    InfluenceCamera,
    TransitionCamera,
    GizmoRenderer
} from '@evitcastudio/lens';

// Re-export all types from Lens
export type {
    KitPluginEmitter,
    CameraManagerOptions,
    CameraDebugOptions,
    CameraEventName,
    CameraEventMap,
    CameraEventListener,
    GameInstance,
    Vector2D,
    ShakePresetConfig,
    ShakeOptions,
    EaseType,
    DurationSettings,
    EaseSettings,
    ShakePreset,
    CameraOffset,
    FollowCameraOptions,
    SpectateCameraOptions,
    PanCameraOptions,
    InfluenceCameraOptions,
    TransitionCameraOptions,
    CameraType
} from '@evitcastudio/lens';

