function Play(){
	this.phase = "rolling";  // game starts in rolling phase
	this.turn = "white";	 // white starts
	this.info = this.turn + " to roll";
}

Play.prototype.checkWin = function(){
	if (tiles[15].counterInfo[0] === 2){
		console.log("white wins");
		this.info = "WHITE WINS!";
	}else if(tiles[17].counterInfo[0] === 2){
		console.log("black wins");
		this.info = "BLACK WINS!";
	}
}

Play.prototype.getRoll = function(){
	let count = 0;
	roll = [];

	for(let i = 1; i < 4; i++){
		let rolled = new Die().roll()
		count += rolled;
		roll.push(rolled);
	}

	if (count === 0){count = 4};

	return count;
}

Play.prototype.showStatus = function(){
	text(this.info, width/3 , 0-tiles[1].res/2);
}

//===============================================================================================

function mouseClicked(){

	if(play.phase === "rolling"){ // in rolling phase

		if(mouseX > rollButton.x - rollButton.btnWidth + tiles[0].res && 
		   mouseX < rollButton.x + rollButton.btnWidth + tiles[0].res &&
		   mouseY > rollButton.y - rollButton.btnHeight + tiles[0].res &&
		   mouseY < rollButton.y + rollButton.btnHeight + tiles[0].res){
			// roll button clicked
				num = play.getRoll();

				// check 1 piece can be moved
				let noMove = 0;
				for (let i in counters){

					if (counters[i].colName === play.turn){ // checking the counters of the playing turn
						let x = counters[i].possMove();
						if (x === "yes"){
							play.info = play.turn + " to move.";
							play.phase = "moving"; 	// change to moving phase
							break;
						}else{
							noMove ++;
						}
					}
				}
				// if player has no potential moves ... pass turn
				if (noMove === 2){
					play.info = play.turn +" cannot move! PASS THE DICE!"
					play.turn = ( play.turn === "white") ? "black" : "white";
				}
		}

	}else{ // in moving phase

		for (let i in counters){
			if (counters[i].colName === play.turn){
				if (mouseX > counters[i].xpos - (tiles[0].res/2) + 10 + tiles[0].res	&&
					mouseX < counters[i].xpos + (tiles[0].res/2) - 10 + tiles[0].res 	&&
					mouseY > counters[i].ypos - (tiles[0].res/2) + 10 + tiles[0].res	&&
					mouseY < counters[i].ypos + (tiles[0].res/2) - 10 + tiles[0].res	){

					let x = counters[i].move(num);

					if (x === "moved"){
						play.phase = "rolling";

						if(tiles[counters[i].route[counters[i].position]].info != "double" && num != 4){
							play.turn = ( play.turn === "white") ? "black" : "white";
						}
						play.info = play.turn + " to roll."
						break;
					}
				}
			}
		}
	}
	redraw();
}