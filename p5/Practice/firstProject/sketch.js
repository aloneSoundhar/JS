function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	
}

function draw() {
	// Head
	fill(0, 0, 255);
	noStroke();
	ellipse(width/2, height/2, 70);

	// Eyes
	noStroke();
	fill(0, 255, 0);
	ellipse((width/2) - 15, (height/2) - 5, 20);
	ellipse((width/2) + 15, (height/2) - 5, 20);

	// Body
	fill(255, 0, 0);
	rect((width/2) - 10, (height/2) + 35, 20, 50);

	// Legs
	stroke(255);
	line((width/2) - 10, (height/2) + 85, (width/2) - 20, (height/2) + 95);
	line((width/2) + 10, (height/2) + 85, (width/2) + 20, (height/2) + 95);
}