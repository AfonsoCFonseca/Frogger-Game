"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = require("./Car");
var Platform_1 = require("./Platform");
var game_interfaces_1 = require("../game.interfaces");
var consts = require("../Utils/consts");
var utils_1 = require("../Utils/utils");
var App_1 = require("../App");
var EnemyHandler = /** @class */ (function () {
    function EnemyHandler() {
        var _this = this;
        this.carArray = [];
        this.platformArray = [];
        this.MAX_ROWS = 5;
        this.generateStartingEnemies();
        this.enemyCreator();
        this.intervalCreator = setInterval(function () { return _this.enemyCreator(); }, 3000);
        this.enemyCreator = this.enemyCreator.bind(this);
    }
    EnemyHandler.prototype.generateStartingEnemies = function () {
        for (var i = 0; i < this.MAX_ROWS; i++) {
            var tileX = utils_1.Utils.rndNumber(0, consts.BACKGROUND.X_TILE_SIZE);
            var tileCarPosition = { tileX: tileX, tileY: i + 7 };
            this.createEnemy(game_interfaces_1.enemyType.CAR, tileCarPosition);
            if (i == 0 || i == 2 || i == 3) {
                var tilePlatformPosition = { tileX: tileX, tileY: i + 1 };
                this.createEnemy(game_interfaces_1.enemyType.PLATFORM, tilePlatformPosition);
            }
        }
    };
    EnemyHandler.prototype.enemyCreator = function () {
        for (var i = 0; i < this.MAX_ROWS; i++) {
            var tileX = utils_1.Utils.rndNumber(0, consts.BACKGROUND.X_TILE_SIZE);
            var tileCarPosition = { tileX: tileX, tileY: i + 7 };
            this.requestAnotherEnemy(game_interfaces_1.enemyType.CAR, tileCarPosition);
            if (i == 0 || i == 2 || i == 3) {
                var tilePlatformPosition = { tileX: tileX, tileY: i + 1 };
                this.requestAnotherEnemy(game_interfaces_1.enemyType.PLATFORM, tilePlatformPosition);
            }
        }
    };
    EnemyHandler.prototype.createEnemy = function (type, posTile) {
        var direction;
        switch (type) {
            case game_interfaces_1.enemyType.CAR:
                direction = posTile.tileY % 2 == 0 ? game_interfaces_1.directionEnum.EAST : game_interfaces_1.directionEnum.WEST;
                var car = new Car_1.Car(posTile, direction);
                this.carArray.push(car);
                return car;
            case game_interfaces_1.enemyType.PLATFORM:
                direction = game_interfaces_1.directionEnum.EAST;
                var platform = new Platform_1.Platform(posTile, direction);
                this.platformArray.push(platform);
                return platform;
        }
    };
    EnemyHandler.prototype.deleteEnemy = function (type, _id) {
        var currentArray;
        switch (type) {
            case game_interfaces_1.enemyType.CAR:
                currentArray = this.carArray;
                break;
            case game_interfaces_1.enemyType.PLATFORM:
                currentArray = this.platformArray;
                break;
            default:
                console.log("no type selected");
        }
        currentArray.forEach(function (enemy, i) {
            if (enemy.ID == _id) {
                currentArray.slice(i, 1);
            }
        });
    };
    EnemyHandler.prototype.requestAnotherEnemy = function (type, posTile) {
        var _this = this;
        var timer = utils_1.Utils.rndNumber(consts.CAR.MIN_INTERVAL_CAR, consts.CAR.MAX_INTERVAL_CAR);
        if (type == game_interfaces_1.enemyType.CAR)
            posTile.tileX = posTile.tileY % 2 == 0 ? 0 : consts.BACKGROUND.X_TILE_SIZE;
        if (type == game_interfaces_1.enemyType.PLATFORM)
            posTile.tileX = -2;
        App_1.scene.time.delayedCall(timer, function () {
            return _this.createEnemy(type, posTile);
        }, [], this);
    };
    EnemyHandler.prototype.reset = function () {
        this.clearBoard();
        clearInterval(this.intervalCreator);
    };
    EnemyHandler.prototype.clearBoard = function () {
        this.carArray.forEach(function (car, i) { return car.delete(); });
    };
    return EnemyHandler;
}());
exports.EnemyHandler = EnemyHandler;
