const icndb = new ICNDB();

const fillList = function() {
    let jokes = [];


    icndb.getJokes()
        .then(collection => {
        const list = document.querySelector('.joke-list');

        jokes = collection;
             
        jokes.forEach(joke => {
        const element = document.createElement('div');

        element.className = 'jumbotron jumbotron-fluid mb-3';
        
        element.id = joke.id;

        element.innerHTML = `
            <div class="container">
                <p class="lead">${joke.joke}</p>
            </div>
        `.trim();

        list.appendChild(element);
    });
        })
        .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', fillList);


window.addEventListener('scroll', function() {
    if(this.scrollY >= this.window.innerHeight) {
        fillList();
    }
})