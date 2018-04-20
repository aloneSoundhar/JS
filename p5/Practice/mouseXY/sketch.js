function setup() {
	createCanvas(windowWidth, windowHeight);
	background(250, 250, 100);
}

function draw() {
	// ellipse
	fill(250, 200, 200);	
	noStroke();
	ellipse(mouseX, mouseY, 50, 50);
}

function mousePressed(){
	background(250, 250, 100);
}