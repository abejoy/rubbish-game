/**
* Keys class, holds all of the possible keys available
*
* @author Joshua Small
* @version 1.0
*
* @constructor
* @param {Game} game The game object
Phaser.Keyboard.
*/
function Keys(game) {
	/** @member {Phaser.Game} */
	this.game = game.world;
	/** @member {Phaser.Key} */
	this.phaserKeys = this.game.input.keyboard;
	/** @member {Phaser.Key} */
	this.phaserKeyArrows = this.phaserKeys.createCursorKeys();
	/** @member {Phaser.Key} */
	this.left = new Key(this.phaserKeyArrows.left);
	/** @member {Phaser.Key} */
	this.right = new Key(this.phaserKeyArrows.right);
	/** @member {Phaser.Key} */
	this.up = new Key(this.phaserKeyArrows.up);
	/** @member {Phaser.Key} */
	this.down = new Key(this.phaserKeyArrows.down);
	
	/**
	* Create a new input key by specifying its character, only works on the keys a-z
	*
	* @param {String} key The key to create
	* @return {Key} A Key to use
	*/
	this.createKey = function(key) {
	
		//convert to uppercase as lowercase keys differ
		key = key.toUpperCase();	
		
		//get its key code, e.g A is 65
		var keyCode = key.charCodeAt();
		
		//create a Key object and return
		return new Key(this.phaserKeys.addKey(keyCode));
	
	}
	
	/**
	* Create the space bar key
	*
	* @return {Key} The Spacebar key
	*/
	this.createSpaceKey = function() {
	
		return new Key(this.phaserKeys.addKey(Phaser.Keyboard.SPACEBAR));
	
	}
		
	/**
	* Create the Up arrow key
	*
	* @return {Key} The Up key
	*/
	this.createUpKey = function() {
	
		return this.up;
	
	}
	
	/**
	* Create the Down arrow key
	*
	* @return {Key} The Down key
	*/
	this.createDownKey = function() {
	
		return this.down;
	
	}
	
	/**
	* Create the Left arrow key
	*
	* @return {Key} The Left key
	*/
	this.createLeftKey = function() {
	
		return this.left;
	
	}
	
	/**
	* Create the Right arrow key
	*
	* @return {Key} The Right key
	*/
	this.createRightKey = function() {
	
		return this.right;
	
	}
};
