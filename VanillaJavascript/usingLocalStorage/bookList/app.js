class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}   

class UI {

    addBookToList(book) {
        const list = document.getElementById('book-list');

        // Create tr element
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `.trim();

        list.appendChild(row);

        
    }

    deleteBookFromList(target) {
        if(target.className === 'delete') {
            target.parentNode.parentNode.remove();
        }
    }

    showAlert(msg, className) {
        // Create Div
        const div = document.createElement('div');

        // Add Classes
        div.className = `alert ${className}`;

        // Add Text
        div.appendChild(document.createTextNode(msg));

        // Get Parent
        const container = document.querySelector('.container');
        // Get Form
        const form = document.getElementById('book-form');
        // Insertion of div
        container.insertBefore(div, form);
        // remove after timeOut
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = Array.from(JSON.parse(localStorage.getItem('books')));
        }
    
        return books;
      }
    
      static displayBooks() {
        const books = Store.getBooks();
    
        books.forEach(function(book){
          const ui  = new UI;
    
          // Add book to UI
          ui.addBookToList(book);
        });
      }
    
      static addBook(book) {
        const books = Store.getBooks();
    
        books.push(book);
    
        localStorage.setItem('books', JSON.stringify(books));
      }
    
      static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach(function(book, index){
         if(book.isbn === isbn) {
          books.splice(index, 1);
         }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }
}

// App Controller
// Event Listeners for DOMload
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners for Adding Book
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Create UI Instance
    const ui = new UI();


    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in the fields!', 'error');
    } else {
        // Create book instance
        const book = new Book(title, author, isbn);

        // Adding book list
        ui.addBookToList(book);

        // Adding to LS
        Store.addBook(book);

        // Clear Fields
        ui.clearFields();

        // show Alert
        ui.showAlert('Book Added!', 'success');
    }

    

    e.preventDefault();
});

// Event Listeners for Removing Book
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    // Deleting From List
    ui.deleteBookFromList(e.target);
    // Delete From LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Displaying Alert
    ui.showAlert('Book Removed!', 'error');
})