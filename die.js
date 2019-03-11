function Die(){
	this.nos = [0,0,1,1];
}

Die.prototype.roll = function(){

	return this.nos[Math.floor(Math.random()*this.nos.length)]
}

Die.prototype.show = function(){
	let out = "";

	for(x in roll){
		out = out + roll[x] + ", ";
	}

	fill(255);

	if (roll.length){
		text(out + " --->   " + num, width/3 , tiles[22].y+tiles[22].res+(tiles[22].res/2));
	}else{
		text(play.turn + " roll to start.", width/3 , tiles[22].y+tiles[22].res+(tiles[22].res/2));

	}
}