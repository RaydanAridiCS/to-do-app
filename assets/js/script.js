document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("new-task-btn");
  const taskFormContainer = document.getElementById("task-form-container");
  const cancelTaskBtn = document.getElementById("cancel-task-btn");

  addTaskBtn.addEventListener("click", function () {
    taskFormContainer.classList.remove("hidden");
    taskFormContainer.classList.add("visible");
    addTaskBtn.style.display = "none";

  });

  cancelTaskBtn.addEventListener("click", function () {
    taskFormContainer.classList.remove("visible");
    taskFormContainer.classList.add("hidden");
    addTaskBtn.style.display = "block";
  });

  const taskList = document.getElementById("task-list");
  if (taskList) {
    taskList.addEventListener("click", function (event) {
      const deleteButton = event.target.closest(".delete-task-btn");
      const doneButton = event.target.closest(".done-task-btn");
      const clickedListItem = event.target.closest(".task-item");

      if (deleteButton) {
        if (clickedListItem) {
          clickedListItem.remove();
        }
      } else if (doneButton) {
        if (clickedListItem) {
          clickedListItem.classList.toggle("not-completed");
        }
      }
    });
  } 
  const addTask = document.getElementById("add-task-btn");
  addTask.addEventListener("click", function () {
    const taskName = document.getElementById("task-input");
    const priority = document.getElementById("priority-input");
    const selectedOption = priority.options[priority.selectedIndex];
    const visibleText = selectedOption.textContent;
    const dueDate = document.getElementById("date-input");
    const taskIcon = document.getElementById("icon-input");
  
    if (taskName.value.trim() !== "") {
      addTaskToDOM(taskName.value, dueDate.value, visibleText, taskIcon.value);    
      taskName.value = "";
      priority.selectedIndex = 0;
      dueDate.value = "";
      taskIcon.selectedIndex = 0;
    } else {
      alert("Please enter a task.");
    }
    taskFormContainer.classList.remove("visible");
    taskFormContainer.classList.add("hidden");
    addTaskBtn.style.display = "block";
  });

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
  
    const taskList = document.getElementById("task-list");
    if (taskList) {
      taskList.appendChild(listItem);
    } else {
      console.error("Task list container element with id 'taskList' not found.");
    }
  }
});