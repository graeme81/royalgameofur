let tiles = [];
let counters = [];
let roll = [];
let num;
let play;
let rollButton; 
let canvas;

function setup(){
	canvas = createCanvas(250, 500);
	let x = (windowWidth - width) / 2;
  	canvas.position(x, 75);
	// createElement('br');
	// createElement('br');
	// createA('https://en.wikipedia.org/wiki/Royal_Game_of_Ur', 'Royal Game of Ur Wiki', '_blank');
	
	let gameSet = new Game(width, height);
	play = new Play(); // creating rules for game
	die = new Die(); // creating dice
	rollButton = new Button(0, height - (height / 6) + 8, "ROLL");
	
	gameSet.createTiles();
	gameSet.createCounters(2);

};	

function draw(){

	background(55);

	//move to aesthetically pleasing place
	let movement = (width/2) - (tiles[0].res*1.5);
	translate(movement, tiles[0].res);
	textAlign(CENTER, CENTER);

	//draw board
	for(let tile of tiles){
		tile.show();
	}

	//draw counters on board
	for(let counter of counters){
		counter.show();
	}

	rollButton.show();
	die.show();
	play.checkWin();
	play.showStatus();

	noLoop();
};

window.onresize = function(){ location.reload(); }
