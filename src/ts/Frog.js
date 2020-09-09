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
var consts = require("./Utils/consts");
var utils_1 = require("./Utils/utils");
var game_interfaces_1 = require("./game.interfaces");
var App_1 = require("./App");
var gem;
var Frog = /** @class */ (function (_super) {
    __extends(Frog, _super);
    function Frog(config) {
        var _this = _super.call(this, App_1.scene, config.x, config.y, "frog") || this;
        _this.isDying = false;
        App_1.scene.physics.world.enable(_this);
        App_1.scene.add.existing(_this).setDepth(1).setOrigin(0, 0);
        _this.currentDirection = game_interfaces_1.directionEnum.NORTH;
        _this.death = _this.death.bind(_this);
        _this.currentAnimationFrame = 0;
        App_1.scene.anims.create({
            key: 'deathAnimation',
            frames: App_1.scene.anims.generateFrameNumbers('death', { end: 2 }),
            frameRate: 5,
            repeat: 1
        });
        return _this;
    }
    Frog.prototype.getCurrentPosition = function () {
        return {
            x: this.x,
            y: this.y
        };
    };
    Frog.prototype.getCurrentTilePosition = function () {
        return utils_1.Utils.convertPositionToTile(this.getCurrentPosition());
    };
    Frog.prototype.getCurrentTile = function () {
        var tilePosition = utils_1.Utils.convertPositionToTile(this.getCurrentPosition());
        return App_1.map.getTile(tilePosition);
    };
    Frog.prototype.setDirection = function (dir) {
        this.currentDirection = dir;
    };
    Frog.prototype.move = function (direction) {
        var _this = this;
        if (!this.isDying) {
            var tilePosition = utils_1.Utils.convertPositionToTile({ x: this.x, y: this.y });
            this.setDirection(direction);
            switch (direction) {
                case game_interfaces_1.directionEnum.EAST:
                    tilePosition.tileX++;
                    this.currentAnimationFrame = 7;
                    this.x = utils_1.Utils.convertTileToPosition(tilePosition).x;
                    break;
                case game_interfaces_1.directionEnum.WEST:
                    tilePosition.tileX--;
                    this.currentAnimationFrame = 5;
                    this.x = utils_1.Utils.convertTileToPosition(tilePosition).x;
                    break;
                case game_interfaces_1.directionEnum.SOUTH:
                    tilePosition.tileY++;
                    this.currentAnimationFrame = 3;
                    this.y = utils_1.Utils.convertTileToPosition(tilePosition).y;
                    break;
                case game_interfaces_1.directionEnum.NORTH:
                    tilePosition.tileY--;
                    this.currentAnimationFrame = 1;
                    this.y = utils_1.Utils.convertTileToPosition(tilePosition).y;
                    break;
            }
            this.setTexture('frog', this.currentAnimationFrame);
            App_1.scene.time.delayedCall(consts.FROG.MOVEMENT_ANIM_TIMER, function () {
                _this.setTexture('frog', --_this.currentAnimationFrame);
            }, [], this);
        }
    };
    Frog.prototype.death = function (callback) {
        var _this = this;
        if (!this.isDying) {
            this.play('deathAnimation');
            this.isDying = true;
            this.once('animationcomplete', function () {
                var _a = utils_1.Utils.convertTileToPosition(consts.FROG.INITIAL_TILE_POSITION), x = _a.x, y = _a.y;
                _this.setPosition(x, y);
                _this.setDirection(game_interfaces_1.directionEnum.NORTH);
                _this.setTexture("frog", 0);
                callback();
                _this.isDying = false;
            });
        }
    };
    return Frog;
}(Phaser.GameObjects.Sprite));
exports.Frog = Frog;
