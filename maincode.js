/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////

////game////
var game = new Game(600, 800, "the Rubish Game ");
var keys;
var left;
var right;
var background;
var gameover;

////Bins////
var change_bin;
var current_X;
var current_bin;
var uglybin;
var recycling;
var recycling;
var gardenbin;
var bin;

////Falling Objects////
var falling;
var randomNumber;
var randomX;
var MaxX = 600;
var MinX = 0;
var lastfallingspawn = 0;
var fallingdelay = 200;
var i;
var randomtypeofrubish;
var uglystuff;
var recyclestuff;
var gardenstuff;

////Score////
var scoreText;
var score = 0 ;
var scoreText2;

////Lives////
var lives = 5 ;
var platform;
var livesText = "";
var help;

var startScreen = true;
/////////////////////////////////////////////////////////////////
///////////////	Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////

function preload() {
////Loading Graphics////
game.loadBackgroundImage('background',"graphics/all_backgrounds.png",600,800);
bin = new Player(200,700, game, "graphics/three_bins2.png", 100, 170);
//uglystuff = new ReusableObject (game, 'uglystuff',"graphics/uglystuff.png",64,44);
fishbone = new ReusableObject (game, 'fishbone',"graphics/fish_bone.png");
pizza = new ReusableObject (game, 'pizza',"graphics/pizza.png");
sock = new ReusableObject (game, 'sock',"graphics/sock.png");
bottle = new ReusableObject (game, 'bottle',"graphics/bottle.png");
can = new ReusableObject (game, 'can',"graphics/can.png");
newspaper = new ReusableObject (game, 'newspaper',"graphics/newspaper.png");
leaves = new ReusableObject (game, 'leaves',"graphics/leaves.png");
banana = new ReusableObject (game, 'banana',"graphics/Bananaskin.png");
carrot = new ReusableObject (game, 'carrot',"graphics/carrot1.png");
help = new ReusableObject (game, 'help',"graphics/Help.png");








platform = new ReusableObject (game, 'platform',"graphics/bar.png");
gameover = new ReusableObject (game, "gameover", "graphics/dead.png");
}

function create() {

	keys = new Keys(game);
	
	p = keys.createKey("p");

if(!startScreen) {

	////Background////
	game.setBackgroundImage(0,0,600,800)
	game.setBackgroundImage(0,0,600,800)

	////Keys////
	
	left = keys.createLeftKey();
	right = keys.createRightKey();

	////Bins////
	uglybin = keys.createKey("q");
	recycling = keys.createKey("w");
	gardenbin = keys.createKey("e");
	bin.createSprite();
	current_bin = 0;
	bin.addAnimation("AUglybin", [0], 10);
	bin.addAnimation("Arecycling", [1], 10);
	bin.addAnimation("Agardenbin", [2], 10);

	////Falling////
	fishbone.createReusables();
	pizza.createReusables();
	sock.createReusables();
	bottle.createReusables();
	can.createReusables();
	newspaper.createReusables();
	leaves.createReusables();
	banana.createReusables();
	carrot.createReusables();

	/*uglystuff.addAnimationToAll("ugly1",[0], 10);
	uglystuff.addAnimationToAll("ugly2",[1], 10);
	uglystuff.addAnimationToAll("ugly3",[2], 10);

	recyclestuff.addAnimationToAll("recycle1" [0], 10);
	recyclestuff.addAnimationToAll("recycle2" [1], 10);
	recyclestuff.addAnimationToAll("recycle3" [2], 10);

	gardenstuff.addAnimationToAll("garden1" [0], 10);
	gardenstuff.addAnimationToAll("garden2" [1], 10);
	gardenstuff.addAnimationToAll("garden3" [2], 10);
*/
	////Score////
	scoreText = new Text(game, "Score:" + score, 0 ,0,"34px","Arial","#555");

	////Platform////
	platform.createWidthHeight("0","80","100",1);

	////Lives////
	livesText = new Text (game, "Lives: 5", 0 ,40,"34px","Arial","#555");


	
	
	} else {
	
	
	help.createReusables();

screenHelp = help.createWidthHeight("0","0","100","100");


}

}


function update(){ 
////Falling////
/*if((current_bin==0)&&(randomtypeofrubish < 0.3)&&(uglystuff.checkCollision(bin))) {
	hitBin();
}

if((current_bin==1)&&(randomtypeofrubish > 0.3)&&(randomtypeofrubish < 0.6)&&(recyclestuff.checkCollision(bin))) {
	hitBin();
}
if((current_bin==2)&&(randomtypeofrubish < 0.6)&&(gardenstuff.checkCollision(bin))) {
	hitBin();
}*/
if(!startScreen) {
//ugly stuff
fishbone.checkCollision(bin, uglyHit);
pizza.checkCollision(bin, uglyHit);
sock.checkCollision(bin, uglyHit);

//recycle stuff
bottle.checkCollision(bin, recycleHit);
can.checkCollision(bin, recycleHit);
newspaper.checkCollision(bin, recycleHit);

//garden stuff
leaves.checkCollision(bin, gardenHit);
banana.checkCollision(bin, gardenHit);
carrot.checkCollision(bin, gardenHit);

////Platform Collision////
platform.checkCollision(fishbone, hitPlatform1);
platform.checkCollision(pizza, hitPlatform1);
platform.checkCollision(sock, hitPlatform1);
platform.checkCollision(bottle, hitPlatform1);
platform.checkCollision(can, hitPlatform1);
platform.checkCollision(newspaper, hitPlatform1);
platform.checkCollision(banana, hitPlatform1);
platform.checkCollision(leaves, hitPlatform1);
platform.checkCollision(carrot, hitPlatform1);


fallingdelay = fallingdelay + 0.2;

	
	////Bins////
	if(uglybin.isDown()) {
		current_bin = 0;
		bin.playAnimation('AUglybin');
	}
	if(recycling.isDown()) {
		current_bin = 1;
		bin.playAnimation("Arecycling");
	}
	if(gardenbin.isDown()) {
		current_bin = 2;
		bin.playAnimation("Agardenbin");
	}
	////Keys////
	if(left.isDown()) {
		bin.moveX(-6);
		current_X = bin.getX();
	}
	
	else if(right.isDown()) {
		bin.moveX(6);
		current_X = bin.getX();
	}
	
	//// randomly generate type of rubish////
	
	
	////Generation////
	randomtypeofrubish = (Math.floor((Math.random() * 9) + 1) );
	randomX = Math.random() * MaxX;
	if(game.getGameTime() > lastfallingspawn) {
		var currentfalling;
		
		//randomtypeofrubish = (Math.random());
		if(randomtypeofrubish == 1) {
			currentfalling = fishbone.create(randomX, 0);
		} else if(randomtypeofrubish == 2) {
			currentfalling = pizza.create(randomX, 0);
		} else if(randomtypeofrubish == 3) {
			currentfalling = sock.create(randomX, 0);
		} else if(randomtypeofrubish == 4) {
			currentfalling = bottle.create(randomX, 0);
		} else if(randomtypeofrubish == 5) {
			currentfalling = can.create(randomX, 0);
		} else if(randomtypeofrubish == 6) {
			currentfalling = newspaper.create(randomX, 0);
		} else if(randomtypeofrubish == 7) {
			currentfalling = banana.create(randomX, 0);
		} else if(randomtypeofrubish == 8) {
			currentfalling = leaves.create(randomX, 0);
		} else if(randomtypeofrubish == 9) {
			currentfalling = carrot.create(randomX, 0);
		}
		
		currentfalling.setVelocityY(fallingdelay);
		lastfallingspawn = game.getGameTime() + 2500 ;
	}
	
	
	
	////// loosing////////
	if (lives == -1) {
		gameover.createWidthHeight(0,0,600,800);
		scoreText2 = new Text(game, "Score: 0", 0 ,0,"34px","Arial","#555");
		scoreText2.changeText("Score: " + score );

	}
	
	} else {
	
		if(p.isDown()) {
		
			screenHelp.kill();
			startScreen = false;
			
			create();
			
		
		}
	}
		
}

function hitBin(falling, bin) {
bin.kill();
score = score + 10;
scoreText.changeText("Score: " + score );
}
	
function hitPlatform1(uglystuff, platform) {
lives = lives - 1;
livesText.changeText ("Lives: " + lives.toString());
platform.kill();
}

function hitPlatform2(recyclestuff, platform) {
lives = lives - 1;
livesText.changeText ("Lives: " + lives.toString());
platform.kill();
}

function hitPlatform3(gardenstuff, platform) {
lives = lives - 1;
livesText.changeText ("Lives: " + lives.toString());
platform.kill();
}

function uglyHit(bin, uglystuff) {

	if(current_bin == 0) {
	
		uglystuff.kill();
		score = score + 10;
		scoreText.changeText("Score: " + score );
	
	}
}

function recycleHit(bin, recyclestuff) {

	if(current_bin == 1) {
	
		recyclestuff.kill();
		score = score + 10;
		scoreText.changeText("Score: " + score );
	
	}
}

function gardenHit(bin, gardenstuff) {

	if(current_bin == 2) {
	
		gardenstuff.kill();
		score = score + 10;
		scoreText.changeText("Score: " + score );
	
	}
}