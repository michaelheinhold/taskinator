//Assignment code
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//insert list item function for when button is clicked
var createTaskHandler = function() {
    //prevent browser from refreshing
    event.preventDefault();
    
    //create the task item
    var listItemEl =document.createElement("li");
    listItemEl.className ="task-item";
    listItemEl.textContent="This is a task item.";
    tasksToDoEl.appendChild(listItemEl);
}

//add task button code
formEl.addEventListener("submit", createTaskHandler);
