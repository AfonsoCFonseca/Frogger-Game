import * as consts from "./consts"

export class Utils {

    public static tileWith( pos: number ): number{
        return pos * consts.TILE_SIZE 
    }
}