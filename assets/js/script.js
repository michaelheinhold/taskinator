//Assignment code
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

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

    var isEdit = formEl.hasAttribute("data-task-id");

    //has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute so create as normal to pass to create taskEL funciton
    else {
        //package data as an object
        var taskDataObj ={
            name: taskNameInput,
            type: taskTypeInput
        };
        
        createTaskEl(taskDataObj);
    }
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
    statusSelectEl.setAttribute("data-task-id", taskId);

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
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value =taskType;
    //changes submitbutton content to edit
    document.querySelector("#save-task").textContent ="Save Task";
    //sets the form to the id of the task
    formEl.setAttribute("data-task-id", taskId);
}

//2nd step to edit button after recieving input from form
var completeEditTask = function(taskName, taskType, taskId) {
    //finds matching list item with id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    //resets form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

//delete button functionality
//deletes the task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId+ "']")
    taskSelected.remove();
};

//changing task status
var taskStatusChangeHandler = function(event){
    //get the task id
    var taskId = event.target.getAttribute("data-task-id");
    

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue==="in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};


pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
