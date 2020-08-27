import { Enemy } from './Enemy'
import { Car } from './Car'
import { Platform } from './Platform'
import { enemyType, row, TilePosition, directionEnum } from '../game.interfaces'
import * as consts from "../Utils/consts"
import { Utils } from '../Utils/utils'
import { Tilemaps } from 'phaser'
import { scene } from '../App' 

export class EnemyHandler {
    
    private carArray: Car[] = []
    private platformArray: Platform[] = []
    private MAX_ROWS = 5
    private intervalCreator

    constructor( ){
        this.generateStartingEnemies()
        this.enemyCreator()
        
        this.intervalCreator = setInterval( () => this.enemyCreator() , 3000);

        this.enemyCreator = this.enemyCreator.bind( this )
    }

    generateStartingEnemies(){
        for( var i = 0; i < this.MAX_ROWS; i++ ){
            let tileX = Utils.rndNumber( 0, consts.BACKGROUND.X_TILE_SIZE )
            let tileCarPosition = { tileX, tileY: i + 7 }
            this.createEnemy( enemyType.CAR, tileCarPosition )
            if( i == 0 || i == 2 || i == 3 ){
                let tilePlatformPosition = { tileX, tileY: i + 1 }
                this.createEnemy( enemyType.PLATFORM, tilePlatformPosition )
            }
        }

    }

    enemyCreator(){
        let self = this
        for( var i = 0; i < this.MAX_ROWS; i++ ){
            let tileX = Utils.rndNumber( 0, consts.BACKGROUND.X_TILE_SIZE )
            let tilePosition = { tileX, tileY: i + 7 }
            this.requestAnotherCar( enemyType.CAR, tilePosition )
        }
    }

    createEnemy( type: enemyType, posTile: TilePosition): Enemy {

        let direction: directionEnum
        switch( type ){
            case enemyType.CAR:
                direction = posTile.tileY % 2 == 0 ? directionEnum.EAST : directionEnum.WEST
                let car = new Car( posTile, direction )
                this.carArray.push(car)
                return car
            case enemyType.PLATFORM: 
                direction = directionEnum.EAST
                let platform = new Platform( posTile, direction )
                this.platformArray.push( platform)
                return platform
        }

    }
    
    public deleteEnemy( type: enemyType, _id: string ){

        if( type == enemyType.CAR ){

            this.carArray.forEach( ( car, i ) => {

                if( car.ID == _id ){
                    this.carArray[i].destroy()
                    this.carArray.slice(i, 1);
                }
            })
        }
        
    }

    private requestAnotherCar( type: enemyType, posTile: TilePosition ): void{
        let timer = Utils.rndNumber( consts.CAR.MIN_INTERVAL_CAR, consts.CAR.MAX_INTERVAL_CAR )
        scene.time.delayedCall( timer, () => {
            posTile.tileX = posTile.tileY % 2 == 0 ? 0 : consts.BACKGROUND.X_TILE_SIZE
            return this.createEnemy( type, posTile )
        }, [], this);

    }

    public reset(){
        this.clearBoard()
        clearInterval( this.intervalCreator );
    }

    private clearBoard(){

        this.carArray.forEach( (car,i) =>  car.delete() )

    }
}