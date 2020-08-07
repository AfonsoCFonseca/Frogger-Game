import * as consts from "./Utils/consts"
import { Utils } from "./Utils/utils"
import { directionEnum } from "./game-interfaces/directions.interface";
import { Position } from "./game-interfaces/position.interface";
import { map } from "./App";
import { TilePosition } from "./game-interfaces/tilePosition.inteface";

export class Frog extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, "frog");
        config.scene.add.existing(this).setOrigin( 0,0 )
    }

    public getCurrentPosition(): Position {
        return {
            x: this.x,
            y: this.y
        }
    }

    public getCurrentTile() {
        let tilePosition = Utils.convertPositionToTile( this.getCurrentPosition() ) 
        return map.getTile( tilePosition )
    }
    
    public move( direction: directionEnum ){

        let tilePosition = Utils.convertPositionToTile({ x: this.x, y: this.y })

        switch( direction ){
            case directionEnum.EAST:
                tilePosition.tileX++
                this.x = Utils.convertTileToPosition( tilePosition ).x
            break;
            case directionEnum.WEST:
                tilePosition.tileX--
                this.x = Utils.convertTileToPosition( tilePosition ).x
            break;
            case directionEnum.SOUTH:
                tilePosition.tileY++
                this.y = Utils.convertTileToPosition( tilePosition ).y
                break;
            case directionEnum.NORTH:
                tilePosition.tileY--
                this.y = Utils.convertTileToPosition( tilePosition ).y
            break;
        }

    }
}