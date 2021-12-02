/**
* Sound class allows the playing of sigular or looped sounds
* @author Joshua Small [smalljh@aston.ac.uk]
* @version 1.0
*
* @constructor
* @param {Game} game The created game object
* @param {String} name Name of the sound
* @param {String} sound The string reference of the sound to use
* @param {number} volume Optional Value between 0 and 1, the default is 1
* @param {boolean} loop Optional boolean value stating if the audio should loop, default is false
*/
function Sound(game, name, sound, volume, loop){

	/** @member {Phaser.Game} **/
	this.game = game.world;
	/** @member {String} **/
	this.name = name;
	/** @member {String} **/
	this.sound = sound;
	
	/** load in the audio file **/
	this.game.load.audio(this.name, this.sound);
	/** @member {Phaser.Sound} **/
	this.audio = this.game.add.audio(this.name, volume, loop);
	
	/**
	* Play the sound
	*/
	this.playAudio = function() {			
			
		this.audio.play();
	
	}
	
	/**
	* Pause the sound
	*/
	this.pauseAudio = function() {
	
		this.audio.pause();
	
	}
		
	/**
	* Restart the sound
	*/
	this.restartAudio = function() {
	
		this.audio.restart();
	
	}
	
		
	/**
	* Resume the sound after pausing
	*/
	this.resumeAudio = function() {
	
		this.audio.resume();
	
	}
		
	/**
	* Stop the sound
	*/
	this.stopAudio = function() {
	
		this.audio.stop();
	
	}	
		
	/**
	* Allow multiple instances of the sound
	*/
	this.allowMultiple = function(allowMultiple) {
	
		this.audio.allowMultiple = allowMultiple;
	
	}
}
