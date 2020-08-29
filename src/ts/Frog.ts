import * as consts from "./Utils/consts"
import { Utils } from "./Utils/utils"
import { directionEnum, Position, TilePosition } from "./game.interfaces"
import { map, scene } from "./App";
import { Tile } from "./Tile";

let gem

export class Frog extends Phaser.GameObjects.Sprite {

    private currentDirection: directionEnum
    private currentAnimationFrame: number
    private isDying = false
    private animDeath

    constructor(config) {
        super( scene, config.x, config.y, "frog");
        scene.physics.world.enable(this);
        scene.add.existing(this).setDepth(1).setOrigin( 0,0 )

        this.currentDirection = directionEnum.NORTH
        this.death = this.death.bind(this)
        this.currentAnimationFrame = 0


        scene.anims.create({
            key: 'deathAnimation',
            frames: scene.anims.generateFrameNumbers('death', { end: 2 } ),
            frameRate: 5,
            repeat: 1
        });


    }

    public getCurrentPosition(): Position {
        return {
            x: this.x,
            y: this.y
        }
    }

    public getCurrentTilePosition(): TilePosition{
        return Utils.convertPositionToTile( this.getCurrentPosition() ) 
    }

    public getCurrentTile(): Tile {
        let tilePosition = Utils.convertPositionToTile( this.getCurrentPosition() ) 
        return map.getTile( tilePosition )
    }

    private setDirection(dir: directionEnum){
        this.currentDirection = dir
    }
    
    public move( direction: directionEnum ){
        
        if( !this.isDying ){

            let tilePosition = Utils.convertPositionToTile({ x: this.x, y: this.y })
            this.setDirection( direction )
            
            switch( direction ){
                case directionEnum.EAST:
                    tilePosition.tileX++
                    this.currentAnimationFrame = 7
                    this.x = Utils.convertTileToPosition( tilePosition ).x
                break;
                case directionEnum.WEST:
                    tilePosition.tileX--
                    this.currentAnimationFrame = 5
                    this.x = Utils.convertTileToPosition( tilePosition ).x
                break;
                case directionEnum.SOUTH:
                    tilePosition.tileY++
                    this.currentAnimationFrame = 3
                    this.y = Utils.convertTileToPosition( tilePosition ).y
                    break;
                case directionEnum.NORTH:
                    tilePosition.tileY--
                    this.currentAnimationFrame = 1
                    this.y = Utils.convertTileToPosition( tilePosition ).y
                break;
            }
    
            this.setTexture('frog', this.currentAnimationFrame )
            
            scene.time.delayedCall(consts.FROG.MOVEMENT_ANIM_TIMER, () => {
                this.setTexture('frog', --this.currentAnimationFrame)
            }, [], this);
        } 

    }

    public death( callback ) {

        if( !this.isDying ){

            this.play('deathAnimation');
            this.isDying = true

            this.once('animationcomplete', () => {

                let { x, y } = Utils.convertTileToPosition( consts.FROG.INITIAL_TILE_POSITION )
                this.setPosition( x, y )
                this.setDirection( directionEnum.NORTH )
                this.setTexture("frog", 0)
                callback()
                this.isDying = false
    
            })

        }


    }
}