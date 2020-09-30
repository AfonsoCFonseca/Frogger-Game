import { Tile } from "../Tile";
import * as consts from "../Utils/consts"
import { TilePosition } from "../game.interfaces";
import { scene, game } from "../App";
import { Utils } from "../Utils/utils";

export class Map {

    private map;
    private goals: GoalObj[] = []
    private goalsPoisition = [
        { 
            x: Utils.halfScreen('x') + 55, 
            y: Utils.halfScreen('y') + 30
        },
        { 
            x: Utils.halfScreen('x') + 235, 
            y: Utils.halfScreen('y') + 30
        },
        { 
            x: Utils.halfScreen('x') + 415, 
            y: Utils.halfScreen('y') + 30
        },
        { 
            x: Utils.halfScreen('x') + 593, 
            y: Utils.halfScreen('y') + 30
        },
        { 
            x: Utils.halfScreen('x') + 770, 
            y: Utils.halfScreen('y') + 30
        },
    ]

    constructor(){
        this.map = this.createMap()  

        this.createGoals()
        this.spawnRandomBugGoals()
    }

    createGoals(){
        this.goalsPoisition.map( ( goal, i ) => {
            let goalObj = new GoalObj(scene, goal.x, goal.y )
            scene.physics.add.existing( goalObj );
            scene.goalObjectGroup.add( goalObj )
            this.goals.push( goalObj )
        })
    }

    resetGoals(){
        this.goals.map( goal => goal.reset() )
    }

    spawnRandomBugGoals(){
        
        let generateTimer = Utils.rndNumber(consts.BUG_GOAL_INTERVAL_MIN, consts.BUG_GOAL_INTERVAL_MAX)
        setTimeout( () => {
            let bugGoalPosition: number
            do{
                bugGoalPosition = Math.round( Utils.rndNumber(0, 4) )
            }
            while( this.isGoalAvailable( bugGoalPosition ) )

            console.log( this.goals[bugGoalPosition ] )
            this.goals[bugGoalPosition].extraBonus()
            this.spawnRandomBugGoals()
            
        }, generateTimer )
    }

    isGoalAvailable( bugGoalPosition ){
        return this.goals[bugGoalPosition ].type == "completed" || this.goals[bugGoalPosition ].type == "bonus"
    }

    createMap(): Tile[][]{
        let newMap = []

        for( let i = 0; i < consts.BACKGROUND.X_TILE_SIZE ; i++ ){
            newMap[i] = []
            for( let j = 0; j < consts.BACKGROUND.Y_TILE_SIZE; j++ ){
                newMap[i][j] = new Tile({tileX: i, tileY: j})
            }
        }

        return newMap
    }

    public getMap(){
        return this.map
    }

    public getTile({ tileX, tileY}: TilePosition ):Tile{
        return this.map[tileX][tileY]
    }

}

class GoalObj extends Phaser.GameObjects.Image {
    public type: "empty" | "bonus" | "completed"

    constructor(scene, x, y){
        super(scene, x, y, 'goal');
        scene.add.existing(this).setDepth(2)
        this.visible = false
        this.type = "empty"
        
        this.setSize(20,20)

    }

    reached(){
        scene.updateScore( this.type == "bonus" ? 200 : 50 )
        this.setTexture('goal')
        this.type = "completed";
        this.visible = true;
        scene.goalsScored++;
    }

    reset(){
        this.type = "empty";
        this.visible = false
    }

    public extraBonus(){
        this.type = "bonus";
        this.visible = true;
        this.setTexture('bug_goal')
        setTimeout( () => {
            if( this.type != "completed" ) this.reset()
        }, consts.BUG_GOAL_TIMER )
    }

}