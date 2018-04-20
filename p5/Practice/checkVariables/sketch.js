let circle = {
	x: 50,
	y: 200,
	diameter: 50	
};


function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(250, 250, 100);

	// ellipse
	fill(250, 200, 200);
	ellipse(circle.x, circle.y, circle.diameter, circle.diameter);

	// movement animation
	circle.x += 1;

}

