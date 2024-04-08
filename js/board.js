async function initBoard() {
  await loadTasks();
  await loadContacts();
  generateNavbar();
  generateHeader();
  generateTasks();
  checkAndGenerateEmptyTask();
  addDragAndDropEventListeners();
}

let tasks = [];
let currentTaskCategory = null;
let isDetailedViewOpen = false;

function generateTasks() {
  let toDoTaskList = document.querySelector(".toDoTaskList");
  let inProgressTaskList = document.querySelector(".inProgressTaskList");
  let awaitFeedbackTaskList = document.querySelector(".awaitFeedbackTaskList");
  let doneTaskList = document.querySelector(".doneTaskList");
  toDoTaskList.innerHTML = "";
  inProgressTaskList.innerHTML = "";
  awaitFeedbackTaskList.innerHTML = "";
  doneTaskList.innerHTML = "";
  getTasksByFilter().forEach((taskData) => {
    let taskHTMLContent = taskHTML(taskData);
    if (taskData.taskCategory === "to do") {
      toDoTaskList.innerHTML += taskHTMLContent;
    } else if (taskData.taskCategory === "in progress") {
      inProgressTaskList.innerHTML += taskHTMLContent;
    } else if (taskData.taskCategory === "await feedback") {
      awaitFeedbackTaskList.innerHTML += taskHTMLContent;
    } else if (taskData.taskCategory === "done") {
      doneTaskList.innerHTML += taskHTMLContent;
    }
  });
  checkAndGenerateEmptyTask();
  addDragAndDropEventListeners();
}

function checkAndGenerateEmptyTask() {
  let taskListClasses = [
    "toDoTaskList",
    "inProgressTaskList",
    "awaitFeedbackTaskList",
    "doneTaskList",
  ];
  taskListClasses.forEach((listClass) => {
    let taskList = document.querySelector(`.${listClass}`);
    if (taskList) {
      let taskCards = taskList.querySelectorAll(".taskCard");
      let formattedCategoryName = formatCategoryName(
        listClass.replace("TaskList", "")
      );
      let emptyTaskElement = document.getElementById(
        `emptyTask-${formattedCategoryName}`
      );
      if (taskCards.length === 0 && !emptyTaskElement) {
        let emptyTaskHTML = generateEmptyTask(formattedCategoryName);
        taskList.innerHTML += emptyTaskHTML;
      } else if (taskCards.length > 0 && emptyTaskElement) {
        emptyTaskElement.remove();
      }
    }
  });
}

function formatCategoryName(categoryName) {
  return categoryName.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

function openAddTaskOverlay(taskCategory, isDetailedViewOpen) {
  let { overlay, background } = getOverlayValues(isDetailedViewOpen);
  if (!isDetailedViewOpen) {
    currentTaskCategory = taskCategory;
    setTimeout(() => {
      generateAddTaskOverlay(contacts);
      overlay.classList.add("show");
      setMediumButtonSelected();
      checkValuesForCreateTaskButton();
    }, 0);
    background.classList.remove("invisible");
  } else {
    overlay.classList.add("show");
    background.classList.remove("invisible");
  }
}

function closeAddTaskOverlay(isDetailedViewOpen) {
  let { overlay, background } = getOverlayValues(isDetailedViewOpen);
  if (!isDetailedViewOpen) {
    overlay.classList.remove("show");
    clearTaskSelectorForm();
    setTimeout(() => {
      overlay.classList.remove("show");
      overlay.innerHTML = "";
    }, 300);
    background.classList.add("invisible");
  } else {
    overlay.classList.remove("show");
    background.classList.add("invisible");
  }
}

function getOverlayValues(isDetailedViewOpen) {
  let overlay;
  let background;
  if (isDetailedViewOpen) {
    overlay = document.querySelector(".taskCardDetailedView");
    background = document.querySelector(".taskCardOverlayBackground");
  } else {
    overlay = document.querySelector(".addTaskOverlay");
    background = document.querySelector(".taskOverlayBackground");
  }
  return { overlay, background };
}

function getTasksLength() {
  return tasks.length;
}

function countTasksByCategory(category) {
  return tasks.filter((task) => task.category === category).length;
}

function addDragAndDropEventListeners() {
  let draggables = document.querySelectorAll(".taskCard");
  let dropOffContainers = document.querySelectorAll(
    ".toDoTaskList, .inProgressTaskList, .awaitFeedbackTaskList, .doneTaskList"
  );

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
      updateTaskPosition(draggable);
    });
  });

  dropOffContainers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      let afterElement = getDragAfterElement(container, e.clientY);
      let draggedContainer = document.querySelector(".dragging");
      if (afterElement == null) {
        container.appendChild(draggedContainer);
        checkAndGenerateEmptyTask();
      } else {
        container.insertBefore(draggedContainer, afterElement);
        checkAndGenerateEmptyTask();
      }
    });
  });
}

function updateTaskPosition(draggedTask) {
  let taskId = parseInt(draggedTask.id.split("-")[1]);
  let newCategory = getCategoryFromClassList(draggedTask.parentNode.classList);
  let taskIndex = tasks.findIndex((task) => {
    return task.id === taskId;
  });
  if (taskIndex !== -1) {
    tasks[taskIndex].taskCategory = newCategory;
    saveTasks();
  }
}

function getDragAfterElement(container, y) {
  let draggableElements = [
    ...container.querySelectorAll(".taskCard:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      let box = child.getBoundingClientRect();
      let offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function getCategoryFromClassList(classList) {
  if (classList.contains("toDoTaskList")) {
    return "to do";
  } else if (classList.contains("inProgressTaskList")) {
    return "in progress";
  } else if (classList.contains("awaitFeedbackTaskList")) {
    return "await feedback";
  } else if (classList.contains("doneTaskList")) {
    return "done";
  }
  return "to do";
}

function updateTaskProgress(task) {
  let completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;
  let progress = (completedSubtasks / task.subtasks.length) * 100;
  let progressBarFill = document.querySelector(
    `#task-${task.id} .taskProgressBarFill`
  );
  if (progressBarFill) {
    progressBarFill.style.width = `${progress}%`;
  }
  let taskProgressCount = document.querySelector(
    `#task-${task.id} .taskProgressCount`
  );
  if (taskProgressCount) {
    taskProgressCount.textContent = `${completedSubtasks} / ${task.subtasks.length}`;
  }
}

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

function checkAssignedContactLength(taskData) {
  let maxContactsToDisplay = 3;
  let additionalContactsCount =
    taskData.assignedContacts.length - maxContactsToDisplay;

  if (taskData.assignedContacts.length === 0) {
    return `<div class="taskContact invisible" style="background: var(--main-color-darkblue)">0</div>`;
  }

  if (additionalContactsCount > 0) {
    let additionalsContactsHTML = `<div class="taskContact" style="background: var(--main-color-darkblue)">+${additionalContactsCount}</div>`;
    return (
      taskData.assignedContacts
        .slice(0, maxContactsToDisplay)
        .map(
          (contact) =>
            `<div class="taskContact" style="background: ${contact.color}">${contact.initials}</div>`
        )
        .join("") + additionalsContactsHTML
    );
  } else {
    return taskData.assignedContacts
      .map(
        (contact) =>
          `<div class="taskContact" style="background: ${contact.color}">${contact.initials}</div>`
      )
      .join("");
  }
}

function openTaskCardDetailedView(taskId) {
  let task = tasks.find((task) => task.id === taskId);
  let detailedViewHTML = taskCardDetailedViewTemplate(task);
  let taskCardDetailedView = document.querySelector(".taskCardDetailedView");
  taskCardDetailedView.innerHTML = detailedViewHTML;
  taskCardDetailedView.classList.add("show");
  openAddTaskOverlay("", true);
}

function formatDate(dateString) {
  let parts = dateString.split("-");
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]);
  let day = parseInt(parts[2]);
  let formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

function getPriorityNameFromURL(priorityURL) {
  let priority = priorityURL.split("/").pop().split("-")[0];
  switch (priority) {
    case "medium":
      return "Medium";
    case "urgent":
      return "Urgent";
    case "low":
      return "Low";
    default:
      return "Unknown";
  }
}

function openEditTaskOverlay(taskId) {
  let task = tasks.find((task) => task.id === taskId);
  if (!task) return;
  generateEditTaskHTML(
    task,
    task.assignedContacts,
    task.subtasks,
    task.priority
  );
}

function saveTaskEdits(taskId) {
  let taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) return;
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;
  saveTasks();
  openTaskCardDetailedView(taskId);
}

function generateAssignedContacts(assignedContacts) {
  let contactInitialsDiv = document.querySelector(".contactInitials");
  let contactInitialsHTML = "";
  assignedContacts.forEach((contact) => {
    contactInitialsHTML += `
      <div class="dropDownContactIcon" data-contact="${contact.name}" style="background-color: ${contact.color};">${contact.initials}</div>
    `;
  });
  contactInitialsDiv.innerHTML = contactInitialsHTML;
}

function highlightAssignedContacts(assignedContacts) {
  let dropDownContactDivs = document.querySelectorAll(".dropDownContactDiv");
  dropDownContactDivs.forEach((div) => {
    let contactName = div.querySelector(".dropDownContactName").textContent;
    let isSelected = assignedContacts.some((ac) => ac.name === contactName);
    let checkBoxIcon = div.querySelector(".checkBoxIcon");
    let checkBoxIconDiv = div.querySelector(".checkBoxIconDiv");
    if (isSelected) {
      div.classList.add("selectedContact");
      checkBoxIcon.classList.add("selectedContactCheckBox");
      checkBoxIcon.src = "../img/checkbox-icon-selected.svg";
      checkBoxIconDiv.style.height = "19px";
    } else {
      div.classList.remove("selectedContact");
      checkBoxIcon.classList.remove("selectedContactCheckBox");
      checkBoxIcon.src = "../img/checkbox-icon.svg";
      checkBoxIconDiv.style.height = "24px";
    }
  });
}

function highlightSelectedTaskCategory() {
  let dropDownCategoryDivs = document.querySelectorAll(".dropDownCategoryDiv");
  let selectedCategory = document.querySelector(".categorySelect").value;

  dropDownCategoryDivs.forEach((div) => {
    let categoryName = div.textContent.trim();
    if (selectedCategory === categoryName) {
      div.classList.add("selectedCategory");
    } else {
      div.classList.remove("selectedCategory");
    }
  });
}

function getButtonPrio(priority) {
  let button = null;
  switch (priority) {
    case "/img/urgent-icon.svg":
      button = document.querySelector(".urgentButton");
      break;
    case "/img/medium-icon.svg":
      button = document.querySelector(".mediumButton");
      break;
    case "/img/low-icon.svg":
      button = document.querySelector(".lowButton");
      break;
    default:
      break;
  }
  setButtonPrio(button);
}

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

function getUpdatedSelectedTaskPriority() {
  let prioButtons = document.querySelectorAll(
    ".prioButtonsDiv button.selected"
  );
  if (prioButtons.length > 0) {
    let buttonImageSrc = prioButtons[0].querySelector("img").src;
    return buttonImageSrc.substring(buttonImageSrc.indexOf("/img"));
  }
}

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

function deleteTask(taskId) {
  let taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(taskIndex, 1);
  saveTasks();
  generateTasks();
  closeAddTaskOverlay(true);
}