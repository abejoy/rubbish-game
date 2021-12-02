/**
* Animation class allowing you to put in random animations
* @author Joshua Small [smalljh@aston.ac.uk]
* @version 1.0
*
* @constructor
* @param {Game} game The created game object
* @param {String} name Name of the animation
* @param {String} spriteSheet String reference of the spritesheet to use for the animation
* @param {int} spriteX Width of one image of each frame in the spritesheet
* @param {int} spriteY Height of one image of each frame in the spritesheet
* @param {int} fps The frames per second to play the animation
*/
function Animation(game, name, spritesheet, spriteX,  spriteY, fps) {

	/** @member {Phaser.Game} **/
	this.game = game.world;
	/** @member {String} **/
	this.name = name;
	/** @member {int} **/
	this.fps = fps;
	/** @member {Phaser.Group} **/
	this.group;
	
	//load in the spritesheet
	this.game.load.spritesheet(this.name, spritesheet, spriteX, spriteY);
	
   /**
   * Create the animations and load them into memory
   */
	this.createAnimation = function() {
	
		//create a group to store the animations, this aids performance
		this.group = game.world.add.group();
		//create multiple to store in memory, helps when many are used at once
		this.group.createMultiple(30, this.name);
		//call the setupAnimation on each one
		this.group.forEach(this.setupAnimation, this);
	
	}
	
	/**
	* Play the animation
	*
	* @param {int} x the x position to place the animation
	* @param {int} y the y position to place the animation
	* @param {boolean} loop if the animation should loop endlessly
	*
	* @return {Phaser.Animation} The animation
	*/
	this.playAnimation = function(x, y, loop) {		
	
		//get an animation from the group
		var an = this.group.getFirstExists(false);
		//set its position
		an.reset(x, y);
		//play the animation
		an.play(this.name, this.fps, loop, true);
		
		return an;
	
	} 

	/**
	* Set up the animation
	*/
	this.setupAnimation = function (invader) {

		invader.anchor.x = 0.5;
		invader.anchor.y = 0.5;
		invader.animations.add(this.name);

	}


}

