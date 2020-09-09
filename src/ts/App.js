"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
var Frog_1 = require("./Frog");
var Map_1 = require("./Map/Map");
var utils_1 = require("./Utils/utils");
var EnemyHandler_1 = require("./Enemies/EnemyHandler");
var consts = require("./Utils/consts");
var game_interfaces_1 = require("./game.interfaces");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this, {}) || this;
        _this.level = 1;
        _this.score = 0;
        _this.lifeImages = [];
        _this.keyRdy = true;
        return _this;
    }
    GameScene.prototype.preload = function () {
        this.load.image('background', 'assets/background.png');
        this.load.image('froggertitle', 'assets/froggerTitle.png');
        this.load.image('GameOverScreen', 'assets/gameOverScreen.png');
        this.load.image('RetryButton', 'assets/RetryButton.png');
        this.load.image('log1', 'assets/log1.png');
        this.load.image('log2', 'assets/log2.png');
        this.load.image('log3', 'assets/log3.png');
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
        consts.CANVAS.WIDTH = exports.game.canvas.width;
        consts.CANVAS.HEIGHT = exports.game.canvas.height;
        this.menuGameOver = this.add.group();
        this.frogInitialPosition = utils_1.Utils.convertTileToPosition({ tileX: 7, tileY: 12 });
        exports.scene = this;
        this.enemiesGroup = this.add.group();
        this.enemiesGroup.enableBody = true;
        this.kill = this.kill.bind(this);
        this.float = this.float.bind(this);
        this.collision = this.collision.bind(this);
    };
    GameScene.prototype.create = function () {
        this.createMapAndGUI();
        this.startGame();
        exports.map = new Map_1.Map();
        this.player = new Frog_1.Frog({ x: this.frogInitialPosition.x, y: this.frogInitialPosition.y });
        this.physics.add.overlap(this.enemiesGroup, this.player, this.collision);
        this.setKeys();
    };
    GameScene.prototype.update = function () {
        this.keys();
        this.events.emit("updateEnemy");
    };
    GameScene.prototype.collision = function (enemy) {
        switch (enemy.enemyType) {
            case game_interfaces_1.enemyType.CAR:
                console.log("here");
                this.kill();
                break;
            case game_interfaces_1.enemyType.PLATFORM:
                this.float(enemy);
                break;
        }
    };
    GameScene.prototype.kill = function () {
        this.player.death(function () {
            exports.scene.decrementLives();
        });
    };
    GameScene.prototype.float = function (platform) {
        this.player.x += platform.getSpeed();
    };
    GameScene.prototype.startGame = function () {
        this.timePerLevel = consts.TIME_PER_LEVEL;
        this.score = 0;
        this.level = 1;
        this.createLives();
        this.startTimer();
        this.menuGameOver.clear(true);
        if (exports.enemyHandler)
            exports.enemyHandler.reset();
        exports.enemyHandler = new EnemyHandler_1.EnemyHandler();
    };
    GameScene.prototype.startTimer = function () {
        var self = this, heightBar = 30, widthBar = 450, y = (exports.game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + heightBar, x = (exports.game.canvas.width / 2);
        this.add.rectangle(x, y, widthBar, heightBar, 0x156550);
        var timerRect = this.add.rectangle(x - widthBar / 2, y, 0, heightBar, 0x000000);
        this.tweens.add({
            targets: timerRect,
            width: widthBar,
            repeat: 0,
            ease: 'Linear',
            duration: this.timePerLevel,
            onComplete: function () {
                console.log("here1");
                self.kill();
            }
        });
    };
    GameScene.prototype.gameOver = function () {
        console.log("GAME OVER");
        var self = this, backgroundGameOverWidth = 300, backgroundGameOverHeight = 400, backgroundGamoOverX = (exports.game.canvas.width / 2) - backgroundGameOverWidth / 2, backgroundGamoOverY = (exports.game.canvas.height / 2) - backgroundGameOverHeight / 2, buttonWidth = 225;
        var gameOverScreen = this.add.image(backgroundGamoOverX, backgroundGamoOverY, "GameOverScreen").setDepth(1).setOrigin(0, 0);
        var scoretext = this.add.text(backgroundGamoOverX + 170, backgroundGamoOverY + 135, "" + this.score, {
            fontSize: "30px",
            fill: "#FFFFFF",
        }).setDepth(1.1);
        var highScoretext = this.add.text(backgroundGamoOverX + 170, backgroundGamoOverY + 190, "" + this.score, {
            fontSize: "30px",
            fill: "#FFFFFF",
        }).setDepth(1.1);
        var calcX = (backgroundGameOverWidth - buttonWidth) / 2;
        var btnRetry = this.add.image(backgroundGamoOverX + calcX, backgroundGamoOverY + 270, "RetryButton").setOrigin(0, 0).setDepth(1.1);
        btnRetry.setInteractive({ useHandCursor: true });
        btnRetry.setInteractive({ useHandCursor: true });
        btnRetry.on('pointerdown', function () { return self.startGame(); });
        this.menuGameOver.addMultiple([gameOverScreen, highScoretext, scoretext, btnRetry]);
    };
    GameScene.prototype.setKeys = function () {
        this.input.keyboard.createCursorKeys();
        this.moveKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    };
    GameScene.prototype.keys = function () {
        var _this = this;
        window.addEventListener('keydown', function () {
            _this.time.delayedCall(consts.KEY_PRESSED_TIMER, function () {
                _this.keyRdy = true;
            }, [], _this);
            if (_this.keyRdy == true) {
                if (_this.moveKeys["left"].isDown && _this.player.getCurrentTilePosition().tileX > 0) {
                    _this.player.move(game_interfaces_1.directionEnum.WEST);
                }
                else if (_this.moveKeys["right"].isDown && _this.player.getCurrentTilePosition().tileX < consts.BACKGROUND.X_TILE_SIZE - 1) {
                    _this.player.move(game_interfaces_1.directionEnum.EAST);
                }
                else if (_this.moveKeys["up"].isDown && _this.player.getCurrentTilePosition().tileY > 0) {
                    _this.player.move(game_interfaces_1.directionEnum.NORTH);
                }
                else if (_this.moveKeys["down"].isDown && _this.player.getCurrentTilePosition().tileY < consts.BACKGROUND.Y_TILE_SIZE - 1) {
                    _this.player.move(game_interfaces_1.directionEnum.SOUTH);
                }
            }
            _this.keyRdy = false;
        }, false);
    };
    GameScene.prototype.createLives = function () {
        this.lives = 3;
        var LIFE_TILE_SIZE = 30;
        var y = (exports.game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + LIFE_TILE_SIZE;
        var xGap = utils_1.Utils.halfScreen('x');
        for (var i = 0; i < this.lives; i++) {
            var multip = i * LIFE_TILE_SIZE;
            this.lifeImages.push(this.add.image(xGap + multip, y, 'life'));
        }
    };
    GameScene.prototype.decrementLives = function () {
        var currentLifeImage = this.lifeImages.pop();
        currentLifeImage.destroy();
        this.lives--;
        if (this.lives == 0) {
            this.gameOver();
        }
        else
            this.startTimer();
    };
    GameScene.prototype.createMapAndGUI = function () {
        this.add.image(utils_1.Utils.halfScreen('x'), utils_1.Utils.halfScreen('y'), 'background').setOrigin(0, 0);
        this.add.image(utils_1.Utils.halfScreen('x'), exports.game.canvas.height / 20, 'froggertitle').setOrigin(0, 0);
        var halfScreenX = utils_1.Utils.halfScreen('x');
        var heightTimeText = (exports.game.canvas.height / 2) + (consts.BACKGROUND.HEIGHT / 2) + 12;
        this.add.text(exports.game.canvas.width / 2 + 240, heightTimeText, "TIME", { fontSize: "35px", fill: "#FFFFFF", fontFamily: 'font1' });
        var rectWith = 400;
        var leftRectX = utils_1.Utils.halfScreen('x') - rectWith;
        this.add.rectangle(leftRectX, utils_1.Utils.halfScreen('y'), rectWith, consts.BACKGROUND.HEIGHT, 0x000000).setOrigin(0, 0).setDepth(1);
        var rightRectX = (exports.game.canvas.width / 2 + consts.BACKGROUND.WIDTH / 2);
        this.add.rectangle(rightRectX, utils_1.Utils.halfScreen('y'), rectWith, consts.BACKGROUND.HEIGHT, 0x000000).setOrigin(0, 0).setDepth(1);
        var scoreTextX = utils_1.Utils.halfScreen('x') + 10, scoreTextY = utils_1.Utils.halfScreen('y') - 40;
        var scoreText = this.add.text(scoreTextX, scoreTextY, "SCORE:", { fontSize: "25px", fill: "#FFFFFF", fontFamily: 'font1' });
        scoreText.setText("SCORE: " + this.score);
        var highScoreText = this.add.text(scoreTextX + 400, scoreTextY, "HIGH SCORE:", { fontSize: "25px", fill: "#FFFFFF", fontFamily: 'font1' });
        highScoreText.setText("HIGH SCORE: " + this.score);
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
exports.config = {
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
exports.game = new Phaser.Game(exports.config);
