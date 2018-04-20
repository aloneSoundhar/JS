function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);


	stroke(255);
	strokeWeight(4);
	noFill();

	if (mouseX	> width/2) {
		fill(255, 120, 243);
	}


	ellipse(width/2, height/2, 100);
}