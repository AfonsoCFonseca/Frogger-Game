import { enemyType, row, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Enemy } from './Enemy';
import { scene } from '../App';
import { Utils } from '../Utils/utils';
import * as consts from "../Utils/consts"

export class Car extends Enemy{

    private row: number
    private speedMap: number[]
    
    constructor( type: enemyType, posTile: TilePosition, direction: directionEnum ){
        let pos = Utils.convertTileToPosition( posTile )
        let gameObj = {
            scene,
            x: pos.x,
            y: pos.y,
            texture: "cars",
            frame: getCarFrame( posTile.tileY ),
        }
        super( type, gameObj, direction )

        this.speedMap = [ 2.8, 2.7, 2.4, 2.5, 2.3 ]
        this.row = posTile.tileY - 6

        let speed = this.getSpeed()
        this.setSpeed( speed )

    }
    
    private getSpeed(): number{
        switch( scene.level ){
            case 1: 
                return this.speedMap[this.row - 1]
        }
    }
}

function getCarFrame( tileY: number ): number{
    return tileY - 6s
}
