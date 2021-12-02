/**
* Enemy class which is at the core of the project
* @author Joshua Small [smalljh@aston.ac.uk]
* @version 1.0
*
* @constructor
* @param {Game} game The created game object
* @param {String} name The name of the ReusableObject
* @param {String} image String reference of an image to use
*/
function ReusableObject(game, name, image, spriteX, spriteY){

	/** @member {Phaser.Game} */
	this.game = game.world;
	/** @member {Game} */
	this.parentGame = game;
	/** @member {Phaser.Group} */
	this.group = this.game.add.group(null, '', true, false, 0);
	/** @member {String} */
	this.name = name;
	/** Load the image */
	this.game.load.spritesheet(this.name, image, spriteX, spriteY);
	/** @member {Array} */
	this.children = new Array();

	/**
	* Create the reusable objects for use, called automatically
	*/
	this.createReusables = function() {

		this.group.enableBody = true;
		this.group.physicsBodyType = Phaser.Physics.ARCADE;
		this.group.setAll('anchor.x', 0.5);
		this.group.setAll('anchor.y', 1);
		this.group.setAll('outOfBoundsKill', true);
		this.group.setAll('checkWorldBounds', true);
	}
	
	/**
	* Create your object at the given x and y coordinates
	* Width and height is used from the image if not specified
	*
	* @param {int} x The x coordinate of the object
	* @param {int} y The y coordinate of the object
	* @param {int|string} width The width of the object
	* @param {int|string} height The height of the object
	*/
	this.create = function(x, y, width, height) {
		
		
		
		width = width || 0;
		height = height || 0;
		
		if(width == 0 || height == 0) {
		
		var image = this.game.cache.getImage(this.name);
		
		width = image.width;
		height = image.height;
		
		width = this.parseWidth(width);
		height = this.parseHeight(height);

		x = this.parseX(x, width);
		y = this.parseY(y, height);	
		
  		
  			
		var rndObj = this.group.create(x, y, this.name);

		this.children.push(new GroupChild(rndObj));

		var index = this.children.length - 1;

		return this.children[index];
		
		} else {
			//quick fix for now
			return this.createWidthHeight(x, y, width, height);
		
		}

	}
	/**
	* Create your object at the given x and y coordinates
	*
	* @param {int} x The x coordinate of the object
	* @param {int} y The y coordinate of the object
	* @param {int|string} width The width of the object
	* @param {int|string} height The height of the object
	*/
	this.createWidthHeight = function(x, y, width, height) {
		
		width = this.parseWidth(width);
		height = this.parseHeight(height);
		
		y = this.parseY(y, height);
		x = this.parseX(x, width);

		var obj = this.create(x, y);
		obj.setWidth(width);
		obj.setHeight(height);

		return obj;
	}
	
	/**
	* Check collisions between this object and another object
	*
	* @param {Object} obj The object to check a collision against
	* @param {function} functionToUse The function to use
	*/
	this.checkCollision = function(obj, functionToUse) {
	
		if(obj instanceof Player)  		
  			obj = obj.character;
		
  		if(obj instanceof Enemy)
  			obj = obj.group;
	
		if(obj instanceof ReusableObject)
  			obj = obj.group;
			
		this.game.physics.arcade.overlap(this.group, obj, functionToUse, null, this);
			
		
	}
		
	/**
	* Check simple collisions between this object and another object
	* Only deals with collision, so prevents overlapping
	*
	* @param {Object} obj The object to check a collision against
	*/
	this.checkSimpleCollision = function(obj) {
  	
  		if(obj instanceof Player)
  			obj = obj.character;
  				
  		if(obj instanceof Enemy)
  			obj = obj.group;
  				
		if(obj instanceof ReusableObject)
  			obj = obj.group;
			
  		this.game.physics.arcade.collide(this.group, obj);
  	
  	}
		
	/**
	* Return a value of x, useful if specified as a string (percentage)
	* Requires the width of the object to work out
	*
	* @param {int} x The x value
	* @param {int} width The width of the object
	*/
	this.parseX = function(x, width) {

		if((typeof x === "string") || (x < 0)) {
  		
  			var newX = parseInt(x);
  			
  			if(!(newX > -1)) {
  				console.log("Your value for x: " + x + " is not a valid number!");
  				x = 0;
  			}
   			else {
   			
   				var div = newX/100;   			
   							
  				x = this.parentGame.gameWidth() * div;  				
  				
  				var minWidth = this.parentGame.gameWidth() - width;
  				
  				if(minWidth < x)
  					x = minWidth;
  				
  			}
  			
  		}

  		return x;

	}
		
	/**
	* Return a value of y, useful if specified as a string (percentage)
	* Requires the height of the object to work out
	*
	* @param {int} y The y value
	* @param {int} height The height of the object
	*/
	this.parseY = function(y, height) {

		if((typeof y === "string") || (y < 0)) {
  		
  			var newY = parseInt(y);
  			
  			if(!(newY > -1)) {
  				console.log("Your value for y: " + y + " is not a valid number!");
  				y = 0;
  			}
   			else {
   			
   				var div = newY/100;   			
   							
  				y = this.parentGame.gameHeight() * div;

  				var minHeight = this.parentGame.gameHeight() - height;

  				if(minHeight < y) {
  					y = minHeight;
  				}
  				
  			}

  		}

  		return y;
	}
		
	/**
	* Return a value of the width, useful if specified as a string (percentage)
	*
	* @param {int} width The width value
	*/
	this.parseWidth = function(width) {

		if((typeof width === "string") || (width < 0)) {
  		
  			var newWidth = parseInt(width);
  			
  			if(!(newWidth > -1)) {
  				console.log("Your value for width for: " + width + " is not a valid number!");
  				width = 0;
  			}
  			else { 			
  			
  				var div = newWidth/100;
  				
  				width = this.parentGame.gameWidth() * div;
  			
  			}
  			
  		}

  		return width;

	}
		
	/**
	* Return a value of the height, useful if specified as a string (percentage)
	*
	* @param {int} height The height value
	*/
	this.parseHeight = function(height) {

		if((typeof height === "string") || (height < 0)) {
		
			var newHeight = parseInt(height);
			
			if(!(newHeight > -1)) {
				console.log("Your value for height: " + height + " is not a valid number!");
				height = 0;
			}
			else {
			
				var div = newHeight/100;   			
							
				height = this.parentGame.gameHeight() * div;
				
			}
			
  	  	}

  	  	return height;

	}
		
	/**
	* Sets all of the objects children to immovable or not
	* @see setImmovable
	*
	* @param {boolean} immovable If they should be immovable
	*/
	this.setAllImmovable = function(immovable) {

		for(var i = 0; i < this.children.length; i++)
			this.setImmovable(i, immovable);

	}
		
	/**
	* Sets a specified children to immovable or not
	*
	* @param {int} index The child to change
	* @param {boolean} immovable If they should be immovable
	*/
	this.setImmovable = function(index, immovable) {
		this.children[index].setImmovable(immovable);
	}
			
	/**
	* Sets a specified childs angle
	*
	* @param {int} index The child to change
	* @param {int} angle The angle to set them to
	*/
	this.setAngle = function(index, angle) {
	
		this.children[index].angle = angle;
	
	}
				
	/**
	* Sets all the childrens angle
	* @see setAngle
	*
	* @param {int} angle The angle to set them to
	*/
	this.setAllAngle = function(angle) {
	
		for(var i = 0; i < this.children.length; i++)
			this.setAngle(i, angle);
	
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

	this.createReusables();

}
