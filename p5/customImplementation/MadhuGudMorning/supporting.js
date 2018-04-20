let greetings = ['G', 'U', 'D', 'M', 'O', 'R', 'N', 'I', 'N', 'G', 'M', 'A', 'D', 'H', 'U'];

class Symbol {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value;

        this.speed = speed;
        this.first = first;
        this.opacity = opacity;

        this.switchInterval = round(random(2, 25));
    }

    setRandomSymbol(){
    
        this.value = greetings[round(random(0, 15))];
    }

    render(){
        fill(0, 255, 70);   
        text(this.value, this.x, this.y);
    }
}


class Stream {
    constructor(x, y, speed, first, opacity) {
        
    }


}