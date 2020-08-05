import { Position } from "./game-interfaces/position.interface";
import { TilePosition } from "./game-interfaces/tilePosition.inteface";
import { Utils } from "./Utils/utils"

export class Tile {

    currentPosition: Position
    currentTilePosition: TilePosition

    constructor( { tileX, tileY }: TilePosition ){
        this.currentTilePosition = { tileX, tileY }
        this.currentPosition = Utils.convertTileToPosition( this.currentTilePosition )
    }
}