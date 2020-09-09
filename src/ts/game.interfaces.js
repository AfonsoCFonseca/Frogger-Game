"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directionEnum;
(function (directionEnum) {
    directionEnum["NORTH"] = "NORTH";
    directionEnum["SOUTH"] = "SOUTH";
    directionEnum["WEST"] = "WEST";
    directionEnum["EAST"] = "EAST";
})(directionEnum = exports.directionEnum || (exports.directionEnum = {}));
var enemyType;
(function (enemyType) {
    enemyType[enemyType["PLATFORM"] = 0] = "PLATFORM";
    enemyType[enemyType["CAR"] = 1] = "CAR";
    enemyType[enemyType["TOADS"] = 2] = "TOADS";
    enemyType[enemyType["CROCODILE"] = 3] = "CROCODILE";
})(enemyType = exports.enemyType || (exports.enemyType = {}));
