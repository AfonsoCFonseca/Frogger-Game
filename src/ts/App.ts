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

  private player: Frog
  private frogInitialPosition: Position
  public enemiesGroup: Phaser.GameObjects.Group;
  private goalObjectGroup: Phaser.GameObjects.Group;
  private timePerLevel:number
  private animationDie;
  private spawnerId;

  private level = 1
  private score: number = 0
  private highScore: number = 0
  private scoreText;
  private highScoreText;

  private lives: number;
  private lifeImages = []
  public goalsScored = 0


  private menuGameOver: Phaser.GameObjects.Group;
  
  private moveKeys;
  private keyRdy = true
  
  constructor() {
    super({});
  }

  preload() {
    this.load.image('background', 'assets/background.jpeg');
    this.load.image('goal', 'assets/goal.png');
    this.load.image('froggertitle', 'assets/froggerTitle.png');
    this.load.image('GameOverScreen', 'assets/gameOverScreen.png');
    this.load.image('RetryButton', 'assets/RetryButton.png');
    this.load.image('log1', 'assets/log1.png');
    this.load.image('log2', 'assets/log2.png');
    this.load.image('log3', 'assets/log3.png');
    this.load.image('life', 'assets/life.png');
    this.load.image('bug_goal', 'assets/bug_goal.png');
    this.load.image("truck", "assets/truck.png");
    this.load.spritesheet("ladybug", "assets/ladybug.png", consts.DEFAULT_TILE_SIZE );
    this.load.spritesheet("frog", "assets/frog.png", consts.DEFAULT_TILE_SIZE );
    this.load.spritesheet("cars", "assets/cars.png", consts.DEFAULT_TILE_SIZE );
    this.load.spritesheet("death", "assets/death.png", consts.DEFAULT_TILE_SIZE );
    this.load.spritesheet("turtle", "assets/turtle.png", consts.DEFAULT_TILE_SIZE );


    consts.CANVAS.WIDTH = game.canvas.width
    consts.CANVAS.HEIGHT = game.canvas.height

    this.menuGameOver = this.add.group()

    this.frogInitialPosition = Utils.convertTileToPosition({tileX: 7, tileY: 12})
    scene = this

    this.enemiesGroup = this.add.group();
    this.goalObjectGroup = this.add.group()

    this.kill = this.kill.bind( this )
    this.float = this.float.bind( this )
    this.collision = this.collision.bind( this )
    this.reachGoal = this.reachGoal.bind( this )

  }

  create() {

    this.createMapAndGUI()

    map = new Map()
    this.player = new Frog({ x: this.frogInitialPosition.x , y: this.frogInitialPosition.y})

    this.startGame()

    this.physics.add.overlap( this.enemiesGroup, this.player, this.collision );
    this.physics.add.collider( this.goalObjectGroup, this.player, this.reachGoal );

    this.setKeys()

  }

  update() {

    this.keys();
    this.player.update()
    this.events.emit( "updateEnemy" );
    if( this.goalsScored >= 5 ){
      this.nextLevel()
    }

  }

  collision( enemy ){

    if( enemy.enemyType == "ladybug" ){
      enemy.destroy()
      this.updateScore( 200 )
    } 
      
    switch( enemy.enemyType ){
      case enemyType.CAR:
        this.kill('car')
        break;
      case enemyType.PLATFORM:
        this.player.isPlatform = true
        this.float( enemy , enemy.enemyType == enemyType.TURTLE ? true : false  )
        break;
      case enemyType.TURTLE:
          this.player.isPlatform = true
          if( this.player.idOfTouchingTurtle == null ) this.player.idOfTouchingTurtle = enemy.ID
          this.float( enemy , enemy.enemyType == enemyType.TURTLE ? true : false  )
        break;
    }

  }

  reachGoal( goal ){

      this.animationDie.stop();
      this.startTimer()
      goal.reached()
      this.player.resetToStartPosition()

  }

  public kill( reason: string | null ){
    console.log("death because: " + reason )
    this.animationDie.stop();
    this.player.death( () => {
      scene.decrementLives()
    })

  }

  private nextLevel(){

    this.goalsScored = 0;
    this.level++
    this.player.resetToStartPosition()
    map.resetGoals()

  }

  float( enemy, inverse:boolean){
    if( enemy.visible){

      if( enemy.enemyType == enemyType.TURTLE && this.player.idOfTouchingTurtle == enemy.ID )
        this.player.x += inverse ? -enemy.getSpeed() : enemy.getSpeed()

      if( enemy.enemyType == enemyType.PLATFORM ){
        this.player.x += inverse ? -enemy.getSpeed() : enemy.getSpeed()
        this.player.idOfTouchingTurtle = null
      }

    }
    else{
      this.kill( 'turtle diving')
    } 
  }

  startGame(){

    this.timePerLevel = consts.TIME_PER_LEVEL
    this.score = 0
    this.scoreText.setText(`SCORE: ${this.score}`);
    this.level = 1

    this.createLives()
    this.startTimer()
    this.menuGameOver.clear(true, true);

    if( enemyHandler ) enemyHandler.reset() 
    enemyHandler = new EnemyHandler( )
    this.spawnerId = enemyHandler.id;

    map.resetGoals()

  }

  startTimer(){
    
    let self = this,
    heightBar = 30,
    widthBar = 450,
    y = (game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + heightBar,
    x = ( game.canvas.width / 2 )

    this.add.rectangle( x,y, widthBar,heightBar, 0x156550)
    let timerRect = this.add.rectangle( x - widthBar / 2,y, 0,heightBar, 0x000000)
    
    this.animationDie = this.add.tween({
      targets: timerRect,
      width: widthBar,
      repeat: 0,
      ease: 'Linear',
      duration: this.timePerLevel,
      onComplete: () => self.kill('timer')
    });


  }

  gameOver(){
    console.log("GAME OVER")

    let self = this,
    backgroundGameOverWidth = 300,
    backgroundGameOverHeight = 400,
    backgroundGamoOverX =  (game.canvas.width / 2) - backgroundGameOverWidth/2,
    backgroundGamoOverY = (game.canvas.height / 2) - backgroundGameOverHeight/2,
    buttonWidth = 225

    let gameOverScreen = this.add.image(backgroundGamoOverX, backgroundGamoOverY, "GameOverScreen" ).setDepth(1).setOrigin(0,0)

    let scoretext1 = this.add.text( backgroundGamoOverX + 170, backgroundGamoOverY + 135, `${this.score}`, { font: 'bold 30px Geneva', color: 'white'}).setDepth(1.1)

    let highScoretext1 = this.add.text( backgroundGamoOverX + 170, backgroundGamoOverY + 190, `${this.score}`, { font: 'bold 30px Geneva', color: 'white'} ).setDepth(1.1)

    let calcX = (backgroundGameOverWidth - buttonWidth) / 2
    let btnRetry = this.add.image( backgroundGamoOverX + calcX, backgroundGamoOverY + 270, "RetryButton" ).setOrigin(0,0).setDepth(1.1)
    btnRetry.setInteractive( { useHandCursor: true  } );
    btnRetry.setInteractive( { useHandCursor: true  } );
    btnRetry.on('pointerup', () => self.startGame() )
    
    this.menuGameOver.addMultiple([gameOverScreen,highScoretext1, scoretext1, btnRetry])

  }

  setKeys(){

    this.input.keyboard.createCursorKeys();

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
    let xGap = Utils.halfScreen('x')
    for( var i = 0; i < this.lives; i++ ){
      let multip = i * LIFE_TILE_SIZE
      this.lifeImages.push( this.add.image( xGap + multip, y, 'life') )
    }

  }

  public updateScore( scoreToAdd: number ){
    this.score += scoreToAdd
    this.scoreText.setText(`SCORE: ${this.score}`);
    if( this.score > this.highScore ){
      this.highScore = this.score;
      this.highScoreText.setText(`HIGH SCORE: ${this.highScore}`);
    }
  }

  public decrementLives(){
      let currentLifeImage = this.lifeImages.pop()
      currentLifeImage.destroy()
      this.lives--

      if( this.lives == 0 ){
        this.gameOver()
      }
      else this.startTimer()
  }

  private createMapAndGUI(){
    this.add.image( Utils.halfScreen('x') , Utils.halfScreen('y'), 'background').setOrigin(0, 0);
    this.add.image( Utils.halfScreen('x') , game.canvas.height / 20, 'froggertitle').setOrigin(0, 0);

    let halfScreenX = Utils.halfScreen('x')
    let heightTimeText = (game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + 12
    this.add.text( game.canvas.width / 2 + 240, heightTimeText, "TIME" , { font: 'bold 35px Geneva', color: 'white'})

    let rectWith = 400
    let leftRectX = Utils.halfScreen('x') - rectWith
    this.add.rectangle( leftRectX, Utils.halfScreen('y') , rectWith, consts.BACKGROUND.HEIGHT, 0x000000 ).setOrigin(0,0).setDepth(1)

    let rightRectX= ( game.canvas.width / 2 + consts.BACKGROUND.WIDTH / 2)
    this.add.rectangle( rightRectX, Utils.halfScreen('y'), rectWith, consts.BACKGROUND.HEIGHT, 0x000000 ).setOrigin(0,0).setDepth(1)

    let scoreTextX = Utils.halfScreen('x') + 10,
    scoreTextY = Utils.halfScreen('y') - 40
    this.scoreText = this.add.text( scoreTextX, scoreTextY, "SCORE:",  { font: 'bold 25px Geneva', color: 'white'})
    this.scoreText.setText(`SCORE: ${this.score}`);

    this.highScoreText = this.add.text( scoreTextX + 400, scoreTextY, "HIGH SCORE:",  { font: 'bold 25px Geneva', color: 'white'})
    this.highScoreText.setText(`HIGH SCORE: ${this.highScore}`);
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
    // arcade: {
    //   debug: true,
    // },
  },
  scene: GameScene,
};

export let game = new Phaser.Game(config);
