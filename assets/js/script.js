//Assignment code
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//insert list item function for when button is clicked
var createTaskHandler = function() {
    var listItemEl =document.createElement("li");
    listItemEl.className ="task-item";
    listItemEl.textContent="This is a task item.";
    tasksToDoEl.appendChild(listItemEl);
}

//add task button code
buttonEl.addEventListener("click", createTaskHandler);
