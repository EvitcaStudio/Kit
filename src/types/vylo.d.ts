declare global {



	/**
	 * Mouse button identifiers emitted by Vylocity input handlers (1-based DOM button offsets).
	 *
	 * - `Left`: Primary / left mouse button (`1`)
	 * - `Middle`: Auxiliary / middle scroll wheel button (`2`)
	 * - `Right`: Secondary / right mouse button (`3`)
	 *
	 * @example
	 * ```ts
	 * onMouseDown(pClient: Client, pX: number, pY: number, pButton: MouseButton): void {
	 *     if (pButton === MouseButton.Left) {
	 *         // Left click
	 *     } else if (pButton === MouseButton.Right) {
	 *         // Right click
	 *     }
	 * }
	 * ```
	 */
	enum MouseButton {
		/** Primary / Left mouse button. */
		Left = 1,
		/** Auxiliary / Middle mouse button (wheel click). */
		Middle = 2,
		/** Secondary / Right mouse button. */
		Right = 3
	}

	/**
	 * Mouse opacity modes determining how cursor hit-testing and mouse events are processed on an object.
	 *
	 * - `Transparent` (`0`): Ignores mouse events completely (clicks pass through).
	 * - `Icon` (`1`): Uses the object's visual icon bounds (`iconWidth` x `iconHeight` + icon offsets) to detect mouse events.
	 * - `Bounds` (`2`): Uses the object's physical collision bounding box (`width` x `height` + origins) to detect mouse events.
	 *
	 * @example
	 * ```ts
	 * diob.mouseOpacity = MouseOpacity.Bounds;
	 * ```
	 */
	enum MouseOpacity {
		/** Mouse events are disabled; cursor passes through to underlying objects or tiles. */
		Transparent = 0,
		/** Mouse events are detected using the object's visual icon boundaries. */
		Icon = 1,
		/** Mouse events are detected using the object's physical collision bounding box. */
		Bounds = 2
	}

	/**
	 * Readonly tuple containing all 8 standard compass movement directions in clockwise order.
	 */
	type Directions = readonly ['east', 'northeast', 'north', 'northwest', 'west', 'southwest', 'south', 'southeast'];

	/**
	 * Cardinal and ordinal compass movement directions.
	 */
	type Direction = Directions[number];

	/**
	 * Movement settings configuration controlling step size, gliding, sliding, cardinal locking, and step frequency.
	 */
	interface MoveSettingsConfig {
		/**
		 * Number of pixels moved per step. Defaults to `2`.
		 */
		stepSize?: number;
		/**
		 * If true or numeric, movement will glide around obstacle corners instead of halting immediately when blocked.
		 */
		stepGlide?: boolean | number;
		/**
		 * If true, steps occur without changing the movable's facing direction.
		 */
		stepSlide?: boolean;
		/**
		 * If true, restricts diagonal movement steps to the dominant cardinal direction.
		 */
		stepCard?: boolean;
		/**
		 * Milliseconds between each movement step tick. Defaults to `16.6667` (~60 ticks/second).
		 */
		stepTick?: number;
		readonly isMoveSettings?: boolean;
		[key: string]: any;
	}

	/**
	 * Configuration options for an overlay's appearance mask when attached to a parent Diob.
	 */
	interface AppearMaskConfig {
		/**
		 * If `true`, the overlay shares the same icon name (`iconName`) as the parent Diob.
		 */
		shareIcon?: boolean;
		/**
		 * If `true`, the overlay appears underneath the parent Diob instead of above it.
		 */
		isUnder?: boolean;
		/**
		 * If `true`, the overlay uses its own alpha, angle, scale, transform, and composite variables instead of inheriting them from the parent Diob.
		 */
		ownMod?: boolean;
		/**
		 * If `true`, the overlay does not synchronize its `iconState` with the parent Diob's `iconState`.
		 */
		ownState?: boolean;
		/**
		 * If `true`, the overlay manages its own animator and animation playback instead of sharing the parent Diob's animator.
		 */
		ownAnim?: boolean;
		[key: string]: any;
	}

	/**
	 * Appearance mask configuration or flag determining how an overlay attaches and synchronizes visually with its parent Diob.
	 *
	 * - `true`: Overlay acts as an appearance extension on top of the parent.
	 * - `false` / `0`: Overlay acts as an independent diob that follows the parent.
	 * - Positive number: Same as `true` (rendered above parent).
	 * - Negative number: Same as `true`, but rendered under parent (`isUnder`).
	 * - `AppearMaskConfig`: Fine-grained configuration object (`shareIcon`, `isUnder`, `ownMod`, `ownState`, `ownAnim`).
	 */
	type AppearMask = boolean | number | AppearMaskConfig | null;

	/**
	 * Edge lock anchor positions for locking elements or map views to a screen edge.
	 */
	type EdgeLock = 'top' | 'top-left' | 'top-right' | 'right' | 'left' | 'bottom' | 'bottom-right' | 'bottom-left';

	/**
	 * Configuration options for styling text displays on a Diob.
	 *
	 * @example
	 * ```ts
	 * diob.textStyle = {
	 *     fontFamily: 'Arial',
	 *     fontSize: 16,
	 *     fill: '#ffffff',
	 *     stroke: '#000000',
	 *     strokeThickness: 2,
	 *     dropShadow: true
	 * };
	 * ```
	 */
	interface DiobTextStyle {
		/**
		 * Default font to be used for text displays.
		 */
		fontFamily?: string;
		/**
		 * Default size of font in pixels.
		 */
		fontSize?: number;
		/**
		 * Style of font; `'normal'`, `'italic'`, or `'oblique'`.
		 */
		fontStyle?: 'normal' | 'italic' | 'oblique';
		/**
		 * Variant of font; `'normal'` or `'small-caps'`.
		 */
		fontVariant?: 'normal' | 'small-caps';
		/**
		 * Weight of font; `'normal'`, `'bold'`, `'bolder'`, `'lighter'`, `'100'`, `'200'`, `'300'`, `'400'`, `'500'`, `'600'`, `'700'`, `'800'`, or `'900'`.
		 */
		fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
		/**
		 * Where vertically to start drawing the characters on the line; `'top'`, `'alphabetic'`, `'hanging'`, `'middle'`, `'ideographic'`, or `'bottom'`.
		 */
		textBaseline?: 'top' | 'alphabetic' | 'hanging' | 'middle' | 'ideographic' | 'bottom';
		/**
		 * Default color of text for this element; can be a color string, number, or an array of colors for gradients.
		 */
		fill?: string | string[] | number | number[];
		/**
		 * Fill gradient type: `0` for vertical gradient, `1` for horizontal. `fill` must be an array for gradients.
		 */
		fillGradientType?: number;
		/**
		 * If `fillGradientType` is set, an array of numbers from 0 to 1 defining gradient stop spacing.
		 */
		fillGradientStops?: number[];
		/**
		 * Style of text outline for this element; currently supports colors.
		 */
		stroke?: string | number;
		/**
		 * Width of text outline in pixels.
		 */
		strokeThickness?: number;
		/**
		 * Padding between the edge of the element and the text in pixels.
		 */
		padding?: number;
		/**
		 * Default spacing between each line of text.
		 */
		leading?: number;
		/**
		 * Default `0`. Space between each letter in pixels.
		 */
		letterSpacing?: number;
		/**
		 * Height of line in pixels.
		 */
		lineHeight?: number;
		/**
		 * Default `'miter'`. Type of corner used; `'miter'`, `'round'`, or `'bevel'`.
		 */
		lineJoin?: 'miter' | 'round' | 'bevel';
		/**
		 * Default `10`. Miter limit to use when `lineJoin` is `'miter'`.
		 */
		miterLimit?: number;
		/**
		 * Default `'left'`. Text alignment; `'left'`, `'right'`, `'center'`, `'start'`, or `'end'`.
		 */
		align?: 'left' | 'right' | 'center' | 'start' | 'end';
		/**
		 * Determines if lines can wrap between letters of a word.
		 */
		breakWords?: boolean;
		/**
		 * Enables a drop shadow effect on the text.
		 */
		dropShadow?: boolean;
		/**
		 * Alpha transparency of the drop shadow, from `0` to `1`.
		 */
		dropShadowAlpha?: number;
		/**
		 * Angle of the drop shadow in radians.
		 */
		dropShadowAngle?: number;
		/**
		 * Number representing drop shadow blur radius in pixels.
		 */
		dropShadowBlur?: number;
		/**
		 * Fill style/color to be used for the drop shadow.
		 */
		dropShadowColor?: string | number;
		/**
		 * Default `5`. Number representing distance of drop shadow in pixels.
		 */
		dropShadowDistance?: number;
		/**
		 * Boolean `true` or `false` to trim transparent borders.
		 */
		trim?: boolean;
		/**
		 * Default `false`. Boolean `true` or `false` to determine if lines should be broken after a certain width.
		 */
		wordWrap?: boolean;
		/**
		 * Default `100`. Number of pixels before word wrap triggers.
		 */
		wordWrapWidth?: number;
		/**
		 * Default `{'x': 0, 'y': 0}`. Object containing x and y anchor (e.g. `{'x': 0.5, 'y': 0.5}`).
		 */
		anchor?: Point2D | { x?: number; y?: number };
		/**
		 * Default `{'x': 1, 'y': 1}`. Object containing x and y scale (e.g. `{'x': 2, 'y': 2}`).
		 */
		scale?: Point2D | { x?: number; y?: number };
		/**
		 * Default `0`. Number of pixels to offset the text by on the x-axis.
		 */
		xPos?: number;
		/**
		 * Default `0`. Number of pixels to offset the text by on the y-axis.
		 */
		yPos?: number;
		[key: string]: any;
	}

	/**
	 * Configuration options for styling text displays on an Interface element.
	 *
	 * @example
	 * ```ts
	 * interfaceElement.textStyle = {
	 *     fontFamily: 'Arial',
	 *     fontSize: 14,
	 *     fill: '#000000',
	 *     padding: 4,
	 *     align: 'center'
	 * };
	 * ```
	 */
	interface InterfaceTextStyle {
		/**
		 * Default font to be used for text displays.
		 */
		fontFamily?: string;
		/**
		 * Default size of font in pixels.
		 */
		fontSize?: number;
		/**
		 * Where vertically to start drawing the characters on the line; `'top'`, `'alphabetic'`, `'hanging'`, `'middle'`, `'ideographic'`, or `'bottom'`.
		 */
		textBaseline?: 'top' | 'alphabetic' | 'hanging' | 'middle' | 'ideographic' | 'bottom';
		/**
		 * Default color of text for this element.
		 */
		fill?: string | number;
		/**
		 * Style of text outline for this element; currently supports colors.
		 */
		stroke?: string | number;
		/**
		 * Width of text outline in pixels.
		 */
		strokeThickness?: number;
		/**
		 * Padding between the edge of the element and the text in pixels.
		 */
		padding?: number;
		/**
		 * Padding on left and right sides; overrides `padding`.
		 */
		hPadding?: number;
		/**
		 * Padding on top and bottom; overrides `padding`.
		 */
		vPadding?: number;
		/**
		 * Default spacing between each line of text.
		 */
		leading?: number;
		/**
		 * Name of the icon atlas to use as a bitmap font.
		 */
		bitmap?: string;
		/**
		 * `true` to turn bitmap text into appearMask icons, the text will apply its parent's appearance properties.
		 */
		bitMask?: boolean;
		/**
		 * Bitmaps only; default spacing between each character in pixels.
		 */
		charSpace?: number;
		/**
		 * Default `'left'`. Text alignment; possible values: `'left'`, `'right'`, `'center'`, `'start'`, `'end'`. Bitmaps only support `'left'` or `'right'`.
		 */
		align?: 'left' | 'right' | 'center' | 'start' | 'end';
		/**
		 * Default `0`. Number of pixels to offset the text by on the x-axis.
		 */
		xPos?: number;
		/**
		 * Default `0`. Number of pixels to offset the text by on the y-axis.
		 */
		yPos?: number;
		/**
		 * Maximum amount of characters allowed; currently only applies to input interface types.
		 */
		maxLength?: number;
		[key: string]: any;
	}

	/**
	 * Represents coordinate and dimensional dimensions for size calculations.
	 */
	interface Size2D {
		width: number;
		height: number;
	}

	/**
	 * Represents 2D spatial coordinates or offset points.
	 */
	interface Point2D {
		x: number;
		y: number;
	}

	/**
	 * Represents zoom configuration on the MapView.
	 *
	 * Controls the horizontal (`x`) and vertical (`y`) zoom scale factors.
	 *
	 * @example
	 * ```ts
	 * // Set uniform zoom
	 * client.mapView.zoom.set(1.5, 1.5);
	 *
	 * // Inspect current zoom
	 * console.log(`Zoom: ${client.mapView.zoom.x}, ${client.mapView.zoom.y}`);
	 * ```
	 */
	interface MapViewZoomConfig {
		/** Horizontal zoom scale factor. */
		x: number;
		/** Vertical zoom scale factor. */
		y: number;
		/**
		 * Sets both horizontal and vertical zoom factors.
		 *
		 * @param {number} pX - Horizontal zoom factor.
		 * @param {number} [pY] - Vertical zoom factor (defaults to pX).
		 */
		set?: (pX: number, pY?: number) => void;
		/** Read-only flag identifying this as a MapViewZoom instance. */
		readonly isMapViewZoom?: boolean;
	}

	/**
	 * Represents boundary dimensional limits for MapView.
	 */
	interface MapViewDimensionLimit {
		/** Maximum or minimum width limit in pixels. */
		width?: number;
		/** Maximum or minimum height limit in pixels. */
		height?: number;
		readonly isMapViewMaxView?: boolean;
		readonly isMapViewMinView?: boolean;
	}

	/**
	 * Represents zoom constraint limits for MapView.
	 */
	interface MapViewZoomLimit {
		/** Horizontal zoom limit. */
		x: number;
		/** Vertical zoom limit. */
		y: number;
		readonly isMapViewMaxZoom?: boolean;
		readonly isMapViewMinZoom?: boolean;
	}

	/**
	 * Represents padding configuration styles for MapView.
	 */
	interface MapViewPaddingConfig {
		top?: number | string;
		left?: number | string;
		right?: number | string;
		bottom?: number | string;
		setStyle?: (pStyle: string | number | Partial<MapViewPaddingConfig>, pOverride?: boolean) => void;
	}

	/**
	 * Configuration options for creating or updating a client's MapView.
	 */
	interface MapViewConfig {
		/**
		 * Width of the map view in pixels, percentage string (e.g. `'100%'`), or auto.
		 */
		width?: number | string;
		/**
		 * Height of the map view in pixels, percentage string (e.g. `'100%'`), or auto.
		 */
		height?: number | string;
		/**
		 * X coordinate position of the map view on screen.
		 */
		xPos?: number;
		/**
		 * Y coordinate position of the map view on screen.
		 */
		yPos?: number;
		/**
		 * Map zoom configuration object (`{ x: number, y: number }`) or numeric zoom scale factor.
		 *
		 * @example
		 * ```ts
		 * client.setMapView({ zoom: 1.5 });
		 * client.setMapView({ zoom: { x: 2, y: 2 } });
		 * ```
		 */
		zoom?: number | Partial<MapViewZoomConfig>;
		/**
		 * Maximum allowable zoom level.
		 */
		maxZoom?: number | Partial<MapViewZoomLimit>;
		/**
		 * Minimum allowable zoom level.
		 */
		minZoom?: number | Partial<MapViewZoomLimit>;
		/**
		 * Maximum view dimensions before auto-zoom triggers.
		 */
		maxView?: number | Partial<MapViewDimensionLimit>;
		/**
		 * Minimum view dimensions before auto-zoom triggers.
		 */
		minView?: number | Partial<MapViewDimensionLimit>;
		/**
		 * Anchor point for scale origin (e.g. `{ x: 0.5, y: 0.5 }`).
		 */
		anchor?: number | Point2D;
		/**
		 * Horizontal and vertical scale multipliers.
		 */
		scale?: number | Point2D;
		/**
		 * Multiplier step interval for auto-zoom calculations.
		 */
		autoZoomMulti?: number;
		/**
		 * When true, prevents the map view from automatically scaling with the window.
		 */
		preventAutoScale?: boolean;
		/**
		 * When true, prevents automatic resize recalculations on window resize.
		 */
		preventAutoResize?: boolean;
		/**
		 * Edge lock constraints (e.g. `'bottom'`, `'right'`, etc.).
		 */
		edgeLock?: EdgeLock | EdgeLock[];
		/**
		 * Callback invoked when auto-zoom level changes.
		 */
		onAutoZoom?: (pOldAutoX: number, pOldAutoY: number) => void;
		[key: string]: any;
	}

	/**
	 * The active MapView instance attached to a Client.
	 *
	 * Controls the camera viewport, world rendering canvas, rendering resolution,
	 * eye tracking target, zoom levels, and spatial conversions.
	 *
	 * @example
	 * ```ts
	 * const mapView = VYLO.Client.getMapView();
	 * mapView.setZoom(1.5);
	 * mapView.eye = playerMob;
	 * ```
	 */
	interface MapViewInstance extends MapViewConfig {
		readonly isMapView: boolean;
		/** The target Diob the camera viewport is centered on. */
		eye: Diob | null;
		/** Offset from the eye target on the x-axis in pixels. */
		xEyeOffset: number;
		/** Offset from the eye target on the y-axis in pixels. */
		yEyeOffset: number;
		/** Current horizontal screen viewport offset. */
		readonly xView: number;
		/** Current vertical screen viewport offset. */
		readonly yView: number;
		/** Number of blank tiles visible on the horizontal map edges. */
		xEdgeLimit: number | null;
		/** Number of blank tiles visible on the vertical map edges. */
		yEdgeLimit: number | null;
		/**
		 * Current zoom controller object for the MapView viewport.
		 *
		 * Allows getting or setting `x` and `y` zoom scale factors.
		 *
		 * @example
		 * ```ts
		 * // Set zoom
		 * mapView.zoom.set(2, 2);
		 *
		 * // Inspect zoom values
		 * console.log(`Horizontal zoom: ${mapView.zoom.x}, Vertical zoom: ${mapView.zoom.y}`);
		 * ```
		 */
		zoom: MapViewZoomConfig;
		/** Maximum zoom controller object. */
		maxZoom: MapViewZoomLimit;
		/** Minimum zoom controller object. */
		minZoom: MapViewZoomLimit;
		/** Maximum view dimensions controller object. */
		maxView: MapViewDimensionLimit;
		/** Minimum view dimensions controller object. */
		minView: MapViewDimensionLimit;
		/** Current horizontal auto-zoom factor. */
		readonly xAutoZoom: number;
		/** Current vertical auto-zoom factor. */
		readonly yAutoZoom: number;
		/** Multiplier step factor for auto-zoom. */
		autoZoomMulti: number | null;
		/** Padding controller for the MapView viewport. */
		padding: MapViewPaddingConfig;
		/** The underlying rendering application instance (e.g. PIXI.Application). */
		readonly renderApp: any;
		/** Sets both horizontal and vertical eye offsets. */
		setEyeOffsets: (pX: number, pY?: number) => void;
		/** Sets horizontal and vertical edge limits. */
		setEdgeLimit: (pX: number, pY: number) => void;
		/** Sets horizontal and vertical zoom factors. */
		setZoom: (pX: number, pY?: number) => void;
		/** Sets maximum horizontal and vertical zoom bounds. */
		setMaxZoom: (pX: number, pY: number) => void;
		/** Sets minimum horizontal and vertical zoom bounds. */
		setMinZoom: (pX: number, pY: number) => void;
		/** Sets maximum view dimension bounds. */
		setMaxView: (pW: number, pH: number) => void;
		/** Sets minimum view dimension bounds. */
		setMinView: (pW: number, pH: number) => void;
		/** Converts a screen-space X pixel coordinate to a map-space coordinate. */
		getMapPosXFromScreen: (pX: number) => number;
		/** Converts a screen-space Y pixel coordinate to a map-space coordinate. */
		getMapPosYFromScreen: (pY: number) => number;
		/** Retrieves all diobs currently visible within this MapView. */
		getDiobs: (pType?: string, pChild?: boolean, pAdd?: boolean) => Diob[];
		[key: string]: any;
	}

	/**
	 * Window scaling modes for the client screen view.
	 *
	 * - `'normal'`: Normal scaling according to window size.
	 * - `'ratio'`: Preserves original aspect ratio when scaled.
	 * - `'multiple'`: Integer multiplier scaling (2x, 3x, etc.).
	 * - `'multiAspect'`: Aspect ratio scaling with integer stepping.
	 * - `'none'`: Disables automatic window scaling.
	 */
	type ScreenViewScaleTo = 'normal' | 'ratio' | 'multiple' | 'multiAspect' | 'none';

	/**
	 * Settings and state configuration for the client's screenView viewport.
	 *
	 * @example
	 * ```ts
	 * VYLO.Client.setScreenView({
	 *     scaleTo: 'ratio',
	 *     scaleNearest: true,
	 *     disableImageSmoothing: true,
	 *     resolution: window.devicePixelRatio || 1
	 * });
	 * ```
	 */
	interface ScreenView {
		/**
		 * Window scaling policy mode.
		 */
		scaleTo?: ScreenViewScaleTo;
		/**
		 * When true, enables nearest-neighbor pixelated canvas rendering.
		 */
		scaleNearest?: boolean;
		/**
		 * When true, disables image smoothing on renderer canvases.
		 */
		disableImageSmoothing?: boolean;
		/**
		 * Rendering resolution / pixel ratio. Defaults to `1`.
		 */
		resolution?: number | string;
		/**
		 * Current calculated window width in pixels.
		 */
		width?: number;
		/**
		 * Current calculated window height in pixels.
		 */
		height?: number;
		/**
		 * When true, prevents auto-resizing the world gameWidth/gameHeight when `scaleTo` is `'none'`.
		 */
		preventAutoResize?: boolean;
		/**
		 * Automatic scale multiplier step value.
		 */
		autoScaleMulti?: number;
		/**
		 * Minimum viewport constraints for auto-scale calculations.
		 */
		minView?: Partial<Size2D> & { autoScaleMulti?: number };
		/**
		 * Maximum viewport constraints for auto-scale calculations.
		 */
		maxView?: Partial<Size2D> & { autoScaleMulti?: number };
		/**
		 * Horizontal auto-scale factor currently applied.
		 */
		xAutoScale?: number;
		/**
		 * Vertical auto-scale factor currently applied.
		 */
		yAutoScale?: number;
		/**
		 * Callback invoked when auto-scaling values change.
		 */
		onAutoScale?: (pOldScaleX: number, pOldScaleY: number) => void;
		[key: string]: any;
	}

	/**
	 * Renderer options and configuration for the client game canvas and graphics pipeline.
	 *
	 * @example
	 * ```ts
	 * VYLO.Client.renderOptions = {
	 *     antialias: false,
	 *     roundPixels: true,
	 *     resolution: window.devicePixelRatio || 1
	 * };
	 * ```
	 */
	interface RenderOptions {
		/**
		 * When true, enables antialiasing on the canvas/WebGL renderer context.
		 */
		antialias?: boolean;
		/**
		 * When true, resizes the renderer view in CSS pixels to properly account for high-DPI displays and device pixel ratio.
		 */
		autoDensity?: boolean;
		/**
		 * The background color of the canvas renderer (hex number e.g. `0x000000` or hex/CSS string e.g. `'#000000'`).
		 */
		backgroundColor?: number | string;
		/**
		 * Transparency / alpha value of the renderer background canvas, ranging from `0` (fully transparent) to `1` (fully opaque).
		 */
		backgroundAlpha?: number;
		/**
		 * When true, clears the canvas renderer context before rendering each frame.
		 */
		clearBeforeRender?: boolean;
		/**
		 * When true, preserves the WebGL drawing buffer context (enables taking screenshots or extracting raw pixel data from the canvas).
		 */
		preserveDrawingBuffer?: boolean;
		/**
		 * Hint passed to WebGL context creation to specify performance or power preference (`'default'`, `'high-performance'`, or `'low-power'`).
		 */
		powerPreference?: 'default' | 'high-performance' | 'low-power';
		/**
		 * Resolution and device pixel ratio of the renderer. Defaults to `1` or `window.devicePixelRatio`.
		 */
		resolution?: number;
		/**
		 * When true, rounds display object coordinates to whole pixel integers to eliminate subpixel blurriness on pixel art.
		 */
		roundPixels?: boolean;
		/**
		 * Width of the renderer canvas view in pixels.
		 */
		width?: number;
		/**
		 * Height of the renderer canvas view in pixels.
		 */
		height?: number;
		/**
		 * The HTML canvas element used as the rendering target.
		 */
		view?: HTMLCanvasElement;
		/**
		 * Whether the WebGL context uses premultiplied alpha colors.
		 */
		premultipliedAlpha?: boolean;
		/**
		 * When true, outputs renderer banner and engine information to the browser console upon initialization.
		 */
		hello?: boolean;
		[key: string]: any;
	}

	/**
	 * Screen capture representation returned by `getTopScreen` or `getOverScreen`.
	 */
	interface ScreenCaptureData {
		/** Screen or identifier name. */
		name?: string | number;
		/** Display layer depth. */
		layer?: number;
		/** Horizontal coordinate. */
		x?: number;
		/** Vertical coordinate. */
		y?: number;
		/** Width in pixels. */
		width?: number;
		/** Height in pixels. */
		height?: number;
		/** Pixel data array (ImageData), base64 data URL string, canvas, or sprite. */
		data?: string | ImageData | HTMLCanvasElement | any;
		/** Associated canvas element if requested. */
		canvas?: HTMLCanvasElement;
		/** Settings object associated with the capture. */
		settings?: { scaleType?: string; [key: string]: any };
	}

	/**
	 * Draw command parameter object for `topScreenDraw`, `overScreenDraw`, or `Icon.draw`.
	 */
	interface DrawCommandArgs {
		/** Draw action type: `'image'`, `'fillRect'`, `'strokeRect'`, `'clearRect'`, `'text'`, `'fillPath'`, `'strokePath'`. */
		type?: 'image' | 'fillRect' | 'strokeRect' | 'clearRect' | 'text' | 'fillPath' | 'strokePath' | string;
		/** Image source (Image, canvas, Diob, or URL string) when drawing images. */
		image?: HTMLImageElement | HTMLCanvasElement | Diob | string | any;
		/** X coordinate on the destination canvas. */
		x?: number;
		/** Y coordinate on the destination canvas. */
		y?: number;
		/** Destination render width. */
		width?: number;
		/** Destination render height. */
		height?: number;
		/** Source clipping X offset on the image. */
		clipX?: number;
		/** Source clipping Y offset on the image. */
		clipY?: number;
		/** Source clipping width on the image. */
		clipW?: number;
		/** Source clipping height on the image. */
		clipH?: number;
		/** Fill or stroke CSS color string (e.g. `'#ff0000'`, `'rgba(0,0,0,0.5)'`). */
		color?: string;
		/** Rotation angle in radians (0 to 2*PI). */
		angle?: number;
		/** Anchor point for rotation and scaling. */
		anchor?: number | Point2D;
		/** Stroke line width in pixels. */
		lineWidth?: number;
		/** Text string to render. */
		text?: string;
		/** CSS font specification string (e.g. `'16px Arial'`). */
		font?: string;
		/** Text alignment: `'left'`, `'right'`, `'center'`, `'start'`, `'end'`. */
		align?: CanvasTextAlign;
		/** Maximum text width limit. */
		maxWidth?: number;
		/** Path command sequence array for `'fillPath'` or `'strokePath'`. */
		path?: any[];
		[key: string]: any;
	}

	/**
	 * Information describing a Diob's active animation state.
	 */
	interface AnimationInfo {
		/** 1-based index of the currently playing frame. */
		onFrame: number;
		/** Total count of frames in the active animation. */
		frameCount: number;
		/** Atlas containing the animation. */
		atlasName: string;
		/** Icon name inside the atlas. */
		iconName: string;
		/** State name inside the icon. */
		iconState: string;
	}

	/**
	 * Coordinates and transformation properties for a 2D affine matrix.
	 */
	interface TransformMatrixObject {
		scaleX: number;
		scaleY: number;
		skewX: number;
		skewY: number;
		moveX: number;
		moveY: number;
	}

	/**
	 * Modifier configuration applied to an over screen sprite.
	 */
	interface OverScreenMod {
		/** Scale modifier factor as a single scalar or {x, y} object. */
		scale?: number | Point2D;
		/** Opacity alpha value (0 to 1). */
		alpha?: number;
		/** Rotation angle in radians (0 to 2*PI). */
		angle?: number;
		[key: string]: any;
	}

	/**
	 * Represents a MySQL connection pool instance returned by World.openMySQL.
	 */
	interface MySQLConnectionPool {
		getConnection: Function;
		query: Function;
		end: Function;
		[key: string]: any;
	}

	/**
	 * File statistics object returned by File.stat and File.getStats.
	 */
	interface FileStats {
		/** Returns true if the path is a regular file. */
		isFile(): boolean;
		/** Returns true if the path is a directory. */
		isDirectory(): boolean;
		/** Returns true if the path is a block device. */
		isBlockDevice(): boolean;
		/** Returns true if the path is a character device. */
		isCharacterDevice(): boolean;
		/** Returns true if the path is a symbolic link. */
		isSymbolicLink(): boolean;
		/** Returns true if the path is a FIFO named pipe. */
		isFIFO(): boolean;
		/** Returns true if the path is a socket. */
		isSocket(): boolean;
		/** Size of the file in bytes. */
		size: number;
		/** File mode bit mask. */
		mode: number;
		/** Timestamp of last file modification. */
		mtime: Date;
		/** Timestamp of last file access. */
		atime: Date;
		/** Timestamp of last status change. */
		ctime: Date;
		/** Timestamp of file creation. */
		birthtime: Date;
		[key: string]: any;
	}

	/** The world object. */
	interface World {

		/**
		 * Returns an array of diobs in the world depending on the provided arguments. If `pType` is not set, all diobs in the game will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs in the game will be returned.
		 *
		 * @env Client | Server
		 * @param {string} [pType] - (Optional) String containing type path to return.
		 * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
		 * @returns {Diob[]} Returns an array of diobs in the world depending on the provided arguments. If `pType` is not set, all diobs in the game will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs in the game will be returned.
		 */
		getDiobs(pType?: string, pChild?: boolean): Diob[]

        /**
         * Object that will become the contents of `settings.json` file for your game server.
         *
         * @env Client | Server
         */
		serverSettings: {[key: string]: unknown, 'port'?: number,'name'?: string,'accessCode'?: 'string','secure'?: {'key': string, 'cert': string}}

        /**
         * Alphanumeric string between 1 and 48 characters needed to list a server and use the api for the game.
         *
         * @env Client | Server
         */
		webAccessCode: string

        /**
         * Default is `10000`. Number of milliseconds to wait before pinging a client to see if it is still connected.
         *
         * @env Server
         */
		pingDelay: number

        /**
         * Default port to use when hosting. If the host sets a port in `settings.json` that port will override this one.
         *
         * @env Server
         */
		mainPort: number

        /**
         * Type of map to use; `normal` or `isometric`.
         *
         * @env Client | Server
         */
		mapMode: 'normal' | 'isometric'

        /**
         * A string containing the address of the server to automatically connect players to. Example: `127.0.0.1:1234`.
         *
         * @env Client | Server
         */
		mainServer: string

        /**
         * Width of the game canvas. Resolution of the game width.
         * 
         * @env Client | Server
         */
        gameWidth: number

        /**
         * Height of the game canvas. Resolution of the game height.
         * 
         * @env Client | Server
         */
        gameHeight: number

        /**
         * Passes an array of objects containing information about the game servers currently online. Example: `{'name': 'Server 1', 'address': '127.0.0.1:1234', 'players': 12, 'guests': 2}` would be the data for a server named Server 1 with 12 players and 2 guests on it at 127.0.0.1:1234 address to `pFunc`.
         *
         * @env Client | Server
         * @param {Function} pFunc - Function to call after the servers have been retrieved.
         */
		getServers(pFunc: Function): void

        /**
         * Returns an array of diobs in the world that have the tag `pTag`.
         *
         * @env Client | Server
         * @param {string} pTag - String containing tag to look for.
         * @returns {Diob[]} Returns an array of diobs in the world that have the tag `pTag`.
         */
		getDiobsByTag(pTag: string): Diob[]

        /**
         * Returns an object `{'width': world.gameWidth, 'height': world.gameHeight}` containing the width and height of the game.
         *
         * @env Client | Server
         * @returns {{'width': number, 'height': number} } returns an object `{'width': world.gameWidth, 'height': world.gameHeight}` containing the width and height of the game.
         */
		getGameSize(): {'width': number, 'height': number}

        /**
         * Closes the socket connection.
         *
         * @env Client | Server
         * @param {string} pAddress - Address of server to open a socket to. Example: `127.0.0.1:1234`.
         * @param {Function} pFunc - Function to call once the socket has been opened. An object holding the socket information is passed into `pFunc`.
         * @param {object} pSettings - Object containing settings values. Example: `{'secure': `true`}`.
         */
		openWebSocket(pAddress: string, pFunc: Function, pSettings: object): void

        /**
         * Name that the server's js file will have, default being `server` making it `server.js`.
         *
         * @env Client | Server
         */
		serverFileName: string

        /**
         * Closes the host socket.
         *
         * @env Server
         * @param {number} pPort - The port to listen for sockets on.
         * @param {Function} pFunc - The function to call once the host socket has started.
         * @returns {Client[]} Returns an array of all the socket client objects.
         */
		hostWebSocket(pPort: number, pFunc: Function): Client[]

        /**
         * Checks if Vylocity account `pName` is a subscriber of the game then calls `pFunc`. Server-side only.
         *
         * @env Server
         * @param {string | number} pName - Name of the Vyocity account to check sub of.
         * @param {Function} pFunc - Function to call after the sub check. Function is called with up to two parameters where the first is `true` or `false` depending on if the account is a sub or not and the second is a string containing an error message if there was one.
         */
		checkSub(pName: string | number, pFunc: Function): void

        /**
         * Plays a sound to all objects in `pArr`. Returns the Sound object.
         *
         * @env Client | Server
         * @param {string | {'soundName': string, 'volume': number}} pSound - either a string with the name of a sound file, or a string containing the path of a Sound object, or an actual Sound object, or a basic object with the proper information; ex ( {'soundName': 'name', 'volume': 50} )
         * @param {Client | Client[]} [pArr] - (Optional) List of objects to play sound to.
         * @param {number} [pStart] - (Optional) Time to start playing the sound at.
         * @param {number} [pDuration] - (Optional) How long to play the sound for.
         * @returns {void} Returns the Sound object.
         */
		playSound(pSound: string | {'soundName': string, 'volume': number}, pArr?: Client | Client[], pStart?: number, pDuration?: number): void

        /**
         * Sends a request of method `pMethod` to the url `pLink` and passes the response into `pFunc`.
         *
         * @env Client | Server
         * @param {string} pLink - String containing the link to send a request to. For example `https://vylocity.com/`.
         * @param {string} [pMethod] - (Optional) String containing method type of request, ex `POST`, `GET`.
         * @param {object} [pHeaders] - (Optional) Object containing custom headers.
         * @param {any} [pData] - (Optional) Data to send with method `POST`.
         * @param {Function} [pFunc] - (Optional) Function to call after the request has been sent and a response received, the arguments of the function will be (`pData`, `pError`) where `pData` is the data returned and `pError` the error (if there is one).
         */
		sendRequest(pLink: string, pMethod?: string, pHeaders?: object, pData?: any, pFunc?: (pData: any, pError?: any) => void): void

        /**
         * A string containing addresses allowed to use scripts to access and download resources from this game server (currently set for `.vyr`|`.json`|`.txt` files). Default `*` which allows all addresses.
         *
         * @env Server
         */
		resourceOrigin: string

        /**
         * Map to be loaded when the game starts.
         *
         * @env Client | Server
         */
		mainMap: string

        /**
         * A string containing the address of the server to download resources from (game server or web server). Default is `.` which is same address as the game. If using web server, add htaccess file in the resources folder to set header Access-Control-Allow-Origin ex of htaccess file: ( Header set Access-Control-Allow-Origin "*" ). This feature only works for the client of multiplayer, if playing solo the resources at the index location will be used and the server in multiplayer will use its own resource location.
         *
         * @env Client | Server
         */
		resourceServer: string

        /**
         * Returns an object `{'width': world.tileWidth, 'height': world.tileHeight}` containing the width and height of the game tiles.
         *
         * @env Client | Server
         * @returns {{'width': number, 'height': number} } returns an object `{'width': world.tileWidth, 'height': world.tileHeight}` containing the width and height of the game tiles.
         */
		getTileSize(): {'width': number, 'height': number}

        /**
         * Gracefully reboot the server.
         *
         * @env Client | Server
         */
		reboot(): void

        /**
         * String containing the name of the default macro atlas.
         *
         * @env Client | Server
         */
		mainMacro: string

        /**
         * Returns an array of objects that are in `pArr` depending on the provided arguments. If `pType` is not set, all objects in the game will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs in the game will be returned.
         *
         * @env Client | Server
         * @param {unknown[]} pArr - Array to check for objects in.
         * @param {string} [pType] - (Optional) String containing type path to return.
         * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
         * @returns {unknown[]} Returns an array of objects that are in `pArr` depending on the provided arguments. If `pType` is not set, all objects in the game will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs in the game will be returned.
         */
		getObjectsFromArray<T extends Diob = Diob>(pArr: any[], pType?: string, pChild?: boolean): T[]

        /**
         * Returns a string containing the address of the server or client. For example `1.2.3.4:1234` for server and `localhost` always for client.
         *
         * @env Client | Server
         * @returns {string} Returns a string containing the address of the server or client. For example `1.2.3.4:1234` for server and `localhost` always for client.
         */
		getHostAddress(): string

        /**
         * Goes to `pLink` and passes the content of the page to `pFunc` once it is finished.
         *
         * @env Client
         * @param {string} pLink - String containing the link to read. For example `http://vylocity.com/`.
         * @param {Function} pFunc - Function to call after the content has been retrieved.
         * @param {string} [pMime] - (Optional) Set the mime type. Example: text/html or application/octet-stream.
         */
		getWebContent(pLink: string, pFunc: (pContent: string | ArrayBuffer) => void, pMime?: string): void

        /**
         * Reference to the node process (https://nodejs.org/api/process.html). Warning: for advanced users.
         *
         * @env Server
         */
		nodeProcess: NodeJS.Process

        /**
         * Version of the game.
         *
         * @env Client | Server
         */
		gameVersion: string | number

        /**
         * Displays `pMes` to the console.
         *
         * @env Client | Server
         * @param {string} pMes - Message to display.
         */
		log(pMes: string): void

        /**
         * Returns a string containing the game version.
         *
         * @env Client | Server
         * @returns {string | number} Returns a string containing the game version.
         */
		getGameVersion(): string | number

        /**
         * Outputs text to an interface element for all clients. If `pInt` or `pEl` is not set or is invalid, text goes to client.mainOutput.
         *
         * @env Client | Server
         * @param {string} pText - Text to be displayed.
         * @param {string} pInt - String containing interface file name to output to.
         * @param {string} pEl - String containing the interface element name to output to.
         */
		outputText(pText: string, pInt: string, pEl: string): void

        /**
         * A string containing the address that can access the API ( `*` to allow all ) or an array of strings for each address with access.
         *
         * @env Server
         */
		apiOrigin: string | string[]

        /**
         * Sends a string message `pMes` to another server located at `pAddress`. Game server getting the message must have World/apiOrigin set to allow the message.
         *
         * @env Client | Server
         * @param {string} pAddress - Address of the server to send a message to.
         * @param {string} pMes - String containing the message to send.
         * @param {Function} [pCallback] - (Optional) Function to call after the message has been sent. The function will have two arguments, the first being an error if there was one, the second being the response from the server (the return value of the World/onMessage).
         */
		sendMessage(pAddress: string, pMes: string, pCallback?: Function): void

        /**
         * Called when a map finishes loading.
         *
         * @env Client | Server
         * @event
         * @param {string | number} pName - Name of map that has loaded.
         */
		onMapLoaded(pName: string | number): void

        /**
         * String containing the path of the mob for the player to control.
         *
         * @env Client | Server
         */
		mainMob: string

        /**
         * Returns an array of all connected clients.
         *
         * @env Client | Server
         * @returns {Client[]} Returns an array of all connected clients.
         */
		getClients(): Client[]

        /**
         * Connects to a MySQL database using the provided configuration options and returns a connection pool object.
         *
         * @env Server
         * @param {Record<string, any>} pDatabase - Configuration object for the MySQL connection (e.g. `{ host: 'localhost', user: 'root', password: '', database: 'game' }`).
         * @param {Function} [pFunc] - Optional callback function invoked when connection establishment completes.
         * @returns {MySQLConnectionPool} Returns the connection pool instance created via `mysql.createPool()`.
         *
         * @example
         * ```ts
         * const pool = VYLO.World.openMySQL({
         *     host: '127.0.0.1',
         *     user: 'dbuser',
         *     password: 'secretpassword',
         *     database: 'my_game_db'
         * });
         * ```
         */
		openMySQL(pDatabase: Record<string, any>, pFunc?: Function): MySQLConnectionPool

        /**
         * Returns a string containing information about what the code type is. Code ran in solo will return `local`. Code ran in multi-player client will return `client`. Code ran on the server will return `server`.
         *
         * @env Client | Server
         * @returns {'local' | 'client' | 'server'} Returns a string containing information about what the code type is. Code ran in solo will return `local`. Code ran in multi-player client will return `client`. Code ran on the server will return `server`.
         */
		getCodeType(): 'local' | 'client' | 'server'

        /**
         * Gracefully shut down the server.
         *
         * @env Client | Server
         */
		shutdown(): void

        /**
         * Returns the diob with the specified ID.
         *
         * @env Client | Server
         * @param {string} pID - Id of the diob to get.
         * @returns {Diob} Returns the diob with the specified ID.
         */
		getDiobByID(pID: string): Diob

        /**
         * An object containing width and height of tiles on the map `{'width': 32, 'height': 32}`. Acts as the default size of diobs.
         *
         * @env Client | Server
         */
		tileSize: {'width': number, 'height': number}

        /**
         * A number; 1 for single player game, 2 for multi-player game, 3 for single and multi-player.
         *
         * @env Client | Server
         */
		playerMode: 1 | 2 | 3

        /**
         * Returns a string contain server IP and port in `ip:port` format.
         *
         * @env Client | Server
         * @returns {string} Returns a string contain server IP and port in `ip:port` format.
         */
		getAddress(): string

        /**
         * Sends a notification with the message `pMessage` to the Vylocity account `pName` and then calls `pFunc`. Server-side only.
         *
         * @env Server
         * @param {string | number} pName - Name of the Vyocity account to send notification to.
         * @param {string} pMessage - Message to send; 256 characters max.
         * @param {Function} pFunc - Function to call after the notification has been sent or attempted. Function is called with up to two parameters where the first is `true` or `false` depending on the success of the send and the second is a string containing an error message if there was one.
         */
		sendNotification(pName: string | number, pMessage: string, pFunc: Function): void

        /**
         * Only manually set this if you are using the offline IDE and are setting the source to match the game id for vylocity.com.
         *
         * @env Client | Server
         */
		gameID: number

        /**
         * Evaluates the JavaScript code in the `pScript` string. If the world is running on the server-side this code will be Node.js.
         *
         * @env Client | Server
         * @param {string} pScript - A string containing the JavaScript code to evaluate.
         */
		evalWebScript(pScript: string): void

        /**
         * Returns a number containing the game's player mode.
         *
         * @env Client | Server
         * @returns {number} Returns a number containing the game's player mode.
         */
		getPlayerMode(): number

        /**
         * Array of files to preload when the game starts up or `*` to load all resources. If no name is provided, all resources of that type will be preloaded. For example [`{'type': 'icon', 'name': 'icon1'}`, `{'type': 'sound'}`] to load an icon named icon1 and all sound resources. All interface files and macro files are automatically preloaded. You may include remote resources by giving the object a `remote` property and setting it to the web URL path of the resource.
         *
         * @env Client | Server
         */
		preloadResources: {'type': string, 'name': string}[] | '*'

        /**
         * Kicks the client `pClient` and displays the `pReason` message to them if there is one.
         *
         * @env Client | Server
         * @param {Client} pClient - Client to kick.
         * @param {string} [pReason] - (Optional) Message to display to the client being kicked.
         */
		kickClient(pClient: Client, pReason?: string): void

        /**
         * Default is `50`. Number of milliseconds to wait before sending built-in engine packets (custom client packets are sent immediately).
         *
         * @env Server
         */
		packetDelay: number

        /**
         * Default is `45`. How many tiles to combine into chunks to improve efficiency for rendering and networking. Recommended to use at least 1.5x map view, so if the map view is 1920x1080 and the tile size is 32x32, you would want at least 90 chunk (90x90 tiles). If a part of the remaining map (after other parts have been chunked) is smaller than the chunk size, it will be added to the nearest chunk instead.
         *
         * @env Client | Server
         */
		mapChunk: number

        /**
         * Sends the data for the `pD` diob to all clients in the world, if `pVar` is set it will send only those variables, if it is not set it will only send built-in engine variables.
         *
         * @env Server
         * @param {Diob} pD - Reference to the diob to send.
         * @param {string | string[]} [pVar] - (Optional) Variable name or array of variable names.
         */
		sendDiob(pD: Diob, pVar?: string | string[]): void

		/**
		 * If true, requires connected players to have a valid Vylocity account rather than guest accounts.
		 *
		 * @env Client | Server
		 */
		requireAccount?: boolean

		/**
		 * If true, prevents the server from automatically initiating/hosting the server socket on startup.
		 *
		 * @env Server
		 */
		preventAutoHost?: boolean

		/**
		 * If true, enables server-side position and property transitions to be processed and synced.
		 *
		 * @env Server
		 */
		allowServerTransitions?: boolean

		/**
		 * Manually starts hosting the server on the specified port. Overrides `World.mainPort` if provided.
		 *
		 * @env Server
		 * @param {number} [pPort] - Port number to listen on.
		 */
		hostServer(pPort?: number): void

		/**
		 * Initializes the Steamworks API wrapper if running in the desktop executable environment. Returns true on success.
		 *
		 * @env Client
		 * @returns {boolean} Whether Steam API initialization succeeded.
		 */
		openSteamAPI(): boolean

		/**
		 * Returns the address of the connected server or 'localhost'.
		 *
		 * @env Client | Server
		 * @returns {string} Server address string.
		 */
		getServerAddress(): string

		/**
		 * Sends an asynchronous HTTP fetch request using the fetch API and returns the response Promise.
		 *
		 * @env Client | Server
		 * @param {string} pURL - Request destination URL.
		 * @param {any} [pData] - Request options/payload object.
		 * @returns {Promise<any>} Response promise.
		 */
		sendWebRequest(pURL: string, pData?: any): Promise<any>

		/**
		 * Maximum allowable payload size in bytes for POST requests to the `/api?post` endpoint. Defaults to `5000000` (5MB).
		 *
		 * @env Client | Server
		 */
		maxPostSize: number

		/**
		 * Maximum allowable file upload size in bytes for requests to the `/api?upload` endpoint. Defaults to `5000000` (5MB).
		 *
		 * @env Client | Server
		 */
		maxUploadFilesize: number

		/**
		 * Event invoked when a POST request is received at `/api?post`.
		 *
		 * @env Server
		 * @param {Buffer | any} pPost - Received body data chunk buffer.
		 * @param {string} pFrom - Client IP address string.
		 * @param {Record<string, string>} pHeaders - HTTP request headers.
		 * @param {(pResult?: any) => void} [pCallback] - Optional callback to send response.
		 * @returns {any} Optional return value sent directly as response if not using callback.
		 */
		onPost?(pPost: Buffer | any, pFrom: string, pHeaders: Record<string, string>, pCallback?: (pResult?: any) => void): any

		/**
		 * Returns the Icon object corresponding to the specified atlas, icon name, state, and frame.
		 *
		 * @env Client | Server
		 * @param {string} pAtlas - Icon atlas name.
		 * @param {string} [pIcon] - Icon name.
		 * @param {string} [pState] - Icon state name.
		 * @param {number} [pFrame] - Optional frame index.
		 * @returns {Icon | any} The matching icon instance.
		 */
		getIcon(pAtlas: string, pIcon?: string, pState?: string, pFrame?: number): Icon | any

		/**
		 * Returns or creates the IconAtlas instance for the specified atlas name.
		 *
		 * @env Client | Server
		 * @param {string} pAtlas - Icon atlas name.
		 * @returns {IconAtlas} Icon atlas instance.
		 */
		getIconAtlas(pAtlas: string): IconAtlas

		/**
		 * Creates a new Icon instance in the specified atlas.
		 *
		 * @env Client | Server
		 * @param {string} pAtlas - Target atlas name.
		 * @param {string} pIcon - Icon name.
		 * @param {string} [pState] - Initial state name.
		 * @param {number} [pW] - Width in pixels.
		 * @param {number} [pH] - Height in pixels.
		 * @param {number} [pDelay] - Frame delay in milliseconds.
		 * @param {any} [pData] - Texture or image data.
		 * @returns {Icon | any} Newly created Icon.
		 */
		newIcon(pAtlas: string, pIcon: string, pState?: string, pW?: number, pH?: number, pDelay?: number, pData?: any): Icon | any

		/**
		 * Creates a new Icon loaded directly from an image URL.
		 *
		 * @env Client | Server
		 * @param {string} pData - Image URL or data URL.
		 * @param {number} [pW] - Width in pixels.
		 * @param {number} [pH] - Height in pixels.
		 * @param {number} [pDelay] - Frame delay in milliseconds.
		 * @returns {Icon | any} Newly created Icon.
		 */
		newIconFromURL(pData: string, pW?: number, pH?: number, pDelay?: number): Icon | any

	}



	/** The base object that Diob extends from. */
	type Object = {

		/**
		 * Object containing ticker details if in an active ticker. Set to `null` to remove from ticker.
		 *
		 * @env Client | Server
		 */
		inTicker: object

		/**
		 * The ticker object instance attached to this object (`_vy_tickerOb`).
		 *
		 * @env Client | Server
		 */
		tickerOb: any;

		/**
		 * The root base type string in this object's type hierarchy (e.g. `'Diob'`, `'Mob'`, `'Tile'`, `'Client'`).
		 *
		 * @env Client | Server
		 */
		readonly baseType: string;

		/**
		 * The immediate parent type string this object type inherits from.
		 *
		 * @env Client | Server
		 */
		readonly parentType: string;

		/**
		 * The leaf type string of this object (the most derived type).
		 *
		 * @env Client | Server
		 */
		readonly ownType: string;

		/**
		 * Reference to the internal ObjectType descriptor structure representing this object's type (`_vy_parentT`).
		 *
		 * @env Client | Server
		 */
		readonly typeOb: ObjectType;

        /**
         * Sets the `pVal` value of the `pVar` static variable belonging to the type `pType`. Static variables are variables that belong to all Objects of this type collectively and are different than normal variables, usually static variables can only be set once, but VyScript static variables may be changed if that is what the developer wants.
         *
         * @env Client | Server
         * @param {string} pVar - Name of the static variable to set.
         * @param {boolean} pVal - Value to give to the static variable.
         */
		setStaticVariable(pVar: string, pVal: any): void

        /**
         * Returns the static variable value belonging to the type `pType`.
         *
         * @env Client | Server
         * @param {string} pVar - Name of the static variable to get.
         * @returns {any} Returns the static variable value belonging to the type `pType`.
         */
		getStaticVariable<T = any>(pVar: string): T

	}



	/**
	 * Represents the runtime type metadata and prototype descriptor for an Object type in the Vylocity type system.
	 */
	interface ObjectType {

		/**
		 * Read-only boolean flag indicating this is an ObjectType descriptor.
		 *
		 * @env Client | Server
		 */
		readonly isObjectType?: boolean;

		/**
		 * The leaf type string of this ObjectType (the short type name without parent paths).
		 *
		 * @env Client | Server
		 */
		readonly ownType: string;

		/**
		 * Array of type strings that this ObjectType inherits from.
		 *
		 * @env Client | Server
		 */
		readonly inherits: string[];

		/**
		 * Record of static variables defined on this ObjectType.
		 *
		 * @env Client | Server
		 */
		readonly staticVars: Record<string, any>;

		/**
		 * Destroys this ObjectType and unregisters it from the engine's type registry.
		 *
		 * @env Client | Server
		 */
		destroy(): void;

		/**
		 * Adds a type path `pType` to this ObjectType's inheritance list.
		 *
		 * @env Client | Server
		 * @param {string} pType - Type path to inherit.
		 * @returns {ObjectType} The inherited ObjectType descriptor.
		 */
		addInherit(pType: string): ObjectType;

		/**
		 * Removes an inherited type path `pInherit` from this ObjectType.
		 *
		 * @env Client | Server
		 * @param {string} pInherit - Type path to remove.
		 */
		removeInherit(pInherit: string): void;

		/**
		 * Sets multiple variables on this ObjectType definition simultaneously.
		 *
		 * @env Client | Server
		 * @param {Record<string, any>} pVars - Object containing key-value pairs to set.
		 */
		setVars(pVars: Record<string, any>): void;

		/**
		 * Sets a variable `pVar` on this ObjectType definition to `pVal`.
		 *
		 * @env Client | Server
		 * @param {string} pVar - Variable name to define.
		 * @param {any} pVal - Value to assign.
		 */
		setVar(pVar: string, pVal: any): void;

		/**
		 * Retrieves the value of a variable `pVar` defined on this ObjectType.
		 *
		 * @env Client | Server
		 * @param {string} pVar - Variable name to look up.
		 * @param {boolean} [pOwn] - If `true`, only inspect variables defined directly on this type, ignoring parents.
		 * @returns {any} The variable value.
		 */
		getVar(pVar: string, pOwn?: boolean): any;

		/**
		 * Deletes a variable `pVar` from this ObjectType and propagates the deletion to child types.
		 *
		 * @env Client | Server
		 * @param {string} pVar - Variable name to remove.
		 */
		delVar(pVar: string): void;

		/**
		 * Sets or overrides a member function `pName` on this ObjectType.
		 *
		 * @env Client | Server
		 * @param {string} pName - Function name.
		 * @param {Function} pFunc - Function implementation.
		 * @param {boolean} [pOverride] - Whether this function completely overrides parent implementations.
		 */
		setFunc(pName: string, pFunc: Function, pOverride?: boolean): void;

		/**
		 * Retrieves the member function `pName` defined on this ObjectType.
		 *
		 * @env Client | Server
		 * @param {string} pName - Function name.
		 * @param {boolean} [pOwn] - If `true`, only returns function if directly defined on this type.
		 * @returns {Function} The function.
		 */
		getFunc(pName: string, pOwn?: boolean): Function;

		/**
		 * Sets a static variable `pVar` belonging to this ObjectType to `pVal`.
		 *
		 * @env Client | Server
		 * @param {string} pVar - Static variable name.
		 * @param {any} pVal - Static value.
		 */
		setStaticVar(pVar: string, pVal: any): void;

		/**
		 * Retrieves the static variable `pVar` belonging to this ObjectType.
		 *
		 * @env Client | Server
		 * @param {string} pVar - Static variable name.
		 * @returns {any} The static value.
		 */
		getStaticVar(pVar: string): any;

		[key: string]: any;

	}



	/** The diob object. */
	interface Diob {

		/**
		 * Returns `true` if this Diob is currently shown on the screen, `false` if not.
		 *
		 * @env Client | Server
		 * @returns {void} Returns `true` if this Diob is currently shown on the screen, `false` if not.
		 */
		checkScreenShown(): void

        /**
         * Removes the specified filter.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of filter to remove.
         */
		removeFilter(pName: string | number): void

        /**
         * Sets the diob's overlays to the array `pOver`.
         *
         * @env Client | Server
         * @param {Diob[]} pOver - Array of overlays to set this diob's overlays to.
         * @param {boolean} [pSave] - (Optional) If set, removed overlays will not be deleted, otherwise this call will delete removed overlays after removing them from the overlays.
         */
		setOverlays(pOver: Diob[], pSave?: boolean): void

        /**
         * When this diob has a transition change. If `pVar`, `pChange`, and `pStart` are all unset then this is the event called when all transitions have ended.
         *
         * @env Client | Server
         * @event
         * @param {string} pVar - A string containing the name of the variable involved in the transition.
         * @param {number} pChange - The amount changed.
         * @param {object} pStart - If this is set then this is the event called when a transition starts. This will be a reference to the transition object used.
         */
		onTransition(pVar?: string, pChange?: number, pStart?: object): void

        /**
         * Returns an array of Diobs currently in this diob's invisibility viewer list.
         *
         * @env Client | Server
         * @returns {Diob[]} Array of Diob instances currently able to see through this diob's invisibility.
         *
         * @example
         * ```ts
         * const viewers: Diob[] = mob.getInvisibilityViewers();
         * for (const viewer of viewers) {
         *     console.log('Viewer present:', viewer.tag);
         * }
         * ```
         */
		getInvisibilityViewers(): Diob[]

        /**
         * If set, diob will be invisible to all other diobs with visibility less than this value.
         *
         * @env Client | Server
         */
		invisibility: number

        /**
         * Sets this diob's icon anchor to `pX` and `pY`. Default is 0.5,0.5 which is the center of the diob's icon (0,0 would be the top-left corner).
         *
         * @env Client | Server
         * @param {number} pX - Default is `0`. 5. X value of the diob's icon anchor.
         * @param {number} [pY] - (Optional) Default is `0`. 5. Y value of the diob's icon anchor.
         */
		setAnchor(pX: number, pY?: number): void

        /**
         * Modifies the scale, angle, or alpha of this diob's over screen display.
         *
         * @env Client | Server
         * @param {OverScreenMod} pMod - Object containing modifications: `scale`, `angle`, `alpha`.
         * @param {boolean} [pAdd] - (Optional) If true, values in `pMod` will be added to the existing modifications.
         *
         * @example
         * ```ts
         * diob.setOverScreenMod({ angle: Math.PI / 4, alpha: 0.8, scale: { x: 1.5, y: 1.5 } });
         * ```
         */
		setOverScreenMod(pMod: OverScreenMod, pAdd?: boolean): void

        /**
         * Moves this to specified location. If `pVal1` and `pVal2` are numbers, this is moved to the coordinate `pVal1`, `pVal2`. If `pVal1` is an object but not a tile, this is moved to the location of object. If `pVal1` is a tile, this is moved to that tile.
         *
         * @env Client | Server
         */
		setLoc(): Diob

        /**
         * Returns the current diob being used as a mask.
         *
         * @env Client | Server
         * @returns {Diob} Returns the current diob being used as a mask.
         */
		getMask(): Diob

        /**
         * A string to be displayed as text above the diob.
         *
         * @env Client | Server
         */
		text: string

        /**
         * Adds `pDiob` to this diob's viewer array, allowing `pDiob` to always see this diob.
         *
         * @env Client | Server
         * @param {Diob} pDiob - The diob to add.
         */
		addInvisibilityViewer(pDiob: Diob): void

        /**
         * When this diob and `pD` have overlapping bounding boxes and one of them changes position and stays overlapped.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pD - Diob that is crossed with this diob.
         * @param {boolean} pInit - If set, `pD` was relocated and initiated the event.
         */
		onCrossedRelocated(pD: Diob, pInit?: boolean): void

        /**
         * Turns this diob's sprite into a repeating pattern. Call with no arguments to return to a normal sprite.
         *
         * @env Client | Server
         * @param {number} pX - Default is `0`. Position where the pattern starts on the x-axis.
         * @param {number} pY - Default is `0`. Position where the pattern starts on the y-axis.
         * @param {number} [pWidth] - (Optional) Width of the pattern.
         * @param {number} [pHeight] - (Optional) Height of the pattern.
         */
		setPattern(pX: number, pY: number, pWidth?: number, pHeight?: number): void

        /**
         * Determines if the object is dense or not. True or `false` for dense or not, or a number for value, over 1 for different densities. For example, density 3 diobs can move over density 2 and lower diobs but not anything density 3 or higher.
         *
         * @env Client | Server
         */
		density: boolean | number

        /**
         * Name of icon inside object's icon atlas.
         *
         * @env Client | Server
         */
		iconName: string

        /**
         * Adds the specified filter.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the filter. Only one name may be used at a time, using the name will remove the old filter with that name.
         * @param {string} pType - The type of filter to add. Below is the types and their specific possible `pArgs` values.
         * @param {unknown} pArgs - Color-based filter.
         */
		addFilter(pName: string | number, pType: string, pArgs: unknown): void
		snapToFloor?: boolean
		floatingPlatform?: boolean

        /**
         * Position of object on the grid x-axis.
         *
         * @env Client | Server
         */
		xCoord: number

        /**
         * Sets the width and height of the diob.
         *
         * @env Client | Server
         * @param {number} pWidth - Value to set the diob's width to.
         * @param {number} pHeight - Value to set the diob's height to.
         */
		setSize(pWidth: number, pHeight: number): void

        /**
         * Called when a packet is sent from this diob on the client or server using diob.sendPacket.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - Client that sent the packet.
         * @param {string | number} pName - Name of packet.
         * @param {unknown} pData - Any data containing information for packet. Example: `{'a': 1, 'b': 2}` or `test`.
         */
		onPacket(pClient: Client, pName: string | number, pData: unknown): void

        /**
         * Called when a mouse button is clicked on this diob (press and release sequence).
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - The client instance originating the mouse click.
         * @param {number} pX - The horizontal coordinate of the mouse relative to the diob's origin.
         * @param {number} pY - The vertical coordinate of the mouse relative to the diob's origin.
         * @param {MouseButton} pButton - The mouse button that was clicked (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         *
         * @example
         * ```ts
         * onMouseClick(pClient: Client, pX: number, pY: number, pButton: MouseButton): void {
         *     if (pButton === MouseButton.Left) {
         *         console.log(`${pClient.getAccountName()} left-clicked on diob at (${pX}, ${pY})`);
         *     }
         * }
         * ```
         */
		onMouseClick(pClient: Client, pX: number, pY: number, pButton: MouseButton): void

        /**
         * The region that the diob is in.
         *
         * @env Client | Server
         */
		region: Region | null

        /**
         * Name of atlas the object's icon is in.
         *
         * @env Client | Server
         */
		atlasName: string

        /**
         * Returns an array of diobs that are crossing this diob using the provided arguments. If `pType` is not set, all diobs will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs will be returned.
         *
         * @env Client | Server
         * @param {string} [pType] - (Optional) String containing type path to return.
         * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
         * @returns {Diob[]} Returns an array of diobs that are crossing this diob using the provided arguments. If `pType` is not set, all diobs will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs will be returned.
         */
		getCrossed(pType?: string, pChild?: boolean): Diob[]

        /**
         * Changes the appearance of the diob based on the values provided by `pDiob`.
         *
         * @env Client | Server
         * @param {Diob} pDiob - Object containing the appearance information or a diob itself. Values used: atlasName, iconName, iconState, width, height, layer, scale, color, alpha, transform, anchor, angle, composite, plane, text, textStyle, animator, overlays, overScreen.
         */
		setAppearance(pDiob: Diob): void

        /**
         * Sets the x and y origin offsets.
         *
         * @env Client | Server
         * @param {number} pX - The x offset of the origin of this object from the left.
         * @param {number} pY - The y offset of the origin of this object from the top.
         */
		setOrigin(pX: number, pY: number): void

        /**
         * If set, the client will not interpolate position changes.
         *
         * @env Client | Server
         */
		preventInterpolation: boolean

        /**
         * A JSON object containing typography, formatting, and rendering styles for this Diob's text display.
         *
         * @env Client | Server
         *
         * @example
         * ```ts
         * diob.textStyle = {
         *     fontFamily: 'Arial',
         *     fontSize: 16,
         *     fill: '#ffffff',
         *     stroke: '#000000',
         *     strokeThickness: 2,
         *     dropShadow: true
         * };
         * ```
         */
		textStyle: DiobTextStyle

        /**
         * Name of the type of the object.
         *
         * @env Client | Server
         */
		type: string

        /**
         * Unique ID of the diob.
         *
         * @env Client | Server
         */
		id: number | string

        /**
         * The diob's transformation matrix (9-element array) or 2D transformation object.
         *
         * Array format: `[scaleX, skewY, 0, skewX, scaleY, 0, moveX, moveY, 1]`
         * Object format: `{ scaleX, skewY, skewX, scaleY, moveX, moveY }`
         *
         * @env Client | Server
         *
         * @example
         * ```ts
         * diob.transform = { scaleX: 2, scaleY: 2, skewX: 0, skewY: 0, moveX: 10, moveY: 10 };
         * ```
         */
		transform: TransformMatrixObject | number[]

        /**
         * Sets the scale of the diob.
         *
         * @env Client | Server
         * @param {number} pX - Number to scale the width of the diob by. For example 2 would be a 200% scale.
         * @param {number} [pY] - (Optional) Number to scale the height of the diob by. For example 2 would be a 200% scale. PX used if `null`.
         */
		setScale(pX: number, pY?: number): void

        /**
         * Transitions this diob's `pO` properties from their current values to the new values over time. If `pO` is not set all transitions will be cancelled and all properties will automatically go to their end transition values. Current allowed properties: alpha, angle, scale, xScale, yScale, xIconOffset, yIconOffset.
         *
         * @env Client | Server
         * @param {object} pO - Object containing properties to transition. Example: `{'alpha': 0.5, 'xIconOffset': 20}`.
         * @param {number} pS - Number of steps to take to transition the properties. Default is `1`.  -1 for a step every frame.
         * @param {number} pT - Number of milliseconds between each step. Default is `100`. If `pS` is -1 then this is the total time.
         * @param {number} [pQ] - (Optional) If set, this transition will be added to a queue and happen after the current transition finishes or the rest of the queue clears. Set as -1 to merge this with the last thing in the queue.
         * @param {number} [pLoop] - (Optional) If set, this transition will be added to the current loop of transitions and repeat until told to stop, if this transition is first, this can be set to a specify number to stop looping after that amount of loops; -1 to loop forever.
         * @param {string} [pEase] - (Optional) Use an easing equation that isn't linear. Options: `quadraticIn`, `quadraticOut`, `quadraticInOut`, `cubicIn`, `cubicOut`, `cubicInOut`, `quarticIn`, `quarticOut`, `quarticInOut`, `quinticIn`, `quinticOut`, `quinticInOut`, `sineIn`, `sineOut`, `sineInOut`, `expoIn`, `expoOut`, `expoInOut`, `circularIn`, `circularOut`, `circularInOut`.
         */
		setTransition(pO: object, pS: number, pT: number, pQ?: number, pLoop?: number, pEase?: string): void

        /**
         * The tile that the diob is on.
         *
         * @env Client | Server
         */
		loc: Tile | null

        /**
         * When this diob leaves the client's screen view.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - A reference to the client.
         */
		onScreenHide(pClient: Client): void

        /**
         * Returns the transformation matrix of this diob either as a 9-element array or as a `TransformMatrixObject`.
         *
         * @env Client | Server
         * @param {boolean} [pAsObj] - If true, returns an object `{ scaleX, skewY, skewX, scaleY, moveX, moveY }` instead of a 9-element array.
         * @returns {TransformMatrixObject | number[]} The current 2D transformation matrix.
         *
         * @example
         * ```ts
         * const transformObj = diob.getTransform(true) as TransformMatrixObject;
         * console.log(transformObj.scaleX, transformObj.scaleY);
         * ```
         */
		getTransform(pAsObj?: boolean): TransformMatrixObject | number[]

        /**
         * Returns the over screen modifier object currently applied to this diob.
         *
         * @env Client | Server
         * @returns {OverScreenMod | undefined} Current modifier object containing scale, angle, and alpha settings.
         */
		getOverScreenMod(): OverScreenMod | undefined

        /**
         * Returns an object containing the diob's icon atlas and icon name.
         *
         * @env Client | Server
         * @returns {{ atlas: string; icon: string }} Object with `atlas` and `icon` properties.
         *
         * @example
         * ```ts
         * const { atlas, icon } = diob.getIcon();
         * console.log(`Atlas: ${atlas}, Icon: ${icon}`);
         * ```
         */
		getIcon(): { atlas: string; icon: string }

        /**
         * Captures or retrieves over screen data for this diob (client-side only).
         *
         * @env Client
         * @param {'url' | 'pixels' | 'canvas' | 'sprite'} [pType] - Type of data representation to retrieve.
         * @returns {ScreenCaptureData | undefined} Captured screen data object or undefined.
         *
         * @example
         * ```ts
         * const capture = diob.getOverScreen('pixels');
         * if (capture && capture.data) {
         *     console.log('Captured width:', capture.width, 'height:', capture.height);
         * }
         * ```
         */
		getOverScreen(pType?: 'url' | 'pixels' | 'canvas' | 'sprite'): ScreenCaptureData | undefined

        /**
         * Angle of the diob (0 to 2PI).
         *
         * @env Client | Server
         */
		angle: number

        /**
         * Changes the over screen information. Adding data optional.
         *
         * @env Client | Server
         * @param {number} pX - X offset of display.
         * @param {number} pY - Y offset of display.
         * @param {number} pWidth - Width of display.
         * @param {number} pHeight - Height of display.
         * @param {unknown} [pData] - (Optional) Data to add to the screen.
         * @param {object} [pSet] - (Optional) Settings object. Example: ( `{'scaleNearest': `true`}` ).
         */
		setOverScreen(pX: number, pY: number, pWidth: number, pHeight: number, pData?: unknown, pSet?: object): void

        /**
         * When this diob changes maps. This event will be called twice if the map has not already been loaded, once before loading and once after the loading has completed (the first event will have `pBefore` set).
         *
         * @env Client | Server
         * @event
         * @param {string} pMap - Name of the old map or name of the new map if `pBefore` is set.
         * @param {boolean} pBefore - If set then the map is currently loading and this is the pre-load event.
         */
		onMapChange(pMap: string, pBefore?: boolean): void

        /**
         * Returns the dimensions (width and height in pixels) of this diob's current icon state.
         *
         * @env Client | Server
         * @returns {Size2D} Dimensions containing `width` and `height` in pixels.
         *
         * @example
         * ```ts
         * const { width, height } = diob.getSize();
         * console.log(`Diob size: ${width}x${height}`);
         * ```
         */
		getSize(): Size2D

        /**
         * Custom string used to identify the diob.
         *
         * @env Client | Server
         */
		tag: string

        /**
         * All invisible diobs with invisibility levels equal to or less than this will be visible to this diob.
         *
         * @env Client | Server
         */
		visibility: number

        /**
         * Called when a mouse button is double clicked on this diob.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - The client instance originating the double click.
         * @param {number} pX - The horizontal coordinate of the mouse relative to the diob's origin.
         * @param {number} pY - The vertical coordinate of the mouse relative to the diob's origin.
         * @param {MouseButton} pButton - The mouse button used (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         *
         * @example
         * ```ts
         * onMouseDblClick(pClient: Client, pX: number, pY: number, pButton: MouseButton): void {
         *     if (pButton === MouseButton.Left) {
         *         console.log('Double clicked diob with left mouse button');
         *     }
         * }
         * ```
         */
		onMouseDblClick(pClient: Client, pX: number, pY: number, pButton: MouseButton): void

        /**
         * When an object exits the contents of another object.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Object that exited.
         */
		onExited(pDiob: Diob): void

        /**
         * Executes 2D canvas drawing commands onto this diob's over screen surface.
         *
         * @env Client | Server
         * @param {DrawCommandArgs | DrawCommandArgs[]} pArgs - A draw command configuration object or array of command objects.
         *
         * @example
         * ```ts
         * diob.overScreenDraw({
         *     type: 'fillRect',
         *     color: 'rgba(255, 0, 0, 0.5)',
         *     x: 0,
         *     y: 0,
         *     width: 32,
         *     height: 32
         * });
         * ```
         */
		overScreenDraw(pArgs: DrawCommandArgs | DrawCommandArgs[]): void

        /**
         * How visible the diob appears; (0 to 1); 0 completely invisible, 1 completely visible, between partially visible, higher the number the more visible.
         *
         * @env Client | Server
         */
		alpha: number

        /**
         * Changes display icon of object.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of atlas icon is in.
         * @param {string} pIcon - Name of icon in `pAtlas`.
         */
		setIcon(pAtlas: string, pIcon: string): void

        /**
         * Position on the y-axis of the origin from the top edge of the diob.
         *
         * @env Client | Server
         */
		yOrigin: number

        /**
         * Position of object on the grid y-axis.
         *
         * @env Client | Server
         */
		yCoord: number

        /**
         * Returns the origin point offsets `{ x, y }` from which rotation and positioning offsets are calculated.
         *
         * @env Client | Server
         * @returns {Point2D} Object containing horizontal (`x`) and vertical (`y`) origin offsets in pixels.
         *
         * @example
         * ```ts
         * const origin = diob.getOrigin();
         * console.log(`Origin: (${origin.x}, ${origin.y})`);
         * ```
         */
		getOrigin(): Point2D

        /**
         * When this diob changes icons.
         *
         * @env Client | Server
         * @event
         */
		onIconUpdate(): void

        /**
         * Returns the icon rendering visual offsets `{ x, y }` in pixels.
         *
         * @env Client | Server
         * @returns {Point2D} Object containing horizontal (`x`) and vertical (`y`) icon offsets.
         *
         * @example
         * ```ts
         * const offsets = diob.getIconOffsets();
         * console.log(`Icon visual offsets: (${offsets.x}, ${offsets.y})`);
         * ```
         */
		getIconOffsets(): Point2D

        /**
         * Turns `pMask` into a mask which this diob interacts with. Transparent portions of the `pMask`'s icon will cut out those same spots from this diob's icon.
         *
         * @env Client | Server
         * @param {Diob} pMask - Diob to use as a mask.
         */
		setMask(pMask: Diob): void

        /**
         * If this diob is an Overlay type or is being used as an overlay, this will be set. If the overlay has a parent diob, this will be a reference to that diob.
         *
         * @env Client | Server
         */
		isOverlay: boolean | Diob | null

        /**
         * Height to use when calculating y position relayering.
         *
         * @env Client | Server
         */
		relayerHeight: number

        /**
         * If set, the server will not update clients when changes are made. Can be `true` to prevent all clients from getting updated or can be an object containing variables and/or specific clients to ignore. Possible variables `pos`, `dir`, `icon`. Example: ( `{'type': ['pos', 'dir'], 'client': [someClient]}` ).
         *
         * @env Server
         */
		preventClientUpdates: boolean | { type?: string[]; client?: Client[] }

        /**
         * Called when a mouse wheel button is scrolled upward while over this object.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - Client of the mouse.
         * @param {number} pX - The x position of the mouse over the diob.
         * @param {number} pY - The y position of the mouse over the diob.
         */
		onMouseWheelScrollUp(pClient: Client, pX: number, pY: number): void

        /**
         * Data shared automatically from the server-side to clients that have a sync for this diob. Changing the variable will update any clients that have this diob's sync in realtime.
         *
         * @env Client | Server
         */
		clientSyncData: Record<string, any> | any

        /**
         * Sends a packet to a client or server specifically for this diob, depending on where the code is executed. Client code executing this will send the packet to the server. Server code executing this will send the packet to the client. This will invoke Diob/onPacket on client-side if the sendPacket is server-side and on the server-side if it is on the client-side.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of packet to send.
         * @param {unknown} pData - Data to be sent. Example: `{'a': 1, 'b': 2}` or `test`.
         * @param {Client} [pClient] - (Optional) SERVER ONLY. Optional. Specific client or array of clients to send this packet to. If no client is specified the packet will be sent to all clients currently synced with this diob.
         */
		sendPacket(pName: string | number, pData: unknown, pClient?: Client): void

        /**
         * Returns the coordinate offsets `{ x, y }` from the diob's grid position.
         *
         * @env Client | Server
         * @returns {Point2D} Object containing `x` and `y` coordinate offsets in pixels.
         *
         * @example
         * ```ts
         * const offsets = diob.getCoordOffsets();
         * console.log(`Coord offsets: (${offsets.x}, ${offsets.y})`);
         * ```
         */
		getCoordOffsets(): Point2D

        /**
         * Removes all overlays with the `pOver` type or the exact overlay matching `pOver`.
         *
         * @env Client | Server
         * @param {string | Diob | Object} pOver - String of the type of object or overlay to remove or actual overlay to remove.
         * @param {boolean} [pSave] - (Optional) If set, the overlay will not be deleted, otherwise this call will delete `pOver` after removing it from the overlays.
         */
		removeOverlay(pOver: string | Diob | Object, pSave?: boolean): void

        /**
         * Called when the mouse exits this object.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - Client of the mouse.
         * @param {number} pX - The x position of the mouse over the diob.
         * @param {number} pY - The y position of the mouse over the diob.
         */
		onMouseExit(pClient: Client, pX: number, pY: number): void

        /**
         * Returns an object `{'x': x, 'y': y}` containing the x and y positions of the diob on the map.
         *
         * @env Client | Server
         * @returns {{'x': number,'y': number} } returns an object `{'x': x, 'y': y}` containing the x and y positions of the diob on the map.
         */
		getPos(): {'x': number,'y': number}

        /**
         * How many pixels object is offset on the grid x-axis from the xCoord.
         *
         * @env Client | Server
         */
		xCoordOffset: number

        /**
         * If set, any movable with the same density as this diob may cross over it.
         *
         * @env Client | Server
         */
		allowDensityCross: boolean

        /**
         * When an object enters the contents of another object.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Object that entered.
         */
		onEntered(pDiob: Diob): void

        /**
         * Height of the collision box of the object.
         *
         * @env Client | Server
         */
		height: number

        /**
         * String containing composite value that determines how this diob is drawn with other diobs on the same plane. Possible values: normal, add, multiply, screen.
         *
         * @env Client | Server
         */
		composite: 'source-over' | 'source-atop' | 'source-in' | 'source-out' | 'destination-over' | 'destination-atop' | 'destination-in' | 'destination-out' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'

        /**
         * Sets the animation frame to `pFrame` and freezes for `pDelay` milliseconds before returning to the previous frame or continuing on if `pCont` is set.
         *
         * @env Client | Server
         * @param {number} pFrame - Frame number.
         * @param {number} [pDelay] - (Optional) Delay in milliseconds to freeze the newly set frame for. Passing in -1 will pause the animation until you unpause it by changing the diob's `animator.isPaused` to `false`.
         * @param {boolean} [pCont] - (Optional) If `true`, animation will play like normal after the frame delay. False will return the animation to the frame it was at before the set after the delay.
         */
		setFrame(pFrame: number, pDelay?: number, pCont?: boolean): void

        /**
         * Returns animation state information for the diob's currently active animation.
         *
         * When called without arguments, returns an `AnimationInfo` object:
         * `{ onFrame, frameCount, atlasName, iconName, iconState }`.
         *
         * When called with a specific key name, returns the corresponding scalar value.
         *
         * @env Client | Server
         * @returns {AnimationInfo} Complete animation state object.
         *
         * @example
         * ```ts
         * const anim = diob.getAnimation();
         * console.log(`Playing frame ${anim.onFrame} of ${anim.frameCount}`);
         * ```
         */
		getAnimation(): AnimationInfo
        getAnimation(pVal: 'onFrame' | 'frameCount'): number
        getAnimation(pVal: 'atlasName' | 'iconName' | 'iconState'): string
        getAnimation(pVal: string): number | string | AnimationInfo

        /**
         * When this diob and `pMovable` no longer have overlapping bounding boxes.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Diob that uncrossed with this diob.
         */
		onUncrossed(pDiob: Diob): void

        /**
         * Called when a mouse button has been pressed while positioned over this diob.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - The client instance whose mouse button was pressed.
         * @param {number} pX - The horizontal coordinate of the mouse relative to the diob's origin.
         * @param {number} pY - The vertical coordinate of the mouse relative to the diob's origin.
         * @param {MouseButton} pButton - The mouse button that was pressed (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         *
         * @example
         * ```ts
         * onMouseDown(pClient: Client, pX: number, pY: number, pButton: MouseButton): void {
         *     if (pButton === MouseButton.Left) {
         *         // Handle left press (e.g. begin dragging or selection)
         *     } else if (pButton === MouseButton.Right) {
         *         // Handle right press (e.g. contextual actions)
         *     }
         * }
         * ```
         */
		onMouseDown(pClient: Client, pX: number, pY: number, pButton: MouseButton): void

        /**
         * Called when the mouse moves after entering this object.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - Client of the mouse.
         * @param {number} pX - The x position of the mouse over the diob.
         * @param {number} pY - The y position of the mouse over the diob.
         */
		onMouseMove(pClient: Client, pX: number, pY: number): void

        /**
         * Returns the integer grid tile coordinates `{ x, y }` of the diob.
         *
         * @env Client | Server
         * @returns {Point2D} Coordinates containing `xCoord` and `yCoord`.
         *
         * @example
         * ```ts
         * const coords = diob.getCoords();
         * console.log(`Tile grid: (${coords.x}, ${coords.y})`);
         * ```
         */
		getCoords(): Point2D

        /**
         * If set, the client will not update the draw layer of this diob when it changes location on the screen.
         *
         * @env Client
         */
		preventScreenRelayer: boolean

        /**
         * Calls on the client-side when clientSyncData is changed by the server.
         *
         * @env Client | Server
         * @event
         * @param {unknown} pOld - Old data in clientSyncData.
         */
		onClientSyncData(pOld: unknown): void

        /**
         * Returns an array of locations the diob is on. If diob is a tile, it returns an array containing only itself.
         *
         * @env Client | Server
         * @returns {Diob[]} Returns an array of locations the diob is on. If diob is a tile, it returns an array containing only itself.
         */
		getLocs(): Diob[]

        /**
         * Name of the lowest level parent type.
         *
         * @env Client | Server
         */
		baseType: string

        /**
         * Sets the coord offset of the object.
         *
         * @env Client | Server
         * @param {number} pX - The x offset from the xCoord.
         * @param {number} pY - The y offset from the yCoord.
         */
		setCoordOffsets(pX: number, pY: number): void

        /**
         * Name of object.
         *
         * @env Client | Server
         */
		name: string

        /**
         * Sets the icon state of the diob's icon.
         *
         * @env Client | Server
         * @param {string} pState - State of the icon to set.
         * @param {number} [pFrame] - (Optional) If `true`, animation will start from the frame the last iconState left off on.
         */
		setIconState(pState: string, pFrame?: number): void

        /**
         * When this diob has an overlay removed from it.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pD - The diob that was removed from the overlays.
         */
		onRemoveOverlay(pD: Diob): void

        /**
         * Called when a mouse button is released while positioned over this diob.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - The client instance whose mouse button was released.
         * @param {number} pX - The horizontal coordinate of the mouse relative to the diob's origin.
         * @param {number} pY - The vertical coordinate of the mouse relative to the diob's origin.
         * @param {MouseButton} pButton - The mouse button that was released (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         *
         * @example
         * ```ts
         * onMouseUp(pClient: Client, pX: number, pY: number, pButton: MouseButton): void {
         *     if (pButton === MouseButton.Left) {
         *         // End dragging or selection
         *     }
         * }
         * ```
         */
		onMouseUp(pClient: Client, pX: number, pY: number, pButton: MouseButton): void

        /**
         * Position on the x-axis of the origin from the left edge of the diob.
         *
         * @env Client | Server
         */
		xOrigin: number

        /**
         * When `pMovable` attempts to cross this diob resulting in overlapping bounding boxes. This function must return `true` in order for `pMovable` to cross. This event is called for both diobs if they are both movable. Tiles do not have this event.
         *
         * @env Client | Server
         * @event
         * @param {Diob & Movable} pMovable - Movable that is attempting to cross with this diob.
         * @param {boolean} pInit - If set, `pMovable` initiated the event.
         */
		onCross(pMovable: Diob & Movable, pInit?: boolean): boolean | void

        /**
         * Position on the y-axis from top to bottom of the map.
         *
         * @env Client | Server
         */
		yPos: number

        /**
         * When this diob has an overlay added to it.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pD - The diob added as an overlay.
         */
		onAddOverlay(pD: Diob): void

        /**
         * Adds an overlay to the object which is a visual icon that always follows the object. Returns the new overlay.
         *
         * @env Client | Server
         * @param {string | Diob | Object} pOver - String of the type of object or overlay to add an overlay of or actual diob to get type from.
         * @param {number | boolean} [pAppearance] - (Optional) If 1 or positive, this overlay will be be treated as if it is part of the the parent's actual appearance - appearance settings such as angle and alpha of the parent will be used for this overlay and the overlay will be drawn directly on top of the parent so no other diobs that are not an overlay of the parent can appear between it and the parent (it will basically be an extension of the parent's icon). If this is `false` or 0, the overlay will be treated as an independent diob that just follows the parent around. If -1 or negative it will be treated like if it was 1 but it will appear under the parent instead of above it.
         * @param {boolean} [pSkipEvent] - (Optional) If `true`, the onAddOverlay event will not be called.
         * @returns {void} Returns the new overlay.
         */
		addOverlay(pOver: string | Diob | Object, pAppearance?: AppearMask, pSkipEvent?: boolean): void

        /**
         * When this diob enters the client's screen view.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - A reference to the client.
         */
		onScreenShow(pClient: Client): void

        /**
         * If set, will share animation with all other diobs with the same sync id. Example: `{'sync': 'water'}`.
         *
         * @env Client | Server
         */
		animator: object

        /**
         * State of the icon.
         *
         * @env Client | Server
         */
		iconState: string

        /**
         * Returns data extracted from the internal rendering sprite of the diob (client-side only).
         *
         * @env Client
         * @param {'url' | 'pixels' | 'canvas'} [pType] - Format to extract: `'url'` for base64 data URL string, `'pixels'` for Uint8ClampedArray / ImageData, `'canvas'` for HTMLCanvasElement. If omitted, returns the internal PIXI sprite reference.
         * @returns {string | ImageData | HTMLCanvasElement | any} Rendered sprite extraction data.
         *
         * @example
         * ```ts
         * const dataUrl = diob.getSpriteData('url') as string;
         * const canvas = diob.getSpriteData('canvas') as HTMLCanvasElement;
         * ```
         */
		getSpriteData(pType?: 'url' | 'pixels' | 'canvas'): string | ImageData | HTMLCanvasElement | any

        /**
         * When this diob and `pD` have overlapping bounding boxes.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pD - Diob that crossed with this diob.
         * @param {boolean | number} [pInit] - If set, `pD` was relocated and initiated the event.
         */
		onCrossed(pD: Diob, pInit?: boolean | number): void

        /**
         * Set the diob's sprite to `pData`.
         *
         * @env Client | Server
         * @param {unknown} pData - Data to set sprite to.
         */
		setSpriteData(pData: unknown): void

        /**
         * When this diob and `pMovable` are crossed and `pMovable` moves.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Diob that moved.
         */
		onCrossMove(pDiob: Diob): void

        /**
         * Removes the mask applied to this diob.
         *
         * @env Client | Server
         */
		removeMask(): void

        /**
         * Position on the x-axis from left to right of the map.
         *
         * @env Client | Server
         */
		xPos: number

        /**
         * When this diob is created.
         *
         * @env Client | Server
         * @event
         */
		onNew(): void

        /**
         * Moves the movable to the position `pX` and `pY` on the map named `pMap`.
         *
         * @env Client | Server
         * @param {number} pX - Value to set the movable's x position on the map to.
         * @param {number} pY - Value to set the movable's y position on the map to.
         * @param {string} [pMap] - (Optional) String containing name of map to set position on.
         */
		setPos(pX: number, pY: number, pMap?: string): void

        /**
         * Returns an array of Diobs currently inside this diob's contents container.
         *
         * @env Client | Server
         * @param {string} [pType] - Optional type name filter (e.g. `'Item'`, `'Mob'`).
         * @param {boolean} [pChild] - If true, includes instances of child/derived types matching `pType`.
         * @returns {Diob[]} Array of child Diob instances.
         *
         * @example
         * ```ts
         * const items: Diob[] = chest.getContents('Item', true);
         * for (const item of items) {
         *     console.log('Item in container:', item.name);
         * }
         * ```
         */
		getContents(pType?: string, pChild?: boolean): Diob[]

        /**
         * Called when the mouse enters this object.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - Client of the mouse.
         * @param {number} pX - The x position of the mouse over the diob.
         * @param {number} pY - The y position of the mouse over the diob.
         */
		onMouseEnter(pClient: Client, pX: number, pY: number): void

        /**
         * Order of display of the diob. Diobs with the same plane appear together with layers determining the order. A diob with a plane of 1 and layer 1000 will appear below a diob with plane 2 (default planes: Diob 0, Movable 1, Particle 2).
         *
         * @env Client | Server
         */
		plane: number

        /**
         * X-axis offset of the icon.
         *
         * @env Client | Server
         */
		xIconOffset: number

        /**
         * Returns an array of filter names.
         *
         * @env Client | Server
         * @returns {string[]} Returns an array of filter names.
         */
		getFilters(): string[]

        /**
         * Name of the map.
         *
         * @env Client | Server
         */
		mapName: string

        /**
         * The current map instance this diob belongs to.
         *
         * @env Client | Server
         */
		map: Map | null

        /**
         * Sets the x and y offsets of the icon.
         *
         * @env Client | Server
         * @param {number} pX - The x offset of the icon of this object.
         * @param {number} pY - The y offset of the icon of this object.
         */
		setIconOffsets(pX: number, pY: number): void

        /**
         * When a movable bumps into this diob.
         *
         * @env Client | Server
         * @event
         * @param {Diob & Movable} pMovable - Movable that did the bumping.
         */
		onBumped(pMovable: Diob & Movable): void

        /**
         * Called when a mouse wheel button is scrolled downward while over this object.
         *
         * @env Client | Server
         * @event
         * @param {Client} pClient - Client of the mouse.
         * @param {number} pX - The x position of the mouse over the diob.
         * @param {number} pY - The y position of the mouse over the diob.
         */
		onMouseWheelScrollDown(pClient: Client, pX: number, pY: number): void

        /**
         * Hex, rgb, rgba, color matrix value, or a tint object. Applies color filter to diob. Example: ( `#000000` ). Example: ( `rgb(10, 20, 30)` ). Example: ( `{'tint': 0x444444}` ).
         *
         * @env Client | Server
         */
		color: string | number[] | {'tint': number}

        /**
         * Name of the highest level parent type.
         *
         * @env Client | Server
         */
		parentType: string

        /**
         * Width of the collision box of the object.
         *
         * @env Client | Server
         */
		width: number

        /**
         * The scale factors `{ x: number, y: number }` applied to the diob's visual rendering.
         *
         * @env Client | Server
         *
         * @example
         * ```ts
         * diob.scale = { x: 2, y: 2 };
         * ```
         */
		scale: { x: number, y: number }

        /**
         * How many pixels object is offset on the grid y-axis from its yCoord.
         *
         * @env Client | Server
         */
		yCoordOffset: number

        /**
         * Position on the x-axis from left to right of the map.
         *
         * @env Client | Server
         */
		xPos: number

        /**
         * Order of display of the diob. Higher layer objects appear above lower layer objects.
         *
         * @env Client | Server
         */
		layer: number

        /**
         * Returns an array of diobs that are overlays of this diob using the provided arguments. If `pType` is not set, all diobs will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs will be returned.
         *
         * @env Client | Server
         * @param {string} [pType] - (Optional) String containing type path to return.
         * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
         * @returns {Diob[]} Returns an array of diobs that are overlays of this diob using the provided arguments. If `pType` is not set, all diobs will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs will be returned.
         */
		getOverlays(pType?: string, pChild?: boolean): Diob[]

        /**
         * Default is `0.5`. Number for both x and y anchors or an object containing both `{'x': 0, 'y': 0}`. Determines where the icon's origin is.
         *
         * @env Client | Server
         */
		anchor: {'x': number, 'y': number}

		/**
		 * Determines if the cursor executes mouse events on this diob or not.
		 *
		 * - `MouseOpacity.Transparent` (`0`): Ignores mouse events (cursor clicks pass through).
		 * - `MouseOpacity.Icon` (`1`): Uses the object's visual icon bounds (`iconWidth` x `iconHeight` + icon offsets) to detect mouse events.
		 * - `MouseOpacity.Bounds` (`2`): Uses the object's physical collision bounding box (`width` x `height` + origins) to detect mouse events.
		 *
		 * @env Client | Server
		 *
		 * @example
		 * ```ts
		 * diob.mouseOpacity = MouseOpacity.Bounds;
		 * ```
		 */
		mouseOpacity: MouseOpacity | 0 | 1 | 2;

		/**
		 * Read-only boolean flag indicating this object is a Diob.
		 *
		 * @env Client | Server
		 */
		readonly isDiob: boolean;

		/**
		 * Indicates whether this diob is functioning as an overlay.
		 * Returns the parent Diob if an overlay of another Diob, or a boolean/null.
		 *
		 * @env Client | Server
		 */
		isOverlay: boolean | Diob | null;

		/**
		 * CLIENT-ONLY. Accesses the underlying PixiJS Sprite instance used to render this diob's icon (`_vy_pixS`).
		 *
		 * @env Client
		 */
		sprite: any;

		/**
		 * CLIENT-ONLY. Accesses the underlying PixiJS Text instance used to render this diob's text label (`_vy_pixT`).
		 *
		 * @env Client
		 */
		textSprite: any;

		/**
		 * Color tint applied to this diob's visual sprite (e.g. `0xFFFFFF` for untinted, or a hexadecimal color number).
		 *
		 * @env Client | Server
		 *
		 * @example
		 * ```ts
		 * diob.tint = 0xff0000; // Red tint
		 * ```
		 */
		tint: number;

		/**
		 * CLIENT-ONLY. Controls whether this diob is subject to screen frustum culling.
		 * When `true` (default), the diob is removed from the active screen display list when outside the viewport.
		 *
		 * @env Client
		 */
		isCullable: boolean;

		/**
		 * Controls whether this diob is exempt from spatial interest grid tracking and culling on the server.
		 *
		 * @env Server
		 */
		preventInterest?: boolean;

		/**
		 * Calculates the screen viewport position of this diob in pixels.
		 *
		 * @env Client
		 * @param {Partial<Point2D>} [pO] - Optional point object to populate with `x` and `y`.
		 * @returns {Point2D} The screen coordinates `{ x, y }` in viewport pixels.
		 *
		 * @example
		 * ```ts
		 * const screenPos = diob.getScreenPos();
		 * console.log(`Diob screen position: (${screenPos.x}, ${screenPos.y})`);
		 * ```
		 */
		getScreenPos(pO?: Partial<Point2D>): Point2D;

		/**
		 * Called when a touch point is placed over this diob.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - The client initiating the touch.
		 * @param {number} pX - Horizontal coordinate of the touch relative to the diob.
		 * @param {number} pY - Vertical coordinate of the touch relative to the diob.
		 * @param {TouchEvent} [pEvent] - (Optional) The native browser TouchEvent.
		 */
		onTouchStart?(pClient: Client, pX: number, pY: number, pEvent?: TouchEvent): void;

		/**
		 * Called when a touch point is removed from over this diob.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - The client whose touch was lifted.
		 * @param {number} pX - Horizontal coordinate of the touch relative to the diob.
		 * @param {number} pY - Vertical coordinate of the touch relative to the diob.
		 * @param {boolean} [pCancel] - (Optional) Whether the touch was cancelled.
		 * @param {TouchEvent} [pEvent] - (Optional) The native browser TouchEvent.
		 */
		onTouchEnd?(pClient: Client, pX: number, pY: number, pCancel?: boolean, pEvent?: TouchEvent): void;

		/**
		 * Called when a touch point moves over this diob.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - The client whose touch moved.
		 * @param {number} pX - Horizontal coordinate of the touch relative to the diob.
		 * @param {number} pY - Vertical coordinate of the touch relative to the diob.
		 * @param {TouchEvent} [pEvent] - (Optional) The native browser TouchEvent.
		 */
		onTouchMove?(pClient: Client, pX: number, pY: number, pEvent?: TouchEvent): void;

		/**
		 * Called when this diob is attached as an overlay to another diob or client.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Diob} pParent - The parent diob or client that this diob was attached to.
		 */
		onOverlayed?(pParent: Diob): void;

		/**
		 * Called when this diob is removed as an overlay from its parent.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Diob} pParent - The parent diob or client that this diob was removed from.
		 */
		onUnoverlayed?(pParent: Diob): void;

		/**
		 * CLIENT-ONLY. Called when this diob's state is synchronized from the server to the client.
		 *
		 * @env Client
		 * @event
		 * @param {Client} pClient - The local client instance.
		 */
		onClientSync?(pClient: Client): void;

		[key: string]: any

	}



	/**
	 * MapObject represents a spatial display object situated directly on a map grid, extending Diob.
	 */
	interface MapObject extends Diob {

		/**
		 * Read-only boolean flag indicating this is a MapObject.
		 *
		 * @env Client | Server
		 */
		readonly isMapObject: boolean;

		/**
		 * When `true`, prevents the MapObject from automatically being added to the screen display list.
		 *
		 * @env Client | Server
		 */
		preventAutoDisplay: boolean;

		/**
		 * Calculates Euclidean distance in pixels between the top-left position of this object and `pD`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pD - The target MapObject.
		 * @returns {number} The distance in pixels.
		 */
		getDistFrom(pD: MapObject): number;

		/**
		 * Calculates Euclidean distance in pixels between the bounding box centers of this object and `pD`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pD - The target MapObject.
		 * @returns {number} The center-to-center distance in pixels.
		 */
		getDistCenterFrom(pD: MapObject): number;

		/**
		 * Calculates Euclidean distance in pixels between the closest bounding edges of this object and `pD`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pD - The target MapObject.
		 * @returns {number} The edge-to-edge distance in pixels.
		 */
		getDistEdgeFrom(pD: MapObject): number;

		/**
		 * Calculates the compass direction string from this object's top-left position towards `pD`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pD - Target MapObject.
		 * @param {boolean} [pCard] - If `true`, constrains return to standard cardinal directions.
		 * @returns {Direction | string} Direction string.
		 */
		getDirFrom(pD: MapObject, pCard?: boolean): Direction | string;

		/**
		 * Calculates the compass direction string from this object's bounding center towards `pD`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pD - Target MapObject.
		 * @param {boolean} [pCard] - If `true`, constrains return to standard cardinal directions.
		 * @returns {Direction | string} Direction string.
		 */
		getDirCenterFrom(pD: MapObject, pCard?: boolean): Direction | string;

		/**
		 * Calculates the angle in radians from this object's top-left position towards `pD`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pD - Target MapObject.
		 * @returns {number} Angle in radians.
		 */
		getAngleFrom(pD: MapObject): number;

		/**
		 * Calculates the angle in radians from this object's bounding center towards `pD`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pD - Target MapObject.
		 * @returns {number} Angle in radians.
		 */
		getAngleCenterFrom(pD: MapObject): number;

		/**
		 * Checks whether this MapObject's bounding box intersects with `pO`.
		 *
		 * @env Client | Server
		 * @param {MapObject} pO - Object to test intersection with.
		 * @returns {boolean} `true` if bounding boxes overlap; otherwise `false`.
		 */
		checkIntersectWith(pO: MapObject): boolean;

		/**
		 * Checks whether this MapObject would collide with dense tiles or dense objects at the specified rectangle.
		 *
		 * @env Client | Server
		 * @param {number} [pX] - Test horizontal position in map pixels (defaults to current x).
		 * @param {number} [pY] - Test vertical position in map pixels (defaults to current y).
		 * @param {number} [pW] - Test width (defaults to current width).
		 * @param {number} [pH] - Test height (defaults to current height).
		 * @returns {Tile | Diob | null} The obstacle encountered, or `null` if clear.
		 */
		checkCollideAt(pX?: number, pY?: number, pW?: number, pH?: number): Tile | Diob | null;

		[key: string]: any;

	}



	/** The movable object. */
	type Movable = {

		/**
		 * Moves movable in the direction of `pDir` using movable's stepSize until told to stop. Takes density into consideration. You can stop movement by calling a different movement function or calling this function with no or `null` arguments.
		 *
		 * @env Client | Server
		 * @param {Direction | string} [pDir] - Direction to move movable in.
		 */
		moveDir(pDir?: Direction | string): void

        /**
         * Moves the movable by `pX` x pixels and `pY` y pixels until told to stop. Takes obstacles into consideration. You can stop movement by calling a different movement function or calling this function with no or `null` arguments.
         *
         * @env Client | Server
         * @param {number} pX - X value to step by.
         * @param {number} pY - Y value to step by.
         */
		movePos(pX: number, pY: number): void

        /**
         * True if moving using the built-in movement.
         *
         * @env Client | Server
         */
		isMoving: boolean

        /**
         * Steps the movable by `pX` x pixels and `pY` y pixels. Takes obstacles into consideration. Returns `true` or `false` depending on if the step was successful.
         *
         * @env Client | Server
         * @param {number} pX - X value to step by.
         * @param {number} pY - Y value to step by.
         * @param {boolean} pGlide - If set, movement will not stop unless move directions are blocked.
         * @param {boolean} pSlide - If set, the step will occur without changing the movable's direction.
         * @returns {void} Returns `true` or `false` depending on if the step was successful.
         */
		stepPos(pX: number, pY: number, pGlide: boolean, pSlide: boolean): void

        /**
         * Movement settings configuration controlling step size, gliding, sliding, cardinal locking, and step frequency.
         *
         * @env Client | Server
         *
         * @example
         * ```ts
         * movable.moveSettings = {
         *     stepSize: 4,
         *     stepGlide: true,
         *     stepTick: 16.6667
         * };
         * ```
         */
		moveSettings: MoveSettingsConfig

        /**
         * Moves movable `pSize` pixels in the direction of `pDir`. If `pSize` is not set, the size is the movable's stepSize. Takes obstacles into consideration. Returns `true` or `false` depending on if the step was successful.
         *
         * @env Client | Server
         * @param {Direction | string} pDir - Direction to move movable in.
         * @param {number} [pSize] - (Optional) Size of step to take.
         * @param {boolean} [pSlide] - (Optional) If set, the step will occur without changing the movable's direction.
         * @returns {void} Returns `true` or `false` depending on if the step was successful.
         */
		stepDir(pDir: Direction | string, pSize?: number, pSlide?: boolean): void

        /**
         * Calls either movable.stepPos or movable.stepDir depending on the specified arguments. If `pArg1` is a number, movable.stepPos will be called, otherwise movable.stepDir will be called. Returns `true` or `false` depending on if the step was successful.
         *
         * @env Client | Server
         * @returns {void} Returns `true` or `false` depending on if the step was successful.
         */
		step(): void

        /**
         * Calls either movable.movePos or movable.moveDir depending on the specified arguments. If `pArg1` is a number, movable.movePos will be called, otherwise movable.moveDir will be called. This moves the movable until told to stop. You can stop movement by calling a different movement function or calling this function with no or `null` arguments.
         *
         * @env Client | Server
         */
		move(): void

		/**
		 * Read-only boolean flag indicating this object is a Movable.
		 *
		 * @env Client | Server
		 */
		readonly isMovable: boolean;

		/**
		 * The default step distance in pixels moved per step when moving in a direction.
		 *
		 * @env Client | Server
		 */
		stepSize: number;

		/**
         * Current facing or movement direction of the movable (`'north'`, `'south'`, `'east'`, `'west'`, `'northwest'`, `'northeast'`, `'southwest'`, `'southeast'`).
         *
         * @env Client | Server
         *
         * @example
         * ```ts
         * if (movable.dir === 'north') {
         *     // Facing north
         * }
         * ```
         */
		dir: Direction
		[key: string]: any

	}



	/** The particle object. */
	type Particle = {

		/**
		 * If set, the client will not update the draw layer of this diob when it changes location on the screen.
		 *
		 * @env Client
		 */
		preventScreenRelayer: boolean

		/**
		 * Read-only boolean flag indicating this object is a Particle.
		 *
		 * @env Client | Server
		 */
		readonly isParticle: boolean;
		[key: string]: any

	}



	/** The tile object. */
	type Tile = {

		/**
		 * When an object exits the contents of another object.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - Object that exited.
		 */
		onExited(pDiob: Diob): void

        /**
         * Called before the diob enters the tile. Returning `false` will prevent the diob from entering.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Diob trying to enter this tile.
         * @param {string} pDir - Direction of movement diob is attempting to make to enter the tile.
         */
		onEnter(pDiob: Diob, pDir: string): void

        /**
         * When an object enters the contents of another object.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Object that entered.
         */
		onEntered(pDiob: Diob): void

        /**
         * Called before the diob exits the tile. Returning `false` will prevent the diob from exiting.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Diob trying to exit this tile.
         * @param {string} pDir - Direction of movement diob is attempting to make to exit the tile.
         */
		onExit(pDiob: Diob, pDir: string): void

		/**
		 * Determines if the cursor executes mouse events on this tile or not.
		 *
		 * - `MouseOpacity.Transparent` (`0`): Ignores mouse events (default for tiles).
		 * - `MouseOpacity.Icon` (`1`): Uses tile icon bounds.
		 * - `MouseOpacity.Bounds` (`2`): Uses tile bounds.
		 *
		 * @env Client | Server
		 */
		mouseOpacity?: MouseOpacity | 0 | 1 | 2;

		/**
		 * Read-only boolean flag indicating this object is a Tile.
		 *
		 * @env Client | Server
		 */
		readonly isTile: boolean;

		/**
		 * Returns the neighbor Tile located in the compass direction `pDir` from this tile on the same map.
		 *
		 * @env Client | Server
		 * @param {Direction | string} pDir - Compass direction (e.g. `'north'`, `'east'`, `'southwest'`).
		 * @returns {Tile | null} The adjacent tile in that direction, or the engine void tile / null if out of bounds.
		 *
		 * @example
		 * ```ts
		 * const northTile = tile.getTileByDir('north');
		 * ```
		 */
		getTileByDir(pDir: Direction | string): Tile | null;

		[key: string]: any

	}



	/** The region object. */
	type Region = {

		/**
		 * Read-only boolean flag indicating this object is a Region.
		 *
		 * @env Client | Server
		 */
		readonly isRegion: boolean;

		/**
		 * When an object exits the contents of another object.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - Object that exited.
		 */
		onExited(pDiob: Diob): void

        /**
         * When an object enters the contents of another object.
         *
         * @env Client | Server
         * @event
         * @param {Diob} pDiob - Object that entered.
         */
		onEntered(pDiob: Diob): void
		[key: string]: any

	}



	/** The mob object. */
	interface Mob {

		/**
		 * Read-only boolean flag indicating this object is a Mob.
		 *
		 * @env Client | Server
		 */
		readonly isMob: boolean;

		/**
		 * A reference to the client of this mob.
		 *
		 * @env Client | Server
		 */
		client: Client

        /**
         * When a client no longer has control of a mob.
         *
         * @env Client | Server
         * @event
         */
		onLogout(): void

        /**
         * When a client has taken control of the mob.
         *
         * @env Client | Server
         * @event
         */
		onLogin(): void
		[key: string]: any

	}



	/** The overlay object. */
	type Overlay = {

		/**
		 * Reference to the parent Diob that this overlay is attached to (`_vy_parent`).
		 *
		 * @env Client | Server
		 */
		parent: Diob;

		/**
		 * If `true`, this overlay will appear directly above the parent and use the same appearance properties as the parent, such as angle and alpha. The overlay will basically be an extension of the parent's icon. Instead of `true` this can be an object containing information on the appearMask, `shareIcon` to have the overlay share the same iconName as the parent, `isUnder` to make the overlay appear under the parent instead of above, and `ownMod` to let the overlay use its own alpha, angle, scale, transform, and composite variables, `ownState` to have this overlay not sync up with the parent's iconState. Example: `{'shareIcon': `true`, 'isUnder': `true`}`.
		 *
		 * @env Client | Server
		 */
		appearMask: AppearMask
		[key: string]: any

	}



	/** The sound object. */
	type Sound = {

		/**
		 * Number of seconds that have been played into the sound.
		 *
		 * @env Client | Server
		 */
		currentTime: number

        /**
         * Fades the sound's volume in or out from the current volume to `pVol` over `pDur` seconds.
         *
         * @env Client | Server
         * @param {number} pVol - Number between 0 and 100.
         * @param {number} pDur - Number of seconds.
         */
		fade(pVol: number, pDur: number): void

        /**
         * If `true`, the sound has been manually stopped.
         *
         * @env Client | Server
         */
		isStopped: boolean

        /**
         * Resume the sound.
         *
         * @env Client | Server
         */
		resume(): void

        /**
         * Sets the volume of this Sound.
         *
         * @env Client | Server
         * @param {number} pVol - Number between 0 and 100.
         */
		setVolume(pVol: number): void

        /**
         * Stop the sound.
         *
         * @env Client | Server
         */
		stop(): void

        /**
         * Called when the sound finishes playing.
         *
         * @env Client | Server
         * @event
         */
		onEnded(): void

        /**
         * Number of seconds to play the sound for up to the sound file duration.
         *
         * @env Client | Server
         */
		duration: number

        /**
         * Called when the sound starts to playing for the first time.
         *
         * @env Client | Server
         * @event
         */
		onStarted(): void

        /**
         * Returns an ArrayBuffer containing the raw sound data. SoundName must already be loaded before calling this.
         *
         * @env Client | Server
         * @returns {ArrayBuffer} Returns an ArrayBuffer containing the raw sound data. SoundName must already be loaded before calling this.
         */
		getRawData(): ArrayBuffer

        /**
         * Called when the sound is manually resumed.
         *
         * @env Client | Server
         * @event
         */
		onResumed(): void

        /**
         * Returns an AudioBuffer containing the useful data on the sound's buffer. The sound must already be loaded and playing.
         *
         * @env Client | Server
         * @returns {AudioBuffer} Returns an AudioBuffer containing the useful data on the sound's buffer. The sound must already be loaded and playing.
         */
		getBuffer(): AudioBuffer

        /**
         * Name of the sound file associated with this sound object.
         *
         * @env Client | Server
         */
		soundName: string

        /**
         * Number of seconds to start playing the sound at.
         *
         * @env Client | Server
         */
		startTime: number

        /**
         * Turns looping on or off. If `pLoop` is not set, loop will be toggled.
         *
         * @env Client | Server
         * @param {boolean} [pLoop] - (Optional) True to loop, `false` to stop loop.
         */
		setLoop(pLoop?: boolean): void

        /**
         * Number between 0 and 100. Volume of this sound object. Default is `100`.
         *
         * @env Client | Server
         */
		volume: number

        /**
         * Returns an AudioContext containing the useful data on the sound's context. The sound must already be loaded and playing.
         *
         * @env Client | Server
         * @returns {AudioContext} Returns an AudioContext containing the useful data on the sound's context. The sound must already be loaded and playing.
         */
		getContext(): AudioContext

        /**
         * Called when the sound is manually stopped.
         *
         * @env Client | Server
         * @event
         */
		onStopped(): void

        /**
         * If `true` sound loops. If `false` sound plays once.
         *
         * @env Client | Server
         */
		loop: boolean

		/**
		 * Read-only flag confirming this object is a Sound instance.
		 *
		 * @env Client | Server
		 */
		readonly isSound?: boolean

		/**
		 * Playback rate factor for the sound (e.g. `1.0` for normal speed, `0.5` for half-speed, `2.0` for double speed).
		 *
		 * @env Client | Server
		 */
		playbackRate?: number

		/**
		 * Sets the playback speed rate of this sound.
		 *
		 * @env Client | Server
		 * @param {number} pVal - Playback rate multiplier (e.g. `1` is default speed).
		 */
		setPlaybackRate(pVal: number): void

		/**
		 * Returns the native Web Audio API `AudioBufferSourceNode` source for this sound.
		 *
		 * @env Client | Server
		 * @returns {AudioBufferSourceNode | any} The active audio source node.
		 */
		getSource(): AudioBufferSourceNode | any

		/**
		 * Returns the spatial audio `PannerNode` for this sound, creating one if it doesn't already exist.
		 *
		 * @env Client | Server
		 * @returns {PannerNode | any} The audio panner node.
		 */
		getPanner(): PannerNode | any

		/**
		 * Registers a new sound buffer into the engine resources.
		 *
		 * @env Client | Server
		 * @param {string} pName - Sound identifier name.
		 * @param {string | ArrayBuffer} pData - Sound data or base64 data URL.
		 * @param {string} [pDataType] - Optional data type (e.g. `'url'`).
		 */
		newSound?(pName: string, pData: string | ArrayBuffer, pDataType?: string): void

	}



	/** The interface object. */
	type Interface = {

		/**
		 * Shows the interface element.
		 *
		 * @env Client | Server
		 */
		show(): void

        /**
         * Default is `false`. If set this interface will not scale or move when the window changes size.
         *
         * @env Client | Server
         */
		preventAutoScale: boolean

        /**
         * Returns the name of the interface the interface object is part of.
         *
         * @env Client | Server
         * @returns {string} Returns the name of the interface the interface object is part of.
         */
		getInterfaceName(): string

        /**
         * A JSON object containing typography, formatting, bitmap fonts, and layout styles for this interface element's text.
         *
         * @env Client | Server
         *
         * @example
         * ```ts
         * elem.textStyle = {
         *     padding: 0,
         *     fill: '#000000',
         *     leading: 0,
         *     align: 'center'
         * };
         * ```
         */
		textStyle: InterfaceTextStyle

        /**
         * Executes any default commands or custom executed event of object.
         *
         * @env Client | Server
         * @param {Client} pClient - Client to execute with.
         */
		execute(pClient: Client): void

        /**
         * Returns an object `{'x': x,'y': y}` containing the x and y positions of the interface element on the screen.
         *
         * @env Client | Server
         * @returns {{'x': number,'y': number} } returns an object `{'x': x,'y': y}` containing the x and y positions of the interface element on the screen.
         */
		getPos(): {'x': number,'y': number}

        /**
         * String containing composite value that determines how this diob is drawn with other diobs on the same plane. Possible values: source-over, source-atop, source-in, source-out, destination-over, destination-atop, destination-in, destination-out, lighter, copy, xor, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity.
         *
         * @env Client | Server
         */
		composite: 'source-over' | 'source-atop' | 'source-in' | 'source-out' | 'destination-over' | 'destination-atop' | 'destination-in' | 'destination-out' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'

        /**
         * Returns the client this interface element belongs to, if there is one.
         *
         * @env Client | Server
         * @returns {void} Returns the client this interface element belongs to, if there is one.
         */
		getClient(): void

        /**
         * Position on the y-axis from top to bottom of the interface element on the screen.
         *
         * @env Client | Server
         */
		yPos: number

        /**
         * Locks the interface element to an edge of the screen. Only works if preventAutoScale is enabled. Possible values: `'top'`, `'top-left'`, `'top-right'`, `'right'`, `'left'`, `'bottom'`, `'bottom-right'`, `'bottom-left'`.
         *
         * @env Client | Server
         */
		edgeLock: EdgeLock

        /**
         * Type of interface. TextBox/CommandInput/TextInput/PassInput/WebBox/TextArea/Default.
         *
         * @env Client | Server
         */
		interfaceType: string

        /**
         * Moves the interface element to the specified screen location.
         *
         * @env Client | Server
         * @param {number} pX - Position on the x-axis of the screen. From left to right.
         * @param {number} pY - Position on the y-axis of the screen. From top to bottom.
         */
		setPos(pX: number, pY: number): void

        /**
         * True if the interface is hidden. False otherwise.
         *
         * @env Client | Server
         */
		isHidden: boolean

        /**
         * Returns the DOM HTMLElement associated with this interface/webbox element, if running in browser/client.
         * Access `innerBox` on the returned element for the child container holding text content.
         *
         * @env Client | Server
         * @returns {HTMLElement | undefined} The underlying DOM element, or undefined on the server.
         *
         * @example
         * ```ts
         * const element = interfaceBox.getDOM();
         * if (element) {
         *     element.style.borderRadius = '8px';
         * }
         * ```
         */
		getDOM(): HTMLElement | undefined

        /**
         * Hides the interface element.
         *
         * @env Client | Server
         */
		hide(): void

        /**
         * Position on the x-axis from left to right of the interface element on the screen.
         *
         * @env Client | Server
         */
		xPos: number

		/**
		 * Read-only boolean flag indicating this is an Interface element.
		 *
		 * @env Client | Server
		 */
		readonly isInterface: boolean;

		/**
		 * Reference to the Client instance that owns this interface element.
		 *
		 * @env Client | Server
		 */
		client: Client;

		/**
		 * The InterfacePane instance that contains this interface element.
		 *
		 * @env Client | Server
		 */
		pane: InterfacePane;

		/**
		 * Called when this interface element is moved or reassigned to a different interface pane.
		 *
		 * @env Client | Server
		 * @event
		 * @param {InterfacePane} pOldPane - The previous interface pane.
		 */
		onPaneChange?(pOldPane: InterfacePane): void;

		/**
		 * Determines if the cursor executes mouse events on this interface element.
		 *
		 * - `MouseOpacity.Transparent` (`0`): Ignores mouse events.
		 * - `MouseOpacity.Icon` (`1`): Uses icon bounds.
		 * - `MouseOpacity.Bounds` (`2`): Uses element size bounds.
		 *
		 * @env Client | Server
		 */
		mouseOpacity?: MouseOpacity | 0 | 1 | 2;
		[key: string]: any

	}



	/**
	 * Represents a named container of interface elements belonging to a client.
	 */
	interface InterfacePane {

		/**
		 * Read-only boolean flag indicating this is an InterfacePane.
		 *
		 * @env Client | Server
		 */
		readonly isInterfacePane: boolean;

		/**
		 * The identifier name of this interface pane.
		 *
		 * @env Client | Server
		 */
		name: string;

		/**
		 * The client that owns this interface pane.
		 *
		 * @env Client | Server
		 */
		readonly client: Client;

		/**
		 * Transparency alpha level of all elements in this pane (0.0 to 1.0).
		 *
		 * @env Client | Server
		 */
		alpha: number;

		/**
		 * Whether this interface pane is currently shown/visible.
		 * Setting to `true` shows the pane; setting to `false` hides it.
		 *
		 * @env Client | Server
		 */
		isShown: boolean;

		/**
		 * Shows the interface pane and its contained elements, or a specific child element `pEl`.
		 *
		 * @env Client | Server
		 * @param {string | Diob} [pEl] - Optional specific child element name or instance to show.
		 * @param {boolean} [pForce] - If `true`, forces hidden elements to be shown.
		 */
		show(pEl?: string | Diob, pForce?: boolean): void;

		/**
		 * Hides the interface pane or a specific child element `pEl`.
		 *
		 * @env Client | Server
		 * @param {string | Diob} [pEl] - Optional specific child element name or instance to hide.
		 */
		hide(pEl?: string | Diob): void;

		/**
		 * Adds an interface child element `pEl` to this pane.
		 *
		 * @env Client | Server
		 * @param {any} pEl - Element instance to add.
		 * @returns {any} The added element.
		 */
		addChild(pEl: any): any;

		/**
		 * Removes a child element `pEl` from this pane.
		 *
		 * @env Client | Server
		 * @param {any} pEl - Child element to remove.
		 * @param {boolean} [pSave] - If `true`, avoids deleting the element from the engine.
		 */
		removeChild(pEl: any, pSave?: boolean): void;

		/**
		 * Retrieves the child element with the specified name `pName`.
		 *
		 * @env Client | Server
		 * @param {string} pName - Name of the child element.
		 * @returns {any} The child element.
		 */
		getChild(pName: string): any;

		/**
		 * Returns an array of child elements within this pane matching the specified criteria.
		 *
		 * @env Client | Server
		 * @param {string} [pType] - Optional type filter.
		 * @param {boolean} [pChild] - If `true`, includes child types.
		 * @returns {any[]} Array of child elements.
		 */
		getChildren(pType?: string, pChild?: boolean): any[];

		/**
		 * Called when this interface pane is shown to a client.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - The client shown to.
		 */
		onShow?(pClient: Client): void;

		/**
		 * Called when this interface pane is hidden from a client.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - The client hidden from.
		 */
		onHide?(pClient: Client): void;

		/**
		 * Called when a child element is added to this pane.
		 *
		 * @env Client | Server
		 * @event
		 * @param {any} pChild - The child element added.
		 */
		onAddChild?(pChild: any): void;

		/**
		 * Called when a child element is removed from this pane.
		 *
		 * @env Client | Server
		 * @event
		 * @param {any} pChild - The child element removed.
		 */
		onRemoveChild?(pChild: any): void;

		[key: string]: any;

	}

	/** WebBox padding style descriptor. */
	interface WebBoxPaddingStyle {
		top?: string | number;
		right?: string | number;
		bottom?: string | number;
		left?: string | number;
		[key: string]: any;
	}

	/** WebBox margin style descriptor. */
	interface WebBoxMarginStyle {
		top?: string | number;
		right?: string | number;
		bottom?: string | number;
		left?: string | number;
		[key: string]: any;
	}

	/** WebBox overflow style descriptor. */
	interface WebBoxOverflowStyle {
		x?: string;
		y?: string;
		[key: string]: any;
	}

	/** WebBox background style descriptor. */
	interface WebBoxBackgroundStyle {
		color?: string;
		image?: string;
		repeat?: string;
		position?: string;
		size?: string;
		attachment?: string;
		clip?: string;
		origin?: string;
		[key: string]: any;
	}

	/** WebBox border style descriptor. */
	interface WebBoxBorderStyle {
		width?: string | number;
		style?: string;
		color?: string;
		radius?: string | number;
		top?: string | number;
		right?: string | number;
		bottom?: string | number;
		left?: string | number;
		topColor?: string;
		rightColor?: string;
		bottomColor?: string;
		leftColor?: string;
		topStyle?: string;
		rightStyle?: string;
		bottomStyle?: string;
		leftStyle?: string;
		topWidth?: string | number;
		rightWidth?: string | number;
		bottomWidth?: string | number;
		leftWidth?: string | number;
		topLeftRadius?: string | number;
		topRightRadius?: string | number;
		bottomLeftRadius?: string | number;
		bottomRightRadius?: string | number;
		collapse?: string;
		spacing?: string | number;
		[key: string]: any;
	}

	/** WebBox outline style descriptor. */
	interface WebBoxOutlineStyle {
		color?: string;
		offset?: string | number;
		style?: string;
		width?: string | number;
		[key: string]: any;
	}

	/** WebBox text style descriptor. */
	interface WebBoxTextStyle {
		color?: string;
		fontFamily?: string;
		fontSize?: string | number;
		fontStyle?: string;
		fontWeight?: string | number;
		letterSpacing?: string | number;
		lineHeight?: string | number;
		textAlign?: string;
		textDecoration?: string;
		textIndent?: string | number;
		textOverflow?: string;
		textShadow?: string;
		textTransform?: string;
		whiteSpace?: string;
		wordBreak?: string;
		wordSpacing?: string | number;
		wordWrap?: string;
		[key: string]: any;
	}

	/**
	 * Represents an HTML DOM-backed interface element, extending Interface.
	 */
	interface WebBox extends Interface {

		/**
		 * Read-only boolean flag indicating this is a WebBox.
		 *
		 * @env Client | Server
		 */
		readonly isWebBox: boolean;

		/**
		 * The underlying HTML DOM element (`_vy_dom`).
		 *
		 * @env Client
		 */
		readonly dom: HTMLElement;

		/**
		 * The DOM element's `id` attribute.
		 *
		 * @env Client | Server
		 */
		domID: string;

		/**
		 * CSSStyleDeclaration of the underlying DOM element.
		 *
		 * @env Client
		 */
		style: CSSStyleDeclaration | Record<string, any>;

		/**
		 * CSS `display` style property.
		 *
		 * @env Client | Server
		 */
		display: string;

		/**
		 * CSS `box-shadow` style property.
		 *
		 * @env Client | Server
		 */
		boxShadow: string;

		/**
		 * CSS `box-sizing` style property.
		 *
		 * @env Client | Server
		 */
		boxSizing: string;

		/**
		 * CSS `clip-path` style property.
		 *
		 * @env Client | Server
		 */
		clip: string;

		/**
		 * CSS `cursor` style property.
		 *
		 * @env Client | Server
		 */
		cursor: string;

		/**
		 * CSS `pointer-events` style property.
		 *
		 * @env Client | Server
		 */
		pointerEvents: string;

		/**
		 * Maximum height constraint.
		 *
		 * @env Client | Server
		 */
		maxHeight: string | number;

		/**
		 * Minimum height constraint.
		 *
		 * @env Client | Server
		 */
		minHeight: string | number;

		/**
		 * Maximum width constraint.
		 *
		 * @env Client | Server
		 */
		maxWidth: string | number;

		/**
		 * Minimum width constraint.
		 *
		 * @env Client | Server
		 */
		minWidth: string | number;

		/**
		 * Padding style helper or CSS string.
		 *
		 * @env Client | Server
		 */
		padding: WebBoxPaddingStyle | string;

		/**
		 * Margin style helper or CSS string.
		 *
		 * @env Client | Server
		 */
		margin: WebBoxMarginStyle | string;

		/**
		 * Overflow style helper or CSS string.
		 *
		 * @env Client | Server
		 */
		overflow: WebBoxOverflowStyle | string;

		/**
		 * CSS `float` style property.
		 *
		 * @env Client | Server
		 */
		float: string;

		/**
		 * CSS `transform` style property.
		 *
		 * @env Client | Server
		 */
		transform: string;

		/**
		 * CSS `composite` style property.
		 *
		 * @env Client | Server
		 */
		composite: any;

		/**
		 * Background style helper or CSS color string.
		 *
		 * @env Client | Server
		 */
		background: WebBoxBackgroundStyle | string;

		/**
		 * Border style helper or CSS border string.
		 *
		 * @env Client | Server
		 */
		border: WebBoxBorderStyle | string;

		/**
		 * Outline style helper or CSS outline string.
		 *
		 * @env Client | Server
		 */
		outline: WebBoxOutlineStyle | string;

		/**
		 * CSS `accent-color` style property.
		 *
		 * @env Client | Server
		 */
		accentColor: string;

		/**
		 * Typography and text styling options.
		 *
		 * @env Client | Server
		 */
		textStyle: WebBoxTextStyle | any;

		/**
		 * CSS class name or array of class names applied to this element.
		 *
		 * @env Client | Server
		 */
		styleClass: string | string[];

		/**
		 * Adds a CSS class name to this element.
		 *
		 * @env Client | Server
		 * @param {string} pClass - CSS class name.
		 */
		addStyleClass(pClass: string): void;

		/**
		 * Removes a CSS class name from this element.
		 *
		 * @env Client | Server
		 * @param {string} pClass - CSS class name.
		 */
		removeStyleClass(pClass: string): void;

		/**
		 * Parent WebBox containing this element, if nested.
		 *
		 * @env Client | Server
		 */
		parent: WebBox | null;

		/**
		 * Top-most ancestor WebBox in the hierarchy.
		 *
		 * @env Client | Server
		 */
		readonly highestParent: WebBox | null;

		/**
		 * Array of child WebBox elements contained within this element.
		 *
		 * @env Client | Server
		 */
		readonly children: WebBox[];

		/**
		 * Adds a child WebBox element to this element.
		 *
		 * @env Client | Server
		 * @param {WebBox} pEl - WebBox to add.
		 * @returns {WebBox} The added WebBox.
		 */
		addChild(pEl: WebBox): WebBox;

		/**
		 * Removes a child WebBox from this element.
		 *
		 * @env Client | Server
		 * @param {WebBox} pEl - WebBox to remove.
		 */
		removeChild(pEl: WebBox): void;

		/**
		 * Removes child WebBox elements across an index range.
		 *
		 * @env Client | Server
		 * @param {number} pStart - Start index.
		 * @param {number} [pEnd] - End index.
		 */
		removeChildAt(pStart: number, pEnd?: number): void;

		/**
		 * Returns child WebBox elements matching the specified type.
		 *
		 * @env Client | Server
		 * @param {string} [pType] - Type filter.
		 * @param {boolean} [pChild] - Include child types.
		 * @returns {WebBox[]} Child elements.
		 */
		getChildren(pType?: string, pChild?: boolean): WebBox[];

		/**
		 * Configures whether this WebBox can be interactively resized by the user.
		 *
		 * @env Client
		 */
		isResizable: boolean | 'both' | 'horizontal' | 'vertical';

		/**
		 * Configures whether this WebBox can be dragged across the screen.
		 *
		 * @env Client
		 */
		isDraggable: boolean;

		[key: string]: any;

	}

	/**
	 * Represents an interactive text input interface element (single-line or multiline), extending WebBox.
	 */
	interface TextInput extends WebBox {

		/**
		 * Read-only boolean flag indicating this is a TextInput.
		 *
		 * @env Client | Server
		 */
		readonly isTextInput: boolean;

		/**
		 * When `true`, uses a multiline `<textarea>` element rather than a single-line input.
		 *
		 * @env Client | Server
		 */
		isMultiline: boolean;

		/**
		 * When `true`, masks characters entered for password privacy (`type="password"`).
		 *
		 * @env Client | Server
		 */
		isPasswordInput: boolean;

		/**
		 * When `true`, configures the input as a command-line input.
		 *
		 * @env Client | Server
		 */
		isCommandInput: boolean;

		/**
		 * Maximum character length allowed in the input field.
		 *
		 * @env Client | Server
		 */
		maxLength: number;

		/**
		 * Placeholder text displayed when the input field is empty.
		 *
		 * @env Client | Server
		 */
		placeholder: string;

		/**
		 * HTML `tabIndex` attribute controlling keyboard focus navigation order.
		 *
		 * @env Client | Server
		 */
		tabIndex: number;

		/**
		 * Called when the input text is modified by the user.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - The client that typed into the input.
		 */
		onInput?(pClient: Client): void;

		[key: string]: any;

	}



	/** The client object. */
	interface Client {

		/**
		 * Stores `pData` as a string locally on the client's computer and can be referenced using `pKey`. Leaving `pKey` and `pData` blank will clear all local storage; 3000 characters are allowed to be saved per game (keys and values combined).
		 *
		 * @env Client | Server
		 * @param {string} pKey - Key used to reference the stored data.
		 * @param {string} pData - Data as a string to store locally for the client.
		 */
		setLocalStorage(pKey?: string, pData?: string): void

		/**
		 * Checks whether `window.localStorage` is supported, enabled, and functioning on the client's browser.
		 *
		 * Tests accessibility by attempting to write and remove a temporary test key.
		 *
		 * @env Client
		 * @returns {boolean} `true` if local storage is available and functional; otherwise `false`.
		 *
		 * @example
		 * ```ts
		 * if (VYLO.Client.checkLocalStorage()) {
		 *     VYLO.Client.setLocalStorage('savedLevel', '5');
		 * }
		 * ```
		 */
		checkLocalStorage(): boolean;

        /**
         * Returns an object `{'x': x, 'y': y}` containing the x and y position on the map that currently matches the `pX` and `pY` position on the screen.
         *
         * @env Client | Server
         * @param {number} pX - X position on the screen.
         * @param {number} pY - Y position on the screen.
         * @param {object} [pO] - (Optional) An existing object to set the x and y of.
         * @returns {{'x': number, 'y': number} } returns an object `{'x': x, 'y': y}` containing the x and y position on the map that currently matches the `pX` and `pY` position on the screen.
         */
		getPosFromScreen(pX: number, pY: number, pO?: object): {'x': number, 'y': number}

        /**
         * Returns the interface element object of the specified interface.
         *
         * @env Client | Server
         * @param {string} pInterface - Name of the interface to get element from.
         * @param {Diob} pElement - Name of the element to get.
         * @returns {Diob} Returns the interface element object of the specified interface.
         */
		getInterfaceElement(pInterface: string, pElement: Diob): Diob

		/**
		 * Returns the interface pane instance with the specified name `pPane`.
		 *
		 * @env Client
		 * @param {string} pPane - The identifier name of the interface pane to retrieve.
		 * @returns {InterfacePane} The interface pane instance, or `undefined` if not found.
		 *
		 * @example
		 * ```ts
		 * const chatPane = VYLO.Client.getInterfacePane('chat');
		 * chatPane?.show();
		 * ```
		 */
		getInterfacePane(pPane: string): InterfacePane;

		/**
		 * Retrieves an interface pane or an element within an interface pane.
		 *
		 * - If `pEl` is omitted or `undefined`: returns the interface pane corresponding to `pPane`.
		 * - If `pEl` is specified: returns the child element within that interface pane named `pEl`.
		 *
		 * @env Client
		 * @param {string | InterfacePane} [pPane=''] - Name of the interface pane or the pane instance itself.
		 * @param {string} [pEl] - Optional name of the element within the interface pane.
		 * @returns {InterfacePane | Diob | any} The interface pane or the requested interface element.
		 *
		 * @example
		 * ```ts
		 * const hud = VYLO.Client.getInterface('hud');
		 * const healthBar = VYLO.Client.getInterface('hud', 'healthBar');
		 * ```
		 */
		getInterface(pPane?: string | InterfacePane, pEl?: string): InterfacePane | Diob | any;

        /**
         * Removes the specified filter.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of filter to remove.
         */
		removeFilter(pName: string | number): void

        /**
         * Sets the client's overlays to the array `pOver`.
         *
         * @env Client | Server
         * @param {Diob[]} pOver - Array of overlays to set this client's overlays to.
         */
		setOverlays(pOver: Diob[]): void

        /**
         * Brings up a confirm window asking the user to select "yes" or "no". Returns `true` or `false`.
         *
         * @env Client | Server
         * @param {string} pMes - Message to display in the confirm window.
         * @param {Function} pFunc - Function to call after input. The first argument will be the input. Can be a "callback array" containing the function, the `this`, and arguments. Example: ( [this.someFunc, this] ).
         * @returns {void} Returns `true` or `false`.
         */
		confirm(pMes: string, pFunc: Function): void

        /**
         * Amount of blank tiles that can be seen on the left and right of the view.
         *
         * @env Client | Server
         */
		xEdgeLimit: number

		/**
		 * CLIENT-ONLY. Toggles whether to hide the on-screen frames-per-second (FPS) DOM label element (`#fps_label`).
		 *
		 * When `true`, the default FPS counter overlay is hidden from the client view.
		 * When `false`, the FPS label element is displayed in the corner of the game screen and updated every second.
		 *
		 * @env Client
		 *
		 * @example
		 * ```ts
		 * // Hide the built-in FPS counter display
		 * VYLO.Client.hideFPS = true;
		 * ```
		 */
		hideFPS: boolean

		/**
		 * CLIENT-ONLY. Controls whether off-screen display objects (Diobs) and map tiles are culled from rendering.
		 *
		 * By default (`false`), the Vylocity engine performs screen frustum culling, automatically removing
		 * non-visible map tiles and cullable Diobs from the screen display list to maximize rendering performance.
		 *
		 * When set to `true`, screen culling is prevented, forcing all map tiles and objects within the map view
		 * to remain added to the display list regardless of whether they are outside the current camera viewport.
		 *
		 * @env Client
		 *
		 * @example
		 * ```ts
		 * // Prevent culling so all diobs and tiles stay on screen
		 * VYLO.Client.preventScreenCulling = true;
		 * ```
		 */
		preventScreenCulling: boolean

		/**
		 * Name of the default map file to load when the client connects or initializes.
		 *
		 * When the client's controlled mob is created and does not already have an assigned map,
		 * it is automatically placed onto this map at coordinates `(0, 0)`.
		 *
		 * @env Client | Server
		 *
		 * @example
		 * ```ts
		 * VYLO.Client.mainMap = 'world-map';
		 * ```
		 */
		mainMap: string

		/**
		 * CLIENT-ONLY. Master volume level for sound playback on the client (default `100`).
		 *
		 * @env Client
		 *
		 * @example
		 * ```ts
		 * // Set client master volume to 50%
		 * VYLO.Client.volume = 50;
		 * ```
		 */
		volume: number;

		/**
		 * Checks whether the client is logged in with a guest account (e.g. `Guest`, `Guest-xxx`, or `Guest1234`).
		 *
		 * @env Client | Server
		 * @returns {boolean} `true` if the connected account is a guest account; otherwise `false`.
		 *
		 * @example
		 * ```ts
		 * if (client.isGuest()) {
		 *     client.prompt('Register', 'Please create an account to save your progress!', (name) => { ... });
		 * }
		 * ```
		 */
		isGuest(): boolean;

		/**
		 * The name of the macro atlas currently active for this client.
		 *
		 * @env Client | Server
		 *
		 * @example
		 * ```ts
		 * client.macroAtlas = 'default_controls';
		 * ```
		 */
		macroAtlas: string;

		/**
		 * CLIENT-ONLY. Flags the client interface layout to refresh and redraw on the next animation frame.
		 *
		 * @env Client
		 * @param {number} [pPlane] - Optional interface plane index to refresh.
		 *
		 * @example
		 * ```ts
		 * VYLO.Client.refreshInterface();
		 * ```
		 */
		refreshInterface(pPlane?: number): void;

        /**
         * Executes 2D canvas drawing commands onto the top screen surface named `pName`.
         *
         * @env Client | Server
         * @param {DrawCommandArgs | DrawCommandArgs[]} pArgs - A draw command configuration object or array of draw commands.
         * @param {string | number} pName - Target top screen identifier name or layer index.
         *
         * @example
         * ```ts
         * client.topScreenDraw({
         *     type: 'fillRect',
         *     color: '#ff0000',
         *     x: 10,
         *     y: 10,
         *     width: 100,
         *     height: 50
         * }, 'hud');
         * ```
         */
		topScreenDraw(pArgs: DrawCommandArgs | DrawCommandArgs[], pName: string | number): void

        /**
         * Returns an object `{'x': x, 'y': y}` containing the x and y offsets of client's view eye.
         *
         * @env Client | Server
         * @returns {{'x': number, 'y': number} } returns an object `{'x': x, 'y': y}` containing the x and y offsets of client's view eye.
         */
		getViewEyeOffsets(): {'x': number, 'y': number}

        /**
         * Creates a new top screen named `pName` with the layer `pLayer`.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the top screen to create.
         * @param {number} [pLayer] - (Optional) Layer to give the screen.
         * @param {object} [pSet] - (Optional) Settings object. Example: ( `{'scaleType': 'nearest'}` ).
         */
		createTopScreen(pName: string | number, pLayer?: number, pSet?: object): void

        /**
         * Returns an object containing the x and y of the game scale. Example:: `{'x': 2, 'y': 2}`.
         *
         * @env Client | Server
         * @param {object} [pO] - (Optional) An existing object to set the x and y of.
         * @returns {{'x': number, 'y': number} } returns an object containing the x and y of the game scale. Example:: `{'x': 2, 'y': 2}`.
         */
		getScreenScale(pO?: object): {'x': number, 'y': number}

        /**
         * Ends movement of client.playerMob in the direction of `pDir`.
         *
         * @env Client | Server
         * @param {string} pDir - Name of direction to stop moving the client's playerMob in. PDir being `undefined` ends all movement.
         */
		endMove(pDir: string): void

        /**
         * Returns the name of the account the client is logged in with.
         *
         * @env Client | Server
         * @returns {string} Returns the name of the account the client is logged in with.
         */
		getAccountName(): string

        /**
         * Adds the specified filter.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the filter. Only one name may be used at a time, using the name will remove the old filter with that name.
         * @param {string} pType - The type of filter to add. Below is the types and their specific possible `pArgs` values.
         * @param {unknown} pArgs - Color-based filter.
         */
		addFilter(pName: string | number, pType: string, pArgs: unknown): void

        /**
         * Removes the client command from the client's commands.
         *
         * @env Client | Server
         * @param {string} pCommand - Name of the client command to remove.
         */
		removeCommand(pCommand: string): void

        /**
         * Sets the background of the client's screen background.
         *
         * @env Client | Server
         * @param {Direction | string} pDir - Direction to stop moving in.
         */
		endMove(pDir: Direction | string): void

        /**
         * Called when a key is pressed down.
         *
         * @env Client | Server
         * @event
         * @param {string} pKey - Name of key that was pressed.
         * @param {KeyboardEvent} [pEvent] - (Optional) The native KeyboardEvent triggered on the browser screen.
         */
		onKeyDown?(pKey: string, pEvent?: KeyboardEvent): void

        /**
         * Called when a key is released.
         *
         * @env Client | Server
         * @event
         * @param {string} pKey - Name of key that was released.
         * @param {KeyboardEvent} [pEvent] - (Optional) The native KeyboardEvent triggered on the browser screen.
         */
		onKeyUp?(pKey: string, pEvent?: KeyboardEvent): void

        /**
         * Returns an array of diobs that are currently on the screen.
         *
         * @env Client | Server
         * @param {string} [pType] - (Optional) String containing type path to return.
         * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
         * @returns {Diob[]} Returns an array of diobs that are currently on the screen.
         */
		getScreenDiobs(pType?: string, pChild?: boolean): Diob[]

        /**
         * Name of the client's account.
         *
         * @env Client | Server
         */
		accountName: string

        /**
         * CLIENT-ONLY. Forces all tiles on the screen to be redrawn on the next frame.
         *
         * @env Client
         */
		refreshTiles(): void

        /**
         * Sets the max FPS of the client to `pFPS`.
         *
         * @env Client | Server
         * @param {number} pFPS - Cap the amount the FPS the client will try to reach when drawing the screen. Default is `60`.
         */
		setMaxFPS(pFPS: number): void

        /**
         * Returns a reference to the web tag with the id `pID`.
         *
         * @env Client | Server
         * @param {string} pID - Id of the web tag.
         * @returns {HTMLElement} Returns a reference to the web tag with the id `pID`.
         */
		getWebTag(pID: string): HTMLElement

        /**
         * Sets the style of `pStyle` to the value of `pValue` of the web tag with the id `pID`.
         *
         * @env Client | Server
         * @param {string} pID - Id of the web tag to set the style of.
         * @param {string} pStyle - Type of style to set.
         * @param {string} pValue - Value as a string to set the style to.
         */
		setWebTagStyle(pID: string, pStyle: string, pValue: string): void

        /**
         * Sets the HTML of the web box behind the game screen.
         *
         * @env Client | Server
         * @param {string} pBack - String containing HTML to set use in the web box behind the game screen.
         */
		setWebBackground(pBack: string): void

        /**
         * Clears all the keys the client is holding and calls their key up events. If the client continues to hold the key and once the user manually releases the key, the key event may still continue to trigger, so take that into consideration.
         *
         * @env Client | Server
         */
		clearKeyDownEvents(): void

        /**
         * Focuses on the interface element object.
         *
         * @env Client | Server
         */
		setFocus(): void

        /**
         * Sets the variable `pVar` to `pVal` for the plane `pPlane`.
         *
         * @env Client | Server
         * @param {number} pPlane - Value of plane to set.
         * @param {string} [pVar] - (Optional) String containing name of variable to set.
         * @param {boolean} [pVal] - (Optional) Value to give this plane's `pVar` variable.
         */
		setPlane(pPlane: number, pVar?: string, pVal?: boolean): void

        /**
         * Sets the client's view eye offsets.
         *
         * @env Client | Server
         * @param {number} pX - Amount of pixels for the screen to be offset from the client's view eye on the x-axis.
         * @param {number} pY - Amount of pixels for the screen to be offset from the client's view eye on the y-axis.
         */
		setViewEyeOffsets(pX: number, pY: number): void

        /**
         * Plays a sound to this client. Returns the Sound object.
         *
         * @env Client | Server
         * @param {string | {'soundName': string, 'volume': number}} pSound - either a string with the name of a sound file, or a string containing the path of a Sound object, or an actual Sound object, or a basic object with the proper information; ex ( {'soundName': 'name', 'volume': 50} )
         * @param {number} [pStart] - (Optional) Time in seconds to start playing the sound at.
         * @param {number} [pDuration] - (Optional) How long in seconds to play the sound for.
         * @returns {void} Returns the Sound object.
         */
		playSound(pSound: string | {'soundName': string, 'volume': number}, pStart?: number, pDuration?: number): void

        /**
         * Gets the data as a string that is stored with the key `pKey` on the client's computer.
         *
         * @env Client | Server
         * @param {string} pKey - Key used to get data stored locally on the client's computer.
         * @returns {string | null} Returns the stored string data or null if not found.
         */
		getLocalStorage(pKey: string): string | null

        /**
         * Executes the event `pEvent` of the web tag with the id `pID`.
         *
         * @env Client | Server
         * @param {string} pID - Id of the web tag to call the event of.
         * @param {string} pEvent - Name of the event to call: onMouseDown, onMouseUp, onMouseClick, onMouseDblClick, onMouseMove.
         */
		callWebTagEvent(pID: string, pEvent: string): void

        /**
         * Returns an array of names of all created interfaces.
         *
         * @env Client | Server
         * @returns {string[]} Returns an array of names of all created interfaces.
         */
		getInterfaceNames(): string[]

        /**
         * Removes the script with the `pName` name from the game.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of script to remove.
         */
		removeWebScript(pName: string | number): void

        /**
         * Loads a JavaScript file into the project.
         *
         * @env Client | Server
         * @param {string | number} pName - Name to give the script.
         * @param {string} pLink - Link to the JavaScript file to load.
         * @param {boolean} [pModule] - (Optional) Load script as a module.
         * @param {Function} [pFunc] - (Optional) Function to call after the JavaScript file has loaded.
         */
		addWebScript(pName: string | number, pLink: string, pModule?: boolean, pFunc?: Function): void

        /**
         * A string containing the HTML to display behind the game screen; #web_background to set the style of the entire background.
         *
         * @env Client | Server
         */
		webBackground: string

        /**
         * Configures the client's screenView settings (scaling policies, pixel ratio, rendering resolutions).
         * Passing `null` restores default viewport scaling settings.
         *
         * @env Client | Server
         * @param {Partial<ScreenView> | null} [pView] - Screen view viewport configuration options.
         *
         * @example
         * ```ts
         * client.setScreenView({
         *     scaleTo: 'ratio',
         *     scaleNearest: true,
         *     disableImageSmoothing: true,
         *     resolution: window.devicePixelRatio || 1
         * });
         * ```
         */
		setScreenView(pView?: Partial<ScreenView> | null): void

        /**
         * Returns an object containing the cursor information. Example: ( `{'cursor': 'default', 'x': 0, 'y': 0}` ).
         *
         * @env Client | Server
         * @returns {{'cursor': string, 'x': number, 'y': number} } returns an object containing the cursor information. Example: ( `{'cursor': 'default', 'x': 0, 'y': 0}` ).
         */
		getMouseCursor(): {'cursor': string, 'x': number, 'y': number}

        /**
         * Returns the current screenView settings and state configuration object for this client.
         *
         * @env Client | Server
         * @returns {ScreenView} The client's active screenView configuration.
         *
         * @example
         * ```ts
         * const view = client.getScreenView();
         * console.log(`Scale mode: ${view.scaleTo}, Size: ${view.width}x${view.height}`);
         * ```
         */
		getScreenView(): ScreenView

        /**
         * Calls the client command of `pCommand` with the arguments of `pArgs`.
         *
         * @env Client
         * @param {string} pCommand - Name of the client command to call.
         * @param {unknown[]} pArgs - Array of arguments to pass to the command.
         * @param {boolean} [pSend] - (Optional) If set the command will also be sent to the server.
         */
		callCommand(pCommand: string, pArgs: unknown[], pSend?: boolean): void

        /**
         * Name of the interface element to send default messages to (ex: `interface1.output1` ).
         *
         * @env Client | Server
         */
		mainOutput: string

        /**
         * Sets the focus on the web tag with the id `pID`.
         *
         * @env Client | Server
         * @param {string} pID - Id of the web tag to set focus to.
         */
		setWebTagFocus(pID: string): void

        /**
         * Hides the interface of `pInterface` if `pElement` is not specified, otherwise it only hides `pElement`.
         *
         * @env Client | Server
         * @param {string} pInterface - Name of the interface to hide or the interface containing `pElement`.
         * @param {Diob} [pElement] - (Optional) Name of interface lement in `pInterface` to hide.
         */
		hideInterface(pInterface: string, pElement?: Diob): void

        /**
         * Returns the client's active MapView viewport instance (`MapViewInstance`).
         *
         * @env Client | Server
         * @returns {MapViewInstance} The active MapView instance controlling map display, zoom, eye offsets, and bounds.
         *
         * @example
         * ```ts
         * const mapView = client.getMapView();
         * mapView.setZoom(1.5, 1.5);
         * console.log(`MapView dimensions: ${mapView.width}x${mapView.height}`);
         * ```
         */
		getMapView(): MapViewInstance

        /**
         * Toggles load screen on and off.
         *
         * @env Client | Server
         * @param {boolean} [pVal] - (Optional) True to show load screen, `false` to hide load screen.
         */
		toggleLoadScreen(pVal?: boolean): void

        /**
         * Toggles macro capturing on and off.
         *
         * @env Client | Server
         * @param {boolean} [pVal] - (Optional) True to resume capturing macros, `false` to pause capturing macros.
         */
		toggleMacroCapture(pVal?: boolean): void

        /**
         * Removes a web tag with the id of `pID` from the client's screen.
         *
         * @env Client | Server
         * @param {string} pID - Id of the web tag to remove from the client's screen.
         */
		removeWebTag(pID: string): void

        /**
         * Sets the view eye of the client to be centered on `pDiob`. The default is the player mob.
         *
         * @env Client | Server
         * @param {Diob} pDiob - Diob to have the client's screen view centered on.
         */
		setViewEye(pDiob: Diob): void

        /**
         * Returns the pixel dimensions `{ width, height }` of the browser/game window.
         *
         * @env Client | Server
         * @param {Partial<Size2D>} [pO] - Optional destination object to populate with width and height.
         * @returns {Size2D} Dimensions containing `width` and `height` in pixels.
         *
         * @example
         * ```ts
         * const { width, height } = client.getWindowSize();
         * console.log(`Window: ${width}x${height}`);
         * ```
         */
		getWindowSize(pO?: Partial<Size2D>): Size2D

        /**
         * Setting this will prevent the server from automatically loading interfaces on the server-side. If you want the server to have access, you will need to show the interface manually.
         *
         * @env Server
         */
		preventServerInterfaces: boolean

        /**
         * Adds a new command to the client's commands. If `pFunc` is `null` and `pCommand` is the name of an pre-defined command, that command will be added.
         *
         * @env Client | Server
         * @param {string} pCommand - Name of the client command to be added.
         * @param {Function} pFunc - Function to be called when the command is executed.
         */
		addCommand(pCommand: string, pFunc: Function): void

        /**
         * Sets the client's mainOutput.
         *
         * @env Client | Server
         * @param {string} pOutput - Name of the interface element to send default messages to (ex: `interface1.output1` ).
         */
		setMainOutput(pOutput: string): void

        /**
         * Creates a new custom macro named `pName` with the keyDown command of `pDown` and the keyUp command of `pUp`. Custom macros override macro atlas macros.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the custom macro.
         * @param {string} pKey - String of key that will execute the macro.
         * @param {string} [pDown] - (Optional) String containing the command to be executed when the key is pushed down. Example: `test(1)` would execute the `test` client command with one parameter equal to `1`.
         * @param {string} [pUp] - (Optional) String containing the command to be executed when the key is let go of. Example: `test(1)` would execute the `test` client command with one parameter equal to `1`.
         */
		addCustomMacro(pName: string | number, pKey: string, pDown?: string, pUp?: string): void

        /**
         * Returns an object containing information about the client's browser and operating system. Example: `{'platform': 'Netscape', 'version': 'Chrome/38.0.2125.104', 'vendor': 'Google', 'language': 'en-US', 'system': 'Windows 95'}`.
         *
         * @env Client | Server
         * @returns {Navigator} Returns an object containing information about the client's browser and operating system. Example: `{'platform': 'Netscape', 'version': 'Chrome/38.0.2125.104', 'vendor': 'Google', 'language': 'en-US', 'system': 'Windows 95'}`.
         */
		getNavigator(): Navigator

        /**
         * Current screenView viewport configuration and state object for this client.
         *
         * @env Client | Server
         */
		screenView: ScreenView

        /**
         * Displays the interface of `pInterface`, if not already displayed, along with all elements of the interface with that are not hidden by default. If `pElement` is specified, it makes that element no longer hidden.
         *
         * @env Client | Server
         * @param {string} pInterface - Name of interface to show.
         * @param {Diob} [pElement] - (Optional) Name of interface element in `pInterface` to show.
         * @param {boolean} [pForce] - (Optional) If set, all hidden elements will be forced to be shown.
         */
		showInterface(pInterface: string, pElement?: Diob, pForce?: boolean): void

        /**
         * Moves the client.playerMob in the direction `pDir` until told to stop via endMove(`pDir`).
         *
         * @env Client | Server
         * @param {string} pDir - Name of direction to move client.playerMob.
         */
		startMove(pDir: string): void

        /**
         * A string containing the address the client is connected to the server with (in format IP:port, or `localhost` if not connected to a server).
         *
         * @env Client | Server
         */
		address: string

        /**
         * String containing CSS to be used as a web style (ex `.test`{font-weight: bold;}`.test2`{color: #000;}` ). Style can be referenced by the name `default`.
         *
         * @env Client | Server
         */
		mainWebStyle: string

        /**
         * Returns the canvas element that this element is drawn on to.
         *
         * @env Client | Server
         * @param {string} pInt - Name of the interface that element is on.
         * @param {string} pEl - Name of the element.
         * @returns {HTMLCanvasElement} Returns the canvas element that this element is drawn on to.
         */
		getInterfaceCanvas(pInt: string, pEl: string): HTMLCanvasElement

        /**
         * Adds a custom font.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the font.
         * @param {string} pPath - Url or path to the font file.
         * @param {boolean} [pRemote] - (Optional) Set this if the path is outside of the project.
         * @param {object} [pStyle] - (Optional) Custom style object to apply to the font. Example: `{'font-weight': bold}`.
         */
		addCustomFont(pName: string | number, pPath: string, pRemote?: boolean, pStyle?: object): void

        /**
         * Sends a packet to a client or server, depending on where the code is executed. Client code executing this will send the packet to the server. Server code executing this will send the packet to the client. This will invoke Client/onPacket on client-side if the sendPacket is server-side and on the server-side if it is on the client-side.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of packet to send.
         * @param {unknown} pData - An object containing data to be sent. Example: `{'a': 1, 'b': 2}`.
         * @param {boolean} [pForce] - (Optional) Send the packet immediately instead of buffering it with the packet delay.
         */
		sendPacket(pName: string | number, pData: unknown, pForce?: boolean): void

        /**
         * Toggles screen drawing on and off.
         *
         * @env Client | Server
         * @param {boolean} [pVal] - (Optional) True to resume screen drawing, `false` to pause all screen drawing, `map` to pause only the map drawing.
         */
		toggleScreenDrawing(pVal?: boolean): void

        /**
         * Removes all overlays with the `pOver` type or the exact overlay matching `pOver`.
         *
         * @env Client | Server
         * @param {string | Diob | Object} pOver - String of the type of object or overlay to remove or actual overlay to remove.
         */
		removeOverlay(pOver: string | Diob | Object): void

        /**
         * Adds an interface element to the interface and returns it.
         *
         * @env Client | Server
         * @param {string} pType - Type of interface object to add.
         * @param {string} pInterface - Name of the interface to add the interface element to.
         * @param {string | number} [pName] - (Optional) Name to give the element being added.
         * @param {number} [pX] - (Optional) X position to give the element.
         * @param {number} [pY] - (Optional) Y position to the give the element.
         * @param {unknown[]} [pArgs] - (Optional) Array of arguments to pass to the onNew event of the interface element being created.
         * @returns {Diob} Returns it.
         */
		addInterfaceElement(pType: string, pInterface: string, pName?: string | number, pX?: number, pY?: number, pArgs?: unknown[]): Diob

        /**
         * Sets the content of the web tag with the id `pID` to the value of `pContent`.
         *
         * @env Client | Server
         * @param {string} pID - Id of the web tag to set the content of.
         * @param {string} pContent - String containing the content to change the web tag's content to.
         */
		setWebTagContent(pID: string, pContent: string): void

        /**
         * Amount of pixels the client's view is offset by from the view eye on the y-axis.
         *
         * @env Client | Server
         */
		yViewEyeOffset: number

        /**
         * A reference to the player mob of this client.
         *
         * @env Client | Server
         */
		mob: Diob

        /**
         * Brings up an alert window with `pMes` in it.
         *
         * @env Client | Server
         * @param {string} pMes - Message to show in the alert.
         */
		alert(pMes: string): void

        /**
         * Returns the current FPS.
         *
         * @env Client | Server
         * @returns {number} Returns the current FPS.
         */
		getFPS(): number

        /**
         * Set in order to tell the engine the client is in an input and key commands should be used as text input, `false` for normal. Engine automatically sets this for most inputs.
         *
         * @env Client | Server
         */
		inInput: boolean

        /**
         * Returns the diob the client's screen eye is currently set to.
         *
         * @env Client | Server
         * @returns {Diob} Returns the diob the client's screen eye is currently set to.
         */
		getViewEye(): Diob

        /**
         * Moves the client to a new server located at the address `pAddress`.
         *
         * @env Client | Server
         * @param {string} pAddres - Address for the server to move the client to. Example: `127.0.0.1:1234`.
         */
		changeServer(pAddres: string): void

        /**
         * Returns an array of interface elements on the interface `pInterface` depending on the provided arguments. If `pType` is not set, all elements on the interface will be returned. If `pType` is set but `pChild` is not, elements on the interface with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all elements with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Interface/A` with `pChild` `undefined`, all elements with the exact type of `Interface/A` will be returned, but if `pChild` is set, then all types starting with `Interface/A` on the interface will be returned.
         *
         * @env Client | Server
         * @param {string} pInterface - Name of the interface to get element from.
         * @param {string} [pType] - (Optional) String containing type path to return.
         * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
         * @returns {Diob[]} Returns an array of interface elements on the interface `pInterface` depending on the provided arguments. If `pType` is not set, all elements on the interface will be returned. If `pType` is set but `pChild` is not, elements on the interface with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all elements with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Interface/A` with `pChild` `undefined`, all elements with the exact type of `Interface/A` will be returned, but if `pChild` is set, then all types starting with `Interface/A` on the interface will be returned.
         */
		getInterfaceElements(pInterface: string, pType?: string, pChild?: boolean): Diob[]

        /**
         * Returns the content of the web tag with the id of `pID`.
         *
         * @env Client | Server
         * @param {string} pID - Id of the web tag to get the content of.
         * @returns {string} Returns the content of the web tag with the id of `pID`.
         */
		getWebTagContent(pID: string): string

        /**
         * Changes the name and layer of the top screen with the name `pName`. Adding data optional.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the top screen to set.
         * @param {string} pNewName - New name of the top screen.
         * @param {number} pNewLayer - New layer of the top screen.
         * @param {unknown} [pNewData] - (Optional) Data to add to the screen.
         * @param {object} [pNewSet] - (Optional) New settings object.
         */
		setTopScreen(pName: string | number, pNewName: string, pNewLayer: number, pNewData?: any, pNewSet?: object): void

        /**
         * Sets the edge limit of the map for the client.
         *
         * @env Client | Server
         * @param {number} pX - Number of black tiles visible on the left and right edges of the map; -1 for default.
         * @param {number} pY - Number of black tiles visible on the top and bottom edges of the map; -1 for default.
         */
		setEdgeLimit(pX: number, pY: number): void

        /**
         * Configures or updates the client's mapView viewport settings (dimensions, zoom bounds, padding).
         * Passing `null` resets the mapView to default settings.
         *
         * @env Client | Server
         * @param {Partial<MapViewConfig> | string | null} [pView] - MapView configuration options or preset string.
         *
         * @example
         * ```ts
         * client.setMapView({
         *     width: 800,
         *     height: 600,
         *     zoom: { x: 1, y: 1 },
         *     preventAutoScale: true
         * });
         * ```
         */
		setMapView(pView?: Partial<MapViewConfig> | string | null): void

        /**
         * Brings up a prompt window to ask for text from the user.
         *
         * @env Client | Server
         * @param {string} pTitle - Title of the prompt.
         * @param {string} pMes - Default text in the input.
         * @param {Function} pFunc - Function to call after input. The first argument will be the input. Can be a "callback array" containing the function, the `this`, and arguments. Example: ( [this.someFunc, this] ).
         */
		prompt(pTitle: string, pMes: string, pFunc: Function): void

        /**
         * Amount of pixels the client's view is offset by from the view eye on the x-axis.
         *
         * @env Client | Server
         */
		xViewEyeOffset: number

        /**
         * Returns `true` if `pInt` is currently shown, `false` if not. If `pEl` is set, checks if the specified element is shown.
         *
         * @env Client | Server
         * @param {string} pInt - Name of the interface.
         * @param {string} [pEl] - (Optional) Name of the element.
         * @returns {boolean} Returns `true` if `pInt` is currently shown, `false` if not. If `pEl` is set, checks if the specified element is shown.
         */
		checkInterfaceShown(pInt: string, pEl?: string): boolean

        /**
         * Outputs text to an interface element. If `pInt` or `pEl` is not set or is invalid, text goes to client.mainOutput.
         *
         * @env Client | Server
         * @param {string} pText - Text to be displayed.
         * @param {string} pInt - String containing interface file name to output to.
         * @param {string} pEl - String containing the interface element name to output to.
         */
		outputText(pText: string, pInt: string, pEl: string): void

        /**
         * Returns an array of diobs on the screen that overlap the specified position box depending on the provided arguments. If `pType` is not set, all diobs in the position box will be returned. If `pType` is set but `pChild` is not, diobs in the position box with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Interface` with `pChild` `undefined`, all diobs with the exact type of `Interface` will be returned, but if `pChild` is set, then all interfaces on the screen will be returned.
         *
         * @env Client | Server
         * @param {number} pX - Starting x position.
         * @param {number} pY - Starting y position.
         * @param {string} [pType] - (Optional) Ending x position.
         * @param {boolean} [pChild] - (Optional) Ending y position.
         * @param {string} [pPage] - (Optional) String containing type path to return.
         * @returns {Diob[]} Returns an array of diobs on the screen that overlap the specified position box depending on the provided arguments. If `pType` is not set, all diobs in the position box will be returned. If `pType` is set but `pChild` is not, diobs in the position box with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Interface` with `pChild` `undefined`, all diobs with the exact type of `Interface` will be returned, but if `pChild` is set, then all interfaces on the screen will be returned.
         */
		getInterfaceElementsFromScreen(pX: number, pY: number, pType?: string, pChild?: boolean, pPage?: string): Diob[]

        /**
         * Removes a font from being usable.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the font to remove.
         */
		removeCustomFont(pName: string | number): void

        /**
         * String containing a color (`null` for transparent) to set the client's screen background to, for example `#000` for black. Default is `#000`.
         *
         * @env Client | Server
         */
		screenBackground: string | null

        /**
         * Adds an overlay to the client which is a visual icon that always follows the screen. Returns the new overlay. If `pOver` is already an overlay of a diob it will remove it form that diob and add it to this diob.
         *
         * @env Client | Server
         * @param {string | Diob | Object} pOver - String of the type of object or overlay to add an overlay of or actual diob to add.
         * @param {number | boolean} [pAppearance] - (Optional) If `true`, this overlay will be be treated as if it is part of the the parent's actual appearance - appearance settings such as angle and alpha of the parent will be used for this overlay and the overlay will be drawn directly on top of the parent so no other diobs that are not an overlay of the parent can appear between it and the parent (it will basically be an extension of the parent's icon). If this is `false`, the overlay will be treated as an independent diob that just follows the parent around. Instead of `true` or `false` this can be an object containing information on the appearMask, `shareIcon` to have the overlay share the same iconName as the parent and `isUnder` to make the overlay appear under the parent instead of above, `ownState` to have this overlay not sync up with the parent's iconState. Example: `{'shareIcon': `true`, 'isUnder': `true`}`.
         * @param {boolean} [pSkipEvent] - (Optional) If `true`, the onAddOverlay event will not be called.
         * @returns {Diob} Returns the new overlay. If `pOver` is already an overlay of a diob it will remove it form that diob and add it to this diob.
         */
		addOverlay(pOver: string | Diob | Object, pAppearance?: AppearMask, pSkipEvent?: boolean): Diob

        /**
         * Changes the macro file the client uses.
         *
         * @env Client | Server
         * @param {string} pMacro - Name of macro file to set client macros to.
         */
		setMacroAtlas(pMacro: string): void

        /**
         * Captures screen data for the entire top screen surface named `pName` (or default if omitted).
         *
         * @env Client | Server
         * @param {string | number} [pName] - Optional identifier name of the top screen layer to capture.
         * @param {'url' | 'pixels' | 'canvas'} [pType] - Type of representation: `'url'`, `'pixels'`, or `'canvas'`.
         * @returns {ScreenCaptureData} Screen capture details and pixel/data payload.
         *
         * @example
         * ```ts
         * const capture = client.getTopScreen('hud', 'pixels');
         * console.log('Top screen dimensions:', capture.width, capture.height);
         * ```
         */
		getTopScreen(pName?: string | number, pType?: 'url' | 'pixels' | 'canvas'): ScreenCaptureData

        /**
         * Sets the cursor of the client.
         *
         * @env Client | Server
         * @param {string} pCursor - A string containing the name of the cursor for built-in cursors, a URL path to an image, or a diob. Built-in (auto, all-scroll, crosshair, default, help, inherit, move, pointer, progress, text, vertical-text, wait, no-drop, not-allowed, e-resize, n-resize, s-resize, w-resize, col-resize, row-resize, ne-resize, nw-resize, se-resize, sw-resize). Passing a diob will use the diob's icon. Blank for default.
         * @param {number} [pX] - (Optional) Offsets the icon left or right by `pX` pixels.
         * @param {number} [pY] - (Optional) Offsets the icon up or down by `pY` pixels.
         */
		setMouseCursor(pCursor: string, pX?: number, pY?: number): void

        /**
         * Maximum number of frames the client will attempt to draw per second. Default is `60`.
         *
         * @env Client | Server
         */
		maxFPS: number

        /**
         * Removes a CSS style with the name `pName`.
         *
         * @env Client | Server
         * @param {string | number} pName - Unique name of style.
         */
		removeWebStyle(pName: string | number): void

        /**
         * Returns an object {`step`: step, `max`: `{'x': x, 'y': y}`} containing delay details of client's view eye.
         *
         * @env Client | Server
         * @returns {{'step': number, 'max': {'x': number, 'y': number} }} returns an object {`step`: step, `max`: `{'x': x, 'y': y}`} containing delay details of client's view eye.
         */
		getViewEyeDelay(): {'step': number, 'max': {'x': number, 'y': number}}

        /**
         * Returns address of the client, `localhost` for local or `ip:port` if connected to a server.
         *
         * @env Client | Server
         * @returns {string} Returns address of the client, `localhost` for local or `ip:port` if connected to a server.
         */
		getAddress(): string

        /**
         * Returns an array of custom macro names.
         *
         * @env Client | Server
         * @returns {string[]} Returns an array of custom macro names.
         */
		getCustomMacroNames(): string[]

        /**
         * Returns the screen's top-left coordinates `{ x, y }` relative to the game map.
         *
         * @env Client | Server
         * @param {Partial<Point2D>} [pO] - Optional destination object to populate with x and y coordinates.
         * @returns {Point2D} Coordinates of the screen on the map.
         *
         * @example
         * ```ts
         * const screenPos = client.getScreenPos();
         * console.log(`Screen map position: (${screenPos.x}, ${screenPos.y})`);
         * ```
         */
		getScreenPos(pO?: Partial<Point2D>): Point2D

        /**
         * Evaluates the JavaScript code in the `pScript` string. Returns `undefined` on the server-side.
         *
         * @env Client | Server
         * @param {string} pScript - A string containing the JavaScript code to evaluate.
         * @returns {void} Returns `undefined` on the server-side.
         */
		evalWebScript(pScript: string): void

        /**
         * Amount of blank tiles that can be seen on the top and bottom of the view.
         *
         * @env Client | Server
         */
		yEdgeLimit: number

        /**
         * Returns an object containing the mouse position. Example: ( `{'x': 0, 'y': 0}` ).
         *
         * @env Client | Server
         * @returns {{'x': number, 'y': number} } returns an object containing the mouse position. Example: ( `{'x': 0, 'y': 0}` ).
         */
		getMousePos(): {'x': number, 'y': number}

        /**
         * Returns the Diob currently focused by this client (e.g. for input or camera tracking), or null if none.
         *
         * @env Client | Server
         * @returns {Diob | null} The currently focused Diob instance, or null.
         *
         * @example
         * ```ts
         * const focusedDiob = client.getFocus();
         * if (focusedDiob) {
         *     console.log('Currently focused:', focusedDiob.tag);
         * }
         * ```
         */
		getFocus(): Diob | null

        /**
         * Returns the diob plane `pPlane` ir specified, otherwise returns an array of existing planes. You can then alter it like any other diob and all visual changes will be applied to all diobs on this plane.
         *
         * @env Client | Server
         * @param {number} [pPlane] - (Optional) Value of plane to get.
         * @returns {Diob | Diob[]} Returns the diob plane `pPlane` ir specified, otherwise returns an array of existing planes. You can then alter it like any other diob and all visual changes will be applied to all diobs on this plane.
         */
		getPlane(pPlane?: number): Diob | Diob[]

        /**
         * Sets the client's game screen size to `pWidth` width and `pHeight` height.
         *
         * @env Client | Server
         * @param {number} pWidth - Width as a number.
         * @param {number} pHeight - Height as a number.
         */
		setScreenSize(pWidth: number, pHeight: number): void

        /**
         * Returns an array of filter names.
         *
         * @env Client | Server
         * @returns {string[]} Returns an array of filter names.
         */
		getFilters(): string[]

        /**
         * Sets the client's view eye delay which is how many pixels the screen can be off center of the view eye and how quickly it catches up to the view eye. Set step to 0 for no delay (the default).
         *
         * @env Client | Server
         * @param {number} pDelay - Object containing eye delay information. Possible values `step` (determines number of pixels the eye moves per frame. Default 0) and `max` (object determining maximum distance in pixels the screen can be from the eye `{'x': 100, 'y': 100}`). Example: {`step`: 2, `max`: `{'x': 100, 'y': 100}`}.
         */
		setViewEyeDelay(pDelay: number): void

        /**
         * Removes an interface element from the interface.
         *
         * @env Client | Server
         * @param {string | InterfacePane} pInterface - Name of the interface (or InterfacePane instance) to remove an interface element from.
         * @param {string | number | Diob} [pName] - Optional name of the interface element or Diob element instance to remove.
         * @param {boolean} [pSave] - Optional flag indicating whether to keep the element instance from being deleted.
         */
		removeInterfaceElement(pInterface: string | InterfacePane, pName?: string | number | Diob, pSave?: boolean): void

        /**
         * Returns the dimensions `{ width, height }` of the client's render screen canvas in pixels.
         *
         * @env Client | Server
         * @param {Partial<Size2D>} [pO] - Optional destination object to populate with width and height.
         * @returns {Size2D} Dimensions containing `width` and `height` in pixels.
         *
         * @example
         * ```ts
         * const { width, height } = client.getScreenSize();
         * console.log(`Screen canvas: ${width}x${height}`);
         * ```
         */
		getScreenSize(pO?: Partial<Size2D>): Size2D

        /**
         * Hex, rgb, rgba, color matrix value, or a tint object. Applies color filter to diob. Example: ( `#000000` ). Example: ( `rgb(10, 20, 30)` ). Example: ( `{'tint': 0x444444}` ).
         *
         * @env Client | Server
         */
		color: string | number[] | {'tint': number}

        /**
         * Creates a new interface file named `pName`.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the interface to create.
         */
		createInterface(pName: string | number): void

        /**
         * Sends the data for the `pD` diob to the client, if `pVar` is set it will send only those variables, if it is not set it will only send built-in engine variables.
         *
         * @env Server
         * @param {Diob} pD - Reference to the diob to send.
         * @param {string[]} [pVar] - (Optional) Variable name or array of variable names.
         */
		sendDiob(pD: Diob, pVar?: string[]): void

        /**
         * Adds CSS style.
         *
         * @env Client | Server
         * @param {string | number} pName - Unique name of style.
         * @param {string} pStyle - Text as CSS to add to the client.
         */
		addWebStyle(pName: string | number, pStyle: string): void

        /**
         * Removes the custom macro `pName` from the client's custom macros.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the custom macro.
         */
		removeCustomMacro(pName: string | number): void

        /**
         * Object containing eye delay information. Possible values `step` (determines number of pixels the eye moves per frame. Default 1) and `max` (object determining maximum distance in pixels the screen can be from the eye `{'x': 100, 'y': 100}`). Example: {`step`: 2, `max`: `{'x': 100, 'y': 100}`}.
         *
         * @env Client | Server
         */
		viewEyeDelay: {'step': number, 'max': {'x': number, 'y': number}}

        /**
         * Sets the client's playerMob to `pMob`.
         *
         * @env Client | Server
         * @param {Diob} pMob - Reference to a Mob diob to give this client control of.
         */
		setPlayerMob(pMob: Diob): void

        /**
         * Returns an array of diobs that are overlays of this diob using the provided arguments. If `pType` is not set, all diobs will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs will be returned.
         *
         * @env Client | Server
         * @param {string} [pType] - (Optional) String containing type path to return.
         * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
         * @returns {Diob[]} Returns an array of diobs that are overlays of this diob using the provided arguments. If `pType` is not set, all diobs will be returned. If `pType` is set but `pChild` is not, all diobs with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs will be returned.
         */
		getOverlays(pType?: string, pChild?: boolean): Diob[]

        /**
         * Active MapView viewport controller instance for this client, or a configuration object when configuring the type.
         *
         * @env Client | Server
         *
         * @example
         * ```ts
         * const mapView = VYLO.Client.mapView;
         * mapView.zoom.set(1.5, 1.5);
         * ```
         */
		mapView: MapViewInstance | MapViewConfig

        /**
         * Alias for `mapView`. Active MapView viewport controller instance for this client.
         *
         * @env Client | Server
         */
		mapview?: MapViewInstance | MapViewConfig

		/**
		 * CLIENT-ONLY. Renderer configuration options for the client game canvas and graphics pipeline.
		 *
		 * @env Client
		 *
		 * @example
		 * ```ts
		 * VYLO.Client.renderOptions = {
		 *     antialias: false,
		 *     roundPixels: true,
		 *     resolution: window.devicePixelRatio || 1
		 * };
		 * ```
		 */
		renderOptions?: RenderOptions

        /**
         * Called when a mouse button is pressed by this client anywhere on screen or over a diob.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob instance underneath the cursor, or `0` if clicked on empty screen/map space.
         * @param {number} pX - Horizontal coordinate of the cursor on the screen viewport.
         * @param {number} pY - Vertical coordinate of the cursor on the screen viewport.
         * @param {MouseButton} pButton - The mouse button that was pressed (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         *
         * @example
         * ```ts
         * client.onMouseDown = (pDiob, pX, pY, pButton) => {
         *     if (pButton === MouseButton.Right) {
         *         console.log(`Right click at viewport (${pX}, ${pY})`);
         *     }
         * };
         * ```
         */
		onMouseDown?(pDiob: Diob | 0, pX: number, pY: number, pButton: MouseButton): void

        /**
         * Called when a mouse button is released by this client.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob instance underneath the cursor, or `0` if released over empty screen/map space.
         * @param {number} pX - Horizontal coordinate of the cursor on the screen viewport.
         * @param {number} pY - Vertical coordinate of the cursor on the screen viewport.
         * @param {MouseButton} pButton - The mouse button that was released (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         */
		onMouseUp?(pDiob: Diob | 0, pX: number, pY: number, pButton: MouseButton): void

        /**
         * Called when a mouse button is clicked (press and release sequence) by this client.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob clicked, or `0` if clicked over empty space.
         * @param {number} pX - Horizontal coordinate of the click on the screen viewport.
         * @param {number} pY - Vertical coordinate of the click on the screen viewport.
         * @param {MouseButton} pButton - The mouse button clicked (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         */
		onMouseClick?(pDiob: Diob | 0, pX: number, pY: number, pButton: MouseButton): void

        /**
         * Called when a mouse button is double clicked by this client.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob double clicked, or `0` if double clicked over empty space.
         * @param {number} pX - Horizontal coordinate of the double click on the screen viewport.
         * @param {number} pY - Vertical coordinate of the double click on the screen viewport.
         * @param {MouseButton} pButton - The mouse button clicked (`MouseButton.Left`, `MouseButton.Middle`, or `MouseButton.Right`).
         */
		onMouseDblClick?(pDiob: Diob | 0, pX: number, pY: number, pButton: MouseButton): void

        /**
         * Called when the mouse moves within the game window.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob currently hovered over, or `0` if none.
         * @param {number} pX - Horizontal viewport position of the mouse.
         * @param {number} pY - Vertical viewport position of the mouse.
         */
		onMouseMove?(pDiob: Diob | 0, pX: number, pY: number): void

        /**
         * Called when the mouse enters the bounding area of a diob.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob entered.
         * @param {number} pX - Horizontal viewport coordinate of the cursor.
         * @param {number} pY - Vertical viewport coordinate of the cursor.
         */
		onMouseEnter?(pDiob: Diob | 0, pX: number, pY: number): void

        /**
         * Called when the mouse exits the bounding area of a diob.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob exited.
         * @param {number} pX - Horizontal viewport coordinate of the cursor.
         * @param {number} pY - Vertical viewport coordinate of the cursor.
         */
		onMouseExit?(pDiob: Diob | 0, pX: number, pY: number): void

        /**
         * Called when the mouse wheel is scrolled upwards.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob underneath the cursor, or `0`.
         * @param {number} pX - Horizontal viewport coordinate of the cursor.
         * @param {number} pY - Vertical viewport coordinate of the cursor.
         */
		onMouseWheelScrollUp?(pDiob: Diob | 0, pX: number, pY: number): void

        /**
         * Called when the mouse wheel is scrolled downwards.
         *
         * @env Client | Server
         * @event
         * @param {Diob | 0} pDiob - The diob underneath the cursor, or `0`.
         * @param {number} pX - Horizontal viewport coordinate of the cursor.
         * @param {number} pY - Vertical viewport coordinate of the cursor.
         */
		onMouseWheelScrollDown?(pDiob: Diob | 0, pX: number, pY: number): void

		/**
		 * CLIENT-ONLY. The current horizontal scroll position of the client's screen viewport in map pixels. Read-only.
		 *
		 * @env Client
		 *
		 * @example
		 * ```ts
		 * console.log('Current horizontal screen scroll:', VYLO.Client.xView);
		 * ```
		 */
		readonly xView: number;

		/**
		 * CLIENT-ONLY. The current vertical scroll position of the client's screen viewport in map pixels. Read-only.
		 *
		 * @env Client
		 *
		 * @example
		 * ```ts
		 * console.log('Current vertical screen scroll:', VYLO.Client.yView);
		 * ```
		 */
		readonly yView: number;

		/**
		 * CLIENT-ONLY. The underlying PixiJS Application instance managing the game canvas renderer (`ScreenManager.pixiApp`).
		 *
		 * @env Client
		 */
		readonly renderApp: any;

		/**
		 * CLIENT-ONLY. Prompts the user to select one or more local files for upload, optionally posting them as multipart form data to `pURL`.
		 *
		 * @env Client
		 * @param {string} [pURL] - Optional target endpoint URL to upload files to via POST.
		 * @param {Record<string, string>} [pOptions] - Optional HTML attributes to set on the hidden `<input type="file">` element (such as `accept`, `multiple`).
		 * @returns {Promise<string | void>} Resolves with the server's text response if uploaded to `pURL`, or resolves with void.
		 *
		 * @example
		 * ```ts
		 * await VYLO.Client.uploadFile('https://example.com/api/upload', { accept: 'image/*' });
		 * ```
		 */
		uploadFile(pURL?: string, pOptions?: Record<string, string>): Promise<string | void>;

		/**
		 * CLIENT-ONLY. Called when files are selected for upload via `uploadFile`.
		 * Return `false` (or a Promise resolving to `false`) to cancel the upload.
		 *
		 * @env Client
		 * @event
		 * @param {FileList} pFiles - The native FileList containing the selected files.
		 * @returns {boolean | Promise<boolean>} Return `false` to abort the upload; otherwise return `true`.
		 */
		onFileUpload?(pFiles: FileList): boolean | Promise<boolean>;

		/**
		 * Called when a touch point is placed on the touch surface.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Diob | 0} pDiob - The diob instance underneath the touch point, or `0` if empty map/screen.
		 * @param {number} pX - Horizontal coordinate of the touch point on the screen.
		 * @param {number} pY - Vertical coordinate of the touch point on the screen.
		 * @param {TouchEvent} [pEvent] - (Optional) The native browser TouchEvent.
		 *
		 * @example
		 * ```ts
		 * client.onTouchStart = (pDiob, pX, pY, pEvent) => {
		 *     console.log(`Touch started at (${pX}, ${pY}) on`, pDiob);
		 * };
		 * ```
		 */
		onTouchStart?(pDiob: Diob | 0, pX: number, pY: number, pEvent?: TouchEvent): void;

		/**
		 * Called when a touch point is removed from the touch surface.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Diob | 0} pDiob - The diob instance underneath the touch point, or `0` if empty map/screen.
		 * @param {number} pX - Horizontal coordinate of the touch point on the screen.
		 * @param {number} pY - Vertical coordinate of the touch point on the screen.
		 * @param {boolean} [pCancel] - (Optional) Whether the touch was cancelled (e.g. touchcancel event).
		 * @param {TouchEvent} [pEvent] - (Optional) The native browser TouchEvent.
		 */
		onTouchEnd?(pDiob: Diob | 0, pX: number, pY: number, pCancel?: boolean, pEvent?: TouchEvent): void;

		/**
		 * Called when a touch point is moved along the touch surface.
		 *
		 * @env Client | Server
		 * @event
		 * @param {Diob | 0} pDiob - The diob instance underneath the touch point, or `0` if empty map/screen.
		 * @param {number} pX - Horizontal coordinate of the touch point on the screen.
		 * @param {number} pY - Vertical coordinate of the touch point on the screen.
		 * @param {TouchEvent} [pEvent] - (Optional) The native browser TouchEvent.
		 */
		onTouchMove?(pDiob: Diob | 0, pX: number, pY: number, pEvent?: TouchEvent): void;

		/**
		 * CLIENT-ONLY. Called every frame when the screen renders.
		 *
		 * @env Client
		 * @event
		 * @param {DOMHighResTimeStamp} pTime - High-resolution timestamp of the current frame in milliseconds from `performance.now()`.
		 *
		 * @example
		 * ```ts
		 * VYLO.Client.onScreenRender = (time) => {
		 *     // Update per-frame logic or custom canvas rendering
		 * };
		 * ```
		 */
		onScreenRender?(pTime: DOMHighResTimeStamp): void;

		[key: string]: any

	}



	/** The resource object. */
	type Resource = {

		/**
		 * Sets a game resource to use the resource file located at `pPath`.
		 *
		 * @env Client | Server
		 * @param {string} pType - Type of file to set.
		 * @param {string | number} pName - Name of file to set. This will be referenced in the project. Example: if `pName` was set to `my_atlas` ( atlasName = `my_atlas` ).
		 * @param {string} pPath - Path to the file. If not a remote file this will be the name of the file (or path if any sub directories were added) inside resources/files/ for the game, otherwise it will be a web URL path to the file.
		 * @param {boolean} [pRemote] - (Optional) If set the `pPath` file will be treated like a web URL.
		 * @param {boolean} [pShare] - (Optional) Server-only. If set, sends the resource declaration to all connected clients.
		 */
		setResource(pType: string, pName: string | number, pPath: string, pRemote?: boolean, pShare?: boolean): void

		/**
		 * Returns an array of resource names registered for the given type, or all resources if no type is specified.
		 *
		 * @env Client | Server
		 * @param {string} [pType] - (Optional) Resource type filter prefix (e.g. 'map', 'icon', 'interface', 'sound').
		 * @returns {string[]} Array of resource names.
		 */
		getResources(pType?: string): string[]

        /**
         * Returns the direct path to the resource.
         *
         * @env Client | Server
         * @param {string} pType - Type of file to get.
         * @param {string | number} pName - Name of file to get.
         * @param {boolean} [pLocal] - (Optional) Client-only. If true, returns a path relative to the local server rather than the remote resource server.
         * @returns {string} Returns the direct path to the resource.
         */
		getResourcePath(pType: string, pName: string | number, pLocal?: boolean): string

        /**
         * Loads the resource of type `pType` with the name `pName` and then calls the function `pFunc`.
         *
         * @env Client | Server
         * @param {string} pType - Type of file to load.
         * @param {string | number} pName - Name of file to load.
         * @param {Function} pFunc - Function to call after the resource has finished loading or failed to load.
         */
		loadResource(pType: string, pName: string | number, pFunc: Function): void

        /**
         * Returns a string containing the text inside of a loaded non-VS text file. The file must already be loaded to get the text.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of loaded file to get text of.
         * @returns {string} Returns a string containing the text inside of a loaded non-VS text file. The file must already be loaded to get the text.
         */
		getFileText(pName: string | number): string

	}



	/**
	 * Extended mathematical utility functions provided by the Vylocity engine.
	 * Accessible globally via `Math` or via `VYLO.Math`.
	 */
	interface Math {

		/**
		 * Creates a two-dimensional matrix array populated with the supplied values.
		 *
		 * @env Client | Server
		 * @param {number} pXLen - Number of rows (outer array length).
		 * @param {number} pYLen - Number of columns (inner array length).
		 * @param {...(number | string)[]} pValues - Optional sequence of numeric values or numeric strings to populate each matrix entry `[x][y]`.
		 * @returns {any[][]} A 2D array representation.
		 *
		 * @example
		 * ```ts
		 * const matrix = Math.getMatrix(2, 2, 1, 2, 3, 4);
		 * // returns [[1, 2], [3, 4]]
		 * ```
		 */
		getMatrix(pXLen: number, pYLen: number, ...pValues: (number | string)[]): any[][];

		/**
		 * Generates a pseudo-random integer between `pNum1` and `pNum2` (inclusive), or a random float between `0` and `1` if no arguments are passed.
		 *
		 * - If no arguments: returns `Math.random()` (float `[0, 1)`).
		 * - If one argument `pNum1`: returns random integer between `0` and `pNum1` (inclusive).
		 * - If two arguments `pNum1` and `pNum2`: returns random integer between `pNum1` and `pNum2` (inclusive).
		 *
		 * @env Client | Server
		 * @param {number} [pNum1] - Lower bound (or upper bound if `pNum2` is omitted).
		 * @param {number} [pNum2] - Upper bound.
		 * @returns {number} The generated random number.
		 *
		 * @example
		 * ```ts
		 * const roll = Math.rand(1, 6); // Random integer 1 through 6
		 * const val = Math.rand(10);    // Random integer 0 through 10
		 * ```
		 */
		rand(pNum1?: number, pNum2?: number): number;

		/**
		 * Generates a pseudo-random floating point number between `pNum1` and `pNum2`.
		 *
		 * - If no arguments: returns `Math.random()`.
		 * - If one argument `pNum1`: returns float between `0` and `pNum1 + 1`.
		 * - If two arguments `pNum1` and `pNum2`: returns float between `pNum1` and `pNum2`.
		 *
		 * @env Client | Server
		 * @param {number} [pNum1] - Lower bound (or upper bound if `pNum2` is omitted).
		 * @param {number} [pNum2] - Upper bound.
		 * @returns {number} The generated random float.
		 *
		 * @example
		 * ```ts
		 * const speed = Math.randFloat(1.5, 3.5);
		 * ```
		 */
		randFloat(pNum1?: number, pNum2?: number): number;

		/**
		 * Rounds a floating-point number to a specified number of decimal places.
		 *
		 * @env Client | Server
		 * @param {number} pNum - Number to round.
		 * @param {number} [pDecimal=0] - Number of decimal places to preserve (default `0`).
		 * @returns {number} The rounded floating-point number.
		 *
		 * @example
		 * ```ts
		 * Math.roundFloat(3.14159, 2); // 3.14
		 * ```
		 */
		roundFloat(pNum: number, pDecimal?: number): number;

		/**
		 * Performs a percentage-based probability check.
		 *
		 * Returns `true` if a random check between 0 and 100 succeeds given percentage `pProb` (0-100), otherwise `false`.
		 *
		 * @env Client | Server
		 * @param {number} pProb - Probability percentage between 0 and 100 (e.g. 50 for a 50% chance).
		 * @returns {boolean} `true` if the roll succeeds; otherwise `false`.
		 *
		 * @example
		 * ```ts
		 * if (Math.prob(25)) {
		 *     // 25% chance of critical hit
		 * }
		 * ```
		 */
		prob(pProb: number): boolean;

		/**
		 * Clamps a numeric value between a minimum and maximum boundary.
		 *
		 * @env Client | Server
		 * @param {number} pVal - The numeric value to clamp.
		 * @param {number} pMin - The lower boundary.
		 * @param {number} pMax - The upper boundary.
		 * @returns {number} Clamped value within `[pMin, pMax]`.
		 *
		 * @example
		 * ```ts
		 * const health = Math.clamp(currentHealth - damage, 0, maxHealth);
		 * ```
		 */
		clamp(pVal: number, pMin: number, pMax: number): number;

		/**
		 * Linearly interpolates between two numbers `pA` and `pB` by factor `pT`.
		 *
		 * Formula: `pA * (1 - pT) + pB * pT`.
		 *
		 * @env Client | Server
		 * @param {number} pA - Starting value.
		 * @param {number} pB - Ending value.
		 * @param {number} pT - Interpolation weight (typically between 0 and 1).
		 * @returns {number} The interpolated value.
		 *
		 * @example
		 * ```ts
		 * const currentX = Math.lerp(startX, targetX, 0.1);
		 * ```
		 */
		lerp(pA: number, pB: number, pT: number): number;

		/**
		 * Normalizes a value `pVal` within range `[pMin, pMax]` to a `0` to `1` range.
		 *
		 * Formula: `(pVal - pMin) / (pMax - pMin)`.
		 *
		 * @env Client | Server
		 * @param {number} pVal - Value to normalize.
		 * @param {number} pMin - Minimum range value.
		 * @param {number} pMax - Maximum range value.
		 * @returns {number} Normalized value between 0 and 1.
		 *
		 * @example
		 * ```ts
		 * const ratio = Math.normalize(50, 0, 200); // 0.25
		 * ```
		 */
		normalize(pVal: number, pMin: number, pMax: number): number;

		/**
		 * Remaps a number from one numeric range `[pLow1, pHigh1]` to another `[pLow2, pHigh2]`.
		 *
		 * Formula: `pLow2 + (pVal - pLow1) * (pHigh2 - pLow2) / (pHigh1 - pLow1)`.
		 *
		 * @env Client | Server
		 * @param {number} pVal - Value to remap.
		 * @param {number} pLow1 - Lower bound of the source range.
		 * @param {number} pHigh1 - Upper bound of the source range.
		 * @param {number} pLow2 - Lower bound of the target range.
		 * @param {number} pHigh2 - Upper bound of the target range.
		 * @returns {number} The remapped value.
		 *
		 * @example
		 * ```ts
		 * const mapped = Math.remap(5, 0, 10, 0, 100); // 50
		 * ```
		 */
		remap(pVal: number, pLow1: number, pHigh1: number, pLow2: number, pHigh2: number): number;

	}



	/** The util object. */
	type Util = {

		/**
		 * Returns `pVal` converted to a float number.
		 *
		 * @env Client | Server
		 * @param {string | number} pVal - Value to get number from.
		 * @returns {number} Returns `pVal` converted to a float number.
		 */
		parseFloat(pVal: string | number): number

        /**
         * Unzips gzipped data and returns the unzipped data.
         *
         * @env Client | Server
         * @param {string | Uint8Array | ArrayBuffer} pData - Gzipped data.
         * @returns {string} Returns the unzipped data.
         */
		gzUnzip(pData: string | Uint8Array | ArrayBuffer): string

        /**
         * Returns a string containing the type of variable.
         *
         * @env Client | Server
         * @param {any} pVar - Variable to check.
         * @returns {string} Returns a string containing the type of variable.
         */
		getVariableType(pVar: any): string

        /**
         * Handles either a stored callback function or a "callback array" and returns the results.
         *
         * @env Client | Server
         * @param {Function | [Function, any, any[]?]} [pCallback] - (Optional) Reference to a function or a "callback array" which contains the reference to the callback function, followed by the call owner (the `this` of the function call), then an optional array of arguments. Example: `[this.func, this, [arg1, arg2]]`.
         * @returns {any} Returns the results.
         */
		handleCallback(pCallback?: Function | [Function, any, any[]?]): any

        /**
         * Converts `pRad` into degrees and returns the number.
         *
         * @env Client | Server
         * @param {number} pRad - Radians to convert.
         * @returns {number} Returns the number in degrees.
         */
		toDegrees(pRad: number): number

        /**
         * Returns `pVal` converted to a number value.
         *
         * @env Client | Server
         * @param {any} pVal - Value to get number from.
         * @returns {number} Returns `pVal` converted to a number value.
         */
		toNumber(pVal: any): number

        /**
         * Creates an object from `pString` and returns it if the string is a valid object format.
         *
         * @env Client | Server
         * @param {string} pString - String to create an object from. Example: ( "`{'name': 'test', 'value1': 1}`" ).
         * @returns {object | undefined} Returns it if the string is a valid object format.
         */
		stringToObject<T = Record<string, any>>(pString: string): T | undefined

        /**
         * Returns new text that has been encoded to make it a valid URI component.
         *
         * @env Client | Server
         * @param {string} pText - Text to encode.
         * @returns {string} Returns new text that has been encoded to make it a valid URI component.
         */
		encodeURIComponent(pText: string): string

        /**
         * Returns `true` if value is a string. Returns `false` if value is not a string.
         *
         * @env Client | Server
         * @param {unknown} pVal - Value to check for string.
         * @returns {boolean} Returns `true` if value is a string. Returns `false` if value is not a string.
         */
		isString(pVal: unknown): pVal is string

        /**
         * Returns `true` if value is an object. Returns `false` if value is not an object.
         *
         * @env Client | Server
         * @param {unknown} pVal - Value to check for object.
         * @returns {boolean} Returns `true` if value is an object. Returns `false` if value is not an object.
         */
		isObject(pVal: unknown): pVal is object

        /**
         * Text to encode HTML tags of.
         *
         * @env Client | Server
         * @param {string} pText - Text to encode HTML tags of.
         * @returns {string} Returns a new text with HTML tags encoded; `<` becomes `&lt;`, `>` becomes `&gt;`, `/` becomes `&#47;`.
         */
		encodeWebTags(pText: string): string

        /**
         * Returns new text that has been decoded.
         *
         * @env Client | Server
         * @param {string} pText - Text to decode.
         * @returns {string} Returns new text that has been decoded.
         */
		decodeURI(pText: string): string

        /**
         * Converts `pDeg` into radians and returns the number.
         *
         * @env Client | Server
         * @param {number} pDeg - Degrees to convert.
         * @returns {number} Returns the number in radians.
         */
		toRadians(pDeg: number): number

        /**
         * Returns `true` if value is an array. Returns `false` if value is not an array.
         *
         * @env Client | Server
         * @param {unknown} pVal - Value to check for array.
         * @returns {boolean} Returns `true` if value is an array. Returns `false` if value is not an array.
         */
		isArray(pVal: unknown): pVal is any[]

        /**
         * Returns an array containing the values of `pO`.
         *
         * @env Client | Server
         * @param {object} pO - Object to get values from.
         * @returns {any[]} Returns an array containing the values of `pO`.
         */
		getObjectValues<T = any>(pO: object): T[]

        /**
         * Copies all variables from `pC` and gives them to `pO`. Warning: trying to copy an object that has recursive references will reach a stack limit and throw an error.
         *
         * @env Client | Server
         * @param {object} pO - Object to set variables of.
         * @param {object} pC - Object to copy variables from.
         * @param {boolean} [pD] - (Optional) Set this if copying from a Vylocity Object or an object that references another Vylocity Object.
         */
		copyObject<T extends object = object>(pO: T, pC: object, pD?: boolean): T

        /**
         * Returns new text that has been encoded to make it a valid URI.
         *
         * @env Client | Server
         * @param {string} pText - Text to encode.
         * @returns {string} Returns new text that has been encoded to make it a valid URI.
         */
		encodeURI(pText: string): string

        /**
         * Returns a randomly picked item from `pVal1` (if an array and `pVal2` is not set) or all the arguments provided.
         *
         * @env Client | Server
         * @param {T[] | T} pVal1 - First value to pick from or an array to pick from.
         * @param {...T[]} [pValN] - Additional values to pick from.
         * @returns {T} Returns a randomly picked item.
         */
		pick<T = any>(pVal1: T[] | T, ...pValN: T[]): T

        /**
         * Returns `pVal` converted to a whole number.
         *
         * @env Client | Server
         * @param {string | number} pVal - Value to get number from.
         * @param {number} [pRadix] - Number between 2 and 36 to use as the base for the supplied number; 10 for normal base (0-9), 16 for hex (0-F).
         * @returns {number} Returns `pVal` converted to a whole number.
         */
		parseInt(pVal: string | number, pRadix?: number): number

        /**
         * Returns a regular expression pattern from the `pPattern` string using the `pFlags` flag.
         *
         * @env Client | Server
         * @param {string | RegExp} pPattern - Regular expression (regex) pattern string.
         * @param {string} [pFlags] - (Optional) `g` = global match; `i` = ignore case; `m` = multiline, treat start and end characters (^ and $) as working over multiple lines.
         * @returns {RegExp} Returns a regular expression pattern from the `pPattern` string using the `pFlags` flag.
         */
		regExp(pPattern: string | RegExp, pFlags?: string): RegExp

        /**
         * Returns char or string associated with the code `pCode`.
         *
         * @env Client | Server
         * @param {...number[]} pCodes - Code(s) to get character of. Can use multiple codes which returns the codes as a string.
         * @returns {string} Returns the codes as a string.
         */
		getCharFromCode(...pCodes: number[]): string

        /**
         * Returns `true` if value is a number. Returns `false` if value is not a number.
         *
         * @env Client | Server
         * @param {unknown} pVal - Value to check for number.
         * @returns {boolean} Returns `true` if value is a number. Returns `false` if value is not a number.
         */
		isNumber(pVal: unknown): pVal is number

        /**
         * Returns new style as text after being processed by the engine, translating vyi: and vyf: tags and so on.
         *
         * @env Client | Server
         * @param {string} pStyle - String containing web styles.
         * @returns {string} Returns new style as text after being processed by the engine, translating vyi: and vyf: tags and so on.
         */
		getWebStyle(pStyle: string): string

        /**
         * Returns `true` if value is a function. Returns `false` if value is not a function.
         *
         * @env Client | Server
         * @param {unknown} pVal - Value to check for function.
         * @returns {boolean} Returns `true` if value is a function. Returns `false` if value is not a function.
         */
		isFunction(pVal: unknown): pVal is (...args: any[]) => any

        /**
         * Returns an array containing the values all of key names (variable names) of `pO`.
         *
         * @env Client | Server
         * @param {object} pO - Object to get key names from.
         * @returns {string[]} Returns an array containing the values all of key names (variable names) of `pO`.
         */
		getObjectKeys(pO: object): string[]

        /**
         * Converts an ArrayBuffer to a base64 string.
         *
         * @env Client | Server
         * @param {ArrayBuffer} pArrBuff - ArrayBuffer to convert to base64.
         * @returns {string} Base64 string.
         */
		arrayBufferToBase64(pArrBuff: ArrayBuffer): string

        /**
         * Returns `pVal` converted to a string value.
         *
         * @env Client | Server
         * @param {any} pVal - Value to get string from.
         * @returns {string} Returns `pVal` converted to a string value.
         */
		toString(pVal: any): string

        /**
         * Returns new text that has been decoded.
         *
         * @env Client | Server
         * @param {string} pText - Text to decode.
         * @returns {string} Returns new text that has been decoded.
         */
		decodeURIComponent(pText: string): string

        /**
         * Gets all the variables that can be saved and returns a new object that contains those values which can then be saved (no internal engine variables, no functions, no references to Vylocity Objects).
         *
         * @env Client | Server
         * @param {object} pS - Object to get saveable values from.
         * @param {object} [pO] - (Optional) Alter this object and return it as the return object.
         * @returns {Record<string, any>} Returns a new object that contains those values which can then be saved (no internal engine variables, no functions, no references to Vylocity Objects).
         */
		getSaveObject<T extends object = Record<string, any>>(pS: object, pO?: object): T

        /**
         * Returns the numeric compass index of the specified direction name in the engine's direction lookup table.
         *
         * @env Client | Server
         * @param {Direction | string} pDir - Direction name.
         * @returns {number} Numeric compass index of direction.
         */
		getDirNum(pDir: Direction | string): number

	}



	/** The event object. */
	type Event = {

		/**
		 * Remove `pO` to the ticker.
		 *
		 * @env Client | Server
		 * @param {Diob} pO - Reference to the object.
		 */
		removeTicker(pO: Diob | Object | object): void

        /**
         * Add `pO` to the ticker.
         *
         * @env Client | Server
         * @param {Diob | Object | object} pO - Reference to the object.
         * @param {object} [pS] - (Optional) An object containing settings for this object's ticker.
         */
		addTicker(pO: Diob | Object | object, pS?: object): void

        /**
         * Forces a thread to stop doing its executions.
         *
         * @env Client | Server
         * @param {boolean} pVal - Variable linking to the thread to be interrupted.
         */
		interruptThread(pVal: boolean): void

        /**
         * Returns an array of all active objects with tickers running.
         *
         * @env Client | Server
         * @returns {Diob[] | Object[]} Returns an array of all active objects with tickers running.
         */
		getTickers(): Diob[] | Object[]

        /**
         * Prevents a specific spawn from occuring.
         *
         * @env Client | Server
         * @param {boolean} pVal - Variable linking to the spawn to be interrupted.
         */
		interruptSpawn(pVal: boolean): void

        /**
         * Pauses or resumes all tickers.
         *
         * @env Client | Server
         * @param {boolean} [pBool] - (Optional) True or `false`.
         */
		toggleTicker(pBool?: boolean): void

	}



	/** The file object. */
	type File = {

		/**
		 * Checks if `pFile` exists.
		 *
		 * @env Server
		 * @param {string} pFile - Path to the file or directory to check.
		 * @param {Function} pFunc - Function to call after `pPath` has been checked. First argument `pExists` determines if `pPath` exists or not.
		 */
		exists(pFile: string, pFunc: Function): void

        /**
         * Asynchronously retrieves filesystem metadata and statistics for the file or directory located at `pPath`.
         *
         * @env Server
         * @param {string} pPath - Path to the file or directory (relative to the game `files/` root).
         * @param {(pStats?: FileStats, pErr?: any) => void} pFunc - Callback invoked with the `FileStats` object and any error encountered.
         *
         * @example
         * ```ts
         * VYLO.File.getStats('saves/player1.json', (stats, err) => {
         *     if (!err && stats) {
         *         console.log('File size in bytes:', stats.size);
         *     }
         * });
         * ```
         */
		getStats(pPath: string, pFunc: (pStats?: FileStats, pErr?: any) => void): void

        /**
         * Reads the data and returns the data in `pFunc`.
         *
         * @env Server
         * @param {string} pFile - Path to the file.
         * @param {Function} pFunc - Function to call after reading is complete. First argument `pData` is set to the data read. Second arg `pErr` is set if an error has occured.
         * @returns {void} Returns the data in `pFunc`.
         */
		readText(pFile: string, pFunc: Function): void

        /**
         * Creates `pFile` if it does not exist and then saves the `pSave` object to the file. Overwrites existing data.
         *
         * @env Server
         * @param {string} pFile - Path to the file.
         * @param {object} pSave - Object to save to the file for example ( `{'value1': 1, 'value2': 2}` ).
         * @param {Function} pFunc - Function to call after writing is complete. First argument `pErr` is set if an error has occured.
         */
		writeSave(pFile: string, pSave: object, pFunc: Function): void

        /**
         * Creates `pFile` if needed and then add `pData` to the end of the file.
         *
         * @env Server
         * @param {string} pFile - Path to the file.
         * @param {string} pData - Text to add to the end of `pFile`.
         * @param {Function} pFunc - Function to call after appending is complete. First argument `pErr` is set if an error has occured.
         */
		appendText(pFile: string, pData: string, pFunc: Function): void

        /**
         * Provides an array of files in `pPath` directory.
         *
         * @env Server
         * @param {string} pPath - Path to the directory.
         * @param {Function} pFunc - Function to call after the directory has been read. First argument `pFiles` is an array of the files in the directory, second argument `pErr` is an error if there is one.
         */
		readDir(pPath: string, pFunc: Function): void

        /**
         * Deletes the file or directory at `pPath`. All child files are also deleted.
         *
         * @env Server
         * @param {string} pPath - Path to the file or directory to delete.
         * @param {Function} pFunc - Function to call after `pPath` has been removed.
         */
		remove(pPath: string, pFunc: Function): void

        /**
         * Inspects `pPath` and invokes `pFunc` with a `FileStats` object describing file attributes and directory status.
         *
         * @env Server
         * @param {string} pPath - Path to the file or directory to inspect.
         * @param {(pStat?: FileStats, pErr?: any) => void} pFunc - Callback invoked with `FileStats` and error object.
         *
         * @example
         * ```ts
         * VYLO.File.stat('data', (stat, err) => {
         *     if (stat?.isDirectory()) {
         *         console.log('Path is a directory');
         *     }
         * });
         * ```
         */
		stat(pPath: string, pFunc: (pStat?: FileStats, pErr?: any) => void): void

        /**
         * Creates a new directory at the location of `pPath`.
         *
         * @env Server
         * @param {string} pPath - Path to create the new directory.
         * @param {Function} pFunc - Function to call after the directory has been made.
         */
		makeDir(pPath: string, pFunc: Function): void

        /**
         * Returns an array of file names inside the `pPath` dir and calls `pFunc` with the first argument being the array and the second being an error (if any).
         *
         * @env Server
         * @param {string} pPath - Path to the directory to get contents of.
         * @param {Function} pFunc - Function to call after.
         * @returns {string[]} Returns an array of file names inside the `pPath` dir and calls `pFunc` with the first argument being the array and the second being an error (if any).
         */
		getDir(pPath: string, pFunc: Function): string[]

        /**
         * Reads `pFile` JSON save data and passes the parsed object to `pFunc`.
         *
         * @env Server
         * @param {string} pFile - Path to the file.
         * @param {(pData?: Record<string, any>, pErr?: any) => void} pFunc - Callback receiving the parsed data object or error.
         *
         * @example
         * ```ts
         * VYLO.File.readSave('saves/profile.json', (data, err) => {
         *     if (!err && data) {
         *         console.log('Loaded save profile:', data);
         *     }
         * });
         * ```
         */
		readSave(pFile: string, pFunc: (pData?: Record<string, any>, pErr?: any) => void): void

        /**
         * Creates `pFile` if needed and then writes `pData` to the file. Overwrites existing data.
         *
         * @env Server
         * @param {string} pFile - Path to the file.
         * @param {string} pData - Text to put into the file.
         * @param {Function} pFunc - Function to call after writing is complete. First argument `pErr` is set if an error occurs.
         */
		writeText(pFile: string, pData: string, pFunc?: (pErr?: any) => void): void

		/**
		 * Asynchronously writes resource data directly into the game's `resources/` directory.
		 *
		 * @env Server
		 * @param {string} pFile - Resource file path relative to the `resources/` folder.
		 * @param {any} pData - Data content to write to the file.
		 * @returns {Promise<void>}
		 */
		writeResource(pFile: string, pData: any): Promise<void>

	}



	/**
	 * Represents an icon atlas containing multiple icons and textures.
	 */
	interface IconAtlas {
		/** Name of the icon atlas. */
		name: string;
		/** Underlying atlas texture. */
		texture: any;
		/**
		 * Adds one or more icons to this atlas.
		 *
		 * @env Client
		 * @param {...Icon[]} pIcons - Icon instances to add.
		 */
		addIcon(...pIcons: Icon[]): void;
		/**
		 * Inserts one or more icons at the specified index or before an icon.
		 *
		 * @env Client
		 * @param {number | Icon} pIndex - Insertion index or target icon.
		 * @param {...Icon[]} pIcons - Icons to insert.
		 */
		insertIcon(pIndex: number | Icon, ...pIcons: Icon[]): void;
		/**
		 * Creates and adds a new icon to this atlas.
		 *
		 * @env Client
		 * @param {any} pData - Image data or URL.
		 * @param {string} pName - Name of the icon.
		 * @param {number} [pW] - Width in pixels.
		 * @param {number} [pH] - Height in pixels.
		 * @param {number} [pDelay] - Animation frame delay in milliseconds.
		 * @returns {Icon} The newly created Icon instance.
		 */
		newIcon(pData: any, pName: string, pW?: number, pH?: number, pDelay?: number): Icon;
		/**
		 * Removes one or more icons from this atlas.
		 *
		 * @env Client
		 * @param {...(Icon | string)[]} pIcons - Icons or icon names to remove.
		 */
		removeIcon(...pIcons: (Icon | string)[]): void;
		/**
		 * Removes icons within the specified index range.
		 *
		 * @env Client
		 * @param {number} [pStart] - Start index.
		 * @param {number} [pEnd] - End index.
		 */
		removeIconAt(pStart?: number, pEnd?: number): void;
		/**
		 * Destroys this icon atlas and frees resources.
		 *
		 * @env Client
		 */
		destroy(): void;
		/**
		 * Clones this icon atlas.
		 *
		 * @env Client
		 * @returns {IconAtlas}
		 */
		clone(): IconAtlas;
		/**
		 * Returns an array of icon names in this atlas, optionally matching a regular expression.
		 *
		 * @env Client
		 * @param {RegExp} [pRegex] - Optional regex filter.
		 * @returns {string[]} Array of icon names.
		 */
		getIconNames(pRegex?: RegExp): string[];
		[key: string]: any;
	}

	/** The icon object. */
	type Icon = {

		/**
		 * Read-only flag indicating this is an Icon.
		 *
		 * @env Client
		 */
		readonly isIcon?: boolean;

		/**
		 * Parent state icon if this icon is an icon state.
		 *
		 * @env Client
		 */
		readonly isState?: any;

		/**
		 * True if this icon is an animation frame of another icon.
		 *
		 * @env Client
		 */
		readonly isFrame?: boolean;

		/**
		 * Underlying rendering texture (e.g. PIXI.Texture).
		 *
		 * @env Client
		 */
		texture?: any;

		/**
		 * Base texture of the icon atlas.
		 *
		 * @env Client
		 */
		readonly atlasTexture?: any;

		/**
		 * The IconAtlas instance this icon belongs to.
		 *
		 * @env Client
		 */
		atlas?: any;

		/**
		 * Name of the icon atlas this icon belongs to.
		 *
		 * @env Client
		 */
		atlasName?: string;

		/**
		 * Name of this icon.
		 *
		 * @env Client
		 */
		iconName?: string;

		/**
		 * State name of this icon (empty string for default state).
		 *
		 * @env Client
		 */
		iconState?: string;

		/**
		 * Width of this icon in pixels.
		 *
		 * @env Client
		 */
		width?: number;

		/**
		 * Height of this icon in pixels.
		 *
		 * @env Client
		 */
		height?: number;

		/**
		 * Frame delay duration in milliseconds.
		 *
		 * @env Client
		 */
		frameDelay?: number;

		/**
		 * Parent icon or state if nested.
		 *
		 * @env Client
		 */
		parent?: any;

		/**
		 * Image data source or base64 data URL.
		 *
		 * @env Client
		 */
		imageData?: any;

		/**
		 * Adds one or more state icons to this icon.
		 *
		 * @env Client
		 * @param {...Icon[]} pIcons - Icon instances to add as states.
		 */
		addState?(...pIcons: Icon[]): void;

		/**
		 * Inserts one or more state icons at the specified index.
		 *
		 * @env Client
		 * @param {number | Icon} pIndex - Insertion index or target icon.
		 * @param {...Icon[]} pIcons - Icon instances to insert.
		 */
		insertState?(pIndex: number | Icon, ...pIcons: Icon[]): void;

		/**
		 * Removes one or more state icons from this icon.
		 *
		 * @env Client
		 * @param {...(Icon | string)[]} pIcons - States or state names to remove.
		 */
		removeState?(...pIcons: (Icon | string)[]): void;

		/**
		 * Removes state icons within the specified index range.
		 *
		 * @env Client
		 * @param {number} [pStart] - Start index.
		 * @param {number} [pEnd] - End index.
		 */
		removeStateAt?(pStart?: number, pEnd?: number): void;

		/**
		 * Creates and adds a new state to this icon.
		 *
		 * @env Client
		 * @param {any} pData - Image data or URL.
		 * @param {string} pName - Name of the new state.
		 * @param {number} [pDelay] - Animation frame delay in milliseconds.
		 * @returns {Icon} The newly created state Icon.
		 */
		newState?(pData: any, pName: string, pDelay?: number): Icon;

		/**
		 * Adds one or more frame icons to this icon.
		 *
		 * @env Client
		 * @param {...Icon[]} pIcons - Icon instances to add as animation frames.
		 */
		addFrame?(...pIcons: Icon[]): void;

		/**
		 * Inserts one or more frame icons at the specified index.
		 *
		 * @env Client
		 * @param {number | Icon} pIndex - Insertion index or target frame.
		 * @param {...Icon[]} pIcons - Frame instances to insert.
		 */
		insertFrame?(pIndex: number | Icon, ...pIcons: Icon[]): void;

		/**
		 * Removes one or more frame icons from this icon.
		 *
		 * @env Client
		 * @param {...Icon[]} pIcons - Frame instances to remove.
		 */
		removeFrame?(...pIcons: Icon[]): void;

		/**
		 * Removes animation frames within the specified index range.
		 *
		 * @env Client
		 * @param {number} [pStart] - Start frame index.
		 * @param {number} [pEnd] - End frame index.
		 */
		removeFrameAt?(pStart?: number, pEnd?: number): void;

		/**
		 * Creates and adds a new animation frame to this icon.
		 *
		 * @env Client
		 * @param {any} pData - Image data or URL.
		 * @param {number} [pDelay] - Frame delay duration in milliseconds.
		 * @returns {Icon} The newly created frame Icon.
		 */
		newFrame?(pData: any, pDelay?: number): Icon;

		/**
		 * Removes this icon from its parent atlas, state, or frame container.
		 *
		 * @env Client
		 */
		remove?(): void;

		/**
		 * Destroys this icon and frees associated texture and memory.
		 *
		 * @env Client
		 * @param {boolean} [pSkip] - Whether to skip removing from parent tracking.
		 */
		destroy?(pSkip?: boolean): void;

		/**
		 * Returns the raw base64 data URL string for this icon's image.
		 *
		 * @env Client
		 * @returns {string} Data URL string.
		 */
		getDataURL?(): string;

		/**
		 * Retrieves the raw pixel ImageData of this icon.
		 *
		 * @env Client
		 * @returns {any} ImageData instance.
		 */
		getRawData?(): any;

		/**
		 * Updates this icon's pixels using the provided ImageData.
		 *
		 * @env Client
		 * @param {any} pData - ImageData object.
		 * @returns {Promise<void>}
		 */
		setRawData?(pData: any): Promise<void>;

		/**
		 * Sets this icon's image content from an image URL.
		 *
		 * @env Client
		 * @param {string} pData - Image URL or data URL.
		 * @returns {Promise<void>}
		 */
		setDataFromURL?(pData: string): Promise<void>;

		/**
		 * Sets this icon's image content from a file path.
		 *
		 * @env Client
		 * @param {string} pPath - File path to the image.
		 * @returns {Promise<void>}
		 */
		setDataFromFile?(pPath: string): Promise<void>;

		/**
		 * Sets this icon's image content from a registered resource.
		 *
		 * @env Client
		 * @param {string} pType - Resource type.
		 * @param {string} pName - Resource name.
		 * @returns {Promise<void>}
		 */
		setDataFromResource?(pType: string, pName: string): Promise<void>;

		/**
		 * Creates a clone of this icon.
		 *
		 * @env Client
		 * @returns {Icon}
		 */
		clone?(): Icon;

		/**
		 * Returns an array of state names belonging to this icon.
		 *
		 * @env Client
		 * @param {RegExp} [pRegex] - Optional regex filter.
		 * @returns {string[]} Array of state names.
		 */
		getStateNames?(pRegex?: RegExp): string[];

		/**
		 * Creates a new blank icon named `pIcon` inside of the atlas `pAtlas`.
		 *
		 * @env Client | Server
		 * @param {string} pAtlas - Name of the icon atlas to add the icon to.
		 * @param {string} pIcon - Name of the new icon.
		 * @param {number} [pWidth] - (Optional) Width of the new icon. Uses tileWidth if not defined.
		 * @param {number} [pHeight] - (Optional) Height of the new icon. Uses tileHeight if not defined.
		 */
		newIcon(pAtlas: string, pIcon: string, pWidth?: number, pHeight?: number): void

        /**
         * Alters color of the specified icon(s) based on the specified info. For example `{'type': 'normal', 'red': 100}` or just `{'red': 100}` would add 100 red to all pixels; `{'red': -100}` would reduce 100 red from all pixels; `{'type': 'swap', 'red': 100, 'blue': 100, 'green': 100, 'newRed': 200}` would find all pixels with the color rgb(100, 100, 100) and replace it with rgb(200, 100, 100). If any of the colors are not included, such as `alpha`, it will ignore that color, otherwise if it is set, it will take that color into account; `{'type': 'multiply', 'hex': '#FFF'}` would multiply blend white onto the icon, you can use `hex` for the red, green, and blue values. For `swap` you can use `colors` which should equal an array of objects containing all of the color swaps you want to do if there is more than one.
         *
         * @env Client | Server
         * @param {object} pInfo - An object containing information to be used for the color alteration.
         * @param {string} pAtlas - Name of the icon atlas involved.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} [pState] - (Optional) Name of the icon state involved.
         * @param {number} [pFrame] - (Optional) Number of the frame involved.
         * @param {Function} [pFunc] - (Optional) Function to call after the icon has changed. Passes an error as the first argument if there was en error.
         */
		alterColor(pInfo: object, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

        /**
         * Returns the pixel dimensions `{ width, height }` of the specified icon/state/frame, or undefined if not found.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas.
         * @param {string} pIcon - Name of the icon.
         * @param {string} [pState] - (Optional) Name of the icon state.
         * @param {number} [pFrame] - (Optional) 1-based frame number index.
         * @returns {Size2D | undefined} Dimensions containing `width` and `height` in pixels, or undefined if the icon does not exist.
         *
         * @example
         * ```ts
         * const size = VYLO.Icon.getIconSize('players', 'warrior', 'walk', 1);
         * if (size) {
         *     console.log(`Icon frame dimensions: ${size.width}x${size.height}`);
         * }
         * ```
         */
		getIconSize(pAtlas: string, pIcon: string, pState?: string, pFrame?: number): Size2D | undefined

        /**
         * Returns a string containing the base64 data url for the icon which can then be used to display the icon as an image in HTML.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas.
         * @param {string} pIcon - Name of the icon.
         * @param {string} [pState] - (Optional) Name of the state.
         * @param {number} [pFrame] - (Optional) Number of the frame.
         * @returns {string} Returns a string containing the base64 data url for the icon which can then be used to display the icon as an image in HTML.
         */
		getDataURL(pAtlas: string, pIcon: string, pState?: string, pFrame?: number): string

        /**
         * Grabs an object with the width and height of the icon and an array of pixel data for the entire icon. The array of pixel data can then be changed and used elsewhere or drawn onto another icon. To read the width and height you could use object.width and object.height, where object is the object returned by the function. The object data array is as follows: object.data[0] is the red value (0-255) of the pixel at 0,0, object.data[1] is the green value (0-255) of the pixel at 0,0, object.data[2] is the blue value (0-255) of the pixel at 0,0, and object.data[3] is the alpha value (0-255) of the pixel at 0,0. Then object.data[4], object.data[5], object.data[6], and object.data[7] are the respective values for the pixel at 1,0. This trend continues through the whole array for every pixel.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas involved.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} [pState] - (Optional) Name of the icon state involved.
         * @param {number} [pFrame] - (Optional) Number of the frame involved.
         */
		getRawData(pAtlas: string, pIcon: string, pState?: string, pFrame?: number): ArrayBuffer

        /**
         * Change frame `pFrame` delay to `pDelay`.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas to add the frame to.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} pState - Name of the icon state involved.
         * @param {number} pFrame - Frame number.
         * @param {number} pDelay - Delay number.
         */
		setFrameDelay(pAtlas: string, pIcon: string, pState: string, pFrame: number, pDelay: number): void

        /**
         * Get delay of `pFrame`.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas to add the frame to.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} pState - Name of the icon state involved.
         * @param {number} pFrame - Frame number.
         */
		getFrameDelay(pAtlas: string, pIcon: string, pState: string, pFrame: number): void

        /**
         * Loads all the images for each specified icon. Icon images are loaded when an icon or state is shown to a client, if you plan on altering an icon that the client hasn't seen yet, you'll want to use this function to cache it first.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas.
         * @param {string} [pIcon] - (Optional) Name of the icon.
         * @param {Function} [pFunc] - (Optional) Function called after the images have been loaded and cached.
         */
		cacheImage(pAtlas: string, pIcon?: string, pFunc?: Function): void

        /**
         * Returns an array of strings containing the names of all the icons in `pAtlas`.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas.
         * @returns {string[]} Returns an array of strings containing the names of all the icons in `pAtlas`.
         */
		getIconNames(pAtlas: string): string[]

        /**
         * Returns number of frames the icon has.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas to add the frame to.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} pState - Name of the icon state involved.
         * @returns {number} Returns number of frames the icon has.
         */
		getFrameCount(pAtlas: string, pIcon: string, pState: string): number

        /**
         * Creates a new blank frame. If `pState` is defined the frame is added to the state, otherwise it is added to `pIcon`.
         *
         * @env Client | Server
         * @param {number} pDelay - Number of milliseconds to give the frame delay. Null for default, which is 100.
         * @param {string} pAtlas - Name of the icon atlas to add the frame to.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} [pState] - (Optional) Name of the icon state involved.
         */
		newFrame(pDelay: number, pAtlas: string, pIcon: string, pState?: string): void

        /**
         * Creates a clone of an atlas, icon, icon state, or frame.
         *
         * @env Client | Server
         * @param {object} pArgs - An object containing the information for the clone. Useable varables: `atlas`, `newAtlas`, `icon`, `newIcon`, `state`, `newState`, and `frame`.
         */
		clone(pArgs: object): void

        /**
         * Creates a new blank icon state named `pState` for `pIcon` in the atlas `pAtlas`.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas to add the icon state to.
         * @param {string} pIcon - Name of the icon to add the icon state to.
         * @param {string} pState - Name of the new icon state.
         */
		newIconState(pAtlas: string, pIcon: string, pState: string): void

        /**
         * Executes 2D canvas drawing commands onto an icon, state, or frame image.
         *
         * @env Client | Server
         * @param {DrawCommandArgs | DrawCommandArgs[]} pArgs - A draw command configuration object or array of command objects.
         * @param {string} pAtlas - Target icon atlas name.
         * @param {string} pIcon - Target icon name.
         * @param {string} [pState] - Target icon state name (empty string for root).
         * @param {number} [pFrame] - Optional 1-based frame number index.
         * @param {Function} [pFunc] - Optional callback invoked when drawing is complete.
         *
         * @example
         * ```ts
         * VYLO.Icon.draw({
         *     type: 'fillRect',
         *     color: '#00ff00',
         *     x: 0,
         *     y: 0,
         *     width: 16,
         *     height: 16
         * }, 'items', 'potion', '', 1, () => {
         *     console.log('Icon draw completed');
         * });
         * ```
         */
		draw(pArgs: DrawCommandArgs | DrawCommandArgs[], pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

        /**
         * Changes the icon to match the pixel data given with `pData`.
         *
         * @env Client | Server
         * @param {unknown} pData - Pixel data object to use.
         * @param {string} pAtlas - Name of the icon atlas involved.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} [pState] - (Optional) Name of the icon state involved.
         * @param {number} [pFrame] - (Optional) Number of the frame involved.
         * @param {Function} [pFunc] - (Optional) Function to call after the icon data has changed and loaded.
         */
		setRawData(pData: unknown, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

        /**
         * Returns an array of strings containing the names of all the icon states belonging to the icon `pIcon` in icon atlas `pAtlas`.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the icon atlas.
         * @param {string} pIcon - Name of the icon.
         * @returns {string[]} Returns an array of strings containing the names of all the icon states belonging to the icon `pIcon` in icon atlas `pAtlas`.
         */
		getIconStateNames(pAtlas: string, pIcon: string): string[]

        /**
         * Create a new icon atlas with the name `pAtlas`.
         *
         * @env Client | Server
         */
		newAtlas(): void

        /**
         * Sets the image of the specified icon using the `pData` data URL.
         *
         * @env Client | Server
         * @param {string} pData - Text containing data URL.
         * @param {string} pAtlas - Name of the icon atlas.
         * @param {string} pIcon - Name of the icon.
         * @param {string} [pState] - (Optional) Name of the state.
         * @param {number} [pFrame] - (Optional) Number of the frame.
         * @param {Function} [pFunc] - (Optional) Function to call after the icon has changed. Passes an error as the first argument if there was en error.
         */
		setDataURL(pData: string, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

        /**
         * Applies a filter to the icon(s) involved. Possible filter types: `grayscale`, `invert`, `darken`, `lighten`.
         *
         * @env Client | Server
         * @param {object} pFilter - An object containing needed information for filter; `{'type': 'darken', 'value': 10}` would darken the image by 10.
         * @param {string} pAtlas - Name of the icon atlas involved.
         * @param {string} pIcon - Name of the icon involved.
         * @param {string} [pState] - (Optional) Name of the icon state involved.
         * @param {number} [pFrame] - (Optional) Number of the frame involved.
         * @param {Function} [pFunc] - (Optional) Function to call after the icon has changed. Passes an error as the first argument if there was en error.
         */
		applyFilter(pFilter: object, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

		/**
		 * Creates and returns a new rendering sprite (e.g. `PIXI.Sprite`) using the texture from the specified icon, state, or frame.
		 *
		 * @env Client
		 * @param {string} pAtlas - Name of the icon atlas.
		 * @param {string} pIcon - Name of the icon.
		 * @param {string} [pState] - Optional icon state name.
		 * @param {number} [pFrame] - Optional 1-based frame index number.
		 * @returns {any} A sprite display object referencing the icon texture.
		 */
		createSprite(pAtlas: string, pIcon: string, pState?: string, pFrame?: number): any

		/**
		 * Creates and returns a new graphics display object (e.g. `PIXI.Graphics`).
		 *
		 * @env Client
		 * @param {...any[]} pArgs - Optional constructor arguments passed to graphics initialization.
		 * @returns {any} A graphics canvas display instance.
		 */
		createGraphics(...pArgs: any[]): any

	}



	/** The map object. */
	type Map = {

		/**
		 * Read-only boolean flag indicating this is a Map instance.
		 *
		 * @env Client | Server
		 */
		readonly isMap?: boolean;

		/**
		 * Display name of this map.
		 *
		 * @env Client | Server
		 */
		name?: string;

		/**
		 * System identifier name of this map.
		 *
		 * @env Client | Server
		 */
		mapName?: string;

		/**
		 * Number of horizontal tile columns in this map.
		 *
		 * @env Client | Server
		 */
		xMax?: number;

		/**
		 * Number of vertical tile rows in this map.
		 *
		 * @env Client | Server
		 */
		yMax?: number;

		/**
		 * Total width of this map in pixels.
		 *
		 * @env Client | Server
		 */
		width?: number;

		/**
		 * Total height of this map in pixels.
		 *
		 * @env Client | Server
		 */
		height?: number;

		/**
		 * Resizes this map to the specified tile coordinates.
		 *
		 * @env Client | Server
		 * @param {number} pX - Horizontal size in tiles.
		 * @param {number} [pY] - Vertical size in tiles (defaults to pX).
		 * @param {string} [pTile] - Default tile type for new tiles.
		 */
		setSizeByCoords?(pX: number, pY?: number, pTile?: string): void;

		/**
		 * Returns number of tiles between `pA` and `pB`.
		 *
		 * @env Client | Server
		 * @param {Diob | Object} pA - Diob reference or object containing location information. Example: `{'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}`.
		 * @param {Diob | Object} pB - Diob reference or object containing location information. Example: `{'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}`.
		 * @returns {number} Returns number of tiles between `pA` and `pB`.
		 */
		getTileDist(pA: Diob | Object, pB: Diob | Object): number

		/**
		 * Returns an array of diobs on this map or on map `pMap` depending on the provided arguments.
		 * When called on a Map instance, `pType` can be passed as the first parameter.
		 *
		 * @env Client | Server
		 * @param {string} [pMapOrType] - Name of the map or type path filter.
		 * @param {string | boolean} [pTypeOrChild] - String containing type path or boolean for child types.
		 * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
		 * @param {Diob[]} [pAdd] - (Optional) If set, tiles and regions on the map will also be returned.
		 * @returns {Diob[]} Array of diobs matching the query.
		 */
		getDiobs(pMapOrType?: string, pTypeOrChild?: string | boolean, pChild?: boolean, pAdd?: Diob[]): Diob[];

        /**
         * Changes the sized of `pMap` to the width and height of `pW` and `pH`. Reducing the size will delete diobs that are no longer within the map size.
         *
         * @env Client | Server
         * @param {string} pMap - Name of the map to set the size of.
         * @param {number} pW - Width in tiles to give the map.
         * @param {number} pH - Height in tiles to give the map.
         * @param {string} pTile - Tile object type to use as the default tiles for newly created tiles.
         */
		setMapSize(pMap: string, pW: number, pH: number, pTile: string): void

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible to the diob.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible to the diob.
         */
		getTileRangeView(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
         * Sets the Tile at `pLoc` to `pT` and returns the new tile.
         *
         * @env Client | Server
         * @param {Diob | Object} pLoc - Either a Tile reference or an object containing location information. Example: `{'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}`.
         * @param {string} pT - Either a type string containing the type of a new Tile or a reference to a Tile that does not already have a location on the map.
         * @returns {Diob} Returns the new tile.
         */
		setLoc(pLoc: Diob | Object, pT: string): Diob

        /**
         * Returns the tiles within the specified area. Can be called on a Map instance with `(pX, pY, pW, pH)` or statically with `(pMap, pX, pY, pW, pH)`.
         *
         * @env Client | Server
         * @param {string | number} [pMapOrX] - Name of map or starting x coordinate.
         * @param {number} [pXOrY] - Starting x coordinate or starting y coordinate.
         * @param {number} [pYOrW] - Starting y coordinate or width.
         * @param {number} [pWOrH] - Width in tiles or height in tiles.
         * @param {number} [pH] - Height in tiles.
         * @returns {Diob[]} Returns the tiles on the map within the specified area.
         */
		getTiles(pMapOrX?: string | number, pXOrY?: number, pYOrW?: number, pWOrH?: number, pH?: number): Diob[];

        /**
         * Returns an array of diobs on the map that have the tag `pTag`.
         *
         * @env Client | Server
         * @param {string} pTag - String containing tag to look for.
         * @param {string} [pMap] - (Optional) Name of map to search if called statically.
         * @returns {Diob[]} Returns an array of diobs that have the tag `pTag`.
         */
		getDiobsByTag(pTag: string, pMap?: string): Diob[]

        /**
         * Returns number of pixels between the center of `pA` and the center of `pB`. You can change the origin by passing custom objects and changing the width and height by double of the amount to offset.
         *
         * @env Client | Server
         * @param {Diob | Object} pA - Diob reference or object containing location and size information. Example: `{'xPos': 1, 'yPos': 1, 'mapName': 'map', 'width': 32, 'height': 32}`.
         * @param {Diob | Object} pB - Diob reference or object containing location and size information. Example: `{'xPos': 1, 'yPos': 1, 'mapName': 'map', 'width': 32, 'height': 32}`.
         * @param {boolean} [pEdge] - (Optional) If set, the edges of the diobs will be used instead of the center.
         * @returns {number} Returns number of pixels between the center of `pA` and the center of `pB`. You can change the origin by passing custom objects and changing the width and height by double of the amount to offset.
         */
		getDist(pA: Diob | Object, pB: Diob | Object, pEdge?: boolean): number

        /**
         * Returns a the angle in radians between `pA` and `pB`.
         *
         * @env Client | Server
         * @param {Diob | Object} pA - First diob.
         * @param {Diob | Object} pB - Second diob.
         * @param {boolean} pCenter - Set to get angle from the centers.
         * @returns {number} Returns a the angle in radians between `pA` and `pB`.
         */
		getAngle(pA: Diob | Object, pB: Diob | Object, pCenter: boolean): number

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {string} pType - Type or parent type of diobs to get.
         * @param {boolean} pChild - True to include all child diobs. False to include only diobs with the exact type of `pType`.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         */
		getRangeViewByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {string} pType - Type or parent type of diobs to get.
         * @param {boolean} pChild - True to include all child diobs. False to include only diobs with the exact type of `pType`.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         */
		getTileRangeViewersByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
         * Reference to a tile that exists in the void, this tile is used if a movable interacts with the edge of the map.
         *
         * @env Client | Server
         */
		void: Diob

        /**
         * Array containing all the direction strings; [`east`, `northeast`, `north`, `northwest`, `west`, `southwest`, `south`, `southeast`].
         *
         * @env Client | Server
         */
		dirs: ['east', 'northeast', 'north', 'northwest', 'west', 'southwest', 'south', 'southeast']

        /**
         * Returns an array containing all the tiles on the map within x and y pixels around the specified diob.
         *
         * @env Client | Server
         * @param {Diob | Object} pD - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {string} pType - Either x distance or x and y distance.
         * @param {boolean} pChild - If set, y distance.
         * @param {boolean} pOmit - Type or parent type of tiles to get.
         * @returns {Diob[]} Returns an array containing all the tiles on the map within x and y pixels around the specified diob.
         */
		getTilesByRange(pD: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
         * Returns a tile of a given location. If `pVal1` and `pVal2` are numbers and `pVal3` is a string, it returns the tile at the coordinates `pVal1`, `pVal2` on the map `pVal3`. If `pVal1` is an object and not a tile, it returns the object's location. If `pVal1` is a tile, it returns the tile back.
         *
         * @env Client | Server
         * @returns {Diob} Returns a tile of a given location. If `pVal1` and `pVal2` are numbers and `pVal3` is a string, it returns the tile at the coordinates `pVal1`, `pVal2` on the map `pVal3`. If `pVal1` is an object and not a tile, it returns the object's location. If `pVal1` is a tile, it returns the tile back.
         */
		getLoc(): Diob

        /**
         * Returns the Tile next to the location of `pL` based on the direction of `pDir`.
         *
         * @env Client | Server
         * @param {Diob | Object} pL - Reference to Diob or location object. Example: `{'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}`.
         * @param {string} pDir - String containing direction.
         * @returns {Diob} Returns the Tile next to the location of `pL` based on the direction of `pDir`.
         */
		getLocByDir(pL: Diob | Object, pDir: string): Diob

        /**
         * Deletes the map and all diobs on it.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the map to delete.
         */
		deleteMap(pName: string | number): void

        /**
         * Returns the Tile by the position `pX`, `pY` on the map `pMap`.
         *
         * @env Client | Server
         * @param {number} pX - X position.
         * @param {number} pY - Y position.
         * @param {string} pMap - Map name.
         * @returns {Diob} Returns the Tile by the position `pX`, `pY` on the map `pMap`.
         */
		getLocByPos(pX: number, pY: number, pMap: string): Diob

        /**
         * Returns an array of all map names of maps currently loaded.
         *
         * @env Client | Server
         * @returns {string[]} Returns an array of all map names of maps currently loaded.
         */
		getMaps(): string[]

        /**
         * Returns a string containing the direction from `pA` to `pB` from their origins.
         *
         * @env Client | Server
         * @param {Diob | Object} pA - First diob.
         * @param {Diob | Object} pB - Second diob.
         * @param {boolean} pCenter - Set to get dir from the centers.
         * @param {boolean} pCard - If set, only cardinal directions will be returned (north, south, east, west).
         * @returns {string[]} Returns a string containing the direction from `pA` to `pB` from their origins.
         */
		getDir(pA: Diob | Object, pB: Diob | Object, pCenter: boolean, pCard: boolean): string[]

        /**
         * Returns an array of diobs in the Region `pR` on all loaded maps or on the map `pMap` if specified with a type of `pType` (if specified) or a child of `pType` if `pChild` is set.
         *
         * @env Client | Server
         * @param {string} pR - Either a type string containing the type of Region or a reference to a Region.
         * @param {string} pType - Type or parent type of diobs to get.
         * @param {boolean} pChild - True to include all child diobs. False to include only diobs with the exact type of `pType`.
         * @param {string} [pMap] - (Optional) Name of the map to check the Region of. If not set all loaded maps with the specified Region will be used.
         * @returns {Diob[]} Returns an array of diobs in the Region `pR` on all loaded maps or on the map `pMap` if specified with a type of `pType` (if specified) or a child of `pType` if `pChild` is set.
         */
		getDiobsByRegion(pR: string, pType: string, pChild: boolean, pMap?: string): Diob[]

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob.
         */
		getTileRangeViewers(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
         * Returns an array of diobs on the map `pMap` that overlap the specified position box depending on the provided arguments. If `pType` is not set, all diobs in the position box will be returned. If `pType` is set but `pChild` is not, diobs in the position box with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs on the map will be returned.
         *
         * @env Client | Server
         * @param {string} pMap - Name of the map to get diobs from.
         * @param {number} pX - Starting x position.
         * @param {number} pY - Starting y position.
         * @param {string} [pType] - (Optional) Ending x position.
         * @param {boolean} [pChild] - (Optional) Ending y position.
         * @param {string} [pAdd] - (Optional) String containing type path to return.
         * @returns {Diob[]} Returns an array of diobs on the map `pMap` that overlap the specified position box depending on the provided arguments. If `pType` is not set, all diobs in the position box will be returned. If `pType` is set but `pChild` is not, diobs in the position box with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all mobs on the map will be returned.
         */
		getDiobsByPos(pMap: string, pX: number, pY: number, pType?: string, pChild?: boolean, pAdd?: string): Diob[]

        /**
         * Creates a new map which is a clone of a map file.
         *
         * @env Client | Server
         * @param {string} pMap - Name of the map file to clone.
         * @param {string | number} pName - Name to give the new cloned map.
         * @param {Function} [pFunc] - (Optional) Function to call once the clone is finished.
         */
		cloneMap(pMap: string, pName: string | number, pFunc?: Function): void

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob.
         */
		getRangeViewers(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob.
         */
		getRange(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {string} pType - Type or parent type of diobs to get.
         * @param {boolean} pChild - True to include all child diobs. False to include only diobs with the exact type of `pType`.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         */
		getRangeByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {string} pType - Type or parent type of diobs to get.
         * @param {boolean} pChild - True to include all child diobs. False to include only diobs with the exact type of `pType`.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         */
		getTileRangeByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {string} pType - Type or parent type of diobs to get.
         * @param {boolean} pChild - True to include all child diobs. False to include only diobs with the exact type of `pType`.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         */
		getRangeViewersByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
         * Returns an array active clients that have player mobs on the map `pMap`.
         *
         * @env Client | Server
         * @param {string} pMap - Name of the map to get clients from.
         * @returns {Client[]} Returns an array active clients that have player mobs on the map `pMap`.
         */
		getClients(pMap: string): Client[]

        /**
         * Returns the region based on the type `pType`.
         *
         * @env Client | Server
         * @param {string} pType - Type of the region to grab.
         * @returns {Diob} Returns the region based on the type `pType`.
         */
		getRegionByType(pType: string): Diob

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible by the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {string} pType - Type or parent type of diobs to get.
         * @param {boolean} pChild - True to include all child diobs. False to include only diobs with the exact type of `pType`.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible by the diob and that have the same type as `pType` or a parent type of `pType` if `pChild` is enabled.
         */
		getTileRangeViewByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
         * Sets the Region at `pLoc` to `pR` and returns the Region.
         *
         * @env Client | Server
         * @param {Diob | Object} pLoc - Either a Tile reference or an object containing location information. Example: `{'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}`.
         * @param {string} pR - Either a type string containing the type of a new Region or a reference to a Region.
         * @returns {Diob} Returns the Region.
         */
		setRegion(pLoc: Diob | Object, pR: string): Diob

        /**
         * Returns an array of diobs on the map and screen depending on the provided arguments. If `pType` is not set, all map diobs on the screen will be returned. If `pType` is set but `pChild` is not, map diobs on the screen with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all map mobs on the screen will be returned.
         *
         * @env Client
         * @param {string} [pType] - (Optional) String containing type path to return.
         * @param {boolean} [pChild] - (Optional) Boolean that determines if child types are included.
         * @param {Diob[]} [pAdd] - (Optional) If set, tiles and regions on the screen will also be returned.
         * @returns {Diob[]} Returns an array of diobs on the map and screen depending on the provided arguments. If `pType` is not set, all map diobs on the screen will be returned. If `pType` is set but `pChild` is not, map diobs on the screen with the exact type of `pType` will be returned. If `pType` is set and `pChild` is set, all diobs with the type `pType` or a parent type of `pType` will be returned. For example, if `pType` is set to `Mob` with `pChild` `undefined`, all diobs with the exact type of `Mob` will be returned, but if `pChild` is set, then all map mobs on the screen will be returned.
         */
		getScreenDiobs(pType?: string, pChild?: boolean, pAdd?: Diob[]): Diob[]

        /**
         * Returns the direction string if `pD`.dir was rotated by `pAngle` radians. Set `pD` to `{'dir': 'east'}` to find the raw direction from a raw angle, defaults to east if nothing passed in.
         *
         * @env Client | Server
         * @param {Diob} [pD] - (Optional) Reference to diob or direction object. Example: `{'dir': 'east'}`.
         * @param {number} [pAngle] - (Optional) Angle in radians.
         * @returns {string} Returns the direction string if `pD`.dir was rotated by `pAngle` radians. Set `pD` to `{'dir': 'east'}` to find the raw direction from a raw angle, defaults to east if nothing passed in.
         */
		getDirByAngle(pD?: Diob, pAngle?: number): string

        /**
         * Creates a new map with the name `pName` and a size of `pX`, `pY`.
         *
         * @env Client | Server
         * @param {string | number} pName - Unique name of the map.
         * @param {number} pX - Amount of tiles on the x-axis.
         * @param {number} pY - Amount of tiles on the y-axis.
         * @param {string} pTile - Tile object type to use as the default tiles.
         */
		createMap(pName: string | number, pX: number, pY: number, pTile: string): void

		/**
		 * Creates a map by parsing raw map text file data and initializing all tiles, objects, and overlays.
		 *
		 * @env Client | Server
		 * @param {string} pName - Name to assign to the newly created map.
		 * @param {string} pText - Raw map file text data to parse.
		 * @param {Function} [pFunc] - Optional callback function invoked once the map finishes parsing and loading.
		 */
		createMapFromText(pName: string, pText: string, pFunc?: Function): void

        /**
         * Sends the data for the `pD` diob to all clients on the `pMap` map, if `pVar` is set it will send only those variables, if it is not set it will only send built-in engine variables.
         *
         * @env Server
         * @param {string} pMap - Name of the map.
         * @param {Diob} pD - Reference to the diob to send.
         * @param {string | string[]} [pVar] - (Optional) Variable name or array of variable names.
         */
		sendDiob(pMap: string, pD: Diob, pVar?: string | string[]): void

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob.
         */
		getRangeView(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
         * Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob.
         *
         * @env Client | Server
         * @param {Diob | Object} pO - Diob or range object to get range from. Range object example `{'map': 'name', 'x': 1, 'y': 1}`. Using a range object will use the tile at the specified location for the reference diob.
         * @param {boolean} pOmit - Either x distance or x and y distance.
         * @returns {Diob[]} Returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob.
         */
		getTileRange(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
         * Returns an object `{'x': x, 'y': y, 'xPos': xPos, 'yPos': yPos}` containing the number of x and y tiles on the map and the physical size of the map.
         *
         * @env Client | Server
         * @param {string} pMap - Name of the map to get the size of.
         * @returns {{'x': number, 'y': number, 'xPos': number, 'yPos': number} } returns an object `{'x': x, 'y': y, 'xPos': xPos, 'yPos': yPos}` containing the number of x and y tiles on the map and the physical size of the map.
         */
		getMapSize(pMap: string): {'x': number, 'y': number, 'xPos': number, 'yPos': number}

	}



	/** The macro object. */
	type Macro = {

		/**
		 * Creates a new blank macro atlas named `pName`.
		 *
		 * @env Client | Server
		 * @param {string | number} pName - Name of the new macro atlas.
		 */
		newMacroAtlas(pName: string | number): void

        /**
         * Creates a new macro with the keyUp command `pUp`, and keyDown command `pDown`, and the name `pName` and adds it to the macro atlas `pAtlas`.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the macro to create.
         * @param {string} pAtlas - Name of the macro atlas to add the new macro to.
         * @param {string} pKey - String of key that will execute this macro.
         * @param {string} [pDown] - (Optional) String containing the command to execute when the key is pushed down. Example: `test(1)` would execute the client command `test` with one parameter that is equal to `1`.
         * @param {string} [pUp] - (Optional) String containing the command to execute when the key is let go of. Example: `test(1)` would execute the client command `test` with one parameter that is equal to `1`.
         */
		newMacro(pName: string | number, pAtlas: string, pKey: string, pDown?: string, pUp?: string): void

        /**
         * Returns an array containing the names of all the macros in the macro atlas `pAtlas`.
         *
         * @env Client | Server
         * @param {string} pAtlas - Name of the macro atlas.
         * @returns {string[]} Returns an array containing the names of all the macros in the macro atlas `pAtlas`.
         */
		getMacroNames(pAtlas: string): string[]

        /**
         * Returns an array containing the names of all the currently loaded macro atlases.
         *
         * @env Client | Server
         * @returns {string[]} Returns an array containing the names of all the currently loaded macro atlases.
         */
		getMacroAtlasNames(): string[]

        /**
         * Removes the macro `pName` from the macro atlas `pAtlas`.
         *
         * @env Client | Server
         * @param {string | number} pName - Name of the macro to remove.
         * @param {string} pAtlas - Name of the macro atlas to remove the macro from.
         */
		removeMacro(pName: string | number, pAtlas: string): void

	}



	/** The type object. */
	type Type = {

		/**
		 * Returns an object containing all the default variables belonging to the type `pType`.
		 *
		 * @env Client | Server
		 * @param {string} pType - Type to get variables of.
		 * @param {boolean} [pAll] - (Optional) If set every variable this type has will be returned, if `false` only variables belonging directly to this type will be returned.
		 * @returns {Record<string, unknown>} Returns an object containing all the default variables belonging to the type `pType`.
		 */
		getVariables(pType: string, pAll?: boolean): Record<string, unknown>

        /**
         * Returns the default value of the `pVar` variable belonging to the type `pType`.
         *
         * @env Client | Server
         * @param {string} pType - Type to get variable of.
         * @param {string} pVar - Name of the variable to get.
         * @param {boolean} [pOwn] - (Optional) If set the returned value will be `undefined` if the variable belongs to an inherited object.
         * @returns {unknown} Returns the default value of the `pVar` variable belonging to the type `pType`.
         */
		getVariable(pType: string, pVar: string, pOwn?: boolean): unknown

        /**
         * Sets the type `pType`'s default variables specified within the `pVars` object. Example: `{'a': 1, 'b': 2}` would set this type's `a` and `b` variables respectively.
         *
         * @env Client | Server
         * @param {string} pType - Type to set variables for.
         * @param {object} pVars - Object containing new variables and their values.
         */
		setVariables(pType: string, pVars: object): void

        /**
         * Makes the type `pType` inherit from the type `pInherit`. This change only works for newly created objects, objects already in existence will not change.
         *
         * @env Client | Server
         * @param {string} pType - Type to add inheritance to.
         * @param {string} pInherit - Type to inherit from.
         */
		addInheritance(pType: string, pInherit: string): void

        /**
         * Creates a new type called `pType`.
         *
         * @env Client | Server
         * @param {string} pType - Type to create.
         */
		newType(pType: string): void

        /**
         * Returns the default value of the `pName` function belonging to the type `pType`.
         *
         * @env Client | Server
         * @param {string} pType - Type to get function of.
         * @param {string | number} pName - Name of the function to get.
         * @returns {Function} Returns the default value of the `pName` function belonging to the type `pType`.
         */
		getFunction(pType: string, pName: string | number): Function

        /**
         * Returns an array of the type `pType` custom inheritances.
         *
         * @env Client | Server
         * @param {string} pType - Type to get inheritances of.
         * @returns {string[]} Returns an array of the type `pType` custom inheritances.
         */
		getInheritances(pType: string): string[]

        /**
         * Sets the `pVal` value of the `pVar` static variable belonging to the type `pType`. Static variables are variables that belong to all Objects of this type collectively and are different than normal variables, usually static variables can only be set once, but VyScript static variables may be changed if that is what the developer wants. These variables are not inherited by child types.
         *
         * @env Client | Server
         * @param {string} pType - Type to set static variable of.
         * @param {string} pVar - Name of the static variable to set.
         * @param {boolean} pVal - Value to give to the static variable.
         */
		setStaticVariable(pType: string, pVar: string, pVal: boolean): void

        /**
         * Sets the type `pType`'s `pName` function to `pFunc`. This change only works for newly created objects, objects already in existence will not change.
         *
         * @env Client | Server
         * @param {string} pType - Type to set function for.
         * @param {string | number} pName - String containing the name of the function.
         * @param {Function} pFunc - Function.
         */
		setFunction(pType: string, pName: string | number, pFunc: Function): void

        /**
         * Returns the static variable value belonging to the type `pType`.
         *
         * @env Client | Server
         * @param {string} pType - Type to get static variable of.
         * @param {string} pVar - Name of the static variable to get.
         * @returns {unknown} Returns the static variable value belonging to the type `pType`.
         */
		getStaticVariable(pType: string, pVar: string): unknown

        /**
         * Returns an array of all Object types in the game. If `pParent` is set, only child types of `pParent` are returned.
         *
         * @env Client | Server
         * @param {string} [pParent] - (Optional) Parent type to start with.
         * @param {boolean} [pOmit] - (Optional) If set will not return the included path, only the children.
         * @returns {string[]} Returns an array of all Object types in the game. If `pParent` is set, only child types of `pParent` are returned.
         */
		getTypes(pParent?: string, pOmit?: boolean): string[]

        /**
         * Removes the inheritance `pInherit` from the type `pType`. This change only works for newly created objects, objects already in existence will not change.
         *
         * @env Client | Server
         * @param {string} pType - Type to remove inheritance from.
         * @param {string} pInherit - Type of inheritance.
         */
		removeInheritance(pType: string, pInherit: string): void

        /**
         * Calls the function `pFunc` attached to the type `pType` as if the function belonged to the object `pDiob` using the arguments `pArgs`.
         *
         * @env Client | Server
         * @param {string} pType - Type to call function of.
         * @param {Function} pFunc - Name of function to call.
         * @param {Diob} pDiob - Array of arguments to pass in.
         * @param {unknown[]} pArgs - Calls the function `pFunc` attached to the type `pType` as if the function belonged to the object `pDiob` using the arguments `pArgs`.
         */
		callFunction(pType: string, pFunc: Function, pDiob: Diob, pArgs: unknown[]): void

        /**
         * Checks to see if `pType` is a valid type that exists in the game. If `pType2` is defined, checks if `pType` is `pType2` or a child of `pType2`.
         *
         * @env Client | Server
         * @param {string} pType - Type to check.
         */
		isType(pType: string): boolean

	}


	/** The vylo type. */
	type VyloType = {

		/** The world object. */
		World: World
		/** The client object. */
		Client: Client
		/** The resource object. */
		Resource: Resource
		/** The util object. */
		Util: Util
		/** The event object. */
		Event: Event
		/** The file object. */
		File: File
		/** The icon object. */
		Icon: Icon
		/** The map object. */
		Map: Map
		/** The type object. */
		Type: Type
		/** The math object. */
		Math: Math

        /**
         * The global object referencing all global variables in VyScript.
         *
         * @env Client | Server
         */
        global: { [key: string]: unknown };

        /**
         * Loads the engine. When using loadResource before this is called, the resources will be treated as preloaded resources.
         *
         * @env Client | Server
         * @returns {Promise<void>}
         */
        load: () => Promise<void>;

        /**
         * Deletes the Diob referenced by `pDiob`.
         *
         * @env Client | Server
         * @param {Diob} pDiob - A reference to the Diob to delete.
         * @param {...unknown[]} [pArgN - (Optional) Parameters to pass as arguments into the Diob's onDel() event function.
         * @template T - The type of additional arguments.
         * @returns {void}
         */
        delDiob: <T = unknown>(pDiob: Diob, ...pArgN: T[]) => void;

        /**
         * Creates a new Diob with the specified Object type of `pType` and returns it.
         *
         * @env Client | Server
         * @param pType - A string containing the type path of the Object to be created as a Diob.
         * @param {...unknown[]} [pArgN] - (Optional) Parameters to pass as arguments into the Diob's onNew() event function.
         * @template T - The type of additional arguments.
         * @returns {Diob} - The newly created Diob.
         */
        newDiob: <T = unknown>(pType: string, ...pArgN: T[]) => Diob;

        /**
         * Creates a new type called `pType`.
         *
         * @env Client | Server
         * @param {string} pType - Type to alter /create.
         * @param {object} [pVars] - (Optional) Object containing variables to give the type.
         * @param {string[]} [pInherits] - (Optional) Array of type strings to inherit.
         * @returns {void}
         */
        setType: {
            <T extends new (...pArgs: any[]) => any>(pType: string, pConstructor: T, pInherits?: string[]): InstanceType<T>;
            <T extends Record<string, any>, Base = Diob & Mob>(pType: string, pVars: T & ThisType<T & Base>, pInherits?: string[]): void;
        }

	}
}


export { VyloType, World, Diob, MapObject, Movable, Particle, Tile, Region, Mob, Overlay, Sound, Interface, InterfacePane, WebBox, TextInput, Client, Resource, Util, Icon, IconAtlas, Macro, Type, ObjectType, MouseButton, MouseOpacity, Direction, Directions, MoveSettingsConfig, AppearMask, AppearMaskConfig, EdgeLock, DiobTextStyle, InterfaceTextStyle, MapViewZoomConfig, MapViewDimensionLimit, MapViewZoomLimit, MapViewPaddingConfig, MapViewConfig, MapViewInstance, ScreenView, RenderOptions };