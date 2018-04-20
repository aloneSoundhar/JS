// Todo Constructor
function Todo(time, todo) {
    this.time = time;
    this.todo = todo;
}

// UI Constructor
function UI() {}

// Store Constructor
function Store() {}

Store.prototype.getTodos = function() {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = Array.from(JSON.parse(localStorage.getItem('todos')));
    }
    return todos;
}

Store.prototype.displayTodos = function() {
    let todos = this.getTodos();

    console.log(todos);

    todos.forEach(todo => {
        const ui = new UI();

        ui.addTodoToList(todo);
    });
}

Store.prototype.addTodo = function(todo) {
    let todos = this.getTodos();

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

Store.prototype.removeTodo = function(todoText) {
    let todos = this.getTodos();

    todos.forEach((todo, index) => {
        if (todo.todo === todoText) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}


// Show Alert
UI.prototype.showAlert = function(msg, className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`;
    div.textContent = msg;

    const table = document.querySelector('.table');
    console.log(table);

     const container = document.querySelector('.container-fluid');

     container.insertBefore(div, table);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);

}

// Adding to List
UI.prototype.addTodoToList = function(todo) {
    const todoList = document.getElementById('todo-list');

    const row = document.createElement('tr');


    row.innerHTML = `
        <td>${todo.time}</td>
        <td>${todo.todo}</td>
        <td><span class="delete glyphicon glyphicon-remove"></span></td>
    `.trim();

    todoList.appendChild(row);
}

UI.prototype.removeFromList = function(target) {
    target.parentNode.parentNode.remove();
}

// Display Events
document.addEventListener('DOMContentLoaded', function() {
    const store = new Store();

    store.displayTodos();
});

// Add EventListener
document.querySelector('#todo-form').addEventListener('submit', addTodo);

// Remove EventListener
document.querySelector('#todo-list').addEventListener('click', removeTodo);

// Adding Todo
function addTodo(e) {
    const time = String(new Date().getHours()) + ':' + String(new Date().getMinutes());
    const todoInput = document.getElementById('todo').value
    
    const todo = new Todo(time, todoInput);
    const ui = new UI();

   const store = new Store();

    // Validation
    if (todoInput === '') {
        ui.showAlert('Please Fill in Fields!', 'alert-danger');
    } else {
        // Adding to ui
        ui.addTodoToList(todo);

        store.addTodo(todo);

        ui.showAlert('Added Successfully', 'alert-success');
    }

    

    e.preventDefault();
}

// Removing Todo
function removeTodo(e) {
    // Event Delegation
    if(e.target.className.includes('delete')) {
       const ui = new UI();
       const store = new Store();

       ui.removeFromList(e.target);
       ui.showAlert('Todo removed!', 'alert-danger');
       store.removeTodo(e.target.parentElement.previousElementSibling.textContent);
    }


    e.preventDefault();
}