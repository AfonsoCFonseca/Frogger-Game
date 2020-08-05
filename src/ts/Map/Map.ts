import { Tile } from "../Tile";
import * as consts from "../Utils/consts"

export class Map {

    private map;

    constructor(){
        this.map = this.createMap()  
    }

    createMap(): Tile[][]{
        let newMap = []

        for( let i = 0; i < consts.BACKGROUND.X_TILE_SIZE; i++ ){
            newMap[i] = []
            for( let j = 0; j < consts.BACKGROUND.Y_TILE_SIZE; j++ ){
                newMap[i][j] = new Tile({tileX: i, tileY: j})
            }
        }

        return newMap
    }

    public getMap(){
        return this.map
    }

}