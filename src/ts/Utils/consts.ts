import { Utils } from "./utils"

export const TILE_SIZE = 60
export const KEY_PRESSED_TIMER = 300
export const DIFFICULTY_INCREMENT = 0.2
export const TIME_PER_LEVEL = 25000
export const GOAL_SIZE = 40
export const BUG_GOAL_TIMER = 6000
export const BUG_GOAL_INTERVAL_MIN = 7000
export const BUG_GOAL_INTERVAL_MAX = 13000

export const DEFAULT_TILE_SIZE = {
    frameWidth: 60,
    frameHeight: 60,
}

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
    HEIGHT: 800,
    X_TILE_SIZE: 14,
    Y_TILE_SIZE: 13,
    RIVER_TOP_HEIGHT: 243,
    RIVER_BOTTOM_HEIGHT: 484
}

export const FROG = {
    WIDTH: TILE_SIZE,
    HEIGHT: TILE_SIZE,
    MOVEMENT_ANIM_TIMER: 180,
    INITIAL_TILE_POSITION: { tileX: 7, tileY: 12 }
}