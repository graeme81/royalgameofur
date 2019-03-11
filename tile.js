function Tile(x, y, res, num){
	this.x = x;
	this.y = y; 
	this.res = res;
	this.num = num;
	this.counterInfo = [0 , "none" , 0];  // number of counters, colour of counter, counter number(1-7)

	let double = [1,3,11,19,21];  // squares to be double squares.
	let blacked = [13,15,16,18];  // squares for start and finish to be blacked out.

	if(double.includes(this.num)){
		this.info = "double";
	}else if(blacked.includes(this.num)){
		this.info = "black";
	}else{
		this.info = "normal";
	}
}


Tile.prototype.show = function(){

	if (this.info === "double"){
		fill(0,0,255);
	}else if (this.info === "black"){
		fill(35);
	}else{
		fill(155);
	}

	rect(this.x, this.y, this.res, this.res);
}

