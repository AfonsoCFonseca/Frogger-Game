import { Enemy } from './Enemy'
import { Car } from './Car'
import { enemyType, row, TilePosition, directionEnum } from '../game.interfaces'
import * as consts from "../Utils/consts"
import { Utils } from '../Utils/utils'
import { Tilemaps } from 'phaser'

export class EnemyHandler {
    
    private carArray: Car[] = []
    private MAX_ROWS = 5

    constructor( ){
        this.generateEnemies()
    }

    generateEnemies(){
        for( var i = 0; i < this.MAX_ROWS; i++ ){
            let tileX = Utils.rndNumber( consts.BACKGROUND.X_TILE_SIZE )
            let tilePosition = { tileX, tileY: i + 7 }
            this.createEnemy( enemyType.CAR, tilePosition )
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
    
    public deleteEnemy( type: enemyType, _id: string ){
        if( type == enemyType.CAR ){
            for( var x in this.carArray ){
                if( this.carArray[x].ID == _id )
                    delete this.carArray[x]
            }
        }
    }
}