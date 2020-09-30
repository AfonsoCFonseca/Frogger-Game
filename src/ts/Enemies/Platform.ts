import { enemyType, row, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Enemy } from './Enemy';
import { scene } from '../App';
import { Utils } from '../Utils/utils';
import * as consts from "../Utils/consts"

export class Platform extends Enemy {
    private speedMap: number[] 
    private row: number

    constructor( posTile: TilePosition, direction: directionEnum ){
        let pos = Utils.convertTileToPosition( posTile )

        let texture = getPlatformTexture( posTile.tileY )
        let gameObj = {
            scene,
            x: pos.x,
            y: pos.y,
            texture,
        }
        super( enemyType.PLATFORM, gameObj, direction )

        this.speedMap = [ 1.8, 0.0, 2.0, 1.5 ]
        this.row = posTile.tileY

        let speed = this.getSpeed()
        this.setSpeed( speed )

    }

    public getSpeed(): number{
        switch( scene.level ){
            case 1: 
                return this.speedMap[this.row - 1]
            default: 
                this.speedMap[this.row - 1] += 0.2;
                return this.speedMap[this.row - 1]
        }
    }

    public platformBoundary( x: number, width: number ): boolean {
        if( x >= Utils.halfScreen( 'x', true ) + width / 2 ) return false
        else return true
    }

}


function getPlatformTexture( pos:number ):string{
    switch(pos){
        case 1: 
            return "log3"
        case 3:
            return "log2"
        case 4: 
            return "log1"
    }
}