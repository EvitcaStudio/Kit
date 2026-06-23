/*!
 * vyi@4.1.0 https://github.com/EvitcaStudio/vyi
 * Compiled Sun, 21 Jun 2026 10:57:24 UTC
 * Copyright (c) 2026 Evitca Studio, "doubleactii"
 *
 * vyi is privately licensed.
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/vendor/logger/index.js
/*!
 * logger@1.0.0 https://github.com/EvitcaStudio/Logger
 * Compiled Mon, 10 Nov 2025 05:36:23 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * logger is privately licensed.
 */

class Logger {
  RESET;
  BRIGHT;
  DIM;
  UNDERSCORE;
  BLINK;
  REVERSE;
  HIDDEN;
  FG_BLACK;
  FG_RED;
  FG_GREEN;
  FG_YELLOW;
  FG_BLUE;
  FG_MAGENTA;
  FG_CYAN;
  FG_WHITE;
  FG_GRAY;
  BG_BLACK;
  BG_RED;
  BG_GREEN;
  BG_YELLOW;
  BG_BLUE;
  BG_MAGENTA;
  BG_CYAN;
  BG_WHITE;
  BG_GRAY;
  TYPE_SPACER_LENGTH;
  types;
  currentType;
  SPACE_CHAR;
  FG_COLORS;
  BG_COLORS;
  constructor(pTypes) {
    this.RESET = "\x1B[0m";
    this.BRIGHT = "\x1B[1m";
    this.DIM = "\x1B[2m";
    this.UNDERSCORE = "\x1B[4m";
    this.BLINK = "\x1B[5m";
    this.REVERSE = "\x1B[7m";
    this.HIDDEN = "\x1B[8m";
    this.FG_BLACK = "\x1B[30m";
    this.FG_RED = "\x1B[31m";
    this.FG_GREEN = "\x1B[32m";
    this.FG_YELLOW = "\x1B[33m";
    this.FG_BLUE = "\x1B[34m";
    this.FG_MAGENTA = "\x1B[35m";
    this.FG_CYAN = "\x1B[36m";
    this.FG_WHITE = "\x1B[37m";
    this.FG_GRAY = "\x1B[90m";
    this.BG_BLACK = "\x1B[40m";
    this.BG_RED = "\x1B[41m";
    this.BG_GREEN = "\x1B[42m";
    this.BG_YELLOW = "\x1B[43m";
    this.BG_BLUE = "\x1B[44m";
    this.BG_MAGENTA = "\x1B[45m";
    this.BG_CYAN = "\x1B[46m";
    this.BG_WHITE = "\x1B[47m";
    this.BG_GRAY = "\x1B[100m";
    this.TYPE_SPACER_LENGTH = 13;
    this.types = {
      default: this.FG_WHITE
    };
    this.currentType = "";
    this.SPACE_CHAR = " ";
    this.FG_COLORS = {};
    for (let i = 0;i <= 255; i++) {
      this.FG_COLORS[i] = "\x1B[38;5;" + i + "m";
    }
    this.BG_COLORS = {};
    for (let i = 0;i <= 255; i++) {
      this.BG_COLORS[i] = "\x1B[48;5;" + i + "m";
    }
    if (Array.isArray(pTypes)) {
      this.registerTypes(pTypes);
    }
  }
  prefix(pType) {
    if (typeof pType === "string")
      this.currentType = pType;
    return this;
  }
  message(pMethod = "log", ...pMessage) {
    const TYPE = this.currentType ? this.currentType : "";
    const IS_EMPTY_TYPE = TYPE.length === 0;
    if (IS_EMPTY_TYPE) {
      console[pMethod](...pMessage);
    } else {
      const TYPE_LONGER_THAN_SPACER = TYPE.length >= this.TYPE_SPACER_LENGTH;
      let TYPE_COLOR = this.types[TYPE.toLowerCase()] ? this.types[TYPE.toLowerCase()] : this.types.default;
      const IS_ANSI = TYPE_COLOR.includes("\x1B");
      if (!IS_ANSI) {
        TYPE_COLOR = `color: ${TYPE_COLOR}`;
      }
      const isBrowser = typeof globalThis.window !== "undefined";
      if (isBrowser) {
        if (IS_ANSI) {
          console[pMethod](TYPE_COLOR + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|" + this.RESET, ...pMessage);
        } else {
          console[pMethod]("%c" + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|", TYPE_COLOR, ...pMessage);
        }
      } else {
        console[pMethod](TYPE_COLOR + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|" + this.RESET, ...pMessage);
      }
    }
    this.currentType = "";
  }
  log(...pMessage) {
    this.message("log", ...pMessage);
  }
  info(...pMessage) {
    this.message("info", ...pMessage);
  }
  error(...pMessage) {
    this.message("error", ...pMessage);
  }
  warn(...pMessage) {
    this.message("warn", ...pMessage);
  }
  assert(...pMessage) {
    console.assert(...pMessage);
  }
  debug(...pMessage) {
    this.message("debug", ...pMessage);
  }
  count(pLabel) {
    console.count(pLabel);
  }
  countReset(pLabel) {
    console.countReset(pLabel);
  }
  table(pData, pColumns) {
    console.table(pData, pColumns);
  }
  time(pLabel = "default") {
    this.message("time", pLabel);
  }
  timeLog(pLabel = "default", ...pData) {
    this.message("timeLog", pLabel, ...pData);
  }
  timeEnd(pLabel = "default") {
    this.message("timeEnd", pLabel);
  }
  trace(...pMessage) {
    this.message("trace", ...pMessage);
  }
  group(pLabel = "") {
    this.message("group", pLabel);
  }
  groupCollapsed(pLabel = "") {
    this.message("groupCollapsed", pLabel);
  }
  groupEnd() {
    console.groupEnd();
  }
  clear() {
    console.clear();
  }
  registerType(pType, pAnsiInfo) {
    if (this.types[pType.toLowerCase()])
      return;
    if (typeof pType === "string" && typeof pAnsiInfo === "string") {
      this.types[pType.toLowerCase()] = pAnsiInfo;
    }
  }
  registerTypes(pTypes) {
    if (Array.isArray(pTypes)) {
      for (let i = 0;i < pTypes.length; i++) {
        this.registerType(pTypes[i].type, pTypes[i].ansi);
      }
    }
  }
  unregisterType(pType) {
    const lowerCaseType = pType.toLowerCase();
    if (this.types[lowerCaseType]) {
      delete this.types[lowerCaseType];
    }
  }
}

// src/frame.ts
class Frame {
  delay = 100;
  dataURL = "";
  index = 0;
  parent = null;
  static defaultDelay = 100;
  constructor(pFrameData) {
    if (pFrameData) {
      this.parse(pFrameData);
    }
  }
  parse(pFrameData) {
    if (!pFrameData)
      return;
    const dataURL = pFrameData[0];
    const frameDelay = pFrameData[1] ? pFrameData[1] : this.parent ? this.parent.getDelay() : null;
    this.setDataURL(dataURL);
    if (frameDelay) {
      this.setDelay(frameDelay);
    }
  }
  setParent(pParent) {
    if (!pParent || this.parent)
      return;
    if (pParent instanceof Icon) {
      this.parent = pParent;
      if (!this.getDelay()) {
        this.setDelay(this.parent.getDelay());
      }
    }
  }
  removeParent() {
    this.parent = null;
  }
  setDelay(pDelay) {
    if (typeof pDelay === "number") {
      this.delay = pDelay;
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid delay type!");
    }
    return this;
  }
  getDelay() {
    return this.delay;
  }
  getIndex() {
    return this.index;
  }
  setDataURL(pDataURL) {
    if (typeof pDataURL === "string") {
      this.dataURL = pDataURL.replace(/^data:image\/[a-z]+;base64,/, "");
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid data url type!");
    }
    return this;
  }
  getDataURL() {
    return this.dataURL;
  }
  getWidth() {
    if (!this.parent)
      return;
    return this.parent.width;
  }
  getHeight() {
    if (!this.parent)
      return;
    return this.parent.height;
  }
  getSize() {
    if (!this.parent)
      return;
    return { width: this.parent.width, height: this.parent.height };
  }
  getVyi() {
    return this?.parent?.vyi;
  }
  getParent() {
    return this.parent;
  }
  export() {
    const frameData = [this.getDataURL()];
    const delayIsDefault = this.getDelay() === Frame.defaultDelay;
    if (!delayIsDefault) {
      frameData[1] = this.getDelay() || Frame.defaultDelay;
    }
    return frameData;
  }
}

// src/vendor/icon-point/index.js
/*!
 * icon-point@2.1.0 https://github.com/EvitcaStudio/IconPoint
 * Compiled Mon, 10 Nov 2025 09:52:21 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * icon-point is privately licensed.
 */
/*!
 * logger@1.0.0 https://github.com/EvitcaStudio/Logger
 * Compiled Mon, 10 Nov 2025 05:36:23 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * logger is privately licensed.
 */

class Logger2 {
  RESET;
  BRIGHT;
  DIM;
  UNDERSCORE;
  BLINK;
  REVERSE;
  HIDDEN;
  FG_BLACK;
  FG_RED;
  FG_GREEN;
  FG_YELLOW;
  FG_BLUE;
  FG_MAGENTA;
  FG_CYAN;
  FG_WHITE;
  FG_GRAY;
  BG_BLACK;
  BG_RED;
  BG_GREEN;
  BG_YELLOW;
  BG_BLUE;
  BG_MAGENTA;
  BG_CYAN;
  BG_WHITE;
  BG_GRAY;
  TYPE_SPACER_LENGTH;
  types;
  currentType;
  SPACE_CHAR;
  FG_COLORS;
  BG_COLORS;
  constructor(pTypes) {
    this.RESET = "\x1B[0m";
    this.BRIGHT = "\x1B[1m";
    this.DIM = "\x1B[2m";
    this.UNDERSCORE = "\x1B[4m";
    this.BLINK = "\x1B[5m";
    this.REVERSE = "\x1B[7m";
    this.HIDDEN = "\x1B[8m";
    this.FG_BLACK = "\x1B[30m";
    this.FG_RED = "\x1B[31m";
    this.FG_GREEN = "\x1B[32m";
    this.FG_YELLOW = "\x1B[33m";
    this.FG_BLUE = "\x1B[34m";
    this.FG_MAGENTA = "\x1B[35m";
    this.FG_CYAN = "\x1B[36m";
    this.FG_WHITE = "\x1B[37m";
    this.FG_GRAY = "\x1B[90m";
    this.BG_BLACK = "\x1B[40m";
    this.BG_RED = "\x1B[41m";
    this.BG_GREEN = "\x1B[42m";
    this.BG_YELLOW = "\x1B[43m";
    this.BG_BLUE = "\x1B[44m";
    this.BG_MAGENTA = "\x1B[45m";
    this.BG_CYAN = "\x1B[46m";
    this.BG_WHITE = "\x1B[47m";
    this.BG_GRAY = "\x1B[100m";
    this.TYPE_SPACER_LENGTH = 13;
    this.types = {
      default: this.FG_WHITE
    };
    this.currentType = "";
    this.SPACE_CHAR = " ";
    this.FG_COLORS = {};
    for (let i = 0;i <= 255; i++) {
      this.FG_COLORS[i] = "\x1B[38;5;" + i + "m";
    }
    this.BG_COLORS = {};
    for (let i = 0;i <= 255; i++) {
      this.BG_COLORS[i] = "\x1B[48;5;" + i + "m";
    }
    if (Array.isArray(pTypes)) {
      this.registerTypes(pTypes);
    }
  }
  prefix(pType) {
    if (typeof pType === "string")
      this.currentType = pType;
    return this;
  }
  message(pMethod = "log", ...pMessage) {
    const TYPE = this.currentType ? this.currentType : "";
    const IS_EMPTY_TYPE = TYPE.length === 0;
    if (IS_EMPTY_TYPE) {
      console[pMethod](...pMessage);
    } else {
      const TYPE_LONGER_THAN_SPACER = TYPE.length >= this.TYPE_SPACER_LENGTH;
      let TYPE_COLOR = this.types[TYPE.toLowerCase()] ? this.types[TYPE.toLowerCase()] : this.types.default;
      const IS_ANSI = TYPE_COLOR.includes("\x1B");
      if (!IS_ANSI) {
        TYPE_COLOR = `color: ${TYPE_COLOR}`;
      }
      const isBrowser = typeof globalThis.window !== "undefined";
      if (isBrowser) {
        if (IS_ANSI) {
          console[pMethod](TYPE_COLOR + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|" + this.RESET, ...pMessage);
        } else {
          console[pMethod]("%c" + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|", TYPE_COLOR, ...pMessage);
        }
      } else {
        console[pMethod](TYPE_COLOR + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|" + this.RESET, ...pMessage);
      }
    }
    this.currentType = "";
  }
  log(...pMessage) {
    this.message("log", ...pMessage);
  }
  info(...pMessage) {
    this.message("info", ...pMessage);
  }
  error(...pMessage) {
    this.message("error", ...pMessage);
  }
  warn(...pMessage) {
    this.message("warn", ...pMessage);
  }
  assert(...pMessage) {
    console.assert(...pMessage);
  }
  debug(...pMessage) {
    this.message("debug", ...pMessage);
  }
  count(pLabel) {
    console.count(pLabel);
  }
  countReset(pLabel) {
    console.countReset(pLabel);
  }
  table(pData, pColumns) {
    console.table(pData, pColumns);
  }
  time(pLabel = "default") {
    this.message("time", pLabel);
  }
  timeLog(pLabel = "default", ...pData) {
    this.message("timeLog", pLabel, ...pData);
  }
  timeEnd(pLabel = "default") {
    this.message("timeEnd", pLabel);
  }
  trace(...pMessage) {
    this.message("trace", ...pMessage);
  }
  group(pLabel = "") {
    this.message("group", pLabel);
  }
  groupCollapsed(pLabel = "") {
    this.message("groupCollapsed", pLabel);
  }
  groupEnd() {
    console.groupEnd();
  }
  clear() {
    console.clear();
  }
  registerType(pType, pAnsiInfo) {
    if (this.types[pType.toLowerCase()])
      return;
    if (typeof pType === "string" && typeof pAnsiInfo === "string") {
      this.types[pType.toLowerCase()] = pAnsiInfo;
    }
  }
  registerTypes(pTypes) {
    if (Array.isArray(pTypes)) {
      for (let i = 0;i < pTypes.length; i++) {
        this.registerType(pTypes[i].type, pTypes[i].ansi);
      }
    }
  }
  unregisterType(pType) {
    const lowerCaseType = pType.toLowerCase();
    if (this.types[lowerCaseType]) {
      delete this.types[lowerCaseType];
    }
  }
}

class IconPoint {
  static defaultOffset = { x: 0, y: 0 };
  static defaultAnchor = { x: 0.5, y: 0.5 };
  static version = "2.1.0";
  static logger = new Logger2;
  iconPoint = { x: 0, y: 0 };
  originalPoint = { x: 0, y: 0 };
  positionalPoint;
  point = { x: 0, y: 0 };
  bounds = { width: 32, height: 32 };
  id;
  constructor(pPoint, pBounds, pIconPoint, pId) {
    const { width, height } = pBounds;
    this.bounds.width = width;
    this.bounds.height = height;
    this.positionalPoint = pPoint;
    this.originalPoint = { ...pIconPoint };
    this.id = pId || "";
    IconPoint.logger.registerType("IconPointModule", "#ff6600");
    this.setPoint(pIconPoint);
  }
  getPoint(pAngle = 0, pOffset = IconPoint.defaultOffset, pAnchor = IconPoint.defaultAnchor) {
    const cx = this.positionalPoint.x + pOffset.x + this.bounds.width * pAnchor.x;
    const cy = this.positionalPoint.y + pOffset.y + this.bounds.height * pAnchor.y;
    const pointX = this.positionalPoint.x + pOffset.x - 1 + this.iconPoint.x;
    const pointY = this.positionalPoint.y + pOffset.y - 1 + this.iconPoint.y;
    const tempX = pointX - cx;
    const tempY = pointY - cy;
    const rotatedX = tempX * Math.cos(pAngle) - tempY * -Math.sin(pAngle);
    const rotatedY = tempX * -Math.sin(pAngle) + tempY * Math.cos(pAngle);
    const x = rotatedX + cx;
    const y = rotatedY + cy;
    this.point.x = x;
    this.point.y = y;
    return this.point;
  }
  getPointFromExternalPoint(pExternalPoint, pAngle = 0, pOffset = IconPoint.defaultOffset, pAnchor = IconPoint.defaultAnchor) {
    const cx = pExternalPoint.x + pOffset.x + this.bounds.width * pAnchor.x;
    const cy = pExternalPoint.y + pOffset.y + this.bounds.height * pAnchor.y;
    const pointX = pExternalPoint.x + pOffset.x - 1 + this.iconPoint.x;
    const pointY = pExternalPoint.y + pOffset.y - 1 + this.iconPoint.y;
    const tempX = pointX - cx;
    const tempY = pointY - cy;
    const rotatedX = tempX * Math.cos(pAngle) - tempY * -Math.sin(pAngle);
    const rotatedY = tempX * -Math.sin(pAngle) + tempY * Math.cos(pAngle);
    const x = rotatedX + cx;
    const y = rotatedY + cy;
    this.point.x = x;
    this.point.y = y;
    return this.point;
  }
  setPoint(pPoint) {
    const { x, y, isNormalized } = pPoint;
    this.iconPoint.x = isNormalized ? x * this.bounds.width : x;
    this.iconPoint.y = isNormalized ? y * this.bounds.height : y;
  }
  resetPoint() {
    this.setPoint(this.originalPoint);
  }
  updateBounds(pBounds) {
    const { width, height } = pBounds;
    this.bounds.width = width;
    this.bounds.height = height;
  }
  transformX(pTransformX) {
    const boundsX = Math.abs(pTransformX * this.bounds.width);
    this.iconPoint.x = boundsX - this.originalPoint.x;
  }
  transformY(pTransformY) {
    const boundsY = Math.abs(pTransformY * this.bounds.height);
    this.iconPoint.y = boundsY - this.originalPoint.y;
  }
  transform(pTransform) {
    this.transformX(pTransform.x);
    this.transformY(pTransform.y);
  }
  getId() {
    return this.id;
  }
  export() {
    return {
      ...this.bounds,
      ...this.iconPoint,
      id: this.id
    };
  }
}

// src/bounds/bounds-manager.ts
class BoundsManager {
  bounds = {};
  add(pId, pShape) {
    this.bounds[pId] = pShape;
  }
  remove(pId) {
    delete this.bounds[pId];
  }
  update(pId, pShape) {
    if (this.bounds[pId]) {
      this.bounds[pId] = { ...this.bounds[pId], ...pShape };
    }
  }
  rename(pId, pNewId) {
    if (this.bounds[pId]) {
      this.bounds[pNewId] = this.bounds[pId];
      delete this.bounds[pId];
    }
  }
  get(pId) {
    return this.bounds[pId];
  }
  getAll() {
    return { ...this.bounds };
  }
  getIdsByShape(pShape) {
    return Object.keys(this.bounds).filter((pId) => this.bounds[pId].type === pShape);
  }
  exportAll() {
    return this.getAll();
  }
  clearAll() {
    this.bounds = {};
  }
  loadBounds(pBoundsData) {
    this.clearAll();
    Object.entries(pBoundsData).forEach(([id, shape]) => {
      this.add(id, shape);
    });
  }
}

// src/icon.ts
class Icon {
  states = new Map;
  frames = new Map;
  width = 32;
  height = 32;
  dataURL = "";
  delay = 100;
  name = "";
  parent = null;
  vyi = null;
  id = "";
  static reservedIds = new Set;
  iconPoints = new Set;
  boundsManager = new BoundsManager;
  static reservedIconPointIds = new Set(["center", "top-left", "top-right", "bottom-left", "bottom-right", "top-middle", "bottom-middle", "left-middle", "right-middle"]);
  static generateId() {
    const genId = () => {
      return Math.floor(Math.random() * 4294967295).toString(16).padStart(8, "0");
    };
    let id = genId();
    while (this.reservedIds.has(id)) {
      id = genId();
    }
    this.reservedIds.add(id);
    return id;
  }
  constructor(pIconData) {
    if (pIconData) {
      this.parse(pIconData);
    }
    this.assignId();
  }
  setParent(pParent) {
    if (!pParent || this.parent)
      return;
    if (pParent instanceof Icon) {
      this.parent = pParent;
    }
  }
  removeParent() {
    if (this.parent) {
      this.parent = null;
      this.vyi = null;
    }
  }
  setVyi(pVyi) {
    if (!pVyi)
      return;
    if (pVyi instanceof VYI) {
      this.vyi = pVyi;
      if (this.getStateCount() > 0) {
        const states = this.getStates();
        states.forEach((pState) => {
          pState.setParent(this);
          pState.setVyi(pVyi);
        });
      }
      const frames = this.getFrames();
      frames.forEach((pFrame) => pFrame.setParent(this));
    }
  }
  removeVyi() {
    this.vyi = null;
  }
  assignId() {
    this.id = Icon.generateId();
  }
  getId() {
    return this.id;
  }
  getVyi() {
    return this.vyi;
  }
  getParent() {
    return this.parent;
  }
  getStateCount() {
    return this.states.size;
  }
  getFrameCount() {
    return this.frames.size;
  }
  parse(pIconData) {
    if (!pIconData)
      return;
    const iconName = pIconData[0];
    const iconWidth = pIconData[1];
    const iconHeight = pIconData[2];
    const iconDelay = pIconData[3];
    const iconDataURL = pIconData[4];
    const frameArray = pIconData[5];
    const stateArray = pIconData[6];
    const iconPointArray = pIconData[7];
    const boundsData = pIconData[8];
    this.rename(iconName);
    this.setSize(iconWidth, iconHeight);
    this.setDelay(iconDelay);
    this.setDataURL(iconDataURL);
    if (Array.isArray(frameArray)) {
      frameArray.forEach((pFrame) => {
        this.addFrame(pFrame);
      });
    }
    if (Array.isArray(stateArray)) {
      stateArray.forEach((pStateData) => {
        const state = new Icon(undefined);
        const stateName = pStateData[0];
        const stateDataURL = pStateData[1];
        const stateDelay = pStateData[2];
        const stateFrameArray = pStateData[3];
        const stateBoundsData = pStateData[4];
        state.rename(stateName);
        state.setSize(iconWidth, iconHeight);
        state.setDelay(stateDelay);
        state.setDataURL(stateDataURL);
        if (Array.isArray(stateFrameArray)) {
          stateFrameArray.forEach((pFrame) => {
            state.addFrame(pFrame);
          });
        }
        if (stateBoundsData && typeof stateBoundsData === "object") {
          state.boundsManager.loadBounds(stateBoundsData);
        }
        this.addState(state);
      });
    }
    if (Array.isArray(iconPointArray)) {
      iconPointArray.forEach((pIconPoint) => {
        const { x, y, width, height, id } = pIconPoint;
        if (Icon.reservedIconPointIds.has(id))
          return;
        this.addIconPoint({ x: 0, y: 0 }, { width, height }, { x, y }, id);
      });
    }
    if (boundsData && typeof boundsData === "object") {
      this.boundsManager.loadBounds(boundsData);
    }
    this.resetInitialIconPoints();
  }
  resetInitialIconPoints() {
    const width = this.getWidth();
    const height = this.getHeight();
    Array.from(Icon.reservedIconPointIds).forEach((pId) => {
      const iconPoint = Array.from(this.iconPoints).find((pPoint) => pPoint.getId() === pId);
      if (!iconPoint)
        return;
      this.iconPoints.delete(iconPoint);
    });
    const initialPoint = { x: 1, y: 1 };
    const centerIconPoint = new IconPoint(initialPoint, { width, height }, { x: Math.round(width / 2), y: Math.round(height / 2) }, "center");
    const tlPoint = new IconPoint(initialPoint, { width, height }, { x: 1, y: 1 }, "top-left");
    const trPoint = new IconPoint(initialPoint, { width, height }, { x: width, y: 1 }, "top-right");
    const blPoint = new IconPoint(initialPoint, { width, height }, { x: 1, y: height }, "bottom-left");
    const brPoint = new IconPoint(initialPoint, { width, height }, { x: width, y: height }, "bottom-right");
    const topMidPoint = new IconPoint(initialPoint, { width, height }, { x: Math.round(width / 2), y: 1 }, "top-middle");
    const bottomMidPoint = new IconPoint(initialPoint, { width, height }, { x: Math.round(width / 2), y: height }, "bottom-middle");
    const leftMidPoint = new IconPoint(initialPoint, { width, height }, { x: 1, y: Math.round(height / 2) }, "left-middle");
    const rightMidPoint = new IconPoint(initialPoint, { width, height }, { x: width, y: Math.round(height / 2) }, "right-middle");
    this.iconPoints.add(centerIconPoint);
    this.iconPoints.add(tlPoint);
    this.iconPoints.add(trPoint);
    this.iconPoints.add(blPoint);
    this.iconPoints.add(brPoint);
    this.iconPoints.add(topMidPoint);
    this.iconPoints.add(bottomMidPoint);
    this.iconPoints.add(leftMidPoint);
    this.iconPoints.add(rightMidPoint);
  }
  addIconPoint(pPoint, pBounds, pIconPoint, pId) {
    if (Icon.reservedIconPointIds.has(pId)) {
      VYI.logger.prefix("Vyi-module").error(`The id ${pId} is reserved and cannot be used for additional icon points.`);
      return;
    }
    const iconPoint = new IconPoint(pPoint, pBounds, pIconPoint, pId);
    this.iconPoints.add(iconPoint);
    return iconPoint;
  }
  removeIconPoint(pId) {
    for (const iconPoint of this.iconPoints) {
      if (iconPoint.getId() === pId && !Icon.reservedIconPointIds.has(pId)) {
        this.iconPoints.delete(iconPoint);
        break;
      }
    }
  }
  getIconPointExportById(pId) {
    for (const iconPoint of this.iconPoints) {
      if (iconPoint.getId() === pId) {
        return iconPoint.export();
      }
    }
    return;
  }
  getIconPointsExport() {
    const points = [];
    this.iconPoints.forEach((pPoint) => points.push(pPoint.export()));
    return points;
  }
  getIconPointById(pId) {
    for (const iconPoint of this.iconPoints) {
      if (iconPoint.getId() === pId) {
        return iconPoint;
      }
    }
    return;
  }
  getIconPoints() {
    const points = [];
    this.iconPoints.forEach((pPoint) => points.push(pPoint));
    return points;
  }
  getBoundsExport() {
    return this.boundsManager.exportAll();
  }
  getBoundsById(pId) {
    return this.boundsManager.get(pId);
  }
  getIdsByShape(pShape) {
    return this.boundsManager.getIdsByShape(pShape);
  }
  setBounds(pId, pShape) {
    this.boundsManager.add(pId, pShape);
    return this;
  }
  removeBounds(pId) {
    this.boundsManager.remove(pId);
    return this;
  }
  updateBounds(pId, pShape) {
    this.boundsManager.update(pId, pShape);
    return this;
  }
  setSize(pWidth, pHeight) {
    if (typeof pWidth === "number") {
      this.width = pWidth;
    }
    if (typeof pHeight === "number") {
      this.height = pHeight;
    }
    return this;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getSize() {
    return { width: this.width, height: this.height };
  }
  setDataURL(pDataURL) {
    if (typeof pDataURL === "string") {
      this.dataURL = pDataURL.replace(/^data:image\/[a-z]+;base64,/, "");
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid data url type!");
    }
    return this;
  }
  getDataURL() {
    return this.dataURL;
  }
  setDelay(pDelay) {
    if (typeof pDelay === "number") {
      this.delay = pDelay;
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid delay type!");
    }
    return this;
  }
  getDelay() {
    return this.delay;
  }
  rename(pName) {
    if (typeof pName === "string") {
      try {
        this.name = decodeURIComponent(pName);
      } catch {
        this.name = pName;
      }
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid type for pName!");
    }
    return this;
  }
  getName() {
    return this.name;
  }
  setAllFrameDelays(pDelay) {
    if (typeof pDelay === "number") {
      this.setDelay(pDelay);
      this.getFrames().forEach((pFrame) => pFrame.setDelay(pDelay));
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid type for pDelay!");
    }
    return this;
  }
  addFrame(pFrameData) {
    if (!pFrameData) {
      VYI.logger.prefix("Vyi-module").error("No frame data passed!");
      return;
    }
    if (!(pFrameData instanceof Frame) && !Array.isArray(pFrameData)) {
      VYI.logger.prefix("Vyi-module").error("Invalid frame data type passed!");
      return;
    }
    const frame = pFrameData instanceof Frame ? pFrameData : new Frame(pFrameData);
    frame.setParent(this);
    this.frames.set(this.frames.size, frame);
    this.indexFrames();
    return frame;
  }
  removeFrame(pFrame) {
    if (!pFrame)
      return this;
    if (pFrame instanceof Frame) {
      if (this.frames.delete(pFrame.index)) {
        pFrame.removeParent();
        this.indexFrames();
      }
    }
    return this;
  }
  removeFrameByIndex(pIndex) {
    const frame = this.getFrame(pIndex);
    if (frame) {
      this.removeFrame(frame);
    }
    return this;
  }
  indexFrames() {
    const frames = this.getFrames();
    this.frames.clear();
    frames.forEach((pFrame, pIndex) => {
      pFrame.index = pIndex;
      this.frames.set(pIndex, pFrame);
    });
  }
  reorderFrame(pCurrentIndex, pIndex) {
    if (typeof pCurrentIndex === "number" && typeof pIndex === "number") {
      let frameAtIndex = this.getFrame(pIndex);
      let currentFrame = pCurrentIndex === -1 ? this : this.getFrame(pCurrentIndex);
      if (currentFrame && frameAtIndex) {
        const currentFrameDataURL = currentFrame.getDataURL();
        const currentFrameDelay = currentFrame.getDelay();
        const frameAtIndexDataURL = frameAtIndex.getDataURL();
        const frameAtIndexDelay = frameAtIndex.getDelay();
        currentFrame.setDataURL(frameAtIndexDataURL);
        currentFrame.setDelay(frameAtIndexDelay);
        frameAtIndex.setDataURL(currentFrameDataURL);
        frameAtIndex.setDelay(currentFrameDelay);
      } else {
        VYI.logger.prefix("Vyi-module").error("There was no frame found at pCurrentIndex, or there was no frame found at pIndex!");
      }
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid type used!");
    }
    return this;
  }
  getFrame(pIndex) {
    return this.frames.get(pIndex);
  }
  getFrames() {
    return Array.from(this.frames.values());
  }
  getFramesData() {
    const frameDataArray = this.getFrames().map((pFrame) => pFrame.export());
    return frameDataArray;
  }
  addState(pIconData) {
    if (!pIconData) {
      VYI.logger.prefix("Vyi-module").error("No icon data passed!");
      return;
    }
    if (!(pIconData instanceof Icon) && !Array.isArray(pIconData)) {
      VYI.logger.prefix("Vyi-module").error("Invalid icon data type passed!");
      return;
    }
    const state = pIconData instanceof Icon ? pIconData : new Icon(this.convertStateDataToIconData(pIconData));
    if (state.getWidth() !== this.getWidth() || state.getHeight() !== this.getHeight()) {
      VYI.logger.prefix("Vyi-module").error("State dimensions do not match parent!");
      return;
    }
    state.setParent(this);
    if (this.vyi) {
      state.setVyi(this.vyi);
    }
    this.states.set(state.id, state);
    return state;
  }
  removeState(pState) {
    if (pState instanceof Icon) {
      if (this.states.delete(pState.id)) {
        pState.removeParent();
      }
    }
    return this;
  }
  removeStateByName(pName) {
    const state = this.getState(pName);
    if (state) {
      this.removeState(state);
    }
    return this;
  }
  removeStateById(pId) {
    const state = this.getStateById(pId);
    if (state) {
      this.removeState(state);
    }
    return this;
  }
  getState(pName) {
    if (typeof pName === "string") {
      const states = this.getStates();
      for (let i = states.length - 1;i >= 0; i--) {
        const state = states[i];
        if (state.getName() === pName) {
          return state;
        }
      }
      return;
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid name type used!");
      return;
    }
  }
  getStateById(pId) {
    if (!pId)
      return;
    return this.states.get(pId);
  }
  getStates() {
    return Array.from(this.states.values());
  }
  getStateNames() {
    return this.getStates().map((pState) => pState.getName());
  }
  getStatesData() {
    const stateDataArray = this.getStates().map((pState) => pState.exportAsState());
    return stateDataArray;
  }
  exportAsState() {
    const stateData = [
      this.getName(),
      this.getDataURL(),
      this.getDelay(),
      this.getFrames().map((pFrame) => pFrame.export())
    ];
    const boundsExport = this.getBoundsExport();
    if (Object.keys(boundsExport).length > 0) {
      stateData[4] = boundsExport;
    }
    return stateData;
  }
  convertStateDataToIconData(stateData) {
    return [
      stateData[0],
      this.getWidth(),
      this.getHeight(),
      stateData[2],
      stateData[1],
      stateData[3]
    ];
  }
  export() {
    const iconData = [
      this.getName(),
      this.getWidth(),
      this.getHeight(),
      this.getDelay(),
      this.getDataURL(),
      this.getFramesData()
    ];
    if (this.states.size > 0) {
      iconData[6] = this.getStatesData();
    }
    iconData[7] = this.getIconPointsExport();
    iconData[8] = this.getBoundsExport();
    return iconData;
  }
}

// src/vendor/pako.esm.mjs
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
var extra_dbits = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
var extra_blbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist) => {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};
var put_short = (s, w) => {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
};
var send_bits = (s, value, length) => {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
};
var send_code = (s, c, tree) => {
  send_bits(s, tree[c * 2], tree[c * 2 + 1]);
};
var bi_reverse = (code, len) => {
  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s) => {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};
var gen_bitlen = (s, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h;
  let n, m;
  let bits;
  let xbits;
  let f;
  let overflow = 0;
  for (bits = 0;bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1;h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length;bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code = 0;
  let bits;
  let n;
  for (bits = 1;bits <= MAX_BITS$1; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0;n <= max_code; n++) {
    let len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n;
  let bits;
  let length;
  let code;
  let dist;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0;code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0;n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0;code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0;n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (;code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0;n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0;bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0;n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s) => {
  let n;
  for (n = 0;n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0;n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0;n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};
var bi_windup = (s) => {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};
var smaller = (tree, n, m, depth) => {
  const _n2 = n * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
};
var pqdownheap = (s, tree, k) => {
  const v = s.heap[k];
  let j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
};
var compress_block = (s, ltree, dtree) => {
  let dist;
  let lc;
  let sx = 0;
  let code;
  let extra;
  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 255;
      dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
        }
      }
    } while (sx < s.sym_next);
  }
  send_code(s, END_BLOCK, ltree);
};
var build_tree = (s, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n, m;
  let max_code = -1;
  let node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n = 0;n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1;n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node = elems;
  do {
    n = s.heap[1];
    s.heap[1] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1);
    m = s.heap[1];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[1] = node++;
    pqdownheap(s, tree, 1);
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[1];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
};
var scan_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0;n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0;n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s) => {
  let max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1;max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s, lcodes, dcodes, blcodes) => {
  let rank;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank = 0;rank < blcodes; rank++) {
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s) => {
  let block_mask = 4093624447;
  let n;
  for (n = 0;n <= 31; n++, block_mask >>>= 1) {
    if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32;n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
};
var _tr_stored_block$1 = (s, buf, stored_len, last) => {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s);
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};
var _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};
var _tr_flush_block$1 = (s, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
};
var _tr_tally$1 = (s, dist, lc) => {
  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist) * 2]++;
  }
  return s.sym_next === s.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2000 ? 2000 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table = [];
  for (var n = 0;n < 256; n++) {
    c = n;
    for (var k = 0;k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i = pos;i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  1: "stream end",
  0: "",
  "-1": "file error",
  "-2": "stream error",
  "-3": "data error",
  "-4": "insufficient memory",
  "-5": "buffer error",
  "-6": "incompatible version"
};
var constants$2 = {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  Z_BINARY: 0,
  Z_TEXT: 1,
  Z_UNKNOWN: 2,
  Z_DEFLATED: 8
};
var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f) => {
  return f * 2 - (f > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;
  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
  n = wsize;
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
};
var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
var HASH = HASH_ZLIB;
var flush_pending = (strm) => {
  const s = strm.state;
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};
var flush_block_only = (s, last) => {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};
var put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};
var putShortMSB = (s, b) => {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size) => {
  let len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s, cur_match) => {
  let chain_length = s.max_chain_length;
  let scan = s.strstart;
  let match;
  let len;
  let best_len = s.prev_length;
  let nice_match = s.nice_match;
  const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s.window;
  const wmask = s.w_mask;
  const prev = s.prev;
  const strend = s.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};
var fill_window = (s) => {
  const _w_size = s.w_size;
  let n, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
      while (s.insert) {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
};
var deflate_stored = (s, flush) => {
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    len = 65535;
    have = s.bi_valid + 42 >> 3;
    if (s.strm.avail_out < have) {
      break;
    }
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;
    flush_pending(s.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);
  used -= s.strm.avail_in;
  if (used) {
    if (used >= s.w_size) {
      s.matches = 2;
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    } else {
      if (s.window_size - s.strstart <= used) {
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;
    }
    have += s.w_size;
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  have = s.bi_valid + 42 >> 3;
  have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s, flush) => {
  let hash_head;
  let bflush;
  for (;; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (;; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s.window;
  for (;; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s, flush) => {
  let bflush;
  for (;; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  new Config(0, 0, 0, 0, deflate_stored),
  new Config(4, 4, 8, 4, deflate_fast),
  new Config(4, 5, 16, 8, deflate_fast),
  new Config(4, 6, 32, 32, deflate_fast),
  new Config(4, 4, 16, 16, deflate_slow),
  new Config(8, 16, 32, 32, deflate_slow),
  new Config(8, 16, 128, 128, deflate_slow),
  new Config(8, 32, 128, 256, deflate_slow),
  new Config(32, 128, 258, 1024, deflate_slow),
  new Config(32, 258, 258, 4096, deflate_slow)
];
var lm_init = (s) => {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || s.status !== INIT_STATE && s.status !== GZIP_STATE && s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = s.wrap === 2 ? GZIP_STATE : s.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s = new DeflateState;
  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);
  s.sym_buf = s.lit_bufsize;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }
  const old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s, header);
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    strm.adler = 1;
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) {
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
      put_byte(s, s.gzhead.time & 255);
      put_byte(s, s.gzhead.time >> 8 & 255);
      put_byte(s, s.gzhead.time >> 16 & 255);
      put_byte(s, s.gzhead.time >> 24 & 255);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, s.gzhead.os & 255);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 255);
        put_byte(s, s.gzhead.extra.length >> 8 & 255);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      let beg = s.pending;
      let left = (s.gzhead.extra.length & 65535) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  const wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks) => {
  let len = 0;
  for (let i = 0, l = chunks.length;i < l; i++) {
    len += chunks[i].length;
  }
  const result = new Uint8Array(len);
  for (let i = 0, pos = 0, l = chunks.length;i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q = 0;q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (str) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }
  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0;m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0;i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i = 0;i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i = 0;i < len; ) {
    let c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream;
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode)
    _flush_mode = flush_mode;
  else
    _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (;; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0)
      break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist;
  let from;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (;; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (;; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]);
var dbase = new Uint16Array([
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask;
  let next;
  let base = null;
  let match;
  const count = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0;len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0;sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS;max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1;min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1;len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1;len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0;sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base = extra = work;
    match = 20;
  } else if (type === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;
  } else {
    base = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (;; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q) => {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState;
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist;
  const state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n;
  const order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (;; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(input.subarray(next, next + copy), len);
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case COPY_:
          state.mode = COPY;
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (;; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case LEN_:
          state.mode = LEN;
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (;; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        case DIST:
          for (;; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
      ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} = constants$2;
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream;
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(this.strm, opt.windowBits);
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader;
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended)
    return false;
  if (flush_mode === ~~flush_mode)
    _flush_mode = flush_mode;
  else
    _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (;; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail)
            strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }
    if (status === Z_OK && last_avail_out === 0)
      continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0)
      break;
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input);
  if (inflator.err)
    throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var Deflate_1 = Deflate;
var deflate_1 = deflate;
var deflateRaw_1 = deflateRaw;
var gzip_1 = gzip;
var Inflate_1 = Inflate;
var inflate_1 = inflate;
var inflateRaw_1 = inflateRaw;
var ungzip_1 = ungzip;
var constants_1 = constants$2;
var pako = {
  Deflate: Deflate_1,
  deflate: deflate_1,
  deflateRaw: deflateRaw_1,
  gzip: gzip_1,
  Inflate: Inflate_1,
  inflate: inflate_1,
  inflateRaw: inflateRaw_1,
  ungzip: ungzip_1,
  constants: constants_1
};

// src/vyi.ts
class VYI {
  static version = "4.1.0";
  static logger = new Logger;
  icons = new Map;
  name = "failed-to-find-vyi-name";
  formatVersion = 1;
  constructor(pVyiData) {
    VYI.logger.registerType("Vyi-module", "#ff6600");
    if (pVyiData) {
      this.parse(pVyiData);
    }
  }
  parse(pVyiData) {
    if (!pVyiData)
      return this;
    try {
      let vyi;
      if (typeof pVyiData === "string") {
        try {
          vyi = JSON.parse(pVyiData);
        } catch (pError) {
          if (!pVyiData.includes(".vyr") && !pVyiData.includes(".vyi")) {
            vyi = pVyiData;
            if (!vyi) {
              throw new Error("Non vyi data found from binary string");
            }
          } else {
            try {
              vyi = JSON.parse(pVyiData);
            } catch (e) {
              const isNodeEnv = typeof window === "undefined";
              if (isNodeEnv) {
                vyi = this.readFileAndGetVYI(pVyiData);
              } else {
                throw new Error("Invalid string input - not valid JSON or file path");
              }
            }
          }
        }
      } else if (pVyiData instanceof VYI) {
        vyi = pVyiData.export();
      } else if (pVyiData instanceof Object && !Array.isArray(pVyiData) && !(pVyiData instanceof ArrayBuffer || pVyiData instanceof Uint8Array)) {
        vyi = pVyiData;
      } else if (pVyiData instanceof ArrayBuffer || pVyiData instanceof Uint8Array) {
        vyi = this.handleBinaryData(pVyiData);
      } else {
        throw new Error("Error processing: Invalid input type provided.");
      }
      if (!vyi || (!vyi.v || !vyi.i) && !vyi.icons) {
        throw new Error("Non vyi data found.");
      }
      this.processVyiData(vyi);
    } catch (pError) {
      VYI.logger.prefix("Vyi-module").error(`${pError.message}`);
    }
    return this;
  }
  readFile(pVyiData) {
    try {
      const encoder = new TextEncoder;
      const binaryData = encoder.encode(pVyiData);
      const decompressed = pako.inflate(binaryData, { to: "string" });
      return JSON.parse(decompressed);
    } catch (error) {
      console.error("File reading failed:", error);
      return null;
    }
  }
  readFileAndGetVYI(pURL) {
    const fs = (() => ({}));
    const data = fs.readFileSync(pURL);
    return this.handleBinaryData(data);
  }
  async fetchAndParseJSON(pURL) {
    try {
      const response = await fetch(pURL);
      const jsonData = await response.json();
      return jsonData;
    } catch (pError) {
      throw new Error(`Failed to fetch or parse JSON from URL: ${pError}`);
    }
  }
  handleBinaryData(pBinaryData) {
    const byteArray = pBinaryData instanceof ArrayBuffer ? new Uint8Array(pBinaryData) : pBinaryData;
    try {
      const decompressed = pako.inflate(byteArray, { to: "string" });
      if (!decompressed)
        return null;
      return JSON.parse(decompressed);
    } catch (pError) {
      try {
        const decodedText = new TextDecoder().decode(byteArray);
        if (!decodedText)
          return null;
        return JSON.parse(decodedText);
      } catch (pDecodeError) {
        console.error("Decoding failed:", pDecodeError);
        return null;
      }
    }
  }
  processVyiData(pVyi) {
    this.icons.clear();
    const icons = pVyi.i || pVyi.icons;
    this.formatVersion = pVyi.v ?? "format not found";
    if (Array.isArray(icons)) {
      icons.forEach((pIconData) => {
        if (!Array.isArray(pIconData) && typeof pIconData === "object") {
          const convertedIconData = this.convertOldIconData(pIconData);
          this.addIcon(convertedIconData);
        } else {
          this.addIcon(pIconData);
        }
      });
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid .vyi file! Cannot parse icons.");
    }
  }
  convertOldIconData(pOldData) {
    const frames = Array.isArray(pOldData.frames) ? pOldData.frames.map((f) => [f.data, f.delay]) : [];
    const states = Array.isArray(pOldData.states) ? pOldData.states.map((s) => {
      const stateFrames = Array.isArray(s.frames) ? s.frames.map((f) => [f.data, f.delay]) : [];
      return [s.name, s.data, s.delay || 100, stateFrames];
    }) : [];
    return [
      pOldData.name || "",
      pOldData.w || 32,
      pOldData.h || 32,
      pOldData.delay || 100,
      pOldData.data || "",
      frames,
      states
    ];
  }
  addIcon(pIconData) {
    if (!pIconData) {
      VYI.logger.prefix("Vyi-module").error("No icon data passed!");
      return;
    }
    if (!(pIconData instanceof Icon) && !Array.isArray(pIconData)) {
      VYI.logger.prefix("Vyi-module").error("Invalid icon data type passed!");
      return;
    }
    const icon = pIconData instanceof Icon ? pIconData : new Icon(pIconData);
    this.icons.set(icon.id, icon);
    icon.setVyi(this);
    return icon;
  }
  removeIcon(pIcon) {
    if (!pIcon)
      return;
    if (pIcon instanceof Icon) {
      if (this.icons.delete(pIcon.id)) {
        pIcon.removeVyi();
      }
    }
  }
  removeIconByName(pName) {
    const icon = this.getIcon(pName);
    if (icon) {
      this.removeIcon(icon);
    }
  }
  removeIconById(pId) {
    const icon = this.getIconById(pId);
    if (icon) {
      this.removeIcon(icon);
    }
  }
  getIconNames() {
    const iconNames = this.getIcons().map((pIcon) => pIcon.name);
    return iconNames;
  }
  getIcon(pName) {
    if (typeof pName === "string") {
      const icons = this.getIcons();
      for (let i = icons.length - 1;i >= 0; i--) {
        const icon = icons[i];
        if (icon.getName() === pName) {
          return icon;
        }
      }
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid name type used!");
    }
  }
  getIconCount() {
    return this.icons.size;
  }
  getIconById(pId) {
    if (!pId)
      return;
    const icon = this.icons.get(pId) || this.getIcons().find((pIcon) => pIcon.states.has(pId))?.getStateById(pId);
    return icon;
  }
  getIcons() {
    return Array.from(this.icons.values());
  }
  rename(pName) {
    if (typeof pName === "string") {
      this.name = pName;
    } else {
      VYI.logger.prefix("Vyi-module").error("Invalid name type used!");
    }
  }
  getName() {
    return this.name;
  }
  export(pCompressed) {
    const vyi = {
      v: this.formatVersion,
      i: this.getIcons().map((pIcon) => pIcon.export())
    };
    if (pCompressed) {
      const binaryData = new TextEncoder().encode(JSON.stringify(vyi));
      const compressed = pako.deflate(binaryData);
      return compressed;
    }
    return vyi;
  }
}
// src/generated/vyi-worker-inline.ts
var WORKER_CODE = `/*!
 * vyi@4.1.0 https://github.com/EvitcaStudio/vyi
 * Compiled Sun, 21 Jun 2026 10:57:24 UTC
 * Copyright (c) 2026 Evitca Studio, "doubleactii"
 *
 * vyi is privately licensed.
 */
var a0=((Q)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(Q,{get:(W,J)=>(typeof require!=="undefined"?require:W)[J]}):Q)(function(Q){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+Q+'" is not supported')});/*!
 * logger@1.0.0 https://github.com/EvitcaStudio/Logger
 * Compiled Mon, 10 Nov 2025 05:36:23 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * logger is privately licensed.
 */class eQ{RESET;BRIGHT;DIM;UNDERSCORE;BLINK;REVERSE;HIDDEN;FG_BLACK;FG_RED;FG_GREEN;FG_YELLOW;FG_BLUE;FG_MAGENTA;FG_CYAN;FG_WHITE;FG_GRAY;BG_BLACK;BG_RED;BG_GREEN;BG_YELLOW;BG_BLUE;BG_MAGENTA;BG_CYAN;BG_WHITE;BG_GRAY;TYPE_SPACER_LENGTH;types;currentType;SPACE_CHAR;FG_COLORS;BG_COLORS;constructor(Q){this.RESET="\\x1B[0m",this.BRIGHT="\\x1B[1m",this.DIM="\\x1B[2m",this.UNDERSCORE="\\x1B[4m",this.BLINK="\\x1B[5m",this.REVERSE="\\x1B[7m",this.HIDDEN="\\x1B[8m",this.FG_BLACK="\\x1B[30m",this.FG_RED="\\x1B[31m",this.FG_GREEN="\\x1B[32m",this.FG_YELLOW="\\x1B[33m",this.FG_BLUE="\\x1B[34m",this.FG_MAGENTA="\\x1B[35m",this.FG_CYAN="\\x1B[36m",this.FG_WHITE="\\x1B[37m",this.FG_GRAY="\\x1B[90m",this.BG_BLACK="\\x1B[40m",this.BG_RED="\\x1B[41m",this.BG_GREEN="\\x1B[42m",this.BG_YELLOW="\\x1B[43m",this.BG_BLUE="\\x1B[44m",this.BG_MAGENTA="\\x1B[45m",this.BG_CYAN="\\x1B[46m",this.BG_WHITE="\\x1B[47m",this.BG_GRAY="\\x1B[100m",this.TYPE_SPACER_LENGTH=13,this.types={default:this.FG_WHITE},this.currentType="",this.SPACE_CHAR=" ",this.FG_COLORS={};for(let W=0;W<=255;W++)this.FG_COLORS[W]="\\x1B[38;5;"+W+"m";this.BG_COLORS={};for(let W=0;W<=255;W++)this.BG_COLORS[W]="\\x1B[48;5;"+W+"m";if(Array.isArray(Q))this.registerTypes(Q)}prefix(Q){if(typeof Q==="string")this.currentType=Q;return this}message(Q="log",...W){let J=this.currentType?this.currentType:"";if(J.length===0)console[Q](...W);else{let G=J.length>=this.TYPE_SPACER_LENGTH,q=this.types[J.toLowerCase()]?this.types[J.toLowerCase()]:this.types.default,z=q.includes("\\x1B");if(!z)q=\`color: \${q}\`;if(typeof globalThis.window!=="undefined")if(z)console[Q](q+J+this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH-J.length,G?1:0))+"|"+this.RESET,...W);else console[Q]("%c"+J+this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH-J.length,G?1:0))+"|",q,...W);else console[Q](q+J+this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH-J.length,G?1:0))+"|"+this.RESET,...W)}this.currentType=""}log(...Q){this.message("log",...Q)}info(...Q){this.message("info",...Q)}error(...Q){this.message("error",...Q)}warn(...Q){this.message("warn",...Q)}assert(...Q){console.assert(...Q)}debug(...Q){this.message("debug",...Q)}count(Q){console.count(Q)}countReset(Q){console.countReset(Q)}table(Q,W){console.table(Q,W)}time(Q="default"){this.message("time",Q)}timeLog(Q="default",...W){this.message("timeLog",Q,...W)}timeEnd(Q="default"){this.message("timeEnd",Q)}trace(...Q){this.message("trace",...Q)}group(Q=""){this.message("group",Q)}groupCollapsed(Q=""){this.message("groupCollapsed",Q)}groupEnd(){console.groupEnd()}clear(){console.clear()}registerType(Q,W){if(this.types[Q.toLowerCase()])return;if(typeof Q==="string"&&typeof W==="string")this.types[Q.toLowerCase()]=W}registerTypes(Q){if(Array.isArray(Q))for(let W=0;W<Q.length;W++)this.registerType(Q[W].type,Q[W].ansi)}unregisterType(Q){let W=Q.toLowerCase();if(this.types[W])delete this.types[W]}}class n{delay=100;dataURL="";index=0;parent=null;static defaultDelay=100;constructor(Q){if(Q)this.parse(Q)}parse(Q){if(!Q)return;let W=Q[0],J=Q[1]?Q[1]:this.parent?this.parent.getDelay():null;if(this.setDataURL(W),J)this.setDelay(J)}setParent(Q){if(!Q||this.parent)return;if(Q instanceof T){if(this.parent=Q,!this.getDelay())this.setDelay(this.parent.getDelay())}}removeParent(){this.parent=null}setDelay(Q){if(typeof Q==="number")this.delay=Q;else w.logger.prefix("Vyi-module").error("Invalid delay type!");return this}getDelay(){return this.delay}getIndex(){return this.index}setDataURL(Q){if(typeof Q==="string")this.dataURL=Q.replace(/^data:image\\/[a-z]+;base64,/,"");else w.logger.prefix("Vyi-module").error("Invalid data url type!");return this}getDataURL(){return this.dataURL}getWidth(){if(!this.parent)return;return this.parent.width}getHeight(){if(!this.parent)return;return this.parent.height}getSize(){if(!this.parent)return;return{width:this.parent.width,height:this.parent.height}}getVyi(){return this?.parent?.vyi}getParent(){return this.parent}export(){let Q=[this.getDataURL()];if(this.getDelay()!==n.defaultDelay)Q[1]=this.getDelay()||n.defaultDelay;return Q}}/*!
 * icon-point@2.1.0 https://github.com/EvitcaStudio/IconPoint
 * Compiled Mon, 10 Nov 2025 09:52:21 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * icon-point is privately licensed.
 *//*!
 * logger@1.0.0 https://github.com/EvitcaStudio/Logger
 * Compiled Mon, 10 Nov 2025 05:36:23 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * logger is privately licensed.
 */class SJ{RESET;BRIGHT;DIM;UNDERSCORE;BLINK;REVERSE;HIDDEN;FG_BLACK;FG_RED;FG_GREEN;FG_YELLOW;FG_BLUE;FG_MAGENTA;FG_CYAN;FG_WHITE;FG_GRAY;BG_BLACK;BG_RED;BG_GREEN;BG_YELLOW;BG_BLUE;BG_MAGENTA;BG_CYAN;BG_WHITE;BG_GRAY;TYPE_SPACER_LENGTH;types;currentType;SPACE_CHAR;FG_COLORS;BG_COLORS;constructor(Q){this.RESET="\\x1B[0m",this.BRIGHT="\\x1B[1m",this.DIM="\\x1B[2m",this.UNDERSCORE="\\x1B[4m",this.BLINK="\\x1B[5m",this.REVERSE="\\x1B[7m",this.HIDDEN="\\x1B[8m",this.FG_BLACK="\\x1B[30m",this.FG_RED="\\x1B[31m",this.FG_GREEN="\\x1B[32m",this.FG_YELLOW="\\x1B[33m",this.FG_BLUE="\\x1B[34m",this.FG_MAGENTA="\\x1B[35m",this.FG_CYAN="\\x1B[36m",this.FG_WHITE="\\x1B[37m",this.FG_GRAY="\\x1B[90m",this.BG_BLACK="\\x1B[40m",this.BG_RED="\\x1B[41m",this.BG_GREEN="\\x1B[42m",this.BG_YELLOW="\\x1B[43m",this.BG_BLUE="\\x1B[44m",this.BG_MAGENTA="\\x1B[45m",this.BG_CYAN="\\x1B[46m",this.BG_WHITE="\\x1B[47m",this.BG_GRAY="\\x1B[100m",this.TYPE_SPACER_LENGTH=13,this.types={default:this.FG_WHITE},this.currentType="",this.SPACE_CHAR=" ",this.FG_COLORS={};for(let W=0;W<=255;W++)this.FG_COLORS[W]="\\x1B[38;5;"+W+"m";this.BG_COLORS={};for(let W=0;W<=255;W++)this.BG_COLORS[W]="\\x1B[48;5;"+W+"m";if(Array.isArray(Q))this.registerTypes(Q)}prefix(Q){if(typeof Q==="string")this.currentType=Q;return this}message(Q="log",...W){let J=this.currentType?this.currentType:"";if(J.length===0)console[Q](...W);else{let G=J.length>=this.TYPE_SPACER_LENGTH,q=this.types[J.toLowerCase()]?this.types[J.toLowerCase()]:this.types.default,z=q.includes("\\x1B");if(!z)q=\`color: \${q}\`;if(typeof globalThis.window!=="undefined")if(z)console[Q](q+J+this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH-J.length,G?1:0))+"|"+this.RESET,...W);else console[Q]("%c"+J+this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH-J.length,G?1:0))+"|",q,...W);else console[Q](q+J+this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH-J.length,G?1:0))+"|"+this.RESET,...W)}this.currentType=""}log(...Q){this.message("log",...Q)}info(...Q){this.message("info",...Q)}error(...Q){this.message("error",...Q)}warn(...Q){this.message("warn",...Q)}assert(...Q){console.assert(...Q)}debug(...Q){this.message("debug",...Q)}count(Q){console.count(Q)}countReset(Q){console.countReset(Q)}table(Q,W){console.table(Q,W)}time(Q="default"){this.message("time",Q)}timeLog(Q="default",...W){this.message("timeLog",Q,...W)}timeEnd(Q="default"){this.message("timeEnd",Q)}trace(...Q){this.message("trace",...Q)}group(Q=""){this.message("group",Q)}groupCollapsed(Q=""){this.message("groupCollapsed",Q)}groupEnd(){console.groupEnd()}clear(){console.clear()}registerType(Q,W){if(this.types[Q.toLowerCase()])return;if(typeof Q==="string"&&typeof W==="string")this.types[Q.toLowerCase()]=W}registerTypes(Q){if(Array.isArray(Q))for(let W=0;W<Q.length;W++)this.registerType(Q[W].type,Q[W].ansi)}unregisterType(Q){let W=Q.toLowerCase();if(this.types[W])delete this.types[W]}}class E{static defaultOffset={x:0,y:0};static defaultAnchor={x:0.5,y:0.5};static version="2.1.0";static logger=new SJ;iconPoint={x:0,y:0};originalPoint={x:0,y:0};positionalPoint;point={x:0,y:0};bounds={width:32,height:32};id;constructor(Q,W,J,j){let{width:G,height:q}=W;this.bounds.width=G,this.bounds.height=q,this.positionalPoint=Q,this.originalPoint={...J},this.id=j||"",E.logger.registerType("IconPointModule","#ff6600"),this.setPoint(J)}getPoint(Q=0,W=E.defaultOffset,J=E.defaultAnchor){let j=this.positionalPoint.x+W.x+this.bounds.width*J.x,G=this.positionalPoint.y+W.y+this.bounds.height*J.y,q=this.positionalPoint.x+W.x-1+this.iconPoint.x,z=this.positionalPoint.y+W.y-1+this.iconPoint.y,U=q-j,Y=z-G,X=U*Math.cos(Q)-Y*-Math.sin(Q),K=U*-Math.sin(Q)+Y*Math.cos(Q),P=X+j,k=K+G;return this.point.x=P,this.point.y=k,this.point}getPointFromExternalPoint(Q,W=0,J=E.defaultOffset,j=E.defaultAnchor){let G=Q.x+J.x+this.bounds.width*j.x,q=Q.y+J.y+this.bounds.height*j.y,z=Q.x+J.x-1+this.iconPoint.x,U=Q.y+J.y-1+this.iconPoint.y,Y=z-G,X=U-q,K=Y*Math.cos(W)-X*-Math.sin(W),P=Y*-Math.sin(W)+X*Math.cos(W),k=K+G,V=P+q;return this.point.x=k,this.point.y=V,this.point}setPoint(Q){let{x:W,y:J,isNormalized:j}=Q;this.iconPoint.x=j?W*this.bounds.width:W,this.iconPoint.y=j?J*this.bounds.height:J}resetPoint(){this.setPoint(this.originalPoint)}updateBounds(Q){let{width:W,height:J}=Q;this.bounds.width=W,this.bounds.height=J}transformX(Q){let W=Math.abs(Q*this.bounds.width);this.iconPoint.x=W-this.originalPoint.x}transformY(Q){let W=Math.abs(Q*this.bounds.height);this.iconPoint.y=W-this.originalPoint.y}transform(Q){this.transformX(Q.x),this.transformY(Q.y)}getId(){return this.id}export(){return{...this.bounds,...this.iconPoint,id:this.id}}}class tQ{bounds={};add(Q,W){this.bounds[Q]=W}remove(Q){delete this.bounds[Q]}update(Q,W){if(this.bounds[Q])this.bounds[Q]={...this.bounds[Q],...W}}rename(Q,W){if(this.bounds[Q])this.bounds[W]=this.bounds[Q],delete this.bounds[Q]}get(Q){return this.bounds[Q]}getAll(){return{...this.bounds}}getIdsByShape(Q){return Object.keys(this.bounds).filter((W)=>this.bounds[W].type===Q)}exportAll(){return this.getAll()}clearAll(){this.bounds={}}loadBounds(Q){this.clearAll(),Object.entries(Q).forEach(([W,J])=>{this.add(W,J)})}}class T{states=new Map;frames=new Map;width=32;height=32;dataURL="";delay=100;name="";parent=null;vyi=null;id="";static reservedIds=new Set;iconPoints=new Set;boundsManager=new tQ;static reservedIconPointIds=new Set(["center","top-left","top-right","bottom-left","bottom-right","top-middle","bottom-middle","left-middle","right-middle"]);static generateId(){let Q=()=>{return Math.floor(Math.random()*4294967295).toString(16).padStart(8,"0")},W=Q();while(this.reservedIds.has(W))W=Q();return this.reservedIds.add(W),W}constructor(Q){if(Q)this.parse(Q);this.assignId()}setParent(Q){if(!Q||this.parent)return;if(Q instanceof T)this.parent=Q}removeParent(){if(this.parent)this.parent=null,this.vyi=null}setVyi(Q){if(!Q)return;if(Q instanceof w){if(this.vyi=Q,this.getStateCount()>0)this.getStates().forEach((j)=>{j.setParent(this),j.setVyi(Q)});this.getFrames().forEach((J)=>J.setParent(this))}}removeVyi(){this.vyi=null}assignId(){this.id=T.generateId()}getId(){return this.id}getVyi(){return this.vyi}getParent(){return this.parent}getStateCount(){return this.states.size}getFrameCount(){return this.frames.size}parse(Q){if(!Q)return;let W=Q[0],J=Q[1],j=Q[2],G=Q[3],q=Q[4],z=Q[5],U=Q[6],Y=Q[7],X=Q[8];if(this.rename(W),this.setSize(J,j),this.setDelay(G),this.setDataURL(q),Array.isArray(z))z.forEach((K)=>{this.addFrame(K)});if(Array.isArray(U))U.forEach((K)=>{let P=new T(void 0),k=K[0],V=K[1],Z=K[2],M=K[3],$=K[4];if(P.rename(k),P.setSize(J,j),P.setDelay(Z),P.setDataURL(V),Array.isArray(M))M.forEach((C)=>{P.addFrame(C)});if($&&typeof $==="object")P.boundsManager.loadBounds($);this.addState(P)});if(Array.isArray(Y))Y.forEach((K)=>{let{x:P,y:k,width:V,height:Z,id:M}=K;if(T.reservedIconPointIds.has(M))return;this.addIconPoint({x:0,y:0},{width:V,height:Z},{x:P,y:k},M)});if(X&&typeof X==="object")this.boundsManager.loadBounds(X);this.resetInitialIconPoints()}resetInitialIconPoints(){let Q=this.getWidth(),W=this.getHeight();Array.from(T.reservedIconPointIds).forEach((k)=>{let V=Array.from(this.iconPoints).find((Z)=>Z.getId()===k);if(!V)return;this.iconPoints.delete(V)});let J={x:1,y:1},j=new E(J,{width:Q,height:W},{x:Math.round(Q/2),y:Math.round(W/2)},"center"),G=new E(J,{width:Q,height:W},{x:1,y:1},"top-left"),q=new E(J,{width:Q,height:W},{x:Q,y:1},"top-right"),z=new E(J,{width:Q,height:W},{x:1,y:W},"bottom-left"),U=new E(J,{width:Q,height:W},{x:Q,y:W},"bottom-right"),Y=new E(J,{width:Q,height:W},{x:Math.round(Q/2),y:1},"top-middle"),X=new E(J,{width:Q,height:W},{x:Math.round(Q/2),y:W},"bottom-middle"),K=new E(J,{width:Q,height:W},{x:1,y:Math.round(W/2)},"left-middle"),P=new E(J,{width:Q,height:W},{x:Q,y:Math.round(W/2)},"right-middle");this.iconPoints.add(j),this.iconPoints.add(G),this.iconPoints.add(q),this.iconPoints.add(z),this.iconPoints.add(U),this.iconPoints.add(Y),this.iconPoints.add(X),this.iconPoints.add(K),this.iconPoints.add(P)}addIconPoint(Q,W,J,j){if(T.reservedIconPointIds.has(j)){w.logger.prefix("Vyi-module").error(\`The id \${j} is reserved and cannot be used for additional icon points.\`);return}let G=new E(Q,W,J,j);return this.iconPoints.add(G),G}removeIconPoint(Q){for(let W of this.iconPoints)if(W.getId()===Q&&!T.reservedIconPointIds.has(Q)){this.iconPoints.delete(W);break}}getIconPointExportById(Q){for(let W of this.iconPoints)if(W.getId()===Q)return W.export();return}getIconPointsExport(){let Q=[];return this.iconPoints.forEach((W)=>Q.push(W.export())),Q}getIconPointById(Q){for(let W of this.iconPoints)if(W.getId()===Q)return W;return}getIconPoints(){let Q=[];return this.iconPoints.forEach((W)=>Q.push(W)),Q}getBoundsExport(){return this.boundsManager.exportAll()}getBoundsById(Q){return this.boundsManager.get(Q)}getIdsByShape(Q){return this.boundsManager.getIdsByShape(Q)}setBounds(Q,W){return this.boundsManager.add(Q,W),this}removeBounds(Q){return this.boundsManager.remove(Q),this}updateBounds(Q,W){return this.boundsManager.update(Q,W),this}setSize(Q,W){if(typeof Q==="number")this.width=Q;if(typeof W==="number")this.height=W;return this}getWidth(){return this.width}getHeight(){return this.height}getSize(){return{width:this.width,height:this.height}}setDataURL(Q){if(typeof Q==="string")this.dataURL=Q.replace(/^data:image\\/[a-z]+;base64,/,"");else w.logger.prefix("Vyi-module").error("Invalid data url type!");return this}getDataURL(){return this.dataURL}setDelay(Q){if(typeof Q==="number")this.delay=Q;else w.logger.prefix("Vyi-module").error("Invalid delay type!");return this}getDelay(){return this.delay}rename(Q){if(typeof Q==="string")try{this.name=decodeURIComponent(Q)}catch{this.name=Q}else w.logger.prefix("Vyi-module").error("Invalid type for pName!");return this}getName(){return this.name}setAllFrameDelays(Q){if(typeof Q==="number")this.setDelay(Q),this.getFrames().forEach((W)=>W.setDelay(Q));else w.logger.prefix("Vyi-module").error("Invalid type for pDelay!");return this}addFrame(Q){if(!Q){w.logger.prefix("Vyi-module").error("No frame data passed!");return}if(!(Q instanceof n)&&!Array.isArray(Q)){w.logger.prefix("Vyi-module").error("Invalid frame data type passed!");return}let W=Q instanceof n?Q:new n(Q);return W.setParent(this),this.frames.set(this.frames.size,W),this.indexFrames(),W}removeFrame(Q){if(!Q)return this;if(Q instanceof n){if(this.frames.delete(Q.index))Q.removeParent(),this.indexFrames()}return this}removeFrameByIndex(Q){let W=this.getFrame(Q);if(W)this.removeFrame(W);return this}indexFrames(){let Q=this.getFrames();this.frames.clear(),Q.forEach((W,J)=>{W.index=J,this.frames.set(J,W)})}reorderFrame(Q,W){if(typeof Q==="number"&&typeof W==="number"){let J=this.getFrame(W),j=Q===-1?this:this.getFrame(Q);if(j&&J){let G=j.getDataURL(),q=j.getDelay(),z=J.getDataURL(),U=J.getDelay();j.setDataURL(z),j.setDelay(U),J.setDataURL(G),J.setDelay(q)}else w.logger.prefix("Vyi-module").error("There was no frame found at pCurrentIndex, or there was no frame found at pIndex!")}else w.logger.prefix("Vyi-module").error("Invalid type used!");return this}getFrame(Q){return this.frames.get(Q)}getFrames(){return Array.from(this.frames.values())}getFramesData(){return this.getFrames().map((W)=>W.export())}addState(Q){if(!Q){w.logger.prefix("Vyi-module").error("No icon data passed!");return}if(!(Q instanceof T)&&!Array.isArray(Q)){w.logger.prefix("Vyi-module").error("Invalid icon data type passed!");return}let W=Q instanceof T?Q:new T(this.convertStateDataToIconData(Q));if(W.getWidth()!==this.getWidth()||W.getHeight()!==this.getHeight()){w.logger.prefix("Vyi-module").error("State dimensions do not match parent!");return}if(W.setParent(this),this.vyi)W.setVyi(this.vyi);return this.states.set(W.id,W),W}removeState(Q){if(Q instanceof T){if(this.states.delete(Q.id))Q.removeParent()}return this}removeStateByName(Q){let W=this.getState(Q);if(W)this.removeState(W);return this}removeStateById(Q){let W=this.getStateById(Q);if(W)this.removeState(W);return this}getState(Q){if(typeof Q==="string"){let W=this.getStates();for(let J=W.length-1;J>=0;J--){let j=W[J];if(j.getName()===Q)return j}return}else{w.logger.prefix("Vyi-module").error("Invalid name type used!");return}}getStateById(Q){if(!Q)return;return this.states.get(Q)}getStates(){return Array.from(this.states.values())}getStateNames(){return this.getStates().map((Q)=>Q.getName())}getStatesData(){return this.getStates().map((W)=>W.exportAsState())}exportAsState(){let Q=[this.getName(),this.getDataURL(),this.getDelay(),this.getFrames().map((J)=>J.export())],W=this.getBoundsExport();if(Object.keys(W).length>0)Q[4]=W;return Q}convertStateDataToIconData(Q){return[Q[0],this.getWidth(),this.getHeight(),Q[2],Q[1],Q[3]]}export(){let Q=[this.getName(),this.getWidth(),this.getHeight(),this.getDelay(),this.getDataURL(),this.getFramesData()];if(this.states.size>0)Q[6]=this.getStatesData();return Q[7]=this.getIconPointsExport(),Q[8]=this.getBoundsExport(),Q}}/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */function HQ(Q){let W=Q.length;while(--W>=0)Q[W]=0}var e0=0,H0=1,t0=2,s0=3,Q5=258,vJ=29,yQ=256,RQ=yQ+1+vJ,YQ=30,gJ=19,P0=2*RQ+1,WQ=15,sQ=16,J5=7,RJ=256,B0=16,C0=17,$0=18,FJ=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),pQ=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),W5=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),L0=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),j5=512,r=new Array((RQ+2)*2);HQ(r);var NQ=new Array(YQ*2);HQ(NQ);var xQ=new Array(j5);HQ(xQ);var OQ=new Array(Q5-s0+1);HQ(OQ);var xJ=new Array(vJ);HQ(xJ);var lQ=new Array(YQ);HQ(lQ);function QJ(Q,W,J,j,G){this.static_tree=Q,this.extra_bits=W,this.extra_base=J,this.elems=j,this.max_length=G,this.has_stree=Q&&Q.length}var N0,v0,g0;function JJ(Q,W){this.dyn_tree=Q,this.max_code=0,this.stat_desc=W}var R0=(Q)=>{return Q<256?xQ[Q]:xQ[256+(Q>>>7)]},MQ=(Q,W)=>{Q.pending_buf[Q.pending++]=W&255,Q.pending_buf[Q.pending++]=W>>>8&255},f=(Q,W,J)=>{if(Q.bi_valid>sQ-J)Q.bi_buf|=W<<Q.bi_valid&65535,MQ(Q,Q.bi_buf),Q.bi_buf=W>>sQ-Q.bi_valid,Q.bi_valid+=J-sQ;else Q.bi_buf|=W<<Q.bi_valid&65535,Q.bi_valid+=J},p=(Q,W,J)=>{f(Q,J[W*2],J[W*2+1])},x0=(Q,W)=>{let J=0;do J|=Q&1,Q>>>=1,J<<=1;while(--W>0);return J>>>1},q5=(Q)=>{if(Q.bi_valid===16)MQ(Q,Q.bi_buf),Q.bi_buf=0,Q.bi_valid=0;else if(Q.bi_valid>=8)Q.pending_buf[Q.pending++]=Q.bi_buf&255,Q.bi_buf>>=8,Q.bi_valid-=8},G5=(Q,W)=>{let{dyn_tree:J,max_code:j}=W,G=W.stat_desc.static_tree,q=W.stat_desc.has_stree,z=W.stat_desc.extra_bits,U=W.stat_desc.extra_base,Y=W.stat_desc.max_length,X,K,P,k,V,Z,M=0;for(k=0;k<=WQ;k++)Q.bl_count[k]=0;J[Q.heap[Q.heap_max]*2+1]=0;for(X=Q.heap_max+1;X<P0;X++){if(K=Q.heap[X],k=J[J[K*2+1]*2+1]+1,k>Y)k=Y,M++;if(J[K*2+1]=k,K>j)continue;if(Q.bl_count[k]++,V=0,K>=U)V=z[K-U];if(Z=J[K*2],Q.opt_len+=Z*(k+V),q)Q.static_len+=Z*(G[K*2+1]+V)}if(M===0)return;do{k=Y-1;while(Q.bl_count[k]===0)k--;Q.bl_count[k]--,Q.bl_count[k+1]+=2,Q.bl_count[Y]--,M-=2}while(M>0);for(k=Y;k!==0;k--){K=Q.bl_count[k];while(K!==0){if(P=Q.heap[--X],P>j)continue;if(J[P*2+1]!==k)Q.opt_len+=(k-J[P*2+1])*J[P*2],J[P*2+1]=k;K--}}},O0=(Q,W,J)=>{let j=new Array(WQ+1),G=0,q,z;for(q=1;q<=WQ;q++)G=G+J[q-1]<<1,j[q]=G;for(z=0;z<=W;z++){let U=Q[z*2+1];if(U===0)continue;Q[z*2]=x0(j[U]++,U)}},X5=()=>{let Q,W,J,j,G,q=new Array(WQ+1);J=0;for(j=0;j<vJ-1;j++){xJ[j]=J;for(Q=0;Q<1<<FJ[j];Q++)OQ[J++]=j}OQ[J-1]=j,G=0;for(j=0;j<16;j++){lQ[j]=G;for(Q=0;Q<1<<pQ[j];Q++)xQ[G++]=j}G>>=7;for(;j<YQ;j++){lQ[j]=G<<7;for(Q=0;Q<1<<pQ[j]-7;Q++)xQ[256+G++]=j}for(W=0;W<=WQ;W++)q[W]=0;Q=0;while(Q<=143)r[Q*2+1]=8,Q++,q[8]++;while(Q<=255)r[Q*2+1]=9,Q++,q[9]++;while(Q<=279)r[Q*2+1]=7,Q++,q[7]++;while(Q<=287)r[Q*2+1]=8,Q++,q[8]++;O0(r,RQ+1,q);for(Q=0;Q<YQ;Q++)NQ[Q*2+1]=5,NQ[Q*2]=x0(Q,5);N0=new QJ(r,FJ,yQ+1,RQ,WQ),v0=new QJ(NQ,pQ,0,YQ,WQ),g0=new QJ(new Array(0),W5,0,gJ,J5)},M0=(Q)=>{let W;for(W=0;W<RQ;W++)Q.dyn_ltree[W*2]=0;for(W=0;W<YQ;W++)Q.dyn_dtree[W*2]=0;for(W=0;W<gJ;W++)Q.bl_tree[W*2]=0;Q.dyn_ltree[RJ*2]=1,Q.opt_len=Q.static_len=0,Q.sym_next=Q.matches=0},w0=(Q)=>{if(Q.bi_valid>8)MQ(Q,Q.bi_buf);else if(Q.bi_valid>0)Q.pending_buf[Q.pending++]=Q.bi_buf;Q.bi_buf=0,Q.bi_valid=0},TJ=(Q,W,J,j)=>{let G=W*2,q=J*2;return Q[G]<Q[q]||Q[G]===Q[q]&&j[W]<=j[J]},WJ=(Q,W,J)=>{let j=Q.heap[J],G=J<<1;while(G<=Q.heap_len){if(G<Q.heap_len&&TJ(W,Q.heap[G+1],Q.heap[G],Q.depth))G++;if(TJ(W,j,Q.heap[G],Q.depth))break;Q.heap[J]=Q.heap[G],J=G,G<<=1}Q.heap[J]=j},yJ=(Q,W,J)=>{let j,G,q=0,z,U;if(Q.sym_next!==0)do if(j=Q.pending_buf[Q.sym_buf+q++]&255,j+=(Q.pending_buf[Q.sym_buf+q++]&255)<<8,G=Q.pending_buf[Q.sym_buf+q++],j===0)p(Q,G,W);else{if(z=OQ[G],p(Q,z+yQ+1,W),U=FJ[z],U!==0)G-=xJ[z],f(Q,G,U);if(j--,z=R0(j),p(Q,z,J),U=pQ[z],U!==0)j-=lQ[z],f(Q,j,U)}while(q<Q.sym_next);p(Q,RJ,W)},ZJ=(Q,W)=>{let J=W.dyn_tree,j=W.stat_desc.static_tree,G=W.stat_desc.has_stree,q=W.stat_desc.elems,z,U,Y=-1,X;Q.heap_len=0,Q.heap_max=P0;for(z=0;z<q;z++)if(J[z*2]!==0)Q.heap[++Q.heap_len]=Y=z,Q.depth[z]=0;else J[z*2+1]=0;while(Q.heap_len<2)if(X=Q.heap[++Q.heap_len]=Y<2?++Y:0,J[X*2]=1,Q.depth[X]=0,Q.opt_len--,G)Q.static_len-=j[X*2+1];W.max_code=Y;for(z=Q.heap_len>>1;z>=1;z--)WJ(Q,J,z);X=q;do z=Q.heap[1],Q.heap[1]=Q.heap[Q.heap_len--],WJ(Q,J,1),U=Q.heap[1],Q.heap[--Q.heap_max]=z,Q.heap[--Q.heap_max]=U,J[X*2]=J[z*2]+J[U*2],Q.depth[X]=(Q.depth[z]>=Q.depth[U]?Q.depth[z]:Q.depth[U])+1,J[z*2+1]=J[U*2+1]=X,Q.heap[1]=X++,WJ(Q,J,1);while(Q.heap_len>=2);Q.heap[--Q.heap_max]=Q.heap[1],G5(Q,W),O0(J,Y,Q.bl_count)},DJ=(Q,W,J)=>{let j,G=-1,q,z=W[1],U=0,Y=7,X=4;if(z===0)Y=138,X=3;W[(J+1)*2+1]=65535;for(j=0;j<=J;j++){if(q=z,z=W[(j+1)*2+1],++U<Y&&q===z)continue;else if(U<X)Q.bl_tree[q*2]+=U;else if(q!==0){if(q!==G)Q.bl_tree[q*2]++;Q.bl_tree[B0*2]++}else if(U<=10)Q.bl_tree[C0*2]++;else Q.bl_tree[$0*2]++;if(U=0,G=q,z===0)Y=138,X=3;else if(q===z)Y=6,X=3;else Y=7,X=4}},EJ=(Q,W,J)=>{let j,G=-1,q,z=W[1],U=0,Y=7,X=4;if(z===0)Y=138,X=3;for(j=0;j<=J;j++){if(q=z,z=W[(j+1)*2+1],++U<Y&&q===z)continue;else if(U<X)do p(Q,q,Q.bl_tree);while(--U!==0);else if(q!==0){if(q!==G)p(Q,q,Q.bl_tree),U--;p(Q,B0,Q.bl_tree),f(Q,U-3,2)}else if(U<=10)p(Q,C0,Q.bl_tree),f(Q,U-3,3);else p(Q,$0,Q.bl_tree),f(Q,U-11,7);if(U=0,G=q,z===0)Y=138,X=3;else if(q===z)Y=6,X=3;else Y=7,X=4}},U5=(Q)=>{let W;DJ(Q,Q.dyn_ltree,Q.l_desc.max_code),DJ(Q,Q.dyn_dtree,Q.d_desc.max_code),ZJ(Q,Q.bl_desc);for(W=gJ-1;W>=3;W--)if(Q.bl_tree[L0[W]*2+1]!==0)break;return Q.opt_len+=3*(W+1)+5+5+4,W},z5=(Q,W,J,j)=>{let G;f(Q,W-257,5),f(Q,J-1,5),f(Q,j-4,4);for(G=0;G<j;G++)f(Q,Q.bl_tree[L0[G]*2+1],3);EJ(Q,Q.dyn_ltree,W-1),EJ(Q,Q.dyn_dtree,J-1)},K5=(Q)=>{let W=4093624447,J;for(J=0;J<=31;J++,W>>>=1)if(W&1&&Q.dyn_ltree[J*2]!==0)return 0;if(Q.dyn_ltree[18]!==0||Q.dyn_ltree[20]!==0||Q.dyn_ltree[26]!==0)return 1;for(J=32;J<yQ;J++)if(Q.dyn_ltree[J*2]!==0)return 1;return 0},IJ=!1,V5=(Q)=>{if(!IJ)X5(),IJ=!0;Q.l_desc=new JJ(Q.dyn_ltree,N0),Q.d_desc=new JJ(Q.dyn_dtree,v0),Q.bl_desc=new JJ(Q.bl_tree,g0),Q.bi_buf=0,Q.bi_valid=0,M0(Q)},A0=(Q,W,J,j)=>{if(f(Q,(e0<<1)+(j?1:0),3),w0(Q),MQ(Q,J),MQ(Q,~J),J)Q.pending_buf.set(Q.window.subarray(W,W+J),Q.pending);Q.pending+=J},k5=(Q)=>{f(Q,H0<<1,3),p(Q,RJ,r),q5(Q)},Y5=(Q,W,J,j)=>{let G,q,z=0;if(Q.level>0){if(Q.strm.data_type===2)Q.strm.data_type=K5(Q);if(ZJ(Q,Q.l_desc),ZJ(Q,Q.d_desc),z=U5(Q),G=Q.opt_len+3+7>>>3,q=Q.static_len+3+7>>>3,q<=G)G=q}else G=q=J+5;if(J+4<=G&&W!==-1)A0(Q,W,J,j);else if(Q.strategy===4||q===G)f(Q,(H0<<1)+(j?1:0),3),yJ(Q,r,NQ);else f(Q,(t0<<1)+(j?1:0),3),z5(Q,Q.l_desc.max_code+1,Q.d_desc.max_code+1,z+1),yJ(Q,Q.dyn_ltree,Q.dyn_dtree);if(M0(Q),j)w0(Q)},F5=(Q,W,J)=>{if(Q.pending_buf[Q.sym_buf+Q.sym_next++]=W,Q.pending_buf[Q.sym_buf+Q.sym_next++]=W>>8,Q.pending_buf[Q.sym_buf+Q.sym_next++]=J,W===0)Q.dyn_ltree[J*2]++;else Q.matches++,W--,Q.dyn_ltree[(OQ[J]+yQ+1)*2]++,Q.dyn_dtree[R0(W)*2]++;return Q.sym_next===Q.sym_end},Z5=V5,H5=A0,P5=Y5,B5=F5,C5=k5,$5={_tr_init:Z5,_tr_stored_block:H5,_tr_flush_block:P5,_tr_tally:B5,_tr_align:C5},L5=(Q,W,J,j)=>{let G=Q&65535|0,q=Q>>>16&65535|0,z=0;while(J!==0){z=J>2000?2000:J,J-=z;do G=G+W[j++]|0,q=q+G|0;while(--z);G%=65521,q%=65521}return G|q<<16|0},wQ=L5,N5=()=>{let Q,W=[];for(var J=0;J<256;J++){Q=J;for(var j=0;j<8;j++)Q=Q&1?3988292384^Q>>>1:Q>>>1;W[J]=Q}return W},v5=new Uint32Array(N5()),g5=(Q,W,J,j)=>{let G=v5,q=j+J;Q^=-1;for(let z=j;z<q;z++)Q=Q>>>8^G[(Q^W[z])&255];return Q^-1},D=g5,GQ={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},zQ={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8},{_tr_init:R5,_tr_stored_block:HJ,_tr_flush_block:x5,_tr_tally:t,_tr_align:O5}=$5,{Z_NO_FLUSH:s,Z_PARTIAL_FLUSH:M5,Z_FULL_FLUSH:w5,Z_FINISH:c,Z_BLOCK:bJ,Z_OK:I,Z_STREAM_END:fJ,Z_STREAM_ERROR:l,Z_DATA_ERROR:A5,Z_BUF_ERROR:jJ,Z_DEFAULT_COMPRESSION:S5,Z_FILTERED:T5,Z_HUFFMAN_ONLY:uQ,Z_RLE:y5,Z_FIXED:D5,Z_DEFAULT_STRATEGY:E5,Z_UNKNOWN:I5,Z_DEFLATED:rQ}=zQ,b5=9,f5=15,u5=8,h5=29,c5=256,PJ=c5+1+h5,m5=30,d5=19,p5=2*PJ+1,l5=15,v=3,e=258,_=e+v+1,_5=32,FQ=42,OJ=57,BJ=69,CJ=73,$J=91,LJ=103,jQ=113,$Q=666,b=1,PQ=2,XQ=3,BQ=4,i5=3,qQ=(Q,W)=>{return Q.msg=GQ[W],W},uJ=(Q)=>{return Q*2-(Q>4?9:0)},a=(Q)=>{let W=Q.length;while(--W>=0)Q[W]=0},r5=(Q)=>{let W,J,j,G=Q.w_size;W=Q.hash_size,j=W;do J=Q.head[--j],Q.head[j]=J>=G?J-G:0;while(--W);W=G,j=W;do J=Q.prev[--j],Q.prev[j]=J>=G?J-G:0;while(--W)},o5=(Q,W,J)=>(W<<Q.hash_shift^J)&Q.hash_mask,QQ=o5,u=(Q)=>{let W=Q.state,J=W.pending;if(J>Q.avail_out)J=Q.avail_out;if(J===0)return;if(Q.output.set(W.pending_buf.subarray(W.pending_out,W.pending_out+J),Q.next_out),Q.next_out+=J,W.pending_out+=J,Q.total_out+=J,Q.avail_out-=J,W.pending-=J,W.pending===0)W.pending_out=0},h=(Q,W)=>{x5(Q,Q.block_start>=0?Q.block_start:-1,Q.strstart-Q.block_start,W),Q.block_start=Q.strstart,u(Q.strm)},x=(Q,W)=>{Q.pending_buf[Q.pending++]=W},CQ=(Q,W)=>{Q.pending_buf[Q.pending++]=W>>>8&255,Q.pending_buf[Q.pending++]=W&255},NJ=(Q,W,J,j)=>{let G=Q.avail_in;if(G>j)G=j;if(G===0)return 0;if(Q.avail_in-=G,W.set(Q.input.subarray(Q.next_in,Q.next_in+G),J),Q.state.wrap===1)Q.adler=wQ(Q.adler,W,G,J);else if(Q.state.wrap===2)Q.adler=D(Q.adler,W,G,J);return Q.next_in+=G,Q.total_in+=G,G},S0=(Q,W)=>{let{max_chain_length:J,strstart:j}=Q,G,q,z=Q.prev_length,U=Q.nice_match,Y=Q.strstart>Q.w_size-_?Q.strstart-(Q.w_size-_):0,X=Q.window,K=Q.w_mask,P=Q.prev,k=Q.strstart+e,V=X[j+z-1],Z=X[j+z];if(Q.prev_length>=Q.good_match)J>>=2;if(U>Q.lookahead)U=Q.lookahead;do{if(G=W,X[G+z]!==Z||X[G+z-1]!==V||X[G]!==X[j]||X[++G]!==X[j+1])continue;j+=2,G++;do;while(X[++j]===X[++G]&&X[++j]===X[++G]&&X[++j]===X[++G]&&X[++j]===X[++G]&&X[++j]===X[++G]&&X[++j]===X[++G]&&X[++j]===X[++G]&&X[++j]===X[++G]&&j<k);if(q=e-(k-j),j=k-e,q>z){if(Q.match_start=W,z=q,q>=U)break;V=X[j+z-1],Z=X[j+z]}}while((W=P[W&K])>Y&&--J!==0);if(z<=Q.lookahead)return z;return Q.lookahead},ZQ=(Q)=>{let W=Q.w_size,J,j,G;do{if(j=Q.window_size-Q.lookahead-Q.strstart,Q.strstart>=W+(W-_)){if(Q.window.set(Q.window.subarray(W,W+W-j),0),Q.match_start-=W,Q.strstart-=W,Q.block_start-=W,Q.insert>Q.strstart)Q.insert=Q.strstart;r5(Q),j+=W}if(Q.strm.avail_in===0)break;if(J=NJ(Q.strm,Q.window,Q.strstart+Q.lookahead,j),Q.lookahead+=J,Q.lookahead+Q.insert>=v){G=Q.strstart-Q.insert,Q.ins_h=Q.window[G],Q.ins_h=QQ(Q,Q.ins_h,Q.window[G+1]);while(Q.insert)if(Q.ins_h=QQ(Q,Q.ins_h,Q.window[G+v-1]),Q.prev[G&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=G,G++,Q.insert--,Q.lookahead+Q.insert<v)break}}while(Q.lookahead<_&&Q.strm.avail_in!==0)},T0=(Q,W)=>{let J=Q.pending_buf_size-5>Q.w_size?Q.w_size:Q.pending_buf_size-5,j,G,q,z=0,U=Q.strm.avail_in;do{if(j=65535,q=Q.bi_valid+42>>3,Q.strm.avail_out<q)break;if(q=Q.strm.avail_out-q,G=Q.strstart-Q.block_start,j>G+Q.strm.avail_in)j=G+Q.strm.avail_in;if(j>q)j=q;if(j<J&&(j===0&&W!==c||W===s||j!==G+Q.strm.avail_in))break;if(z=W===c&&j===G+Q.strm.avail_in?1:0,HJ(Q,0,0,z),Q.pending_buf[Q.pending-4]=j,Q.pending_buf[Q.pending-3]=j>>8,Q.pending_buf[Q.pending-2]=~j,Q.pending_buf[Q.pending-1]=~j>>8,u(Q.strm),G){if(G>j)G=j;Q.strm.output.set(Q.window.subarray(Q.block_start,Q.block_start+G),Q.strm.next_out),Q.strm.next_out+=G,Q.strm.avail_out-=G,Q.strm.total_out+=G,Q.block_start+=G,j-=G}if(j)NJ(Q.strm,Q.strm.output,Q.strm.next_out,j),Q.strm.next_out+=j,Q.strm.avail_out-=j,Q.strm.total_out+=j}while(z===0);if(U-=Q.strm.avail_in,U){if(U>=Q.w_size)Q.matches=2,Q.window.set(Q.strm.input.subarray(Q.strm.next_in-Q.w_size,Q.strm.next_in),0),Q.strstart=Q.w_size,Q.insert=Q.strstart;else{if(Q.window_size-Q.strstart<=U){if(Q.strstart-=Q.w_size,Q.window.set(Q.window.subarray(Q.w_size,Q.w_size+Q.strstart),0),Q.matches<2)Q.matches++;if(Q.insert>Q.strstart)Q.insert=Q.strstart}Q.window.set(Q.strm.input.subarray(Q.strm.next_in-U,Q.strm.next_in),Q.strstart),Q.strstart+=U,Q.insert+=U>Q.w_size-Q.insert?Q.w_size-Q.insert:U}Q.block_start=Q.strstart}if(Q.high_water<Q.strstart)Q.high_water=Q.strstart;if(z)return BQ;if(W!==s&&W!==c&&Q.strm.avail_in===0&&Q.strstart===Q.block_start)return PQ;if(q=Q.window_size-Q.strstart,Q.strm.avail_in>q&&Q.block_start>=Q.w_size){if(Q.block_start-=Q.w_size,Q.strstart-=Q.w_size,Q.window.set(Q.window.subarray(Q.w_size,Q.w_size+Q.strstart),0),Q.matches<2)Q.matches++;if(q+=Q.w_size,Q.insert>Q.strstart)Q.insert=Q.strstart}if(q>Q.strm.avail_in)q=Q.strm.avail_in;if(q)NJ(Q.strm,Q.window,Q.strstart,q),Q.strstart+=q,Q.insert+=q>Q.w_size-Q.insert?Q.w_size-Q.insert:q;if(Q.high_water<Q.strstart)Q.high_water=Q.strstart;if(q=Q.bi_valid+42>>3,q=Q.pending_buf_size-q>65535?65535:Q.pending_buf_size-q,J=q>Q.w_size?Q.w_size:q,G=Q.strstart-Q.block_start,G>=J||(G||W===c)&&W!==s&&Q.strm.avail_in===0&&G<=q)j=G>q?q:G,z=W===c&&Q.strm.avail_in===0&&j===G?1:0,HJ(Q,Q.block_start,j,z),Q.block_start+=j,u(Q.strm);return z?XQ:b},qJ=(Q,W)=>{let J,j;for(;;){if(Q.lookahead<_){if(ZQ(Q),Q.lookahead<_&&W===s)return b;if(Q.lookahead===0)break}if(J=0,Q.lookahead>=v)Q.ins_h=QQ(Q,Q.ins_h,Q.window[Q.strstart+v-1]),J=Q.prev[Q.strstart&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=Q.strstart;if(J!==0&&Q.strstart-J<=Q.w_size-_)Q.match_length=S0(Q,J);if(Q.match_length>=v)if(j=t(Q,Q.strstart-Q.match_start,Q.match_length-v),Q.lookahead-=Q.match_length,Q.match_length<=Q.max_lazy_match&&Q.lookahead>=v){Q.match_length--;do Q.strstart++,Q.ins_h=QQ(Q,Q.ins_h,Q.window[Q.strstart+v-1]),J=Q.prev[Q.strstart&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=Q.strstart;while(--Q.match_length!==0);Q.strstart++}else Q.strstart+=Q.match_length,Q.match_length=0,Q.ins_h=Q.window[Q.strstart],Q.ins_h=QQ(Q,Q.ins_h,Q.window[Q.strstart+1]);else j=t(Q,0,Q.window[Q.strstart]),Q.lookahead--,Q.strstart++;if(j){if(h(Q,!1),Q.strm.avail_out===0)return b}}if(Q.insert=Q.strstart<v-1?Q.strstart:v-1,W===c){if(h(Q,!0),Q.strm.avail_out===0)return XQ;return BQ}if(Q.sym_next){if(h(Q,!1),Q.strm.avail_out===0)return b}return PQ},VQ=(Q,W)=>{let J,j,G;for(;;){if(Q.lookahead<_){if(ZQ(Q),Q.lookahead<_&&W===s)return b;if(Q.lookahead===0)break}if(J=0,Q.lookahead>=v)Q.ins_h=QQ(Q,Q.ins_h,Q.window[Q.strstart+v-1]),J=Q.prev[Q.strstart&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=Q.strstart;if(Q.prev_length=Q.match_length,Q.prev_match=Q.match_start,Q.match_length=v-1,J!==0&&Q.prev_length<Q.max_lazy_match&&Q.strstart-J<=Q.w_size-_){if(Q.match_length=S0(Q,J),Q.match_length<=5&&(Q.strategy===T5||Q.match_length===v&&Q.strstart-Q.match_start>4096))Q.match_length=v-1}if(Q.prev_length>=v&&Q.match_length<=Q.prev_length){G=Q.strstart+Q.lookahead-v,j=t(Q,Q.strstart-1-Q.prev_match,Q.prev_length-v),Q.lookahead-=Q.prev_length-1,Q.prev_length-=2;do if(++Q.strstart<=G)Q.ins_h=QQ(Q,Q.ins_h,Q.window[Q.strstart+v-1]),J=Q.prev[Q.strstart&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=Q.strstart;while(--Q.prev_length!==0);if(Q.match_available=0,Q.match_length=v-1,Q.strstart++,j){if(h(Q,!1),Q.strm.avail_out===0)return b}}else if(Q.match_available){if(j=t(Q,0,Q.window[Q.strstart-1]),j)h(Q,!1);if(Q.strstart++,Q.lookahead--,Q.strm.avail_out===0)return b}else Q.match_available=1,Q.strstart++,Q.lookahead--}if(Q.match_available)j=t(Q,0,Q.window[Q.strstart-1]),Q.match_available=0;if(Q.insert=Q.strstart<v-1?Q.strstart:v-1,W===c){if(h(Q,!0),Q.strm.avail_out===0)return XQ;return BQ}if(Q.sym_next){if(h(Q,!1),Q.strm.avail_out===0)return b}return PQ},n5=(Q,W)=>{let J,j,G,q,z=Q.window;for(;;){if(Q.lookahead<=e){if(ZQ(Q),Q.lookahead<=e&&W===s)return b;if(Q.lookahead===0)break}if(Q.match_length=0,Q.lookahead>=v&&Q.strstart>0){if(G=Q.strstart-1,j=z[G],j===z[++G]&&j===z[++G]&&j===z[++G]){q=Q.strstart+e;do;while(j===z[++G]&&j===z[++G]&&j===z[++G]&&j===z[++G]&&j===z[++G]&&j===z[++G]&&j===z[++G]&&j===z[++G]&&G<q);if(Q.match_length=e-(q-G),Q.match_length>Q.lookahead)Q.match_length=Q.lookahead}}if(Q.match_length>=v)J=t(Q,1,Q.match_length-v),Q.lookahead-=Q.match_length,Q.strstart+=Q.match_length,Q.match_length=0;else J=t(Q,0,Q.window[Q.strstart]),Q.lookahead--,Q.strstart++;if(J){if(h(Q,!1),Q.strm.avail_out===0)return b}}if(Q.insert=0,W===c){if(h(Q,!0),Q.strm.avail_out===0)return XQ;return BQ}if(Q.sym_next){if(h(Q,!1),Q.strm.avail_out===0)return b}return PQ},a5=(Q,W)=>{let J;for(;;){if(Q.lookahead===0){if(ZQ(Q),Q.lookahead===0){if(W===s)return b;break}}if(Q.match_length=0,J=t(Q,0,Q.window[Q.strstart]),Q.lookahead--,Q.strstart++,J){if(h(Q,!1),Q.strm.avail_out===0)return b}}if(Q.insert=0,W===c){if(h(Q,!0),Q.strm.avail_out===0)return XQ;return BQ}if(Q.sym_next){if(h(Q,!1),Q.strm.avail_out===0)return b}return PQ};function d(Q,W,J,j,G){this.good_length=Q,this.max_lazy=W,this.nice_length=J,this.max_chain=j,this.func=G}var LQ=[new d(0,0,0,0,T0),new d(4,4,8,4,qJ),new d(4,5,16,8,qJ),new d(4,6,32,32,qJ),new d(4,4,16,16,VQ),new d(8,16,32,32,VQ),new d(8,16,128,128,VQ),new d(8,32,128,256,VQ),new d(32,128,258,1024,VQ),new d(32,258,258,4096,VQ)],e5=(Q)=>{Q.window_size=2*Q.w_size,a(Q.head),Q.max_lazy_match=LQ[Q.level].max_lazy,Q.good_match=LQ[Q.level].good_length,Q.nice_match=LQ[Q.level].nice_length,Q.max_chain_length=LQ[Q.level].max_chain,Q.strstart=0,Q.block_start=0,Q.lookahead=0,Q.insert=0,Q.match_length=Q.prev_length=v-1,Q.match_available=0,Q.ins_h=0};function t5(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=rQ,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(p5*2),this.dyn_dtree=new Uint16Array((2*m5+1)*2),this.bl_tree=new Uint16Array((2*d5+1)*2),a(this.dyn_ltree),a(this.dyn_dtree),a(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(l5+1),this.heap=new Uint16Array(2*PJ+1),a(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(2*PJ+1),a(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}var DQ=(Q)=>{if(!Q)return 1;let W=Q.state;if(!W||W.strm!==Q||W.status!==FQ&&W.status!==OJ&&W.status!==BJ&&W.status!==CJ&&W.status!==$J&&W.status!==LJ&&W.status!==jQ&&W.status!==$Q)return 1;return 0},y0=(Q)=>{if(DQ(Q))return qQ(Q,l);Q.total_in=Q.total_out=0,Q.data_type=I5;let W=Q.state;if(W.pending=0,W.pending_out=0,W.wrap<0)W.wrap=-W.wrap;return W.status=W.wrap===2?OJ:W.wrap?FQ:jQ,Q.adler=W.wrap===2?0:1,W.last_flush=-2,R5(W),I},D0=(Q)=>{let W=y0(Q);if(W===I)e5(Q.state);return W},s5=(Q,W)=>{if(DQ(Q)||Q.state.wrap!==2)return l;return Q.state.gzhead=W,I},E0=(Q,W,J,j,G,q)=>{if(!Q)return l;let z=1;if(W===S5)W=6;if(j<0)z=0,j=-j;else if(j>15)z=2,j-=16;if(G<1||G>b5||J!==rQ||j<8||j>15||W<0||W>9||q<0||q>D5||j===8&&z!==1)return qQ(Q,l);if(j===8)j=9;let U=new t5;return Q.state=U,U.strm=Q,U.status=FQ,U.wrap=z,U.gzhead=null,U.w_bits=j,U.w_size=1<<U.w_bits,U.w_mask=U.w_size-1,U.hash_bits=G+7,U.hash_size=1<<U.hash_bits,U.hash_mask=U.hash_size-1,U.hash_shift=~~((U.hash_bits+v-1)/v),U.window=new Uint8Array(U.w_size*2),U.head=new Uint16Array(U.hash_size),U.prev=new Uint16Array(U.w_size),U.lit_bufsize=1<<G+6,U.pending_buf_size=U.lit_bufsize*4,U.pending_buf=new Uint8Array(U.pending_buf_size),U.sym_buf=U.lit_bufsize,U.sym_end=(U.lit_bufsize-1)*3,U.level=W,U.strategy=q,U.method=J,D0(Q)},Q8=(Q,W)=>{return E0(Q,W,rQ,f5,u5,E5)},J8=(Q,W)=>{if(DQ(Q)||W>bJ||W<0)return Q?qQ(Q,l):l;let J=Q.state;if(!Q.output||Q.avail_in!==0&&!Q.input||J.status===$Q&&W!==c)return qQ(Q,Q.avail_out===0?jJ:l);let j=J.last_flush;if(J.last_flush=W,J.pending!==0){if(u(Q),Q.avail_out===0)return J.last_flush=-1,I}else if(Q.avail_in===0&&uJ(W)<=uJ(j)&&W!==c)return qQ(Q,jJ);if(J.status===$Q&&Q.avail_in!==0)return qQ(Q,jJ);if(J.status===FQ&&J.wrap===0)J.status=jQ;if(J.status===FQ){let G=rQ+(J.w_bits-8<<4)<<8,q=-1;if(J.strategy>=uQ||J.level<2)q=0;else if(J.level<6)q=1;else if(J.level===6)q=2;else q=3;if(G|=q<<6,J.strstart!==0)G|=_5;if(G+=31-G%31,CQ(J,G),J.strstart!==0)CQ(J,Q.adler>>>16),CQ(J,Q.adler&65535);if(Q.adler=1,J.status=jQ,u(Q),J.pending!==0)return J.last_flush=-1,I}if(J.status===OJ)if(Q.adler=0,x(J,31),x(J,139),x(J,8),!J.gzhead){if(x(J,0),x(J,0),x(J,0),x(J,0),x(J,0),x(J,J.level===9?2:J.strategy>=uQ||J.level<2?4:0),x(J,i5),J.status=jQ,u(Q),J.pending!==0)return J.last_flush=-1,I}else{if(x(J,(J.gzhead.text?1:0)+(J.gzhead.hcrc?2:0)+(!J.gzhead.extra?0:4)+(!J.gzhead.name?0:8)+(!J.gzhead.comment?0:16)),x(J,J.gzhead.time&255),x(J,J.gzhead.time>>8&255),x(J,J.gzhead.time>>16&255),x(J,J.gzhead.time>>24&255),x(J,J.level===9?2:J.strategy>=uQ||J.level<2?4:0),x(J,J.gzhead.os&255),J.gzhead.extra&&J.gzhead.extra.length)x(J,J.gzhead.extra.length&255),x(J,J.gzhead.extra.length>>8&255);if(J.gzhead.hcrc)Q.adler=D(Q.adler,J.pending_buf,J.pending,0);J.gzindex=0,J.status=BJ}if(J.status===BJ){if(J.gzhead.extra){let G=J.pending,q=(J.gzhead.extra.length&65535)-J.gzindex;while(J.pending+q>J.pending_buf_size){let U=J.pending_buf_size-J.pending;if(J.pending_buf.set(J.gzhead.extra.subarray(J.gzindex,J.gzindex+U),J.pending),J.pending=J.pending_buf_size,J.gzhead.hcrc&&J.pending>G)Q.adler=D(Q.adler,J.pending_buf,J.pending-G,G);if(J.gzindex+=U,u(Q),J.pending!==0)return J.last_flush=-1,I;G=0,q-=U}let z=new Uint8Array(J.gzhead.extra);if(J.pending_buf.set(z.subarray(J.gzindex,J.gzindex+q),J.pending),J.pending+=q,J.gzhead.hcrc&&J.pending>G)Q.adler=D(Q.adler,J.pending_buf,J.pending-G,G);J.gzindex=0}J.status=CJ}if(J.status===CJ){if(J.gzhead.name){let G=J.pending,q;do{if(J.pending===J.pending_buf_size){if(J.gzhead.hcrc&&J.pending>G)Q.adler=D(Q.adler,J.pending_buf,J.pending-G,G);if(u(Q),J.pending!==0)return J.last_flush=-1,I;G=0}if(J.gzindex<J.gzhead.name.length)q=J.gzhead.name.charCodeAt(J.gzindex++)&255;else q=0;x(J,q)}while(q!==0);if(J.gzhead.hcrc&&J.pending>G)Q.adler=D(Q.adler,J.pending_buf,J.pending-G,G);J.gzindex=0}J.status=$J}if(J.status===$J){if(J.gzhead.comment){let G=J.pending,q;do{if(J.pending===J.pending_buf_size){if(J.gzhead.hcrc&&J.pending>G)Q.adler=D(Q.adler,J.pending_buf,J.pending-G,G);if(u(Q),J.pending!==0)return J.last_flush=-1,I;G=0}if(J.gzindex<J.gzhead.comment.length)q=J.gzhead.comment.charCodeAt(J.gzindex++)&255;else q=0;x(J,q)}while(q!==0);if(J.gzhead.hcrc&&J.pending>G)Q.adler=D(Q.adler,J.pending_buf,J.pending-G,G)}J.status=LJ}if(J.status===LJ){if(J.gzhead.hcrc){if(J.pending+2>J.pending_buf_size){if(u(Q),J.pending!==0)return J.last_flush=-1,I}x(J,Q.adler&255),x(J,Q.adler>>8&255),Q.adler=0}if(J.status=jQ,u(Q),J.pending!==0)return J.last_flush=-1,I}if(Q.avail_in!==0||J.lookahead!==0||W!==s&&J.status!==$Q){let G=J.level===0?T0(J,W):J.strategy===uQ?a5(J,W):J.strategy===y5?n5(J,W):LQ[J.level].func(J,W);if(G===XQ||G===BQ)J.status=$Q;if(G===b||G===XQ){if(Q.avail_out===0)J.last_flush=-1;return I}if(G===PQ){if(W===M5)O5(J);else if(W!==bJ){if(HJ(J,0,0,!1),W===w5){if(a(J.head),J.lookahead===0)J.strstart=0,J.block_start=0,J.insert=0}}if(u(Q),Q.avail_out===0)return J.last_flush=-1,I}}if(W!==c)return I;if(J.wrap<=0)return fJ;if(J.wrap===2)x(J,Q.adler&255),x(J,Q.adler>>8&255),x(J,Q.adler>>16&255),x(J,Q.adler>>24&255),x(J,Q.total_in&255),x(J,Q.total_in>>8&255),x(J,Q.total_in>>16&255),x(J,Q.total_in>>24&255);else CQ(J,Q.adler>>>16),CQ(J,Q.adler&65535);if(u(Q),J.wrap>0)J.wrap=-J.wrap;return J.pending!==0?I:fJ},W8=(Q)=>{if(DQ(Q))return l;let W=Q.state.status;return Q.state=null,W===jQ?qQ(Q,A5):I},j8=(Q,W)=>{let J=W.length;if(DQ(Q))return l;let j=Q.state,G=j.wrap;if(G===2||G===1&&j.status!==FQ||j.lookahead)return l;if(G===1)Q.adler=wQ(Q.adler,W,J,0);if(j.wrap=0,J>=j.w_size){if(G===0)a(j.head),j.strstart=0,j.block_start=0,j.insert=0;let Y=new Uint8Array(j.w_size);Y.set(W.subarray(J-j.w_size,J),0),W=Y,J=j.w_size}let{avail_in:q,next_in:z,input:U}=Q;Q.avail_in=J,Q.next_in=0,Q.input=W,ZQ(j);while(j.lookahead>=v){let Y=j.strstart,X=j.lookahead-(v-1);do j.ins_h=QQ(j,j.ins_h,j.window[Y+v-1]),j.prev[Y&j.w_mask]=j.head[j.ins_h],j.head[j.ins_h]=Y,Y++;while(--X);j.strstart=Y,j.lookahead=v-1,ZQ(j)}return j.strstart+=j.lookahead,j.block_start=j.strstart,j.insert=j.lookahead,j.lookahead=0,j.match_length=j.prev_length=v-1,j.match_available=0,Q.next_in=z,Q.input=U,Q.avail_in=q,j.wrap=G,I},q8=Q8,G8=E0,X8=D0,U8=y0,z8=s5,K8=J8,V8=W8,k8=j8,Y8="pako deflate (from Nodeca project)",vQ={deflateInit:q8,deflateInit2:G8,deflateReset:X8,deflateResetKeep:U8,deflateSetHeader:z8,deflate:K8,deflateEnd:V8,deflateSetDictionary:k8,deflateInfo:Y8},F8=(Q,W)=>{return Object.prototype.hasOwnProperty.call(Q,W)},Z8=function(Q){let W=Array.prototype.slice.call(arguments,1);while(W.length){let J=W.shift();if(!J)continue;if(typeof J!=="object")throw new TypeError(J+"must be non-object");for(let j in J)if(F8(J,j))Q[j]=J[j]}return Q},H8=(Q)=>{let W=0;for(let j=0,G=Q.length;j<G;j++)W+=Q[j].length;let J=new Uint8Array(W);for(let j=0,G=0,q=Q.length;j<q;j++){let z=Q[j];J.set(z,G),G+=z.length}return J},oQ={assign:Z8,flattenChunks:H8},I0=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(Q){I0=!1}var AQ=new Uint8Array(256);for(let Q=0;Q<256;Q++)AQ[Q]=Q>=252?6:Q>=248?5:Q>=240?4:Q>=224?3:Q>=192?2:1;AQ[254]=AQ[254]=1;var P8=(Q)=>{if(typeof TextEncoder==="function"&&TextEncoder.prototype.encode)return new TextEncoder().encode(Q);let W,J,j,G,q,z=Q.length,U=0;for(G=0;G<z;G++){if(J=Q.charCodeAt(G),(J&64512)===55296&&G+1<z){if(j=Q.charCodeAt(G+1),(j&64512)===56320)J=65536+(J-55296<<10)+(j-56320),G++}U+=J<128?1:J<2048?2:J<65536?3:4}W=new Uint8Array(U);for(q=0,G=0;q<U;G++){if(J=Q.charCodeAt(G),(J&64512)===55296&&G+1<z){if(j=Q.charCodeAt(G+1),(j&64512)===56320)J=65536+(J-55296<<10)+(j-56320),G++}if(J<128)W[q++]=J;else if(J<2048)W[q++]=192|J>>>6,W[q++]=128|J&63;else if(J<65536)W[q++]=224|J>>>12,W[q++]=128|J>>>6&63,W[q++]=128|J&63;else W[q++]=240|J>>>18,W[q++]=128|J>>>12&63,W[q++]=128|J>>>6&63,W[q++]=128|J&63}return W},B8=(Q,W)=>{if(W<65534){if(Q.subarray&&I0)return String.fromCharCode.apply(null,Q.length===W?Q:Q.subarray(0,W))}let J="";for(let j=0;j<W;j++)J+=String.fromCharCode(Q[j]);return J},C8=(Q,W)=>{let J=W||Q.length;if(typeof TextDecoder==="function"&&TextDecoder.prototype.decode)return new TextDecoder().decode(Q.subarray(0,W));let j,G,q=new Array(J*2);for(G=0,j=0;j<J;){let z=Q[j++];if(z<128){q[G++]=z;continue}let U=AQ[z];if(U>4){q[G++]=65533,j+=U-1;continue}z&=U===2?31:U===3?15:7;while(U>1&&j<J)z=z<<6|Q[j++]&63,U--;if(U>1){q[G++]=65533;continue}if(z<65536)q[G++]=z;else z-=65536,q[G++]=55296|z>>10&1023,q[G++]=56320|z&1023}return B8(q,G)},$8=(Q,W)=>{if(W=W||Q.length,W>Q.length)W=Q.length;let J=W-1;while(J>=0&&(Q[J]&192)===128)J--;if(J<0)return W;if(J===0)return W;return J+AQ[Q[J]]>W?J:W},SQ={string2buf:P8,buf2string:C8,utf8border:$8};function L8(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}var b0=L8,f0=Object.prototype.toString,{Z_NO_FLUSH:N8,Z_SYNC_FLUSH:v8,Z_FULL_FLUSH:g8,Z_FINISH:R8,Z_OK:_Q,Z_STREAM_END:x8,Z_DEFAULT_COMPRESSION:O8,Z_DEFAULT_STRATEGY:M8,Z_DEFLATED:w8}=zQ;function EQ(Q){this.options=oQ.assign({level:O8,method:w8,chunkSize:16384,windowBits:15,memLevel:8,strategy:M8},Q||{});let W=this.options;if(W.raw&&W.windowBits>0)W.windowBits=-W.windowBits;else if(W.gzip&&W.windowBits>0&&W.windowBits<16)W.windowBits+=16;this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new b0,this.strm.avail_out=0;let J=vQ.deflateInit2(this.strm,W.level,W.method,W.windowBits,W.memLevel,W.strategy);if(J!==_Q)throw new Error(GQ[J]);if(W.header)vQ.deflateSetHeader(this.strm,W.header);if(W.dictionary){let j;if(typeof W.dictionary==="string")j=SQ.string2buf(W.dictionary);else if(f0.call(W.dictionary)==="[object ArrayBuffer]")j=new Uint8Array(W.dictionary);else j=W.dictionary;if(J=vQ.deflateSetDictionary(this.strm,j),J!==_Q)throw new Error(GQ[J]);this._dict_set=!0}}EQ.prototype.push=function(Q,W){let J=this.strm,j=this.options.chunkSize,G,q;if(this.ended)return!1;if(W===~~W)q=W;else q=W===!0?R8:N8;if(typeof Q==="string")J.input=SQ.string2buf(Q);else if(f0.call(Q)==="[object ArrayBuffer]")J.input=new Uint8Array(Q);else J.input=Q;J.next_in=0,J.avail_in=J.input.length;for(;;){if(J.avail_out===0)J.output=new Uint8Array(j),J.next_out=0,J.avail_out=j;if((q===v8||q===g8)&&J.avail_out<=6){this.onData(J.output.subarray(0,J.next_out)),J.avail_out=0;continue}if(G=vQ.deflate(J,q),G===x8){if(J.next_out>0)this.onData(J.output.subarray(0,J.next_out));return G=vQ.deflateEnd(this.strm),this.onEnd(G),this.ended=!0,G===_Q}if(J.avail_out===0){this.onData(J.output);continue}if(q>0&&J.next_out>0){this.onData(J.output.subarray(0,J.next_out)),J.avail_out=0;continue}if(J.avail_in===0)break}return!0};EQ.prototype.onData=function(Q){this.chunks.push(Q)};EQ.prototype.onEnd=function(Q){if(Q===_Q)this.result=oQ.flattenChunks(this.chunks);this.chunks=[],this.err=Q,this.msg=this.strm.msg};function MJ(Q,W){let J=new EQ(W);if(J.push(Q,!0),J.err)throw J.msg||GQ[J.err];return J.result}function A8(Q,W){return W=W||{},W.raw=!0,MJ(Q,W)}function S8(Q,W){return W=W||{},W.gzip=!0,MJ(Q,W)}var T8=EQ,y8=MJ,D8=A8,E8=S8,I8=zQ,b8={Deflate:T8,deflate:y8,deflateRaw:D8,gzip:E8,constants:I8},hQ=16209,f8=16191,u8=function Q(W,J){let j,G,q,z,U,Y,X,K,P,k,V,Z,M,$,C,O,L,F,R,y,H,A,g,B,N=W.state;j=W.next_in,g=W.input,G=j+(W.avail_in-5),q=W.next_out,B=W.output,z=q-(J-W.avail_out),U=q+(W.avail_out-257),Y=N.dmax,X=N.wsize,K=N.whave,P=N.wnext,k=N.window,V=N.hold,Z=N.bits,M=N.lencode,$=N.distcode,C=(1<<N.lenbits)-1,O=(1<<N.distbits)-1;Q:do{if(Z<15)V+=g[j++]<<Z,Z+=8,V+=g[j++]<<Z,Z+=8;L=M[V&C];J:for(;;){if(F=L>>>24,V>>>=F,Z-=F,F=L>>>16&255,F===0)B[q++]=L&65535;else if(F&16){if(R=L&65535,F&=15,F){if(Z<F)V+=g[j++]<<Z,Z+=8;R+=V&(1<<F)-1,V>>>=F,Z-=F}if(Z<15)V+=g[j++]<<Z,Z+=8,V+=g[j++]<<Z,Z+=8;L=$[V&O];W:for(;;){if(F=L>>>24,V>>>=F,Z-=F,F=L>>>16&255,F&16){if(y=L&65535,F&=15,Z<F){if(V+=g[j++]<<Z,Z+=8,Z<F)V+=g[j++]<<Z,Z+=8}if(y+=V&(1<<F)-1,y>Y){W.msg="invalid distance too far back",N.mode=hQ;break Q}if(V>>>=F,Z-=F,F=q-z,y>F){if(F=y-F,F>K){if(N.sane){W.msg="invalid distance too far back",N.mode=hQ;break Q}}if(H=0,A=k,P===0){if(H+=X-F,F<R){R-=F;do B[q++]=k[H++];while(--F);H=q-y,A=B}}else if(P<F){if(H+=X+P-F,F-=P,F<R){R-=F;do B[q++]=k[H++];while(--F);if(H=0,P<R){F=P,R-=F;do B[q++]=k[H++];while(--F);H=q-y,A=B}}}else if(H+=P-F,F<R){R-=F;do B[q++]=k[H++];while(--F);H=q-y,A=B}while(R>2)B[q++]=A[H++],B[q++]=A[H++],B[q++]=A[H++],R-=3;if(R){if(B[q++]=A[H++],R>1)B[q++]=A[H++]}}else{H=q-y;do B[q++]=B[H++],B[q++]=B[H++],B[q++]=B[H++],R-=3;while(R>2);if(R){if(B[q++]=B[H++],R>1)B[q++]=B[H++]}}}else if((F&64)===0){L=$[(L&65535)+(V&(1<<F)-1)];continue W}else{W.msg="invalid distance code",N.mode=hQ;break Q}break}}else if((F&64)===0){L=M[(L&65535)+(V&(1<<F)-1)];continue J}else if(F&32){N.mode=f8;break Q}else{W.msg="invalid literal/length code",N.mode=hQ;break Q}break}}while(j<G&&q<U);R=Z>>3,j-=R,Z-=R<<3,V&=(1<<Z)-1,W.next_in=j,W.next_out=q,W.avail_in=j<G?5+(G-j):5-(j-G),W.avail_out=q<U?257+(U-q):257-(q-U),N.hold=V,N.bits=Z;return},kQ=15,hJ=852,cJ=592,mJ=0,GJ=1,dJ=2,h8=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),c8=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),m8=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),d8=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),p8=(Q,W,J,j,G,q,z,U)=>{let Y=U.bits,X=0,K=0,P=0,k=0,V=0,Z=0,M=0,$=0,C=0,O=0,L,F,R,y,H,A=null,g,B=new Uint16Array(kQ+1),N=new Uint16Array(kQ+1),JQ=null,AJ,bQ,fQ;for(X=0;X<=kQ;X++)B[X]=0;for(K=0;K<j;K++)B[W[J+K]]++;V=Y;for(k=kQ;k>=1;k--)if(B[k]!==0)break;if(V>k)V=k;if(k===0)return G[q++]=20971520,G[q++]=20971520,U.bits=1,0;for(P=1;P<k;P++)if(B[P]!==0)break;if(V<P)V=P;$=1;for(X=1;X<=kQ;X++)if($<<=1,$-=B[X],$<0)return-1;if($>0&&(Q===mJ||k!==1))return-1;N[1]=0;for(X=1;X<kQ;X++)N[X+1]=N[X]+B[X];for(K=0;K<j;K++)if(W[J+K]!==0)z[N[W[J+K]]++]=K;if(Q===mJ)A=JQ=z,g=20;else if(Q===GJ)A=h8,JQ=c8,g=257;else A=m8,JQ=d8,g=0;if(O=0,K=0,X=P,H=q,Z=V,M=0,R=-1,C=1<<V,y=C-1,Q===GJ&&C>hJ||Q===dJ&&C>cJ)return 1;for(;;){if(AJ=X-M,z[K]+1<g)bQ=0,fQ=z[K];else if(z[K]>=g)bQ=JQ[z[K]-g],fQ=A[z[K]-g];else bQ=96,fQ=0;L=1<<X-M,F=1<<Z,P=F;do F-=L,G[H+(O>>M)+F]=AJ<<24|bQ<<16|fQ|0;while(F!==0);L=1<<X-1;while(O&L)L>>=1;if(L!==0)O&=L-1,O+=L;else O=0;if(K++,--B[X]===0){if(X===k)break;X=W[J+z[K]]}if(X>V&&(O&y)!==R){if(M===0)M=V;H+=P,Z=X-M,$=1<<Z;while(Z+M<k){if($-=B[Z+M],$<=0)break;Z++,$<<=1}if(C+=1<<Z,Q===GJ&&C>hJ||Q===dJ&&C>cJ)return 1;R=O&y,G[R]=V<<24|Z<<16|H-q|0}}if(O!==0)G[H+O]=X-M<<24|4194304|0;return U.bits=V,0},gQ=p8,l8=0,u0=1,h0=2,{Z_FINISH:pJ,Z_BLOCK:_8,Z_TREES:cQ,Z_OK:UQ,Z_STREAM_END:i8,Z_NEED_DICT:r8,Z_STREAM_ERROR:m,Z_DATA_ERROR:c0,Z_MEM_ERROR:m0,Z_BUF_ERROR:o8,Z_DEFLATED:lJ}=zQ,nQ=16180,_J=16181,iJ=16182,rJ=16183,oJ=16184,nJ=16185,aJ=16186,eJ=16187,tJ=16188,sJ=16189,iQ=16190,i=16191,XJ=16192,Q0=16193,UJ=16194,J0=16195,W0=16196,j0=16197,q0=16198,mQ=16199,dQ=16200,G0=16201,X0=16202,U0=16203,z0=16204,K0=16205,zJ=16206,V0=16207,k0=16208,S=16209,d0=16210,p0=16211,n8=852,a8=592,e8=15,t8=e8,Y0=(Q)=>{return(Q>>>24&255)+(Q>>>8&65280)+((Q&65280)<<8)+((Q&255)<<24)};function s8(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}var KQ=(Q)=>{if(!Q)return 1;let W=Q.state;if(!W||W.strm!==Q||W.mode<nQ||W.mode>p0)return 1;return 0},l0=(Q)=>{if(KQ(Q))return m;let W=Q.state;if(Q.total_in=Q.total_out=W.total=0,Q.msg="",W.wrap)Q.adler=W.wrap&1;return W.mode=nQ,W.last=0,W.havedict=0,W.flags=-1,W.dmax=32768,W.head=null,W.hold=0,W.bits=0,W.lencode=W.lendyn=new Int32Array(n8),W.distcode=W.distdyn=new Int32Array(a8),W.sane=1,W.back=-1,UQ},_0=(Q)=>{if(KQ(Q))return m;let W=Q.state;return W.wsize=0,W.whave=0,W.wnext=0,l0(Q)},i0=(Q,W)=>{let J;if(KQ(Q))return m;let j=Q.state;if(W<0)J=0,W=-W;else if(J=(W>>4)+5,W<48)W&=15;if(W&&(W<8||W>15))return m;if(j.window!==null&&j.wbits!==W)j.window=null;return j.wrap=J,j.wbits=W,_0(Q)},r0=(Q,W)=>{if(!Q)return m;let J=new s8;Q.state=J,J.strm=Q,J.window=null,J.mode=nQ;let j=i0(Q,W);if(j!==UQ)Q.state=null;return j},Q1=(Q)=>{return r0(Q,t8)},F0=!0,KJ,VJ,J1=(Q)=>{if(F0){KJ=new Int32Array(512),VJ=new Int32Array(32);let W=0;while(W<144)Q.lens[W++]=8;while(W<256)Q.lens[W++]=9;while(W<280)Q.lens[W++]=7;while(W<288)Q.lens[W++]=8;gQ(u0,Q.lens,0,288,KJ,0,Q.work,{bits:9}),W=0;while(W<32)Q.lens[W++]=5;gQ(h0,Q.lens,0,32,VJ,0,Q.work,{bits:5}),F0=!1}Q.lencode=KJ,Q.lenbits=9,Q.distcode=VJ,Q.distbits=5},o0=(Q,W,J,j)=>{let G,q=Q.state;if(q.window===null)q.wsize=1<<q.wbits,q.wnext=0,q.whave=0,q.window=new Uint8Array(q.wsize);if(j>=q.wsize)q.window.set(W.subarray(J-q.wsize,J),0),q.wnext=0,q.whave=q.wsize;else{if(G=q.wsize-q.wnext,G>j)G=j;if(q.window.set(W.subarray(J-j,J-j+G),q.wnext),j-=G,j)q.window.set(W.subarray(J-j,J),0),q.wnext=j,q.whave=q.wsize;else{if(q.wnext+=G,q.wnext===q.wsize)q.wnext=0;if(q.whave<q.wsize)q.whave+=G}}return 0},W1=(Q,W)=>{let J,j,G,q,z,U,Y,X,K,P,k,V,Z,M,$=0,C,O,L,F,R,y,H,A,g=new Uint8Array(4),B,N,JQ=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(KQ(Q)||!Q.output||!Q.input&&Q.avail_in!==0)return m;if(J=Q.state,J.mode===i)J.mode=XJ;z=Q.next_out,G=Q.output,Y=Q.avail_out,q=Q.next_in,j=Q.input,U=Q.avail_in,X=J.hold,K=J.bits,P=U,k=Y,A=UQ;Q:for(;;)switch(J.mode){case nQ:if(J.wrap===0){J.mode=XJ;break}while(K<16){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.wrap&2&&X===35615){if(J.wbits===0)J.wbits=15;J.check=0,g[0]=X&255,g[1]=X>>>8&255,J.check=D(J.check,g,2,0),X=0,K=0,J.mode=_J;break}if(J.head)J.head.done=!1;if(!(J.wrap&1)||(((X&255)<<8)+(X>>8))%31){Q.msg="incorrect header check",J.mode=S;break}if((X&15)!==lJ){Q.msg="unknown compression method",J.mode=S;break}if(X>>>=4,K-=4,H=(X&15)+8,J.wbits===0)J.wbits=H;if(H>15||H>J.wbits){Q.msg="invalid window size",J.mode=S;break}J.dmax=1<<J.wbits,J.flags=0,Q.adler=J.check=1,J.mode=X&512?sJ:i,X=0,K=0;break;case _J:while(K<16){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.flags=X,(J.flags&255)!==lJ){Q.msg="unknown compression method",J.mode=S;break}if(J.flags&57344){Q.msg="unknown header flags set",J.mode=S;break}if(J.head)J.head.text=X>>8&1;if(J.flags&512&&J.wrap&4)g[0]=X&255,g[1]=X>>>8&255,J.check=D(J.check,g,2,0);X=0,K=0,J.mode=iJ;case iJ:while(K<32){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.head)J.head.time=X;if(J.flags&512&&J.wrap&4)g[0]=X&255,g[1]=X>>>8&255,g[2]=X>>>16&255,g[3]=X>>>24&255,J.check=D(J.check,g,4,0);X=0,K=0,J.mode=rJ;case rJ:while(K<16){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.head)J.head.xflags=X&255,J.head.os=X>>8;if(J.flags&512&&J.wrap&4)g[0]=X&255,g[1]=X>>>8&255,J.check=D(J.check,g,2,0);X=0,K=0,J.mode=oJ;case oJ:if(J.flags&1024){while(K<16){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.length=X,J.head)J.head.extra_len=X;if(J.flags&512&&J.wrap&4)g[0]=X&255,g[1]=X>>>8&255,J.check=D(J.check,g,2,0);X=0,K=0}else if(J.head)J.head.extra=null;J.mode=nJ;case nJ:if(J.flags&1024){if(V=J.length,V>U)V=U;if(V){if(J.head){if(H=J.head.extra_len-J.length,!J.head.extra)J.head.extra=new Uint8Array(J.head.extra_len);J.head.extra.set(j.subarray(q,q+V),H)}if(J.flags&512&&J.wrap&4)J.check=D(J.check,j,V,q);U-=V,q+=V,J.length-=V}if(J.length)break Q}J.length=0,J.mode=aJ;case aJ:if(J.flags&2048){if(U===0)break Q;V=0;do if(H=j[q+V++],J.head&&H&&J.length<65536)J.head.name+=String.fromCharCode(H);while(H&&V<U);if(J.flags&512&&J.wrap&4)J.check=D(J.check,j,V,q);if(U-=V,q+=V,H)break Q}else if(J.head)J.head.name=null;J.length=0,J.mode=eJ;case eJ:if(J.flags&4096){if(U===0)break Q;V=0;do if(H=j[q+V++],J.head&&H&&J.length<65536)J.head.comment+=String.fromCharCode(H);while(H&&V<U);if(J.flags&512&&J.wrap&4)J.check=D(J.check,j,V,q);if(U-=V,q+=V,H)break Q}else if(J.head)J.head.comment=null;J.mode=tJ;case tJ:if(J.flags&512){while(K<16){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.wrap&4&&X!==(J.check&65535)){Q.msg="header crc mismatch",J.mode=S;break}X=0,K=0}if(J.head)J.head.hcrc=J.flags>>9&1,J.head.done=!0;Q.adler=J.check=0,J.mode=i;break;case sJ:while(K<32){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}Q.adler=J.check=Y0(X),X=0,K=0,J.mode=iQ;case iQ:if(J.havedict===0)return Q.next_out=z,Q.avail_out=Y,Q.next_in=q,Q.avail_in=U,J.hold=X,J.bits=K,r8;Q.adler=J.check=1,J.mode=i;case i:if(W===_8||W===cQ)break Q;case XJ:if(J.last){X>>>=K&7,K-=K&7,J.mode=zJ;break}while(K<3){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}switch(J.last=X&1,X>>>=1,K-=1,X&3){case 0:J.mode=Q0;break;case 1:if(J1(J),J.mode=mQ,W===cQ){X>>>=2,K-=2;break Q}break;case 2:J.mode=W0;break;case 3:Q.msg="invalid block type",J.mode=S}X>>>=2,K-=2;break;case Q0:X>>>=K&7,K-=K&7;while(K<32){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if((X&65535)!==(X>>>16^65535)){Q.msg="invalid stored block lengths",J.mode=S;break}if(J.length=X&65535,X=0,K=0,J.mode=UJ,W===cQ)break Q;case UJ:J.mode=J0;case J0:if(V=J.length,V){if(V>U)V=U;if(V>Y)V=Y;if(V===0)break Q;G.set(j.subarray(q,q+V),z),U-=V,q+=V,Y-=V,z+=V,J.length-=V;break}J.mode=i;break;case W0:while(K<14){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.nlen=(X&31)+257,X>>>=5,K-=5,J.ndist=(X&31)+1,X>>>=5,K-=5,J.ncode=(X&15)+4,X>>>=4,K-=4,J.nlen>286||J.ndist>30){Q.msg="too many length or distance symbols",J.mode=S;break}J.have=0,J.mode=j0;case j0:while(J.have<J.ncode){while(K<3){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}J.lens[JQ[J.have++]]=X&7,X>>>=3,K-=3}while(J.have<19)J.lens[JQ[J.have++]]=0;if(J.lencode=J.lendyn,J.lenbits=7,B={bits:J.lenbits},A=gQ(l8,J.lens,0,19,J.lencode,0,J.work,B),J.lenbits=B.bits,A){Q.msg="invalid code lengths set",J.mode=S;break}J.have=0,J.mode=q0;case q0:while(J.have<J.nlen+J.ndist){for(;;){if($=J.lencode[X&(1<<J.lenbits)-1],C=$>>>24,O=$>>>16&255,L=$&65535,C<=K)break;if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(L<16)X>>>=C,K-=C,J.lens[J.have++]=L;else{if(L===16){N=C+2;while(K<N){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(X>>>=C,K-=C,J.have===0){Q.msg="invalid bit length repeat",J.mode=S;break}H=J.lens[J.have-1],V=3+(X&3),X>>>=2,K-=2}else if(L===17){N=C+3;while(K<N){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}X>>>=C,K-=C,H=0,V=3+(X&7),X>>>=3,K-=3}else{N=C+7;while(K<N){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}X>>>=C,K-=C,H=0,V=11+(X&127),X>>>=7,K-=7}if(J.have+V>J.nlen+J.ndist){Q.msg="invalid bit length repeat",J.mode=S;break}while(V--)J.lens[J.have++]=H}}if(J.mode===S)break;if(J.lens[256]===0){Q.msg="invalid code -- missing end-of-block",J.mode=S;break}if(J.lenbits=9,B={bits:J.lenbits},A=gQ(u0,J.lens,0,J.nlen,J.lencode,0,J.work,B),J.lenbits=B.bits,A){Q.msg="invalid literal/lengths set",J.mode=S;break}if(J.distbits=6,J.distcode=J.distdyn,B={bits:J.distbits},A=gQ(h0,J.lens,J.nlen,J.ndist,J.distcode,0,J.work,B),J.distbits=B.bits,A){Q.msg="invalid distances set",J.mode=S;break}if(J.mode=mQ,W===cQ)break Q;case mQ:J.mode=dQ;case dQ:if(U>=6&&Y>=258){if(Q.next_out=z,Q.avail_out=Y,Q.next_in=q,Q.avail_in=U,J.hold=X,J.bits=K,u8(Q,k),z=Q.next_out,G=Q.output,Y=Q.avail_out,q=Q.next_in,j=Q.input,U=Q.avail_in,X=J.hold,K=J.bits,J.mode===i)J.back=-1;break}J.back=0;for(;;){if($=J.lencode[X&(1<<J.lenbits)-1],C=$>>>24,O=$>>>16&255,L=$&65535,C<=K)break;if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(O&&(O&240)===0){F=C,R=O,y=L;for(;;){if($=J.lencode[y+((X&(1<<F+R)-1)>>F)],C=$>>>24,O=$>>>16&255,L=$&65535,F+C<=K)break;if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}X>>>=F,K-=F,J.back+=F}if(X>>>=C,K-=C,J.back+=C,J.length=L,O===0){J.mode=K0;break}if(O&32){J.back=-1,J.mode=i;break}if(O&64){Q.msg="invalid literal/length code",J.mode=S;break}J.extra=O&15,J.mode=G0;case G0:if(J.extra){N=J.extra;while(K<N){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}J.length+=X&(1<<J.extra)-1,X>>>=J.extra,K-=J.extra,J.back+=J.extra}J.was=J.length,J.mode=X0;case X0:for(;;){if($=J.distcode[X&(1<<J.distbits)-1],C=$>>>24,O=$>>>16&255,L=$&65535,C<=K)break;if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if((O&240)===0){F=C,R=O,y=L;for(;;){if($=J.distcode[y+((X&(1<<F+R)-1)>>F)],C=$>>>24,O=$>>>16&255,L=$&65535,F+C<=K)break;if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}X>>>=F,K-=F,J.back+=F}if(X>>>=C,K-=C,J.back+=C,O&64){Q.msg="invalid distance code",J.mode=S;break}J.offset=L,J.extra=O&15,J.mode=U0;case U0:if(J.extra){N=J.extra;while(K<N){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}J.offset+=X&(1<<J.extra)-1,X>>>=J.extra,K-=J.extra,J.back+=J.extra}if(J.offset>J.dmax){Q.msg="invalid distance too far back",J.mode=S;break}J.mode=z0;case z0:if(Y===0)break Q;if(V=k-Y,J.offset>V){if(V=J.offset-V,V>J.whave){if(J.sane){Q.msg="invalid distance too far back",J.mode=S;break}}if(V>J.wnext)V-=J.wnext,Z=J.wsize-V;else Z=J.wnext-V;if(V>J.length)V=J.length;M=J.window}else M=G,Z=z-J.offset,V=J.length;if(V>Y)V=Y;Y-=V,J.length-=V;do G[z++]=M[Z++];while(--V);if(J.length===0)J.mode=dQ;break;case K0:if(Y===0)break Q;G[z++]=J.length,Y--,J.mode=dQ;break;case zJ:if(J.wrap){while(K<32){if(U===0)break Q;U--,X|=j[q++]<<K,K+=8}if(k-=Y,Q.total_out+=k,J.total+=k,J.wrap&4&&k)Q.adler=J.check=J.flags?D(J.check,G,k,z-k):wQ(J.check,G,k,z-k);if(k=Y,J.wrap&4&&(J.flags?X:Y0(X))!==J.check){Q.msg="incorrect data check",J.mode=S;break}X=0,K=0}J.mode=V0;case V0:if(J.wrap&&J.flags){while(K<32){if(U===0)break Q;U--,X+=j[q++]<<K,K+=8}if(J.wrap&4&&X!==(J.total&4294967295)){Q.msg="incorrect length check",J.mode=S;break}X=0,K=0}J.mode=k0;case k0:A=i8;break Q;case S:A=c0;break Q;case d0:return m0;case p0:default:return m}if(Q.next_out=z,Q.avail_out=Y,Q.next_in=q,Q.avail_in=U,J.hold=X,J.bits=K,J.wsize||k!==Q.avail_out&&J.mode<S&&(J.mode<zJ||W!==pJ)){if(o0(Q,Q.output,Q.next_out,k-Q.avail_out));}if(P-=Q.avail_in,k-=Q.avail_out,Q.total_in+=P,Q.total_out+=k,J.total+=k,J.wrap&4&&k)Q.adler=J.check=J.flags?D(J.check,G,k,Q.next_out-k):wQ(J.check,G,k,Q.next_out-k);if(Q.data_type=J.bits+(J.last?64:0)+(J.mode===i?128:0)+(J.mode===mQ||J.mode===UJ?256:0),(P===0&&k===0||W===pJ)&&A===UQ)A=o8;return A},j1=(Q)=>{if(KQ(Q))return m;let W=Q.state;if(W.window)W.window=null;return Q.state=null,UQ},q1=(Q,W)=>{if(KQ(Q))return m;let J=Q.state;if((J.wrap&2)===0)return m;return J.head=W,W.done=!1,UQ},G1=(Q,W)=>{let J=W.length,j,G,q;if(KQ(Q))return m;if(j=Q.state,j.wrap!==0&&j.mode!==iQ)return m;if(j.mode===iQ){if(G=1,G=wQ(G,W,J,0),G!==j.check)return c0}if(q=o0(Q,W,J,J),q)return j.mode=d0,m0;return j.havedict=1,UQ},X1=_0,U1=i0,z1=l0,K1=Q1,V1=r0,k1=W1,Y1=j1,F1=q1,Z1=G1,H1="pako inflate (from Nodeca project)",o={inflateReset:X1,inflateReset2:U1,inflateResetKeep:z1,inflateInit:K1,inflateInit2:V1,inflate:k1,inflateEnd:Y1,inflateGetHeader:F1,inflateSetDictionary:Z1,inflateInfo:H1};function P1(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}var B1=P1,n0=Object.prototype.toString,{Z_NO_FLUSH:C1,Z_FINISH:$1,Z_OK:TQ,Z_STREAM_END:kJ,Z_NEED_DICT:YJ,Z_STREAM_ERROR:L1,Z_DATA_ERROR:Z0,Z_MEM_ERROR:N1}=zQ;function IQ(Q){this.options=oQ.assign({chunkSize:65536,windowBits:15,to:""},Q||{});let W=this.options;if(W.raw&&W.windowBits>=0&&W.windowBits<16){if(W.windowBits=-W.windowBits,W.windowBits===0)W.windowBits=-15}if(W.windowBits>=0&&W.windowBits<16&&!(Q&&Q.windowBits))W.windowBits+=32;if(W.windowBits>15&&W.windowBits<48){if((W.windowBits&15)===0)W.windowBits|=15}this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new b0,this.strm.avail_out=0;let J=o.inflateInit2(this.strm,W.windowBits);if(J!==TQ)throw new Error(GQ[J]);if(this.header=new B1,o.inflateGetHeader(this.strm,this.header),W.dictionary){if(typeof W.dictionary==="string")W.dictionary=SQ.string2buf(W.dictionary);else if(n0.call(W.dictionary)==="[object ArrayBuffer]")W.dictionary=new Uint8Array(W.dictionary);if(W.raw){if(J=o.inflateSetDictionary(this.strm,W.dictionary),J!==TQ)throw new Error(GQ[J])}}}IQ.prototype.push=function(Q,W){let J=this.strm,j=this.options.chunkSize,G=this.options.dictionary,q,z,U;if(this.ended)return!1;if(W===~~W)z=W;else z=W===!0?$1:C1;if(n0.call(Q)==="[object ArrayBuffer]")J.input=new Uint8Array(Q);else J.input=Q;J.next_in=0,J.avail_in=J.input.length;for(;;){if(J.avail_out===0)J.output=new Uint8Array(j),J.next_out=0,J.avail_out=j;if(q=o.inflate(J,z),q===YJ&&G){if(q=o.inflateSetDictionary(J,G),q===TQ)q=o.inflate(J,z);else if(q===Z0)q=YJ}while(J.avail_in>0&&q===kJ&&J.state.wrap>0&&Q[J.next_in]!==0)o.inflateReset(J),q=o.inflate(J,z);switch(q){case L1:case Z0:case YJ:case N1:return this.onEnd(q),this.ended=!0,!1}if(U=J.avail_out,J.next_out){if(J.avail_out===0||q===kJ)if(this.options.to==="string"){let Y=SQ.utf8border(J.output,J.next_out),X=J.next_out-Y,K=SQ.buf2string(J.output,Y);if(J.next_out=X,J.avail_out=j-X,X)J.output.set(J.output.subarray(Y,Y+X),0);this.onData(K)}else this.onData(J.output.length===J.next_out?J.output:J.output.subarray(0,J.next_out))}if(q===TQ&&U===0)continue;if(q===kJ)return q=o.inflateEnd(this.strm),this.onEnd(q),this.ended=!0,!0;if(J.avail_in===0)break}return!0};IQ.prototype.onData=function(Q){this.chunks.push(Q)};IQ.prototype.onEnd=function(Q){if(Q===TQ)if(this.options.to==="string")this.result=this.chunks.join("");else this.result=oQ.flattenChunks(this.chunks);this.chunks=[],this.err=Q,this.msg=this.strm.msg};function wJ(Q,W){let J=new IQ(W);if(J.push(Q),J.err)throw J.msg||GQ[J.err];return J.result}function v1(Q,W){return W=W||{},W.raw=!0,wJ(Q,W)}var g1=IQ,R1=wJ,x1=v1,O1=wJ,M1=zQ,w1={Inflate:g1,inflate:R1,inflateRaw:x1,ungzip:O1,constants:M1},{Deflate:A1,deflate:S1,deflateRaw:T1,gzip:y1}=b8,{Inflate:D1,inflate:E1,inflateRaw:I1,ungzip:b1}=w1,f1=A1,u1=S1,h1=T1,c1=y1,m1=D1,d1=E1,p1=I1,l1=b1,_1=zQ,aQ={Deflate:f1,deflate:u1,deflateRaw:h1,gzip:c1,Inflate:m1,inflate:d1,inflateRaw:p1,ungzip:l1,constants:_1};class w{static version="4.1.0";static logger=new eQ;icons=new Map;name="failed-to-find-vyi-name";formatVersion=1;constructor(Q){if(w.logger.registerType("Vyi-module","#ff6600"),Q)this.parse(Q)}parse(Q){if(!Q)return this;try{let W;if(typeof Q==="string")try{W=JSON.parse(Q)}catch(J){if(!Q.includes(".vyr")&&!Q.includes(".vyi")){if(W=Q,!W)throw new Error("Non vyi data found from binary string")}else try{W=JSON.parse(Q)}catch(j){if(typeof window==="undefined")W=this.readFileAndGetVYI(Q);else throw new Error("Invalid string input - not valid JSON or file path")}}else if(Q instanceof w)W=Q.export();else if(Q instanceof Object&&!Array.isArray(Q)&&!(Q instanceof ArrayBuffer||Q instanceof Uint8Array))W=Q;else if(Q instanceof ArrayBuffer||Q instanceof Uint8Array)W=this.handleBinaryData(Q);else throw new Error("Error processing: Invalid input type provided.");if(!W||(!W.v||!W.i)&&!W.icons)throw new Error("Non vyi data found.");this.processVyiData(W)}catch(W){w.logger.prefix("Vyi-module").error(\`\${W.message}\`)}return this}readFile(Q){try{let J=new TextEncoder().encode(Q),j=aQ.inflate(J,{to:"string"});return JSON.parse(j)}catch(W){return console.error("File reading failed:",W),null}}readFileAndGetVYI(Q){let J=(()=>({})).readFileSync(Q);return this.handleBinaryData(J)}async fetchAndParseJSON(Q){try{return await(await fetch(Q)).json()}catch(W){throw new Error(\`Failed to fetch or parse JSON from URL: \${W}\`)}}handleBinaryData(Q){let W=Q instanceof ArrayBuffer?new Uint8Array(Q):Q;try{let J=aQ.inflate(W,{to:"string"});if(!J)return null;return JSON.parse(J)}catch(J){try{let j=new TextDecoder().decode(W);if(!j)return null;return JSON.parse(j)}catch(j){return console.error("Decoding failed:",j),null}}}processVyiData(Q){this.icons.clear();let W=Q.i||Q.icons;if(this.formatVersion=Q.v??"format not found",Array.isArray(W))W.forEach((J)=>{if(!Array.isArray(J)&&typeof J==="object"){let j=this.convertOldIconData(J);this.addIcon(j)}else this.addIcon(J)});else w.logger.prefix("Vyi-module").error("Invalid .vyi file! Cannot parse icons.")}convertOldIconData(Q){let W=Array.isArray(Q.frames)?Q.frames.map((j)=>[j.data,j.delay]):[],J=Array.isArray(Q.states)?Q.states.map((j)=>{let G=Array.isArray(j.frames)?j.frames.map((q)=>[q.data,q.delay]):[];return[j.name,j.data,j.delay||100,G]}):[];return[Q.name||"",Q.w||32,Q.h||32,Q.delay||100,Q.data||"",W,J]}addIcon(Q){if(!Q){w.logger.prefix("Vyi-module").error("No icon data passed!");return}if(!(Q instanceof T)&&!Array.isArray(Q)){w.logger.prefix("Vyi-module").error("Invalid icon data type passed!");return}let W=Q instanceof T?Q:new T(Q);return this.icons.set(W.id,W),W.setVyi(this),W}removeIcon(Q){if(!Q)return;if(Q instanceof T){if(this.icons.delete(Q.id))Q.removeVyi()}}removeIconByName(Q){let W=this.getIcon(Q);if(W)this.removeIcon(W)}removeIconById(Q){let W=this.getIconById(Q);if(W)this.removeIcon(W)}getIconNames(){return this.getIcons().map((W)=>W.name)}getIcon(Q){if(typeof Q==="string"){let W=this.getIcons();for(let J=W.length-1;J>=0;J--){let j=W[J];if(j.getName()===Q)return j}}else w.logger.prefix("Vyi-module").error("Invalid name type used!")}getIconCount(){return this.icons.size}getIconById(Q){if(!Q)return;return this.icons.get(Q)||this.getIcons().find((J)=>J.states.has(Q))?.getStateById(Q)}getIcons(){return Array.from(this.icons.values())}rename(Q){if(typeof Q==="string")this.name=Q;else w.logger.prefix("Vyi-module").error("Invalid name type used!")}getName(){return this.name}export(Q){let W={v:this.formatVersion,i:this.getIcons().map((J)=>J.export())};if(Q){let J=new TextEncoder().encode(JSON.stringify(W));return aQ.deflate(J)}return W}}self.onmessage=function(Q){let{id:W,type:J,data:j}=Q.data;try{if(J==="parse"){let q=new w(j).export();self.postMessage({id:W,success:!0,data:q})}}catch(G){let q=G instanceof Error?G.message:"Unknown error";console.error("Worker error:",G),self.postMessage({id:W,success:!1,error:q})}};
`;

// src/vyi-worker.ts
var WORKER_BLOB = new Blob([WORKER_CODE], { type: "application/javascript" });
var WORKER_SCRIPT_URL = URL.createObjectURL(WORKER_BLOB);

class WorkerPool {
  static instance = null;
  workers = [];
  availableWorkers = [];
  maxWorkers;
  messageId = 0;
  pendingMessages = new Map;
  waitQueue = [];
  constructor(maxWorkers = navigator.hardwareConcurrency || 4) {
    this.maxWorkers = maxWorkers;
    this.initializeWorkers();
  }
  static getInstance(maxWorkers) {
    if (!WorkerPool.instance) {
      WorkerPool.instance = new WorkerPool(maxWorkers);
    }
    return WorkerPool.instance;
  }
  static destroy() {
    if (WorkerPool.instance) {
      WorkerPool.instance.terminate();
      WorkerPool.instance = null;
    }
  }
  initializeWorkers() {
    for (let i = 0;i < this.maxWorkers; i++) {
      const worker = this.createWorker();
      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }
  }
  createWorker() {
    const worker = new Worker(WORKER_SCRIPT_URL, { type: "module" });
    worker.onmessage = (event) => {
      const { id, success, data, error } = event.data;
      const pending = this.pendingMessages.get(id);
      if (pending) {
        this.pendingMessages.delete(id);
        if (success) {
          pending.resolve(data);
        } else {
          pending.reject(new Error(error));
        }
      }
    };
    worker.onerror = (error) => {
      console.error("Worker error:", error);
      for (const [id, pending] of this.pendingMessages) {
        pending.reject(new Error(`Worker error: ${error.message}`));
      }
      this.pendingMessages.clear();
    };
    return worker;
  }
  async getWorker() {
    if (this.availableWorkers.length > 0) {
      return this.availableWorkers.pop();
    }
    if (this.workers.length === 0) {
      throw new Error("Workers have been terminated. Create a new VyiWorker instance to continue.");
    }
    return new Promise((resolve) => {
      this.waitQueue.push(resolve);
    });
  }
  returnWorker(worker) {
    if (this.waitQueue.length > 0) {
      const resolve = this.waitQueue.shift();
      resolve(worker);
    } else if (this.workers.includes(worker)) {
      this.availableWorkers.push(worker);
    }
  }
  async sendMessage(worker, type, data) {
    const id = `${this.messageId++}`;
    return new Promise((resolve, reject) => {
      this.pendingMessages.set(id, { resolve, reject });
      worker.postMessage({ id, type, data });
      setTimeout(() => {
        if (this.pendingMessages.has(id)) {
          this.pendingMessages.delete(id);
          reject(new Error("Worker message timeout"));
        }
      }, 30000);
    });
  }
  terminate() {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers = [];
    this.availableWorkers = [];
    for (const [id, pending] of this.pendingMessages) {
      pending.reject(new Error("Worker terminated"));
    }
    this.pendingMessages.clear();
  }
}

class VyiWorker {
  pool;
  constructor(maxWorkers) {
    this.pool = WorkerPool.getInstance(maxWorkers);
  }
  async parse(data) {
    const worker = await this.pool.getWorker();
    try {
      const result = await this.pool.sendMessage(worker, "parse", data);
      return result;
    } finally {
      this.pool.returnWorker(worker);
    }
  }
  async parseMultiple(dataArray) {
    const promises = dataArray.map((data) => this.parse(data));
    return Promise.all(promises);
  }
  async parseMultipleWithProgress(dataArray, onProgress) {
    const total = dataArray.length;
    let completed = 0;
    const promises = dataArray.map(async (data) => {
      try {
        const result = await this.parse(data);
        completed++;
        onProgress?.(completed, total);
        return result;
      } catch (error) {
        completed++;
        onProgress?.(completed, total);
        throw error;
      }
    });
    return Promise.all(promises);
  }
  getAvailableWorkerCount() {
    return this.pool["availableWorkers"].length;
  }
  getTotalWorkerCount() {
    return this.pool["workers"].length;
  }
  getStatus() {
    return {
      totalWorkers: this.pool["workers"].length,
      availableWorkers: this.pool["availableWorkers"].length
    };
  }
  terminate() {
    this.pool.terminate();
  }
}
function getVyiWorker(maxWorkers) {
  return new VyiWorker(maxWorkers);
}
// src/types.ts
function isVyiData(data) {
  return data && typeof data === "object" && typeof data.v === "number" && Array.isArray(data.i);
}
function isIconData(data) {
  return Array.isArray(data) && data.length >= 6 && typeof data[0] === "string" && typeof data[1] === "number" && typeof data[2] === "number" && typeof data[3] === "number" && typeof data[4] === "string" && Array.isArray(data[5]);
}
function isFrameData(data) {
  return Array.isArray(data) && data.length >= 1 && typeof data[0] === "string" && (data.length === 1 || typeof data[1] === "number");
}
function isStateData(data) {
  return Array.isArray(data) && data.length >= 4 && typeof data[0] === "string" && typeof data[1] === "string" && typeof data[2] === "number" && Array.isArray(data[3]);
}
export {
  isVyiData,
  isStateData,
  isIconData,
  isFrameData,
  getVyiWorker,
  VyiWorker,
  VYI,
  Icon,
  Frame
};

//# debugId=A91DD5CAFBAF93B464756E2164756E21
