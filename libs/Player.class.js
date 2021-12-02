/**
* Player class which is used to create the main player
* @author Joshua Small [smalljh@aston.ac.uk]
* @version 1.0
*
* @constructor
* @param {int} startX The x coordinate of the start position of the player
* @param {int} startY The y coordinate of the start position of the player
* @param {Game} game The created game object
* @param {String} spriteSheet String reference of the spritesheet to use for the player
* @param {int} spriteX Width of one image of the character in the spritesheet @see blahh
* @param {int} spriteY Height of one image of the character in the spritesheet @see blahh
*/
function Player(startX, startY, game, spriteSheet, spriteX, spriteY) {
	/** @member {int} */
	this.startX = startX;
	/** @member {int} */	
	this.startY = startY;
	/** @member {int} */
	this.spriteX = spriteX;
	/** @member {int} */	
	this.spriteY = spriteY;
	/** @member {String} */
	this.playerImage;
	/** @member {int} */	
	this.stillFrame = 0;
	/** @member {Phaser.Sprite} */
	this.character;
	/** @member {Game} */
	this.game = game;
	/** @member {Phaser.Game} */
	this.world = game.world;	

	/**
	* Load in a new spritesheet, this is called by default when the object is created
	*
	* @param {String} spriteSheet String reference of the spritesheet to use for the player
	* @param {int} spriteX Width of one image of the character in the spritesheet @see blahh
	* @param {int} spriteY Height of one image of the character in the spritesheet @see blahh
	*/
	this.loadSpriteSheet = function(spriteSheet, spriteX, spriteY) {
	
		this.world.load.spritesheet('player', spriteSheet, spriteX, spriteY);

	}
	
	/**
	* Actually create the spritesheet, is seperate from {@link loadSpriteSheet}
	* as it needs to be done in the create function
	*/	
	this.createSprite = function() {

		this.character = this.world.add.sprite(this.startX, this.startY, 'player');
		this.character.anchor.setTo(0.5, 0.5);
		
		this.world.physics.enable(this.character, Phaser.Physics.ARCADE);
		
		this.character.body.collideWorldBounds = true;
		
		this.character.body.gravity.y = 0;

	}

	this.setScale = function(x, y) {
		this.character.scale.setTo(x,y);
	}

	/**
	* Move the player along the x axis
	*
	* @param {int} x The amount to move the player, 
	* a positive value moves the player to the right 
	* and a negative value moves them to the left
	*/
	this.moveX = function(x) {

		this.character.body.x +=x;

	}
	
	/**
	* Move the player along the y axis
	*
	* @param {int} y The amount to move the player, 
	* a positive value moves the player down the axis 
	* and a negative value moves them up the axis
	*/
	this.moveY = function(y) {

		this.character.body.velocity.y += y;

	}
	
	/**
	* Add an animation to the player
	*	
	* @param {String} name The name of an animation, required for referencing later.
	* @param {int[]} frames An array of the frames thae animation playes in the order that they are played
	* @param {int} fps The frame rate of the animetion, higher plays the animation faster
	*/
	this.addAnimation = function(name, frames, fps) {
	
		this.character.animations.add(name, frames, fps, true);
	
	}
	
	/**
	* Plays a predefined animation
	*
	* @param {String} name The name of the animation to play, 
	* this animation must have been created with {@link Player#addAnimation} beforehand
	*/
	this.playAnimation = function(name) {
	
		this.character.animations.play(name);
	
	}
	
	/**
	* Stops the animation that is currently being played 
	* and shows the stop frame for the character.
	*/
	this.stop = function() {
	
		this.character.animations.stop();
		this.character.frame = this.stillFrame;
	
	}
	
	/**
	* Sets the stop frame for the player, 
	* this is the frame that is shown when the player is stopped
	*
	* @param {int} frame The number of the frame to be set as the stop frame
	*/
	this.setStopFrame = function(frame) {
	
		this.stillFrame = frame;
	
	}
	
	/**
	* Sets if the player should collide with the edge of the world
	*
	* @param {boolean} collide true or false value denoting whether 
	* the player should collide with the edge. If true the player will 
	* collide with the world edge, if false they will not.
	*/
	this.collideWorldBounds = function(collide) {
	
		this.character.body.collideWorldBounds = collide;
	
	}
	
	/**
	* Sets the strength of gravity on the player, if 0 is given then 
	* gravity does not affect the player
	*
	* @param {int} gravity value of strength on the player
	*/
	this.setGravity = function(gravity) {
	
		this.character.body.gravity.y = gravity;
	
	}
	
	/**
	* Tells you whether the player is touching the ground or not
	*
	* @return {boolean} If the player is touching the ground
	*/
	this.onGround = function() {
	
		//The first part of this statement only returns true if the player is on an already defined collision
		//platform as defined by Platform.checkCollision so the second part checks if the player is touching the
		//bottom of the canvas, this will only work if the collideWorldBounds is set to true (it is by default)
		return (this.character.body.touching.down || this.getY() == (this.game.gameHeight() - this.spriteY) )
	
	}
	
	/**
	* Tells you the players x coordinate position
	*
	* @return {int} x coordinate of the player
	*/
	this.getX = function() {
		
		return this.character.x;	
	
	}
	
	/**
	* Tells you the players y coordinate position
	*
	* @return {int} y coordinate of the player
	*/
	this.getY = function() {
		
		return this.character.y;	
	
	}
	
	/**
	* Allows you to specifically set the x coordinate of the player
	*
	* @param {int} x The x coordinate to set the player
	*/
	this.setX = function(x) {
	
		this.character.x = x;
		
	}
	
	/**
	* Allows you to specifically set the y coordinate of the player
	*
	* @param {int} y The y coordinate to set the player
	*/
	this.setY = function(y) {
	
		this.character.y = y;
		
	}
	
	//automatically load in the spritesheet
	this.loadSpriteSheet(spriteSheet, spriteX, spriteY);
  
  
};
