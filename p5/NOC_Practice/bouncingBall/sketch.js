let b;

function setup() {
	createCanvas(windowWidth, windowHeight);
	b = new Ball();
}

function draw() {
	background(255);
	b.update();
	b.display();
}