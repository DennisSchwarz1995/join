/**
 * Saves edits made to a task
 * @param {number} taskId - The ID of the task to edit
 */
function saveTaskEdits(taskId) {
  let taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) return;
  let category = document.getElementById("categorySelect").value;
  let categoryColor = getCategoryColor(category);
  let subtasks = getUpdatedSubtasks(tasks[taskIndex].subtasks);
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: document.getElementById("editTitleInput").value,
    description: document.getElementById("descriptionTextArea").value,
    assignedContacts: getUpdatedAssignedContacts(),
    dueDate: document.getElementById("dateInput").value,
    priority: getUpdatedSelectedTaskPriority(),
    category,
    categoryColor,
    subtasks,
    subtasksAmount: subtasks.length,
  };
  saveTasks();
  openTaskCardDetailedView(taskId);
  generateTasks();
  checkAndGenerateEmptyTask();
  addDragAndDropEventListeners();
}

/**
 * Gets the URL of the selected task priority icon
 * @returns {string} img src
 */
function getUpdatedSelectedTaskPriority() {
  let prioButtons = document.querySelectorAll(
    ".prioButtonsDiv button.selected"
  );
  if (prioButtons.length > 0) {
    let buttonImageSrc = prioButtons[0].querySelector("img").src;
    return buttonImageSrc.substring(buttonImageSrc.indexOf("/img"));
  }
}

/**
 * Retrieves updated assigned contacts from the DOM
 * @returns {Array} An array of objects representing updated assigned contacts
 */
function getUpdatedAssignedContacts() {
  return Array.from(document.querySelectorAll(".selectedContact")).map(
    (contact) => {
      let name = contact
        .querySelector(".dropDownContactName")
        .textContent.trim();
      let color = contact.querySelector(".dropDownContactIcon").style
        .backgroundColor;
      let initials = getInitials(name);
      return { name, color, initials };
    }
  );
}

/**
 * Retrieves updated subtasks from the DOM.
 * @param {Array} existingSubtasks - The array of existing subtasks.
 * @returns {Array} An array of objects representing updated subtasks.
 */
function getUpdatedSubtasks(existingSubtasks) {
  let subtaskElements = document.querySelectorAll(".subtaskLI");
  return Array.from(subtaskElements).map((el, index) => {
    let description = el.querySelector(".subtaskText").textContent.trim();
    let existingSubtask = existingSubtasks.find(
      (subtask) => subtask.id === `subtask-${index}`
    );
    let completed = existingSubtask ? existingSubtask.completed : false;
    return {
      id: `subtask-${index}`,
      description,
      completed,
    };
  });
}

/**
 * Filters tasks based on the input value
 * @returns matches in the array of tasks and the input value
 */
function getTasksByFilter() {
  let searchInputValue = document
    .querySelector(".searchTaskInput")
    .value.toLowerCase();
  if (searchInputValue) {
    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(searchInputValue) ||
        task.description.toLowerCase().includes(searchInputValue)
      );
    });
  } else {
    return tasks;
  }
}

/**
 * Deletes a task
 * @param {string} taskId  - the ID of the tasks to delete
 */
function deleteTask(taskId) {
  let taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(taskIndex, 1);
  saveTasks();
  generateTasks();
  closeAddTaskOverlay(true);
}

/**
 * Deletes a task
 * @param {string} taskId  - the ID of the tasks to change the taskcategory from
 * @param {HTMLElement} newCategory  - the element which got selected by the user
 */
function changeTaskCategory(taskId, newCategory) {
  let taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks[taskIndex].taskCategory = newCategory;
  saveTasks();
  generateTasks();
}


/**
 * Updates the completion status of a subtask and updates the task progress
 * @param {string} subtaskId - The ID of the subtask
 * @param {boolean} isChecked - The new completion status of the subtask
 */
function updateSubtaskCompletion(subtaskId, isChecked) {
  let matches = subtaskId.match(/task-(\d+)-subtask-(\d+)/);
  if (!matches) return;
  let taskId = parseInt(matches[1], 10);
  let subtaskIndex = parseInt(matches[2], 10);
  let task = tasks.find((task) => task.id === taskId);
  if (!task || !task.subtasks[subtaskIndex]) return;

  let subtask = task.subtasks[subtaskIndex];
  subtask.completed = isChecked;
  updateTaskProgress(task);
  saveTasks();
}

/**
 * Toggles the status of a subtask and updates the progress
 * @param {Event} event -The event object
 */
function toggleSubtaskCompletion(event) {
  let checkBoxIcon = event.target;
  let subtaskId = checkBoxIcon.id;
  let isChecked = checkBoxIcon.src.includes("checkbox-icon-selected.svg");
  updateSubtaskCompletion(subtaskId, !isChecked);
  let taskId = parseInt(subtaskId.split("-")[1]);
  let task = tasks.find((task) => task.id === taskId);
  updateTaskProgress(task);
  saveTasks();
  if (isChecked) {
    checkBoxIcon.src = "../img/checkbox-icon.svg";
    checkBoxIcon.style.width = "24px";
    checkBoxIcon.style.height = "24px";
  } else {
    checkBoxIcon.src = "../img/checkbox-icon-selected.svg";
    checkBoxIcon.style.width = "19px";
    checkBoxIcon.style.height = "19px";
  }
}
