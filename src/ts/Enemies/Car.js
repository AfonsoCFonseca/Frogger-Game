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
var consts = require("../Utils/consts");
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(posTile, direction) {
        var _this = this;
        var pos = utils_1.Utils.convertTileToPosition(posTile);
        var _a = getCarFrameAndTexture(posTile.tileY), texture = _a.texture, frame = _a.frame;
        var gameObj = {
            scene: App_1.scene,
            x: pos.x,
            y: pos.y,
            texture: texture,
            frame: frame
        };
        _this = _super.call(this, game_interfaces_1.enemyType.CAR, gameObj, direction) || this;
        _this.speedMap = [2.8, 2.7, 2.4, 2.5, 2.3];
        _this.row = posTile.tileY - 6;
        var speed = _this.getSpeed();
        _this.setSpeed(speed);
        return _this;
    }
    Car.prototype.getSpeed = function () {
        switch (App_1.scene.level) {
            case 1:
                return this.speedMap[this.row - 1];
        }
    };
    Car.prototype.carBoundary = function (direction, currentTilePosition) {
        if ((direction == game_interfaces_1.directionEnum.EAST && currentTilePosition.tileX >= consts.BACKGROUND.X_TILE_SIZE) ||
            (direction == game_interfaces_1.directionEnum.WEST && currentTilePosition.tileX < -1))
            return false;
        else
            return true;
    };
    return Car;
}(Enemy_1.Enemy));
exports.Car = Car;
function getCarFrameAndTexture(tileY) {
    var isFirstRow = tileY - 7 <= 0;
    return {
        texture: isFirstRow ? "truck" : "cars",
        frame: isFirstRow ? null : tileY - 7,
    };
}
