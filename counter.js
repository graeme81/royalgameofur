function Counter(colour, num){

	if (colour === 0){
		this.colName = "black";
	}else{
		this.colName = "white";
	}

	this.colour = colour;  // 255 or 0 ; white of black
	this.num = num;
	this.position = 0; // all counters start at home 
	
	if (this.colour === 255){  // white route
		this.route = [12,9,6,3,0,1,4,7,10,13,16,19,20,23,22,21,18,15];
	}else{ 					   // black route
		this.route = [14,11,8,5,2,1,4,7,10,13,16,19,18,21,22,23,20,17];
	}

	this.xpos = tiles[this.route[this.position]].x + (tiles[0].res/2);
	this.ypos = tiles[this.route[this.position]].y + (tiles[0].res/2);

	tiles[this.route[this.position]].counterInfo[0] += 1; // let the home tile kown how many tile are on it
	tiles[this.route[this.position]].counterInfo[1] = this.colName; // let home tile know what colour is on it
}

Counter.prototype.show = function(){
	fill(this.colour);
	ellipse(this.xpos , this.ypos, tiles[0].res-20);

	// //writing number on the tile 
	// fill(125);
	// text(this.num, this.xpos, this.ypos);
}

Counter.prototype.move = function(){

	// check move is possible
	let x = this.moveCheck(1);
	if(x === "move"){
		// change the tile info on the current tile
		tiles[this.route[this.position]].counterInfo[0] -= 1;
		tiles[this.route[this.position]].counterInfo[1] = "none";
		tiles[this.route[this.position]].counterInfo[2] = 0;
		// chnage the position of the selected tile;
		this.position += num;
		this.xpos = tiles[this.route[this.position]].x + (tiles[0].res/2);
		this.ypos = tiles[this.route[this.position]].y + (tiles[0].res/2); 
		// change the tile info on the new tile
		tiles[this.route[this.position]].counterInfo[0] += 1;
		tiles[this.route[this.position]].counterInfo[1] = this.colName;
		tiles[this.route[this.position]].counterInfo[2] = this.num;

		return "moved";
	}
	return "again";
}

Counter.prototype.possMove = function(){
		//checking to see if a specific tile can be moved
	 	return (this.moveCheck() === "move") ? "yes" : "no";
}


Counter.prototype.moveCheck = function(check){

	let ch = check; // will move if can move

	let goto = this.position + num;

	// cannot move past end square
	if(goto > this.route.length-1){return "no";}

	let ci = tiles[this.route[goto]].counterInfo; // counter info on the tile


	if (ci[0] === 0){ return "move";}	// if moving to an empty square or players home square
	else if(tiles[this.route[goto]].num === 16 || tiles[this.route[goto]].num === 18){ return "move"; } // counters can always go to their home
	else if(ci[1] === this.colName){return "no";}  // moving to a square with players playing counter on
	else if(tiles[this.route[goto]].info === "double" && ci[0] === 1 ){return "no";} //occupied double cannot move 
	else if (ci[1] != this.colName){
		if (ch){
			for (x in counters){
				if (counters[x].colName != this.colName && counters[x].num === ci[2]){
					// send a hit counter back to start
					counters[x].position = 0;
					counters[x].xpos = tiles[counters[x].route[counters[x].position]].x + (tiles[0].res/2);
					counters[x].ypos = tiles[counters[x].route[counters[x].position]].y + (tiles[0].res/2); 
					tiles[counters[x].route[counters[x].position]].counterInfo[0]++;
				}
			}
		}
		return "move";
	}
}
