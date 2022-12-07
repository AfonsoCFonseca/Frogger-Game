# Frogger-Game
Classic Frogger game using javascript and typescript

---------------------------------------------------------------
# How to Deploy
On the project terminal run: 
```
npm i;
npm run build;
node index
```
then access on your browser to: localhost:8080

To access a live version running on a server ( the server may take a few seconds to boot, before starting the game )

-> https://frogger1991.onrender.com/ <-
( also, it's a slow server )

# Structure
Created 4 main Classes:
### Map ###
The map works as a 2D array of the class Tile. This class is the main structure of the map and is where the Player moves around. The map is the base to understand if the player can move between tiles

### Tile ###
The tile is the representation of a slot in the map matrix, returns position or TilePosition ( x: 5, y: 1 )

### Player ###
The player is a simple Phaser.Sprite class that moves around with increment/decrement of 60px for the X and Y axis.
When the player detects a collision with the Car class, triggers the kill function that animates the frog death animation, resets his position the starting position and decrements 1 life
When the player detects a collision with the Platform and Turtle class, sets his speed equals to the Platform or Turtle speed. If the player reaches the boundary of the map dies.

### Enemy ###
Made an abstract class for the Enemies that extends Phaser.Sprite and got as an inheritance the class Platform and Car. The Enemy is responsible for the movement, the boundaries, deletion and communication with the class EnemyHandler
**Platform**
The Platform instances move from left to right at different speeds, these speeds are declared in an array that differs depending on the left. His getSpeed method is public, so it can set the speed of the frog when it's above the platform
**Turtle**
The Turt is similar to the Platform class but got a small loop animation for the movement and has a probability of diving back into the water for X seconds and coming back again

**Car**
The car class represents 5 types of images, where 4 images share the same sprite sheet and 1 single image for the bus. The speed of each car is mapped in an array of numbers, depending on the position of the tracks and the level that player is in.

### Enemy Handler ###
The Enemy Handler takes care of the creation of each enemy, what speed should have or what direction to take. It keeps track of the arrays of each enemy, when to push a new Enemy or delete an outdated one. 
The class controls how many enemies should be on the map and balances it between the new ones and the old ones. For each track exists a timer for spawning new cars, this timer can get a value between 500ms and 1500ms, this way is possible to make a more improvised scenario for the player to move around
When the game starts over, the enemy handler is responsible for clearing every enemy in the game and spawning new ones.


---------------------------------------------------------------
# Development
Started by developing the Map, Player and Tile class and created a relation between them, where the map contains the structure of Tiles where the Frog ( Player ) will be able to move around or predict enemies, platforms or walls.

**Enemies & generation** 
After, I started to create the Enemy, Car and EnemyHandler class. I began by setting the Car on the map, by creating it via EnemyHandler, giving him movement and reacting to the boundaries of the map.
Having that done, I focused on drawing the different cars in the different tracks, as well, as giving them different speeds depending on their position

**Deaths, GameOver & UI** 
I started to focus on completing the game loop, since the starting point to the end of the game...So, setting variables of lives or timers, resetting the game when the frog loses one life or lose the game and making the GameOver screen. To give some context I started drawing the UI, icons and time bars, to better understand what's happening.

**Platforms, Body Detection** 
Made the platforms work with the frog interactions, then made the frog detect if it's located on the riverside of the map and if it's touching a platform. If not, then calls the kill method.
Changed the frog movement from a grid-based move to an increment/decrement values on both axis, fixing the frog weird movement while above the Platforms or Turtle.

**Turtle & Goals**
The toad class is pretty similar to the Platform one, with a small animation and probability of diving for X time under the water. The animation is a 3 frame loop, I made a sprite for a single Turtle and stick them together by code, this way I draw only a single sprite of a toad, instead of drawing the same sprite animation 2 or 3 times in the same image. The diving is based on a probability of 20% of the toads spawned and a randomized timer, between 2 seconds and 7 seconds, to play an animation of diving and floating back.
Made the Goals small empty GameObjects, that when the Frog collides with them, they draw the Goal.png imagen and increments 1 of 5 goal points. When the player reaches the 5 points, the game resets the position, increments a level and the movements of the player and enemies increments, as well. Still deciding if I'm going to develop the new enemies for each level or leaving the game only with the incremental speed of the enemies for each level

**Lady Bug, Goal Insect**
Added some bonus content to the game, started for spawning randomly a goal insect, temporarily, in one of the 5 goal positions and awarding 200 points if the Player caught it. Added the Lady bug 30% chance of spawning on the first Log of the map, where every 1 second, changed position.. If caught the Player is awarded 200 points. After finishing the bonus content I finally made the score system work properly, where each jump forward represents 10 points, reaching a goal 50 points and the previous scoring related to the bonus system.
Left undone - For each level incremented the game should start spawning new enemies, like the snake or the crocodile



---------------------------------------------------------------
# Sketches & Evolution

 <p float="left">
   <img width="186" height="260" src='https://github.com/AfonsoCFonseca/Frogger-Game/blob/master/screenshots/03_08.png'>
   <img width="186" height="260" src='https://github.com/AfonsoCFonseca/Frogger-Game/blob/master/screenshots/09_08.png'>
   <img width="186" height="260" src='https://github.com/AfonsoCFonseca/Frogger-Game/blob/master/screenshots/20_08.png'>
   <img width="186" height="260" src='https://github.com/AfonsoCFonseca/Frogger-Game/blob/master/screenshots/09_09.png'>
    <img width="186" height="260" src='https://github.com/AfonsoCFonseca/Frogger-Game/blob/master/screenshots/05_10.png'>
 </p>
