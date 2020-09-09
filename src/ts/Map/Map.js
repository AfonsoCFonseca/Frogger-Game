"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("../Tile");
var consts = require("../Utils/consts");
var Map = /** @class */ (function () {
    function Map() {
        this.map = this.createMap();
    }
    Map.prototype.createMap = function () {
        var newMap = [];
        for (var i = 0; i < consts.BACKGROUND.X_TILE_SIZE; i++) {
            newMap[i] = [];
            for (var j = 0; j < consts.BACKGROUND.Y_TILE_SIZE; j++) {
                newMap[i][j] = new Tile_1.Tile({ tileX: i, tileY: j });
            }
        }
        return newMap;
    };
    Map.prototype.getMap = function () {
        return this.map;
    };
    Map.prototype.getTile = function (_a) {
        var tileX = _a.tileX, tileY = _a.tileY;
        return this.map[tileX][tileY];
    };
    return Map;
}());
exports.Map = Map;
