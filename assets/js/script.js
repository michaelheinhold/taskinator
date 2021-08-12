//Assignment code
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

//gather input datas and convert to a variable
var taskFormHandler = function (event) {
    //prevent browser from refreshing
    event.preventDefault();

    //collect user data in input field
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    //package data as an object
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

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" +taskDataObj.name + "</h3><span class='task-type'>"+ taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add buttons and select option to list item
    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase taskIdCounter to keep id's unique
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent ="Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-test-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To-Do", "In Progress", "Completed"];
    for (var i=0; i <statusChoices.length; i++) {
        //create option element
        var statusOptionEl =document.createElement("option");
        statusOptionEl.textContent =statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

//add task button code
formEl.addEventListener("submit", taskFormHandler);

//gets taskId of the delete button clicked
var taskButtonHandler = function(event) {
    //get target element
    var targetEl = event.target;

    //checks if edit button was clicked
    if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //checks if delete button was clicked
    if (targetEl.matches(".delete-btn")) {
        //gets the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//edit button functionality
var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value =taskType;
    //changes submitbutton content to edit
    document.querySelector("#save-task").textContent ="Save Task";
    //sets the form to the id of the task
    formEl.setAttribute("data-task-id", taskId);
}

//delete button functionality
//deletes the task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId+ "']")
    taskSelected.remove();
};



pageContentEl.addEventListener("click", taskButtonHandler);
