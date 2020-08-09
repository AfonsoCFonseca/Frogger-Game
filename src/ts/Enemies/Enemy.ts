import { enemyType, Position, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Utils } from '../Utils/utils'
import * as consts from "../Utils/consts"
import { scene, enemyHandler } from '../App'

export abstract class Enemy extends Phaser.GameObjects.Sprite{

    private enemyType: enemyType
    private currentTilePosition: TilePosition
    public ID: string 
    private direction: directionEnum
    private speed = consts.CAR_SPEED

    constructor( type: enemyType, gameObj: GameSprite, direction: directionEnum ){
        super( scene, gameObj.x, gameObj.y, gameObj.texture, gameObj.frame );
        scene.add.existing(this).setOrigin( 0,0 )

        this.direction = direction
        this.enemyType = type
        this.currentTilePosition = Utils.convertPositionToTile( { x: gameObj.x, y: gameObj.y})
        this.ID = Utils.generateId() 
        
        this.update = this.update.bind( this )
        scene.events.on("updateEnemy", this.update );
    }

    update(){
        this.currentTilePosition = Utils.convertPositionToTile( { x: this.x, y: this.y}) 

        if( this.currentTilePosition.tileX < consts.BACKGROUND.X_TILE_SIZE ){
            this.move()
        }
        else{
            enemyHandler.deleteEnemy( enemyType.CAR, this.ID )
            this.destroy()
        }

    }

    move(){
        this.x += this.direction == directionEnum.EAST ? this.speed : -this.speed
    }

}