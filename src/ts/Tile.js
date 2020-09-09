"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./Utils/utils");
var Tile = /** @class */ (function () {
    function Tile(_a) {
        var tileX = _a.tileX, tileY = _a.tileY;
        this.currentTilePosition = { tileX: tileX, tileY: tileY };
        this.currentPosition = utils_1.Utils.convertTileToPosition(this.currentTilePosition);
    }
    return Tile;
}());
exports.Tile = Tile;
