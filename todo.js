//localStorage.clear(); //This removes all the things in the local Storage
//Javascript is sweet

//DOM SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//FUNCTIONS

//1.Function addItem
function addTodo(event) {
  //Prevent form from submitting when button is clicked
  event.preventDefault();
  //Create a new todoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create a new li that will live inside the todoDiv
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //Add TODO to local To Storage
  saveLocalTodos(todoInput.value);
  //Add a class of toso item to all the todos newly created
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //clear TODO input value
  todoInput.value = "";
  //Create a CheckMark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  //This works fine, but i want the value to be a fontawesome icon, i can either create a new  element or use the innerHTML function
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  //This works fine, but i want the value to be a fontawesome icon, i can either create a new  element or use the innerHTML function
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append TodoDiv TO TodoList
  todoList.appendChild(todoDiv);
}

//2.Function deleteCheck
function deleteCheck(e) {
  const item = e.target; //Let item be an DOM element currently
  //being clicked on
  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    //Add Animation
    todo.classList.add("fall");
    //When animation is done, remove the todoitem
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      //Wait for the transition to end before you remove the todo
      todo.remove();
    });
  }
  //If this occurs instead, checkmark todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

//3.Function filter todo
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
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
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//4.Function SaveToLocal
function saveLocalTodos(todo) {
  //CHECK...Hey, do i already have things in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; //Creates a new aray if there are no
    //todoitems preexisting
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    //Parse the existing todo items back into an array and return it
  }
  todos.push(todo); //Push the new todo into the array
  localStorage.setItem("todos", JSON.stringify(todos));
  //Set the new todoitem as a string into the todos array
}
//5.Function removeLocalTodos
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  //Remove the todoitem which fits this criteria
  localStorage.setItem("todos", JSON.stringify(todos));
  //Return the rest of the todoitems
}

//6.Function GetTodos
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; //Creates a new aray to store the todo items
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    //The todoitems are parsed and sent back to the todos as an array
  }
  todos.forEach(function (todo) {
    //Create a new todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create a new li that'll live inside the todoDiv
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    //This works fine, but i want the value to be a fontawesome icon, i can either create a new  element or use the innerHTML function
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Delete Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append Tododiv to todo
    todoList.appendChild(todoDiv);
  });
}
