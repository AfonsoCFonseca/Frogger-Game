import { enemyType, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Utils } from '../Utils/utils'
import * as consts from "../Utils/consts"
import { Car } from './Car'
import { scene, enemyHandler } from '../App'


export abstract class Enemy extends Phaser.GameObjects.Sprite{

    public enemyType: enemyType
    private currentTilePosition: TilePosition
    public ID: string
    private direction: directionEnum
    protected speed: number

    constructor( type: enemyType, gameObj: GameSprite, direction: directionEnum ){
        super( scene, gameObj.x, gameObj.y, gameObj.texture, gameObj.frame );
        scene.add.existing(this).setOrigin( 0.5,0 )
        scene.physics.world.enable(this);

        this.direction = direction
        if( this.direction == directionEnum.WEST ) this.flipX = true
        this.enemyType = type
        this.currentTilePosition = Utils.convertPositionToTile( { x: gameObj.x, y: gameObj.y})
        this.ID = Utils.generateId()
        
        this.update = this.update.bind( this )
        scene.enemiesGroup.add( this )

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
            this.delete()
        }

    }

    public delete(){
        
        enemyHandler.deleteEnemy( this.enemyType, this.ID )
        scene.events.off( 'updateEnemy', this.update )
        this.destroy()

    }

    private isLimitBoundaries(): boolean{

        switch( this.enemyType ){
            case enemyType.CAR: 
                return Car.prototype.carBoundary.call( this, this.direction, this.currentTilePosition  )
            case enemyType.PLATFORM: 
                return Platform.prototype.platformBoundary.call( this, this.x, this.width )
            case enemyType.TURTLE:
                return Turtle.prototype.turtleBoundary.call( this, this.x, this.width )
            default:
                return true
        }
    }

    private move(){
        this.x += this.direction == directionEnum.EAST ? this.speed : -this.speed
    }
    

}

import { Platform } from './Platform'
import { Turtle } from './Turtle'
