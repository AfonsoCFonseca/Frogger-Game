import { Enemy } from './Enemy'
import { Car } from './Car'
import { enemyType } from '../game-interfaces/enemy.interface'
import { row } from '../game-interfaces/row.interface'

export class EnemyHandler {
    
    private carArray: Car[] = []

    constructor( ){
        this.createEnemy( enemyType.CAR, 'A' )
    }

    createEnemy( type: enemyType, row: row ): Enemy{
        switch( type ){
            case enemyType.CAR:
                let car = new Car( type, row )
                this.carArray.push(car)
                return car
        }
    }
    
}