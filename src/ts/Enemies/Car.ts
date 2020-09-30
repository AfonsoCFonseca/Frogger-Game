import { enemyType, row, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Enemy } from './Enemy';
import { scene } from '../App';
import { Utils } from '../Utils/utils';
import * as consts from "../Utils/consts"

export class Car extends Enemy{
    private row: number
    private speedMap: number[]
    
    constructor( posTile: TilePosition, direction: directionEnum ){
        let pos = Utils.convertTileToPosition( posTile )
        let { texture, frame } = getCarFrameAndTexture( posTile.tileY )
        let gameObj = {
            scene,
            x: pos.x,
            y: pos.y,
            texture,
            frame
        }

        super( enemyType.CAR, gameObj, direction )

        this.speedMap = [ 2.8, 2.7, 2.4, 2.5, 2.3 ]
        this.row = posTile.tileY - 6

        let speed = this.getSpeed()
        this.setSpeed( speed )

    }
    
    private getSpeed(): number{
        switch( scene.level ){
            case 1: 
                return this.speedMap[this.row - 1]
            default: 
                this.speedMap[this.row - 1] += 0.2;
                return this.speedMap[this.row - 1]
        }
    }

    public carBoundary( direction: directionEnum,currentTilePosition: TilePosition ):boolean{
        if( ( direction == directionEnum.EAST && currentTilePosition.tileX >= consts.BACKGROUND.X_TILE_SIZE ) || 
            ( direction == directionEnum.WEST && currentTilePosition.tileX < -1 ) ) return false
        else return true
    }

}

function getCarFrameAndTexture( tileY: number ) :{ texture: string, frame: number} {
        let isFirstRow =  tileY - 7 <= 0
        return {
            texture: isFirstRow ? "truck" : "cars",
            frame: isFirstRow ? null : tileY - 8,
        }
}

