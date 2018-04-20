

this.setup = () => {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(0);
	symbol = new Symbol(
		width/2,
		height/2	
	);
	symbol.setRandomSymbol();
}

this.draw = () => {
	symbol.render();
}


