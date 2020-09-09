"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TILE_SIZE = 60;
exports.KEY_PRESSED_TIMER = 300;
exports.DIFFICULTY_INCREMENT = 0.2;
exports.TIME_PER_LEVEL = 25000;
exports.CAR = {
    SPEED: 2,
    MIN_INTERVAL_CAR: 500,
    MAX_INTERVAL_CAR: 1500
};
exports.CANVAS = {
    WIDTH: null,
    HEIGHT: null
};
exports.BACKGROUND = {
    WIDTH: 840,
    HEIGHT: 780,
    X_TILE_SIZE: 14,
    Y_TILE_SIZE: 13
};
exports.FROG = {
    WIDTH: exports.TILE_SIZE,
    HEIGHT: exports.TILE_SIZE,
    MOVEMENT_ANIM_TIMER: 180,
    INITIAL_TILE_POSITION: { tileX: 7, tileY: 12 }
};
