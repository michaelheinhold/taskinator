//Assignment code
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//insert list item function for when button is clicked
var createTaskHandler = function () {
    //prevent browser from refreshing
    event.preventDefault();

    //collect user data in input field
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //create the list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" +taskNameInput + "</h3><span class='task-type'>"+ taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);
}

//add task button code
formEl.addEventListener("submit", createTaskHandler);
