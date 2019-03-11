function Game(w, h){

	if (w >= h/2){
		this.res = height / 10;
	}else{
		this.res = width / 5;
	}
}

Game.prototype.createTiles = function(){
// create tiles info on the board

	let cols = 3;
	let rows = 8;

	let x = 0, y = 0;

	for (let i = 0; i < 24; i++){

		let xpos = x * this.res;
		let ypos = y * this.res;
		let number = i + 1;

		let tile = new Tile(xpos, ypos, this.res, number);
		tiles.push(tile);
		x++;

		if(x >= cols){
			x = 0;
			y ++;
		}
	}
}

Game.prototype.createCounters = function(number){
// create tiles to play with

	let num = number;

	for (let i = 1; i <= num; i++){
		let count1 = new Counter(255, i);
		let count2 = new Counter(0, i);
		counters.push(count1);
		counters.push(count2);
	}

}
