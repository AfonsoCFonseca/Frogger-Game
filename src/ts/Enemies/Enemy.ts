import { enemyType } from '../game-interfaces/enemy.interface'
import { Utils } from '../Utils/utils'
import { game, scene } from '../App'

export abstract class Enemy extends Phaser.GameObjects.Sprite{

    private enemyType: enemyType
    protected ID: string 

    constructor( type: enemyType, config ){
        super( scene, config.x, config.y, "cars");
        this.enemyType = type
        this.ID = Utils.generateId() 
    }

}