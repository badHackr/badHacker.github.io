// calling sw.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('service worker register', reg))
        .catch((err) => console.log('Service worker not registerd', err))
}


// Selectors

const todoInput = document.querySelector(".todo-input")

const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event lister

document.addEventListener('DOMContentLoaded', getTodos)

todoButton.addEventListener('click', addToDo);

todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('click', filterTodo);

function addToDo(event) {
    //Prevent from from submitting
    event.preventDefault();
    //todo div

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creating Li

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADdd item to local storage

    saveToLocal(todoInput.value); // Now the todoINput value is the param 


    //Check mark button


    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check Trash button
    const trashButton = document.createElement("button");

    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list

    todoList.appendChild(todoDiv);

    //clear todo input

    todoInput.value = "";
    todoInput.focus();



}
// DELETING TODO

function deleteCheck(e) {
    const item = e.target;
    // console.log(item); check the class wether complete button or trash buttton
    //delete todo
    if (item.classList[0] === "trash-btn") {
        // console.log(item.classList[0]); 
        const todos = item.parentElement;
        // console.log(todos);
        //animation class
        deleteTodo(todos);
        todos.classList.add("fall");
        todos.addEventListener('transitionend', () => { // trasitionend check wether the transition is ended 
            todos.remove();
        });


    }
    // cHECK
    if (item.classList[0] === "complete-btn") {
        console.log(item.classList[0]);
        const todos = item.parentElement;
        todos.classList.toggle("completed");
    }


}

// Filters

function filterTodo(e) {
    const todos = todoList.childNodes; // LIST ALL CHILD NODES
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                todo.style.display = "flex";
        }

    });

}

//LOcal Storage 

function saveToLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        // checking ant data on lS
        todos = []; // if not create an array
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //else it bring the data to todo
    }
    todos.push(todo); // pass the function param to todos array
    localStorage.setItem("todos", JSON.stringify(todos)); // now it passed to local storage

}


function getTodos(todo) {
    todoInput.focus();
    let todos;
    if (localStorage.getItem("todos") === null) {
        // checking ant data on lS
        todos = []; // if not create an array
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //else it bring the data to todo
    }
    todos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //creating Li

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //ADdd item to local storage




        //Check mark button


        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Check Trash button
        const trashButton = document.createElement("button");

        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list

        todoList.appendChild(todoDiv);

        //clear todo input


        todoInput.focus();


    });

}


function deleteTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        // checking ant data on lS
        todos = []; // if not create an array
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //else it bring the data to todo
    }
    const indexOFTodos = todo.children[0].innerText;
    todos.splice(todos.indexOf(indexOFTodos), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}