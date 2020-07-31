import 'phaser'

export class GameScene extends Phaser.Scene {
  
  constructor() {
    super({});
    
  }

  preload() {
    
  }

  create() {
    
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
