import { enemyType } from '../game-interfaces/enemy.interface'
import { row } from '../game-interfaces/row.interface'
import { Enemy } from './Enemy';
import { Utils } from '../Utils/utils';

export class Car extends Enemy{

    private row: row
    
    constructor( type: enemyType, row: row){
        super( type, {x: 100, y: 100 } )
        this.row = row
    }

    public getRow(): row{
        return this.row
    }
    
}