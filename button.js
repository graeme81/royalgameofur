function Button(x, y, text){
	this.x = x;
	this.y = y;
	this.write = text;
	this.strokeweight = 1;
	this.btnHeight = 13;
	this.btnWidth = 29;

	this.on = false;
}

Button.prototype.show = function(){
	
	fill(10,150,150);
	strokeWeight(this.strokeweight);
	rect(this.x - this.btnWidth, this.y - this.btnHeight, this.btnWidth*2, this.btnHeight*2, 20);
	fill(255);
	text(this.write, this.x, this.y);
}
