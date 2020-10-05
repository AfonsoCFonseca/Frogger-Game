import { Enemy } from './Enemy'
import { Car } from './Car'
import { Platform } from './Platform'
import { Turtle } from './Turtle'
import { enemyType, row, TilePosition, directionEnum } from '../game.interfaces'
import * as consts from "../Utils/consts"
import { Utils } from '../Utils/utils'
import { Tilemaps } from 'phaser'
import { scene } from '../App' 

export class EnemyHandler {
    
    private carArray: Car[] = []
    private platformArray: Platform[] = []
    private turtleArray: Turtle[] = []
    private MAX_ROWS = 5
    public intervalCreator = null;
    public id = Utils.generateId()

    constructor( ){
        this.generateStartingEnemies()

        this.intervalCreator = setInterval( () => this.enemyCreator() , 3000);
        this.enemyCreator()

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
            else if( i == 1 || i == 4 ){
                let counter = i == 4 ? 2 : 3
                for( var j = 0; j < counter; j++ ){
                    let tilePlatformPosition = { tileX: tileX-j, tileY: i + 1 }
                    this.createEnemy( enemyType.TURTLE, tilePlatformPosition )
                }
            }
        }

    }

    enemyCreator(){

        for( var i = 0; i < this.MAX_ROWS; i++ ){
            let tileX = Utils.rndNumber( 0, consts.BACKGROUND.X_TILE_SIZE )
            let posTile = { tileX, tileY: i + 7 }

            posTile.tileX = posTile.tileY % 2 == 0 ? 0 : consts.BACKGROUND.X_TILE_SIZE
            this.requestAnotherEnemy( enemyType.CAR, posTile )
            if( i == 0 || i == 2 || i == 3 ){
                posTile = { tileY: i + 1, tileX: -2 }
                this.requestAnotherEnemy( enemyType.PLATFORM, posTile )
            }
            else if( i == 1 || i == 4 ){
                let counter = i == 4 ? 2 : 3
                let posTileArr = []
                for( var j = 0; j < counter; j++ ){
                    posTileArr.push( { tileX: 16 - j, tileY: i + 1 } )
                }
                let rndDiver = Math.floor( Utils.rndNumber(1,10) );
                let isDiver = rndDiver > 6 ? true : false
                this.requestAnotherEnemy( enemyType.TURTLE, posTileArr, isDiver )
            }
        }

    }

    createEnemy( type: enemyType, posTile: TilePosition, isDiver: boolean = false): Enemy {

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
                this.platformArray.push( platform )
                return platform
            case enemyType.TURTLE: 
                direction = directionEnum.WEST
                let turtle = new Turtle( posTile, direction, isDiver)
                this.turtleArray.push( turtle );
        }

    }
    
    public deleteEnemy( type: enemyType, _id: string ){

        let currentArray;
        
        switch( type ){
            case enemyType.CAR: 
                currentArray = this.carArray
                break;
            case enemyType.PLATFORM:
                currentArray = this.platformArray
                break;
            case enemyType.TURTLE:
                currentArray = this.turtleArray
                break;
            default:
                console.log( "no type selected")
        }

        currentArray.forEach( ( enemy, i ) => {

            if( enemy.ID == _id ){
                currentArray.slice(i, 1);
            }

        })
        
    }

    private requestAnotherEnemy( type: enemyType, posTile: TilePosition | TilePosition[], isDiver: boolean = false): void {
        let timer = Utils.rndNumber( consts.CAR.MIN_INTERVAL_CAR, consts.CAR.MAX_INTERVAL_CAR )
        if( type == enemyType.PLATFORM ) timer = Utils.rndNumber( consts.CAR.MIN_INTERVAL_CAR + 200, consts.CAR.MAX_INTERVAL_CAR )

        scene.time.delayedCall( timer, () => {
            if( this.id == scene.spawnerId ){
                if( Array.isArray( posTile ) ){
                    posTile.forEach( tile => this.createEnemy( type, tile, isDiver) );
                }
                else return this.createEnemy( type, posTile as TilePosition)
            }
        }, [], this);

    }

    public reset(){
        clearInterval( this.intervalCreator );
        this.clearBoard()
    }

    private clearBoard(){

        let childrens = scene.enemiesGroup.getChildren().filter(e => e.enemyType === "ladybug")
        childrens.forEach( child => child.destroy() ) 

        this.platformArray.forEach( plat => plat.delete() )
        this.carArray.forEach( car =>  car.delete() )

    }
}