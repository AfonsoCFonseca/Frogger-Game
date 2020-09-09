"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var consts = require("./consts");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.convertTileToPosition = function (pos) {
        var newPos = {
            x: (pos.tileX * consts.TILE_SIZE),
            y: (pos.tileY * consts.TILE_SIZE),
        };
        newPos.x += this.halfScreen('x');
        newPos.y += this.halfScreen('y');
        return {
            x: newPos.x,
            y: newPos.y
        };
    };
    Utils.convertPositionToTile = function (pos) {
        var currentXPosition = pos.x - (this.halfScreen('x'));
        var currentYPosition = pos.y - (this.halfScreen('y'));
        return {
            tileX: Math.floor(currentXPosition / consts.TILE_SIZE),
            tileY: Math.floor(currentYPosition / consts.TILE_SIZE)
        };
    };
    Utils.generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    Utils.rndNumber = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Utils.halfScreen = function (axis, edge) {
        if (edge === void 0) { edge = null; }
        if (axis == 'x')
            return !edge ? (consts.CANVAS.WIDTH / 2) - (consts.BACKGROUND.WIDTH / 2) : (consts.CANVAS.WIDTH / 2) + (consts.BACKGROUND.WIDTH / 2);
        else
            return !edge ? (consts.CANVAS.HEIGHT / 2) - (consts.BACKGROUND.HEIGHT / 2) : (consts.CANVAS.HEIGHT / 2) + (consts.BACKGROUND.HEIGHT / 2);
    };
    return Utils;
}());
exports.Utils = Utils;
