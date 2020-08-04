import * as consts from "./Utils/consts"
import { Utils } from "./Utils/utils"

export class Frog extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, "frog");
        config.scene.add.existing(this);
    }
    
}