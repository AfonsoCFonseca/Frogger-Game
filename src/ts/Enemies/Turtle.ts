import { enemyType, row, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Enemy } from './Enemy';
import { game, scene } from '../App';
import { Utils } from '../Utils/utils';
import * as consts from "../Utils/consts"

export class Turtle extends Enemy{
    private speedMap: number[];
    private row: number;
    body: Phaser.Physics.Arcade.Body;
    isDiver: boolean;

    constructor( posTile: TilePosition, direction: directionEnum, isDiver:boolean ){
        let pos = Utils.convertTileToPosition( posTile )


        let texture = "turtle"
        let gameObj = {
            scene,
            x: pos.x,
            y: pos.y,
            texture,
            frame: 1,
        }

        super( enemyType.TURTLE, gameObj, direction )
        this.isDiver = isDiver
        this.diving = this.diving.bind( this )

        scene.anims.create({
            key: 'turtleMoving',
            frames: scene.anims.generateFrameNumbers('turtle', { end: 2 } ),
            frameRate: 2,
            repeat: -1
        });
    
        scene.anims.create({
            key: 'turtleDiving',
            frames: scene.anims.generateFrameNumbers('turtle', { end: 4 } ),
            frameRate: 2,
            repeat: 0
        });

        scene.anims.create({
            key: 'turtleFloating',
            frames: scene.anims.generateFrameNumbers('turtle', { start:4, end: 8 } ),
            frameRate: 2,
            repeat: 0
        });


        this.speedMap = [ 0,1.8,0,0, 1.5 ]
        this.row = posTile.tileY

        let speed = this.getSpeed()
        this.setSpeed( speed )
    
        this.play('turtleMoving');

        if( this.isDiver ) this.diving()


    }

    private diving(){
        let divingTimer = Utils.rndNumber(1,7) * 100
        let self = this 

        setTimeout(() => {

            self.play('turtleDiving')
            self.once('animationcomplete', () =>{
                self.visible = false

                setTimeout(( ) => {
                    self.play('turtleFloating')
                    self.visible = true
                    self.once('animationcomplete', () =>{
                        this.play('turtleMoving');
                    })
                }, 1000 )
            })

        }, divingTimer )

    }

    public turtleBoundary( x: number, width: number ): boolean {
        if( x <= Utils.halfScreen( 'x' ) - width / 2 ) return false
        else return true
    }

    public getSpeed(): number{
        switch( scene.level ){
            case 1: 
                return this.speedMap[this.row - 1]
            default: return this.speedMap[this.row - 1] + 0.2;
        }
    }

}

