/*!
 * icon-point@2.1.0 https://github.com/EvitcaStudio/IconPoint
 * Compiled Mon, 10 Nov 2025 09:52:21 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * icon-point is privately licensed.
 */

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

// src/index.ts
class IconPoint {
  static defaultOffset = { x: 0, y: 0 };
  static defaultAnchor = { x: 0.5, y: 0.5 };
  static version = "2.1.0";
  static logger = new Logger;
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
export {
  IconPoint
};

//# debugId=E5407F068107EC4864756E2164756E21
