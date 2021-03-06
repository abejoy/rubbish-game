/**
* Enemy class which is at the core of the project
* @author Joshua Small [smalljh@aston.ac.uk]
* @version 1.0
*
* @constructor
* @param {Game} game The created game object
* @param {String} name Name of the enemy
* @param {String} spriteSheet String reference of the spritesheet to use for the animation
* @param {int} spriteX Width of one image of each frame in the spritesheet
* @param {int} spriteY Height of one image of each frame in the spritesheet
*/
function Enemy(game, name, spriteSheet, spriteX, spriteY){
	/** @member {Phaser.Game} */
	this.game = game.world;
	/** @member {Phaser.Group} */
	this.group = this.game.add.group(null, '', true, false, 0);
	/** @member {Array} */
	this.children = new Array();
	/** @member {String} */
	this.name = name;
	/** @member {String} */
	this.spriteSheet = spriteSheet;
	/** @member {int} */
	this.spriteX = spriteX;
	/** @member {int} */
	this.spriteY = spriteY;

	//load in the image
	this.game.load.spritesheet(this.name, this.spriteSheet, this.spriteX, this.spriteY);


	/**
	* Create an enemy at a given position
	* 
	* @param {String} name The name of an animation, required for referencing later.
	* @param {int[]} frames An array of the frames thae animation playes in the order that they are played
	* @param {int} fps The frame rate of the animetion, higher plays the animation faster
	*/
	this.createEnemySpriteSheet = function(x, y) {
	  
	  //add the enemy to the group
	  var enemy = this.group.create(x, y, this.name);
	  //add the new enemy into the arroay 
	  this.children.push(enemy);
		    
	  //set the anchor of the enemy to its centre?	
	  enemy.anchor.setTo(0.5, 0.5);
	  //Set physics on the enemy
	  this.game.physics.enable(enemy, Phaser.Physics.ARCADE);       

	}

	/**
	* Add an animation to a specific enemy, for all enemies @see addAnimationToAll
	* 
	* @param {String} name The name of an animation, required for referencing later.
	* @param {int[]} frames An array of the frames thae animation playes in the order that they are played
	* @param {int} fps The frame rate of the animetion, higher plays the animation faster
	* @param {int} index the specific enemy to add the animation to
	*/
	this.addAnimation = function(name, frames, fps, index) {

		this.children[index].animations.add(name, frames, fps, true);

	}
	
	/**
	* Add an animation to all enemies 
	* 
	* @param {String} name The name of an animation, required for referencing later.
	* @param {int[]} frames An array of the frames thae animation playes in the order that they are played
	* @param {int} fps The frame rate of the animetion, higher plays the animation faster
	*/
	this.addAnimationToAll = function(name, frames, fps) {

		//go through each enemy in the array and add an animation to it
		for(var i = 0; i < this.children.length; i++)
		  this.addAnimation(name, frames, fps, i);

	}

	/**
	* Plays a predefined animation
	*
	* @param {String} name The name of the animation to play, 
	* this animation must have been created with {@link Player#addAnimation} beforehand
	*/
	this.playAnimation = function(name, index) {

		this.children[index].animations.play(name);

	}

	/**
	* Plays a predefined animation
	*
	* @param {String} name The name of the animation to play, 
	* this animation must have been created with {@link Player#addAnimation} beforehand
	*/
	this.playAnimationOnAll = function(name) {

		for(var i = 0; i < this.children.length; i++)
	  		this.playAnimation(name, i);

	}

	/**
	* Get the Left X coordinate of the whole group
	* Allows you to find how far over the group is
	*
	* @return {int} The left x coordinate of the group
	*/
	this.getGroupLeftX = function() {

		var x = this.group.x;
		
		var halfWidth = this.spriteX /2;

		return x - halfWidth;

	}

	/**
	* Get the Right X coordinate of the whole group
	* Allows you to find how far over the group is
	*
	* @return {int} The right x coordinate of the group
	*/
	this.getGroupRightX = function() {
		
		//TODO add explination!
		var x = this.getGroupX();
		
		var halfWidth = this.spriteX /2;

		var width = this.group.width;

		return (x - halfWidth) + width;

	}
	
	/**
	* Get the Top Y coordinate of the whole group
	* Allows you to find how high the group is
	*
	* @return {int} The top y coordinate of the group
	*/
	this.getGroupTopY = function() {
	
		var halfHeight = this.spriteY / 2;
		
		return this.group.y - halfHeight;	
	
	}
	
	
	/**
	* Get the Bottom Y coordinate of the whole group
	* Allows you to find how low the group is
	*
	* @return {int} The bottom y coordinate of the group
	*/
	this.getGroupBottomY = function() {
	
		var halfHeight = this.spriteY / 2;
		
		var groupHeight = this.group.height;
		
		return (this.group.y - halfHeight) + groupHeight;
	
	
	}

		
	/**
	* Move the whole group along the x axis
	*
	* @param {int} x the amount to move the group along
	*/
	this.moveGroupX = function(x) {

		this.group.x += x;
		
	}
	
	/**
	* Move the whole group along the y axis
	*
	* @param {int} y the amount to move the group along
	*/
	this.moveGroupY = function(y) {

		this.group.y += y;

	}

	/**
	* Get the x coordinate of the group
	*
	* @return {int} the x coordinate of the group
	*/
	this.getGroupX = function() {
	
		return this.group.x;
	
	}

	/**
	* Get the y coordinate of the group
	*
	* @return {int} the y coordinate of the group
	*/
	this.getGroupY = function() {
	
		return this.group.y;
	
	}
	
	/**
	* Sets the groups coordinates
	*
	* @param {int} x the x coordinate of the group
	* @param {int} y the y coordinate of the group
	*/
	this.setGroupCoordinates = function(x, y) {

		this.setGroupX(x);
		this.setGroupY(y);

	}
	
	/**
	* Sets the groups x coordinate
	*
	* @param {int} x the x coordinate of the group
	*/
	this.setGroupX = function(x) {
	
		this.group.x = x;
	
	}
	
	/**
	* Sets the groups y coordinate
	*
	* @param {int} y the y coordinate of the group
	*/	
	this.setGroupY = function(y) {
	
		this.group.y = y;
	
	}
	
	/**
	* Get a random enemy, only works whilst 
	* there are still enemies alive
	*
	* @return {GroupChild} A random enemy
	*/
	this.getRandom = function() {

		return new GroupChild(this.group.getRandom());
		
	}
	
	/**
	* Get a specific enemy 
	*
	* @param {int} index The index number of the child to get
	* @return {GroupChild} The selected enemy
	*/	
	this.getSpecificEnemy = function(index) {
	
		return new GroupChild(this.children[index]);
	
	}
	
	/**
	* Set the angle of the group
	*
	* @param {int} angle the angle to set the group
	*/		
	this.setAngle = function(angle) {
	
		this.group.angle = angle;
	
	}
  

};
