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
var utils_1 = require("../Utils/utils");
var Car_1 = require("./Car");
var App_1 = require("../App");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type, gameObj, direction) {
        var _this = _super.call(this, App_1.scene, gameObj.x, gameObj.y, gameObj.texture, gameObj.frame) || this;
        App_1.scene.add.existing(_this).setOrigin(0.5, 0);
        App_1.scene.physics.world.enable(_this);
        _this.direction = direction;
        if (_this.direction == game_interfaces_1.directionEnum.WEST)
            _this.flipX = true;
        _this.enemyType = type;
        _this.currentTilePosition = utils_1.Utils.convertPositionToTile({ x: gameObj.x, y: gameObj.y });
        _this.ID = utils_1.Utils.generateId();
        _this.update = _this.update.bind(_this);
        App_1.scene.enemiesGroup.add(_this);
        App_1.scene.events.on('updateEnemy', _this.update);
        return _this;
    }
    Enemy.prototype.setSpeed = function (newSpeed) {
        this.speed = newSpeed;
    };
    Enemy.prototype.update = function () {
        this.currentTilePosition = utils_1.Utils.convertPositionToTile({ x: this.x, y: this.y });
        if (this.isLimitBoundaries())
            this.move();
        else {
            this.delete();
        }
    };
    Enemy.prototype.delete = function () {
        App_1.enemyHandler.deleteEnemy(this.enemyType, this.ID);
        App_1.scene.events.off('updateEnemy', this.update);
        this.destroy();
    };
    Enemy.prototype.isLimitBoundaries = function () {
        switch (this.enemyType) {
            case game_interfaces_1.enemyType.CAR:
                return Car_1.Car.prototype.carBoundary.call(this, this.direction, this.currentTilePosition);
            case game_interfaces_1.enemyType.PLATFORM:
                return Platform_1.Platform.prototype.platformBoundary.call(this, this.x, this.width);
            default:
                return true;
        }
    };
    Enemy.prototype.move = function () {
        this.x += this.direction == game_interfaces_1.directionEnum.EAST ? this.speed : -this.speed;
    };
    return Enemy;
}(Phaser.GameObjects.Sprite));
exports.Enemy = Enemy;
var Platform_1 = require("./Platform");
