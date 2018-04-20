function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);
	strokeWeight(2);
	stroke(0);
	noFill();

	translate(width/2, height/2);
	ellipse(0, 0, 4, 4);

	let mouse = createVector(mouseX, mouseY);

	let center = createVector(width/2, height/2);

	mouse.sub(center);	

	mouse.mult(0.1);

	line(0, 0, mouse.x, mouse.y);
}