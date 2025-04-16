document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("new-task-btn");
  const taskFormContainer = document.getElementById("task-form-container");
  const cancelTaskBtn = document.getElementById("cancel-task-btn");

  //Cancel btn functionality
  addTaskBtn.addEventListener("click", function () {
    taskFormContainer.classList.remove("hidden");
    taskFormContainer.classList.add("visible");
    addTaskBtn.style.display = "none";

  }); 
  //Add task btn functionality
  cancelTaskBtn.addEventListener("click", function () {
    taskFormContainer.classList.remove("visible");
    taskFormContainer.classList.add("hidden");
    addTaskBtn.style.display = "block";
  });

  const numberOfTasks = document.getElementById("number-of-tasks");
  let numOfTasks =  numberOfTasks.textContent = 0;
  
  
  //Complete and Delete Task 
  const taskList = document.getElementById("task-list");
  if (taskList) {
    taskList.addEventListener("click", function (event) {
      const deleteButton = event.target.closest(".delete-task-btn");
      const doneButton = event.target.closest(".done-task-btn");
      const clickedListItem = event.target.closest(".task-item");

      if (deleteButton) {
        if (clickedListItem) {
          numberOfTasks.textContent = numOfTasks - 1;
          clickedListItem.remove();
        }
      } else if (doneButton) {
        if (clickedListItem) {
          clickedListItem.classList.toggle("not-completed");
        }
      }
    });
  }


  //Adding a new Task
  const addTask = document.getElementById("add-task-btn");
  addTask.addEventListener("click", function () {
    const taskName = document.getElementById("task-input");
    const priority = document.getElementById("priority-input");
    const selectedOption = priority.options[priority.selectedIndex];
    const visibleText = selectedOption.textContent;
    const dueDate = document.getElementById("date-input");
    const taskIcon = document.getElementById("icon-input");
  
    
    if(taskName.value.trim() !== ""){
      if(dueDate.value.trim() !== ""){
        if(priority.selectedIndex !== 0){
          if(taskIcon.selectedIndex !== 0 ){
            addTaskToDOM(taskName.value, dueDate.value, visibleText, taskIcon.value);    
            taskName.value = "";
            priority.selectedIndex = 0;
            dueDate.value = "";
            taskIcon.selectedIndex = 0;
            numberOfTasks.textContent = numOfTasks ;
            taskFormContainer.classList.remove("visible");
            taskFormContainer.classList.add("hidden");
            addTaskBtn.style.display = "block";
          }else 
            showToast("Please enter an icon.");
        }else 
          showToast("Please enter a priority.");
      }else 
        showToast("Please enter a due-date.");
    }else 
      showToast("Please enter a task name.");

    
  

});

  //Function to add task to the DOM
  function addTaskToDOM(taskName, dueDate, priority, taskIcon) {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");
    listItem.classList.add("not-completed");
  
    const IconSpan = document.createElement("span");
    IconSpan.classList.add("fas", `fa-${taskIcon}`);
    
  
    const taskNameSpan = document.createElement("span");
    taskNameSpan.classList.add("task-text");
    taskNameSpan.textContent = taskName;
  
    const dueDateSpan = document.createElement("span");
    dueDateSpan.classList.add("task-due-date");
    dueDateSpan.textContent = dueDate ? dueDate : "";
  
    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add("task-priority");
    prioritySpan.textContent = priority;
  
    const doneButton = document.createElement("button");
    doneButton.classList.add("done-task-btn");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
  
    doneButton.addEventListener("click", function () {
      listItem.classList.toggle("completed");
    });
  
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  
    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });
  
    const statusSpan = document.createElement("span");
    statusSpan.classList.add("task-status");
    statusSpan.textContent = "Pending";
  
    listItem.appendChild(IconSpan);
    listItem.appendChild(taskNameSpan);
    listItem.appendChild(dueDateSpan);
    listItem.appendChild(prioritySpan);
    listItem.appendChild(statusSpan);
    listItem.appendChild(doneButton);
    listItem.appendChild(deleteButton);

    numOfTasks += 1;
    
    const taskList = document.getElementById("task-list");
    if (taskList) {
      taskList.appendChild(listItem);
    } else {
      console.error("Task list container element with id 'taskList' not found.");
    }
  
  }

});


function sortTasksByDueDate() {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.children);

  tasks.sort((a, b) => {
    const dueDateA = new Date(a.querySelector(".task-due-date").textContent);
    const dueDateB = new Date(b.querySelector(".task-due-date").textContent);
    return dueDateA - dueDateB;
  });

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  tasks.forEach(task => taskList.appendChild(task));
}

function sortTasksByPriority() {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.children);

  const priorityOrder = {
    "Can Wait": 7,
    "No Hurry":6,
    "Chill": 5,
    "I will do it tomorrow": 4,
    "Should do": 3,
    "ASAP": 2,
    "Urgent": 1
  };

  tasks.sort((a, b) => {
    const priorityA = priorityOrder[a.querySelector(".task-priority").textContent.trim()];
    const priorityB = priorityOrder[b.querySelector(".task-priority").textContent.trim()];

    if (priorityA === undefined || priorityB === undefined) {
      console.error("Priority not found for one or both tasks.");
      return 0; 
    }

    return priorityA - priorityB;
  });

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  tasks.forEach(task => taskList.appendChild(task));
}

//Sorting tasks by due date
const sortByDueDate = document.getElementById("sort-due-date");
sortByDueDate.addEventListener("click", function () {
  console.log("Sorting by due date");
  sortTasksByDueDate();
  sortByDueDate.classList.add("active");
  sortByPriority.classList.remove("active");
  originalSort.classList.remove("active");
});

//Sorting tasks by priority
const sortByPriority = document.getElementById("sort-priority");
sortByPriority.addEventListener("click", function () {
  sortTasksByPriority();
  sortByPriority.classList.add("active");
  sortByDueDate.classList.remove("active");
  originalSort.classList.remove("active");
});




  const completedTasks = document.getElementById("completed-tasks");
  completedTasks.addEventListener("click", function () {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.children);

  pendingTasks.classList.remove("active");
  completedTasks.classList.add("active");
  allTasks.classList.remove("active");

  tasks.forEach(task => {
    if (task.classList.contains("completed")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

const allTasks = document.getElementById("all-tasks");
allTasks.addEventListener("click", function () {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.children);

  pendingTasks.classList.remove("active");
  completedTasks.classList.remove("active");
  allTasks.classList.add("active");

  tasks.forEach(task => {
    task.style.display = "flex";
  });
});

const pendingTasks = document.getElementById("pending-tasks");
pendingTasks.addEventListener("click", function () {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.children);

  pendingTasks.classList.add("active");
  completedTasks.classList.remove("active");
  allTasks.classList.remove("active");

  tasks.forEach(task => {
    if (task.classList.contains("completed")) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
});

function showToast(message, duration = 3000) { 
  const toastElement = document.getElementById("toast-notification");
  const messageElement = document.getElementById("toast-message");

  if (!toastElement || !messageElement) {
    console.error("Toast elements not found!");
    return;
  }

  messageElement.textContent = message;

  toastElement.classList.add("show");

  setTimeout(() => {
    hideToast();
  }, duration);
}

function hideToast() {
   const toastElement = document.getElementById("toast-notification");
   if (toastElement) {
      toastElement.classList.remove("show");
   }
}

