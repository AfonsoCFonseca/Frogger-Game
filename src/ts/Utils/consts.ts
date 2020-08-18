import { Utils } from "./utils"

export const TILE_SIZE = 60
export const KEY_PRESSED_TIMER = 300
export const DIFFICULTY_INCREMENT = 0.2

export const CAR = {
    SPEED: 2,
    MIN_INTERVAL_CAR: 500,
    MAX_INTERVAL_CAR: 1500
}

export const CANVAS = {
    WIDTH: null,
    HEIGHT: null
}

export const BACKGROUND = {
    WIDTH: 840,
    HEIGHT: 780,
    X_TILE_SIZE: 14,
    Y_TILE_SIZE: 13
}

export const FROG = {
    WIDTH: TILE_SIZE,
    HEIGHT: TILE_SIZE,
    MOVEMENT_ANIM_TIMER: 180,
    INITIAL_TILE_POSITION: { tileX: 7, tileY: 12 }
}