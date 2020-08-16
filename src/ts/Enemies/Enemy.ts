import { enemyType, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Utils } from '../Utils/utils'
import * as consts from "../Utils/consts"
import { scene, enemyHandler } from '../App'

export abstract class Enemy extends Phaser.GameObjects.Sprite{

    private enemyType: enemyType
    private currentTilePosition: TilePosition
    public ID: string
    private direction: directionEnum
    protected speed: number

    constructor( type: enemyType, gameObj: GameSprite, direction: directionEnum ){
        super( scene, gameObj.x, gameObj.y, gameObj.texture, gameObj.frame );
        scene.add.existing(this).setOrigin( 0,0 )
        scene.physics.world.enable(this);

        this.direction = direction
        if( this.direction == directionEnum.WEST ) this.flipX = true
        this.enemyType = type
        this.currentTilePosition = Utils.convertPositionToTile( { x: gameObj.x, y: gameObj.y})
        this.ID = Utils.generateId()
        
        this.update = this.update.bind( this )

        scene.enemyGroup.add(this);
        scene.events.on('updateEnemy', this.update );
    }

    public setSpeed( newSpeed: number ){
        this.speed = newSpeed
    }

    update(){

        this.currentTilePosition = Utils.convertPositionToTile( { x: this.x, y: this.y})

        if( this.isLimitBoundaries() )
            this.move()
        else{
            scene.events.off( 'updateEnemy', this.update )
            enemyHandler.deleteEnemy( enemyType.CAR, this.ID, this.currentTilePosition )
        }

    }

    isLimitBoundaries(): boolean{
        if( ( this.direction == directionEnum.EAST && this.currentTilePosition.tileX >= consts.BACKGROUND.X_TILE_SIZE ) || 
            ( this.direction == directionEnum.WEST && this.currentTilePosition.tileX < -1 ) )
            return false
        else return true
    }

    move(){
        this.x += this.direction == directionEnum.EAST ? this.speed : -this.speed
    }
    

}