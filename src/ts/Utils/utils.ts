import * as consts from "./consts"
import { TilePosition } from "../game-interfaces/tilePosition.inteface"
import { Position } from "../game-interfaces/position.interface"

export class Utils {

    public static convertTileToPosition( pos: TilePosition ):Position{

        let newPos = {
            x: (pos.tileX * consts.TILE_SIZE),
            y: (pos.tileY * consts.TILE_SIZE),
        }

        newPos.x += (consts.CANVAS.WIDTH / 2) - (consts.BACKGROUND.WIDTH / 2)
        newPos.y += (consts.CANVAS.HEIGHT / 2) - (consts.BACKGROUND.HEIGHT / 2)
        
        return {
            x: newPos.x,
            y: newPos.y
        }
    }

    public static convertPositionToTile( pos: Position ): TilePosition{
        let currentXPosition =  pos.x - ((consts.CANVAS.WIDTH / 2) - (consts.BACKGROUND.WIDTH / 2))
        let currentYPosition =  pos.y - ((consts.CANVAS.HEIGHT / 2) - (consts.BACKGROUND.HEIGHT / 2))

        return {
            tileX: Math.floor( currentXPosition / consts.TILE_SIZE ),  
            tileY: Math.floor( currentYPosition / consts.TILE_SIZE )
        }
    }

    public static generateId():string {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}