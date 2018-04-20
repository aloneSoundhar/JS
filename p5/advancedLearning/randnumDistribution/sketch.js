let randomCounts = [];
let total = 20;


function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 20; i++) {
		randomCounts[i] = 0;
	}
}

function draw() {
	background(255);
	let index = floor(random(total));
	randomCounts[index]++;
	stroke(0);
	fill(175);
	let w = width/ randomCounts.length;

	for (let i = 0; i < total; i++) {
		rect(i*w, height-randomCounts[i], w-1, randomCounts[i]);	
	}
}