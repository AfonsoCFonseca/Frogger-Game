import 'phaser'
import { Frog } from "./Frog";
import { Map } from "./Map/Map";
import { Utils } from "./Utils/utils"
import * as consts from "./Utils/consts"
import { directionEnum } from "./game-interfaces/directions.interface"

export let scene: GameScene
export let map: Map

export class GameScene extends Phaser.Scene {

  private cursors
  private player: Frog
  private frogInitialPosition
  
  private moveKeys;
  private keyRdy = true
  

  constructor() {
    super({});
    scene = this

  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet("frog", "assets/frog.png", {
      frameWidth: 60,
      frameHeight: 60,
    });

    consts.CANVAS.WIDTH = game.canvas.width
    consts.CANVAS.HEIGHT = game.canvas.height

    this.frogInitialPosition = Utils.convertTileToPosition({tileX: 7, tileY: 12})
  }

  create() {
    this.add.image(game.canvas.width / 2 - ( consts.BACKGROUND.WIDTH / 2), game.canvas.height / 2  - ( consts.BACKGROUND.HEIGHT / 2), 'background').setOrigin(0, 0);

    map = new Map()
    this.player = new Frog({ scene: this, x: this.frogInitialPosition.x , y: this.frogInitialPosition.y})

    this.setKeys()
  }

  update() {

    this.keys();

  }

  setKeys(){

    this.cursors = this.input.keyboard.createCursorKeys();

    this.moveKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

  }

  keys() {

    window.addEventListener('keydown', () => {

      this.time.delayedCall(consts.KEY_PRESSED_TIMER, () => {
        this.keyRdy = true
      }, [], this);

      if( this.keyRdy == true ){
        if (this.moveKeys["left"].isDown && this.player.getCurrentTilePosition().tileX > 0 ){
          this.player.move( directionEnum.WEST )
        }
        else if(this.moveKeys["right"].isDown && this.player.getCurrentTilePosition().tileX < consts.BACKGROUND.X_TILE_SIZE - 1){
          this.player.move( directionEnum.EAST )
        }
        else if(this.moveKeys["up"].isDown && this.player.getCurrentTilePosition().tileY > 0){
          this.player.move( directionEnum.NORTH )
        }
        else if(this.moveKeys["down"].isDown && this.player.getCurrentTilePosition().tileY < consts.BACKGROUND.Y_TILE_SIZE - 1){
          this.player.move( directionEnum.SOUTH )
        }
      }

      this.keyRdy = false

    }, false);


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
