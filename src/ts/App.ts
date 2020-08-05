import 'phaser'
import { Frog } from "./Frog";
import { Map } from "./Map/Map";
import { Utils } from "./Utils/utils"
import * as consts from "./Utils/consts"
import { directionEnum } from "./game-interfaces/directions.interface"

export class GameScene extends Phaser.Scene {

  private cursors
  private player: Frog
  private map: Map

  constructor() {
    super({});

  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet("frog", "assets/frog.png", {
      frameWidth: 60,
      frameHeight: 60,
    });


    consts.CANVAS.WIDTH = game.canvas.width
    consts.CANVAS.HEIGHT = game.canvas.height

    consts.FROG.INITIAL_X = game.canvas.width / 2
    consts.FROG.INITIAL_Y = game.canvas.height / 2 - Utils.tileWith( -6 )

  }

  create() {
    this.add.image(game.canvas.width / 2 - ( consts.BACKGROUND.WIDTH / 2), game.canvas.height / 2  - ( consts.BACKGROUND.HEIGHT / 2), 'background').setOrigin(0, 0);

    this.map = new Map()
    this.player = new Frog({ scene: this, x: consts.FROG.INITIAL_X , y: consts.FROG.INITIAL_Y })

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.keys();
  }

  keys() {
    if (this.cursors.left.isDown) 
      this.player.move( directionEnum.WEST )
    else if (this.cursors.right.isDown)
      this.player.move( directionEnum.EAST )
    else if (this.cursors.up.isDown)
      this.player.move( directionEnum.NORTH )
    else if (this.cursors.down.isDown)
      this.player.move( directionEnum.SOUTH )
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
