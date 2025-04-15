
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById("new-task-btn");
    const taskFormContainer = document.getElementById("task-form-container");
    const taskForm = document.getElementById("task-form");
    const cancelTaskBtn = document.getElementById("cancel-task-btn");

    addTaskBtn.addEventListener("click", function() {
        taskFormContainer.style.display = "block";
        addTaskBtn.style.display = "none";
        if (taskForm) {
            taskForm.reset();
        }
    });

    cancelTaskBtn.addEventListener("click", function() {
        taskFormContainer.style.display = "none";
        addTaskBtn.style.display = "block";
    });
});