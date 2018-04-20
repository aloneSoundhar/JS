let col = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	col = map(mouseX, 0, width, 0, 255);
	background(col);


	fill(250, 118, 222);
	ellipse(mouseX, 200, 64);
}