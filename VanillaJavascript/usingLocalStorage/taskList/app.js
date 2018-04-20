// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all Event Listeners
loadEventListeners();

function loadEventListeners() {
    // Add task Event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear Task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
    // Dom load Event
    document.addEventListener('DOMContentLoaded', getTasks);
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // Create li Element
    const li = document.createElement('li');
    // Add a className
    li.className = 'collection-item';
    // Create text node and Append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new Link Element
    const link = document.createElement('a');
    // Add a class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append the li to ul
    taskList.appendChild(li)

    // Store in localStaorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';


    e.preventDefault();
}


// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',  JSON.stringify(tasks));
}

// remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if(taskItem.textContent == task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}   

function clearTasks(e) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}


// Clear tasks from LocalStorage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        task => {
            const item = task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}


function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        const li = document.createElement('li');
        // Add a className
        li.className = 'collection-item';
        // Create text node and Append to li
        li.appendChild(document.createTextNode(task));
        // Create new Link Element
        const link = document.createElement('a');
        // Add a class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append the li to ul
        taskList.appendChild(li)
    })
}