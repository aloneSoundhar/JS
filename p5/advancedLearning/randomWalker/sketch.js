let w;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	w = new Walker();
}

function draw() {
	w.display();
	w.step();
}