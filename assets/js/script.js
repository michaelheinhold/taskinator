//Assignment code
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//gather input datas and convert to a variable
var taskFormHandler = function (event) {
    //prevent browser from refreshing
    event.preventDefault();

    //collect user data in input field
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //package data asn an object
    var taskDataObj ={
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

//return input datas from variables into a task
var createTaskEl = function(taskDataObj) {
    //create the list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" +taskDataObj.name + "</h3><span class='task-type'>"+ taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

//add task button code
formEl.addEventListener("submit", taskFormHandler);
