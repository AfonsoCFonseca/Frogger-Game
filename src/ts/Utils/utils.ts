import * as consts from "./consts"
import { TilePosition, Position } from "../game.interfaces";

export class Utils {

    public static halfScreen = ( axis: 'x' | 'y', edge: boolean | null = null ): number => { 
        if( axis == 'x' ) return !edge ? (consts.CANVAS.WIDTH / 2) - (consts.BACKGROUND.WIDTH / 2) : (consts.CANVAS.WIDTH / 2) + (consts.BACKGROUND.WIDTH / 2)
        else return !edge ? (consts.CANVAS.HEIGHT / 2) - (consts.BACKGROUND.HEIGHT / 2) : (consts.CANVAS.HEIGHT / 2) + (consts.BACKGROUND.HEIGHT / 2)
    }

    public static convertTileToPosition( pos: TilePosition ):Position{

        let newPos = {
            x: (pos.tileX * consts.TILE_SIZE),
            y: (pos.tileY * consts.TILE_SIZE),
        }

        newPos.x += this.halfScreen('x')
        newPos.y += this.halfScreen('y')
        
        return {
            x: newPos.x,
            y: newPos.y
        }
    }

    public static convertPositionToTile( pos: Position ): TilePosition{
        let currentXPosition =  pos.x - ( this.halfScreen('x') )
        let currentYPosition =  pos.y - ( this.halfScreen('y') )

        return {
            tileX: Math.floor( currentXPosition / consts.TILE_SIZE ),  
            tileY: Math.floor( currentYPosition / consts.TILE_SIZE )
        }
    }

    public static generateId(): string {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    public static rndNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }


}