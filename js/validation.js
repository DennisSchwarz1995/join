
function handleSearch() {
    let searchInputValue = document
      .querySelector(".searchTaskInput")
      .value.toLowerCase();
    let filteredTasks = tasks.filter(
      (task) =>
        task.taskTitle.toLowerCase().includes(searchInputValue) ||
        task.taskDescription.toLowerCase().includes(searchInputValue)
    );
    updateBoard(filteredTasks);
  }
  
  function updateBoard(filteredTasks) {
    tasks.forEach((task) => {
      const taskCard = document.getElementById(
        `draggableContainer${tasks.indexOf(task)}`
      );
      if (filteredTasks.includes(task)) {
        taskCard.style.display = "flex";
      } else {
        taskCard.style.display = "none";
      }
    });
  }

  
/**
 *
 * @returns the lenght of the json
 */



/**
 *
 * @param {string} category
 * @returns the number of tasks with the input category
 */


/**
 * start the datatransfer by dragging a element
 * @param {DragEvent} event
 */
function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

/**
 * Handle the drag over event
 * @param {DragEvent} event
 */
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}
/**
 * Handle the drop event
 * @param {DragEvent} event
 */
function handleDrop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(taskId);
  const targetSlot = event.target.closest(".slot");
  if (targetSlot) {
    const categorySpan = getCategorySpan(targetSlot);
    if (categorySpan && categorySpan.textContent) {
      const newCategory = categorySpan.textContent;
      updateTaskCategoryAndBoard(taskId, newCategory);
      targetSlot.appendChild(draggedElement);
    }
  }
}

/**
 * Updates the Task Category if i drag and drop a task to a other category
 * @param {string} taskId
 * @param {string} newCategory
 */
function updateTaskCategory(taskId, newCategory) {
  const draggedTaskIndex = parseInt(taskId.replace("draggableContainer", ""));
  const draggedTask = tasks[draggedTaskIndex];
  if (draggedTask.category !== newCategory) {
    draggedTask.category = newCategory;
    tasks[draggedTaskIndex] = draggedTask;
    generateBoard();
  }
}

/**
 * Adds eventlisteners for the drag and drop function
 */
function addDragAndDropListeners() {
  let taskCards = document.querySelectorAll(".taskCard");
  taskCards.forEach((taskCard) => {
    taskCard.addEventListener("dragstart", handleDragStart);
  });

  let slots = document.getElementsByClassName("slot");
  for (const slot of slots) {
    slot.addEventListener("dragover", handleDragOver);
    slot.addEventListener("drop", handleDrop);
  }

  let searchInput = document.querySelector(".searchTaskInput");
  searchInput.addEventListener("input", handleSearch);
}


/**
 * Find and return an HTML element
 * @param {HTMLElement} targetSlot
 * @returns {Element}
 */
function getCategorySpan(targetSlot) {
  return targetSlot.querySelector(".boardCategory span");
}

function validateToDo(x) {
  if (x == 1) {
    let y = "To do";
    openAddTaskOverlay(y);
  } else if (x == 2) {
    let y = "In Progress";
    openAddTaskOverlay(y);
  } else if (x == 3) {
    let y = "Await feedback";
    openAddTaskOverlay(y);
  }
}