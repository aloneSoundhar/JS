let spot = {
	x: 100,
	y: 50
};

let col= {
	r: 255,
	g: 0,
	b: 0
};

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
}

function draw() {
	spot.x = random(0, width);
	spot.y = random(0, height);
	col.r = random(100, 255);
	col.b = random(100, 190);
	col.g = 0;
	noStroke();
	fill(col.r, col.g, col.b, 100);
	ellipse(spot.x, spot.y, 24, 24);
}	