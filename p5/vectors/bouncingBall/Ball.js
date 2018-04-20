class Ball {
    constructor() {
        this.location = createVector(width/2, height/2);
        this.velocity = createVector(2.5, 5);
    }

    move() {
        this.location.add(this.velocity);
    }

    bounce() {
        if ( (this.location.x > width) || (this.location.x < 0) ) {
            this.velocity.x = this.velocity.x * -1;
        }
        if ( (this.location.y > height) || (this.location.y < 0) ) {
            this.velocity.y = this.velocity.y * -1;
        }
    }

    display() {
        stroke(0);
        strokeWeight(2);
        fill(127);
        ellipse(this.location.x, this.location.y, 50);
    }
}