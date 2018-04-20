class ICNDB {
    constructor() {
        this.jokesCount = 10;
    }

    async getJokes() {
        const response = await fetch(`http://api.icndb.com/jokes/random/${this.jokesCount}`);
        const joke = await response.json();

        return joke.value;
    }

}