export enum directionEnum {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    WEST = "WEST",
    EAST = "EAST"
}

export enum enemyType {
    PLATFORM,
    CAR,
    TOADS,
    CROCODILE
}

export interface Position {
    x: number,
    y: number
}

export type row = 'A' | 'B' | 'C' | 'D' | 'E' 

export interface TilePosition {
    tileX: number,
    tileY: number
}

export interface GameSprite {
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame: number,
    texture: string,
}