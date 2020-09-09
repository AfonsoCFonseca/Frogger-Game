"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_interfaces_1 = require("../game.interfaces");
var Enemy_1 = require("./Enemy");
var App_1 = require("../App");
var utils_1 = require("../Utils/utils");
var Platform = /** @class */ (function (_super) {
    __extends(Platform, _super);
    function Platform(posTile, direction) {
        var _this = this;
        var pos = utils_1.Utils.convertTileToPosition(posTile);
        var texture = getPlatformTexture(posTile.tileY);
        var gameObj = {
            scene: App_1.scene,
            x: pos.x,
            y: pos.y,
            texture: texture,
        };
        _this = _super.call(this, game_interfaces_1.enemyType.PLATFORM, gameObj, direction) || this;
        _this.speedMap = [1.8, 0.0, 2.0, 1.5];
        _this.row = posTile.tileY;
        var speed = _this.getSpeed();
        _this.setSpeed(speed);
        return _this;
    }
    Platform.prototype.getSpeed = function () {
        switch (App_1.scene.level) {
            case 1:
                return this.speedMap[this.row - 1];
        }
    };
    Platform.prototype.platformBoundary = function (x, width) {
        if (x >= utils_1.Utils.halfScreen('x', true) + width / 2)
            return false;
        else
            return true;
    };
    return Platform;
}(Enemy_1.Enemy));
exports.Platform = Platform;
function getPlatformTexture(pos) {
    switch (pos) {
        case 1:
            return "log3";
        case 3:
            return "log2";
        case 4:
            return "log1";
    }
}
