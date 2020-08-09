import { enemyType, row, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Enemy } from './Enemy';
import { scene } from '../App';
import { Utils } from '../Utils/utils';

export class Car extends Enemy{

    private row: row
    
    constructor( type: enemyType, posTile: TilePosition, direction: directionEnum ){
        let pos = Utils.convertTileToPosition( posTile )
        let gameObj = {
            scene,
            x: pos.x,
            y: pos.y,
            texture: "cars",
            frame: 1,
        }
        super( type, gameObj, direction )
    }
    
}