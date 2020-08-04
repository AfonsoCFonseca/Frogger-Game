import 'phaser'
import { Frog } from "./Frog";
import { Utils } from "./Utils/utils"
import * as consts from "./Utils/consts"

export class GameScene extends Phaser.Scene {

  constructor() {
    super({});
    
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet("frog", "assets/frog.png", {
      frameWidth: 60,
      frameHeight: 60,
    });

    consts.FROG.INITIAL_X = game.canvas.width / 2
    consts.FROG.INITIAL_Y = game.canvas.height / 2 - Utils.tileWith( -6 )

  }

  create() {
    this.add.image(game.canvas.width / 2 - ( consts.BACKGROUND.WIDTH / 2), game.canvas.height / 2  - ( consts.BACKGROUND.HEIGHT / 2), 'background').setOrigin(0, 0);

    let player = new Frog({ scene: this, x: consts.FROG.INITIAL_X , y: consts.FROG.INITIAL_Y })
  }

  update() {
    
  }

}

var config = {
  type: Phaser.AUTO,
  width: "150%",
  height: "180%",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: GameScene,
};

export let game = new Phaser.Game(config);
