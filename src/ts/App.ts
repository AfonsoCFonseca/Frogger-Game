import 'phaser'
import { Frog } from "./Frog";
import { Map } from "./Map/Map";
import { Utils } from "./Utils/utils"
import { EnemyHandler } from "./Enemies/EnemyHandler"
import * as consts from "./Utils/consts"
import { directionEnum, enemyType, Position } from "./game.interfaces"

export let map: Map
export let scene;
export let enemyHandler: EnemyHandler

export class GameScene extends Phaser.Scene {

  private cursors
  private player: Frog
  private frogInitialPosition: Position
  private level: number
  private enemyGroup
  private timePerLevel:number

  private lives: number;
  private lifeImages = []

  private timerRect;
  
  private moveKeys;
  private keyRdy = true
  
  constructor() {
    super({});
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('froggertitle', 'assets/froggerTitle.png');
    this.load.image('life', 'assets/life.png');
    this.load.spritesheet("frog", "assets/frog.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.spritesheet("cars", "assets/cars.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.spritesheet("death", "assets/death.png", {
      frameWidth: 60,
      frameHeight: 60,
    });

    this.load.image("truck", "assets/truck.png");

    consts.CANVAS.WIDTH = game.canvas.width
    consts.CANVAS.HEIGHT = game.canvas.height

    this.frogInitialPosition = Utils.convertTileToPosition({tileX: 7, tileY: 12})
    this.level = 1
    scene = this

    this.enemyGroup = this.add.group();
    this.enemyGroup.enableBody = true;

    this.kill = this.kill.bind( this )
  }

  create() {
    this.add.image(game.canvas.width / 2 - ( consts.BACKGROUND.WIDTH / 2), game.canvas.height / 2  - ( consts.BACKGROUND.HEIGHT / 2), 'background').setOrigin(0, 0);
    this.add.image(game.canvas.width / 2 - ( consts.BACKGROUND.WIDTH / 2), game.canvas.height / 10, 'froggertitle').setOrigin(0, 0);

    let heightTimeText = (game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + 12
    let timeText = this.add.text( game.canvas.width / 2 + 240, heightTimeText, "TIME" )
    timeText.setFontSize(35);

    this.timePerLevel = consts.TIME_PER_LEVEL

    this.createLives()
    this.startTimer()


    map = new Map()
    this.player = new Frog({ x: this.frogInitialPosition.x , y: this.frogInitialPosition.y})

    this.physics.add.overlap(this.player, this.enemyGroup, this.kill );

    this.setKeys()
    enemyHandler = new EnemyHandler( )

  }

  update() {

    this.keys();
    this.updateTimer()
    this.events.emit( "updateEnemy" );

  }

  kill(){
    this.player.death()
  }

  startTimer(){

    let heightBar = 30,
    widthBar = 450,
    y = (game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + heightBar,
    x = ( game.canvas.width / 2 )

    this.add.rectangle( x,y, widthBar,heightBar, 0x156550)
    let timerRect = this.add.rectangle( x - widthBar / 2,y, 0,heightBar, 0x000000)

    this.tweens.add({
      targets: timerRect,
      width: widthBar,
      repeat: -1,
      ease: 'Linear',
      duration: this.timePerLevel,
    });

  }

  updateTimer(){

    //this.timerRect.scaleX = 3

  }

  gameOver(){
    console.log("GAME OVER")
  }

  startOver(){

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

  createLives(){

    this.lives = 3
    let LIFE_TILE_SIZE = 30
    let y = (game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + LIFE_TILE_SIZE
    let xGap = ( game.canvas.width / 2 ) - (consts.BACKGROUND.WIDTH / 2)
    for( var i = 0; i < this.lives; i++ ){
      let multip = i * LIFE_TILE_SIZE
      this.lifeImages.push( this.add.image( xGap + multip, y, 'life') )
    }

  }

  public decrementLives(){
      let currentLifeImage = this.lifeImages.pop()
      currentLifeImage.destroy()
      this.lives--

      if( this.lives == 0 ){
        this.gameOver()
      }
  }

}

export var config = {
  type: Phaser.AUTO,
  width: '150%',
  height: "150%",
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
