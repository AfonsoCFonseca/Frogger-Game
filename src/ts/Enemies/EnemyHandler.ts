import { Enemy } from './Enemy'
import { Car } from './Car'
import { enemyType, row, TilePosition, directionEnum } from '../game.interfaces'
import * as consts from "../Utils/consts"
import { Utils } from '../Utils/utils'
import { Tilemaps } from 'phaser'
import { scene } from '../App' 

export class EnemyHandler {
    
    private carArray: Car[] = []
    private MAX_ROWS = 5

    constructor( ){
        this.generateStartingEnemies()
        this.enemyCreator()
        
        setInterval( () => this.enemyCreator() , 3000);

        this.enemyCreator = this.enemyCreator.bind( this )
    }

    generateStartingEnemies(){
        for( var i = 0; i < this.MAX_ROWS; i++ ){
            let tileX = Utils.rndNumber( 0, consts.BACKGROUND.X_TILE_SIZE )
            let tilePosition = { tileX, tileY: i + 7 }
            this.createEnemy( enemyType.CAR, tilePosition )
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

    createEnemy( type: enemyType, posTile: TilePosition): Car{

        let direction = posTile.tileY % 2 == 0 ? directionEnum.EAST : directionEnum.WEST
        switch( type ){
            case enemyType.CAR:
                let car = new Car( type, posTile, direction )
                this.carArray.push(car)
                return car
        }

    }
    
    public deleteEnemy( type: enemyType, _id: string, posTile: TilePosition ){

        if( type == enemyType.CAR ){
            this.carArray.forEach( ( car, i ) => {
                if( car.ID == _id ){
                    this.carArray[i].destroy()
                    this.carArray.splice(i, 1);
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

    public clearBoard(){
        
    }
}