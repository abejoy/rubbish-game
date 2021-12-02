/**
* GroupChild class class 
* A helper class used to allow functions on a child of a group
* @author Joshua Small [smalljh@aston.ac.uk]
* @version 1.0
*
* @constructor
* @param {PIXI.DisplayObject} child The child object
*/
function GroupChild(child){
	/** @member {PIXI.DisplayObject} */
	this.child = child;

	/**
	* Set the x velocity of the child
	*
	* @param {int} x the x velocity to give the child
	*/
	this.setVelocityX = function(x) {
		
		//ensure the child is not null
		if(this.child != null)
			this.child.body.velocity.x = x;
	}

	/**
	* Set the y velocity of the child
	*
	* @param {int} y the y velocity to give the child
	*/
	this.setVelocityY = function(y) {
		
		//ensure the child is not null
		if(this.child != null)
			this.child.body.velocity.y = y;
	}

	/**
	* Get the x position of the child
	*
	* @return {int} x position of the child
	*/
	this.getX = function() {
		return this.child.body.x;
	}

	/**
	* Get the y position of the child
	*
	* @return {int} y position of the child
	*/
	this.getY = function() {
		return this.child.body.y;
	}
	
	/**
	* Move the child towards the player, needs to be updated to allow moving towards other objects
	*
	* @see http://docs.phaser.io/Phaser.Physics.Arcade.html#moveToObject
	* @param {Player} player the player to move towards
	* @param {int} speed the speed to move the child
	*/
	this.moveTowards = function(player, speed) {
		this.child.game.physics.arcade.moveToObject(this.child,player.character,speed);
	}

	/**
	* Set the width of the child
	*
	* @param {int} width the width of the child
	*/
	this.setWidth = function(width) {	
  		
  		this.child.body.width = width;
  		this.child.width = width;

	}

	/**
	* Set the height of the child
	*
	* @param {int} height the height of the child
	*/
	this.setHeight = function(height) {

  	  	this.child.body.height = height;
  	  	this.child.height = height;

	}

	/**
	* Set if the child can move
	*
	* @param {boolean} immovable if the child is immovable, true means the child won't move
	*/
	this.setImmovable = function(immovable) {
		this.child.body.immovable = immovable;
	}
	
	/**
	* Kill the child
	*/
	this.kill = function() {
	
		this.child.kill();
	
	}

}
