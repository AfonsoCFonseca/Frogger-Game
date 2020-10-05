import { enemyType, row, TilePosition, directionEnum, GameSprite } from '../game.interfaces'
import { Enemy } from './Enemy';
import { scene } from '../App';
import { Utils } from '../Utils/utils';
import * as consts from "../Utils/consts"

export class Platform extends Enemy {
    private speedMap: number[] 
    private row: number
    private ladyBug: LadyBug | null
    private posTile: TilePosition

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

        this.ladyBug = null;
        this.posTile = posTile;
        if( posTile.tileY == 4 ) this.maybeSpawnLadyBug()

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

    public update(){
        if( this.ladyBug ) this.ladyBug.updateLadyBug()
        super.update()
    }

    public platformBoundary( x: number, width: number ): boolean {
        if( x >= Utils.halfScreen( 'x', true ) + width / 2 ) return false
        else return true
    }

    private maybeSpawnLadyBug(){
        let prob = Utils.rndNumber(0, 10)
        if( prob <= 2 ) 
            this.ladyBug = new LadyBug( this, this.posTile )
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


class LadyBug extends Phaser.GameObjects.Sprite{

    parentPlatform: Platform
    odd: boolean
    enemyType: string
    constructor( parentPlatform: Platform, platformPos: TilePosition ){

        let { x, y } = Utils.convertTileToPosition( platformPos )
        super( scene, x - 30 , y, "ladybug", 0);
        this.parentPlatform = parentPlatform;
        this.odd = true
        this.enemyType = "ladybug"
        scene.add.existing(this).setOrigin( 0.5,0 )
        scene.physics.world.enable(this);
        scene.enemiesGroup.add( this )

        setInterval( () => {
            this.x += this.odd ? 60 : -60
            this.setTexture( 'ladybug', this.odd ? 0 : 1 )
            this.odd = !this.odd
        }, 1000 )
    }

    updateLadyBug(){
        this.x += this.parentPlatform.getSpeed()

        if( this.x >= Utils.halfScreen( 'x', true ) ) this.destroy()

    }


}