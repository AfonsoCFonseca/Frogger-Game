# Frogger-Game
Classic Frogger game using javascript and typescript

---------------------------------------------------------------
# Structure
Created 4 main Classes:
### Map ###
The map works as a 2D array of the class Tile. This class is the main structure of the map and is where the Player moves around. The map is the base to understand if the player can move between tiles

### Tile ###
The tile is the representation of a slot in the map matrix, returns position or TilePosition ( x: 5, y: 1 )

### Player ###
The player is a simple Phaser.Sprite class that moves around on the Tiles of Map class, can move in X and Y axis

### Enemy ###
Made an abstract class for the Enemies that extends Phaser.Sprite and got as an inheritance the class Platform and Car. The Enemy is responsible for the movement, the boundaries, deletion and communication with the class EnemyHandler
**Platform**

**Car**

### Enemy Handler ###
The Enemy Handler takes care of the creation of each enemy, what speed should have or what direction to take. It keeps track of the arrays of each enemy, when to push a new Enemy or delete an outdated one. 
The class controls how many enemies should be on the map and balances it between the new ones and the old ones


---------------------------------------------------------------
# Development
Started by developing the Map, Player and Tile class and created a relation between them, where the map contains the structure of Tiles where the Frog ( Player ) will be able to move around or predict enemies, platforms or walls.

** Enemies & generation ** 
After, I started to create the Enemy, Car and EnemyHandler class. I began by setting the Car on the map, by creating it via EnemyHandler, giving him movement and reacting to the boundaries of the map.

---------------------------------------------------------------
# Scratches & Evolution

 <p float="left">
  <img width="186" height="260" src='https://github.com/AfonsoCFonseca/Frogger-Game/blob/master/screenshots/03_08.png'>
   <img width="186" height="260" src='https://github.com/AfonsoCFonseca/Frogger-Game/blob/master/screenshots/20_09_08.png'>
 </p>
