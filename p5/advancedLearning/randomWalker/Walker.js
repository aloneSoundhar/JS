class Walker {
    constructor() {
        this.x = width/2;
        this.y = height/2;
    }

    step() {
        let choice = random(1);
        if (choice < 0.9) {
            this.x++;
        }
        if (choice < 0.8) {
            this.y++;
        } 
        if (choice < 0.7) {
            this.y--;
        }
        if (choice < 0.6) {
            this.x--;
        }
    }

    display() {
        stroke(0);
        // strokeWeight(4);
        point(this.x, this.y);
    }
}