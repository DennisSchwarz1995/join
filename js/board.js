async function initBoard() {
  await loadTasks();
  await loadContacts();
  generateBoard();
  generateNavbar();
  generateHeader();
  saveTasks();
}

function generateBoard() {
  let board = document.querySelector(".board");
  if (board) {
    board.innerHTML = boardHTML();
    let searchInput = document.querySelector(".searchTaskInput");
    searchInput.addEventListener("input", handleSearch);
    addDragAndDropListeners();
    checkIfToDoTaskcardEmpty();
    checkIfInProgressTaskcardEmpty();
    checkIfAwaitFeedbackTaskcardEmpty();
    checkIfDoneTaskcardEmpty();
    saveTasks();
  }
}

let tasks = [
  {
    category: "To do",
    taskCategory: "Javascript",
    taskTitle: "Sharkie",
    taskDescription:
      "2D Action game, play the shark catch enemies with the bubble",
    progressCount: "1/2 Subtasks",
  },
  {
    category: "In progress",
    taskCategory: "Javascript",
    taskTitle: "Kochwelt Page & Recipe Recommender",
    taskDescription: "Build start page with recipe recommendation",
    progressCount: "1/2 Subtasks",
  },
  {
    category: "Await feedback",
    taskCategory: "User Story",
    taskTitle: "Kochwelt Page & Recipe Recommender",
    taskDescription: "Build start page with recipe recommendation",
    progressCount: "1/2 Subtasks",
  },
  {
    category: "Done",
    taskCategory: "HTML",
    taskTitle: "Kochwelt Page & Recipe Recommender",
    taskDescription: "Build start page with recipe recommendation",
    progressCount: "1/2 Subtasks",
  },
];


function getTasksLength() {
  return tasks.length;
};

function countTasksByCategory(category) {
  return tasks.filter((task) => task.category === category).length;
}


function updateTaskCategory(taskId, newCategory) {
  const draggedTaskIndex = parseInt(taskId.replace("draggableContainer", ""));
  const draggedTask = tasks[draggedTaskIndex];
  if (draggedTask.category !== newCategory) {
    draggedTask.category = newCategory;
    tasks[draggedTaskIndex] = draggedTask;
    checkIfToDoTaskcardEmpty();
    checkIfInProgressTaskcardEmpty();
    checkIfAwaitFeedbackTaskcardEmpty();
    checkIfDoneTaskcardEmpty();
    generateBoard();
  }
}


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
}


function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}


function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

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


function getCategorySpan(targetSlot) {
  return targetSlot.querySelector(".boardCategory span");
}


function updateTaskCategoryAndBoard(taskId, newCategory) {
  updateTaskCategory(taskId, newCategory);
  const checkFunctionMap = {
    "To do": checkIfToDoTaskcardEmpty,
    "In progress": checkIfInProgressTaskcardEmpty,
    "Await feedback": checkIfAwaitFeedbackTaskcardEmpty,
    Done: checkIfDoneTaskcardEmpty,
  };
  checkFunctionMap[newCategory]();
  saveTasks();
}


function generateEmptyTask() {
  let taskCards = document.querySelectorAll(".taskCardDiv");
  taskCards.forEach((taskCard, index) => {
    let categoryName = document.querySelectorAll(".boardCategory span")[index]
      .textContent;
    taskCard.innerHTML = emptyTaskHTML(categoryName);
  });
}


function validateToDo(x) {
  if (window.innerWidth <= 768) {

    window.location.href = "add_task.html";
    return;
  } else if (x == 1) {
    let y = "To do";
    openAddTaskOverlay(y);
  } else if (x == 2) {
    let y = "In Progress";
    openAddTaskOverlay(y);
  } else if (x == 3) {
    let y = "Await feedback";
    openAddTaskOverlay(y);
  } else if (x == 4) {
    let y = "Done";
    openAddTaskOverlay(y);
  }
}


function checkIfToDoTaskcardEmpty() {
  checkIfTaskCardEmpty("To do", ".toDoTaskList");
}

function checkIfInProgressTaskcardEmpty() {
  checkIfTaskCardEmpty("In progress", ".inProgressTaskList");
}

function checkIfAwaitFeedbackTaskcardEmpty() {
  checkIfTaskCardEmpty("Await feedback", ".awaitFeedbackTaskList");
}

function checkIfDoneTaskcardEmpty() {
  checkIfTaskCardEmpty("Done", ".doneTaskList");
}

function checkIfTaskCardEmpty(category, listSelector) {
  const taskList = document.querySelector(listSelector);
  const emptyTaskElement = document.getElementById(`emptyTask-${category}`);
  const categoryTasks = tasks.filter((task) => task.category === category);
  if (categoryTasks.length === 0) {
    if (!emptyTaskElement) {
      const emptyTaskHTML = generateEmptyTask(category);
      taskList.insertAdjacentHTML("beforeend", emptyTaskHTML);
    }
  } else {
    if (emptyTaskElement) {
      emptyTaskElement.remove();
    }
  }
}


function openAddTaskOverlay() {
  generateAddTaskOverlay(contacts);
  let overlay = document.querySelector(".addTaskOverlay");
  setTimeout(() => {
    overlay.classList.add("show");
  }, 0);
}

function handleSearch() {
  const searchInputValue = document
    .querySelector(".searchTaskInput")
    .value.toLowerCase();
  const filteredTasks = tasks.filter(
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

async function deleteTasks(taskId) {
  try {
    tasks.splice(taskId, 1);
    await saveTasks();
  } catch (error) {
    console.error(error);
  }
}

function generateAddTaskOverlay(contacts) {
  let addTaskOverlayHTML = `
    <div class="addTaskOverlayBackground">
          <div class="addTaskOverlay">
          <h1>Add Task</h1>
          <form class="taskSelector" name="taskSelector" onsubmit="createTask(); return false;">
            <div class="taskSelectorLeft">
              <div class="titleDiv">
                <label for="titleInput" class="required">Title</label>
                <input type="text" maxlength="16" placeholder="Enter a title" class="titleInput" id="titleInput" oninput="checkValuesForCreateTaskButton()" />
                <div class="titleInvalidDiv invisible">
                  This field is required.
                </div>
              </div>
              <div class="descriptionDiv">
                <label for="descriptionTextArea">Description</label>
                <textarea maxlength="50" class="descriptionTextArea" id="descriptionTextArea"
                  placeholder="Enter a Description"></textarea>
              </div>
              <div class="assignedDiv">
                <label for="contactsSelect">Assigned to</label>
                <div class="contactsSelectDiv">
                  <input type="text" placeholder="Select contacts to assign" class="contactsSelect" id="contactsSelect"
                    onclick="toggleDropdown()" readonly />
                  <div class="dropDownArrowDiv" onclick="toggleDropdown()">
                    <img class="dropDownArrow" src="../img/drop-down-arrow.svg" alt="" />
                  </div>
                </div>
                <section class="dropDownContacts invisible"></section>
                <div class="contactInitials"></div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="taskSelectorRight">
              <div class="dueDateDiv">
                <label for="dateInput" class="required">Due date</label>
                <div class="dateSelectDiv">
                  <input type="date" placeholder="dd/mm/yyyy" class="dateInput" id="dateInput" onclick="openCalendar()" onchange="checkValuesForCreateTaskButton()" oninput="checkValuesForCreateTaskButton()"/>
                  <div class="calendarDiv" onclick="openCalendar()">
                    <img class="calendar" src="../img/calendar-icon.svg" alt="calendar-icon" onclick="openCalendar()" />
                  </div>
                </div>
                <div class="dueDateInvalidDiv invisible">
                  This Field is required.
                </div>
              </div>
              <div class="prioDiv">
                <label for="urgentButton" class="prioLabel">Prio</label>
                <div class="prioButtonsDiv">
                  <button type="button" class="urgentButton" id="urgentButton" onclick="setButtonPrio(this)">
                    Urgent <img src="../img/urgent-icon.svg" />
                  </button>
                  <button type="button" class="mediumButton" onclick="setButtonPrio(this)">
                    Medium <img src="../img/medium-icon.svg" />
                  </button>
                  <button type="button" class="lowButton" onclick="setButtonPrio(this)">
                    Low <img src="../img/low-icon.svg" />
                  </button>
                </div>
              </div>
              <div class="categoryDiv">
                <label for="categorySelect" class="required">Category</label>
                <div class="categorySelectDiv">
                  <input type="text" placeholder="Select task category" class="categorySelect" id="categorySelect" readonly
                    onclick="toggleDropdown(true)" onchange="checkValuesForCreateTaskButton()"/>
                  <div class="dropDownArrowDiv" onclick="toggleDropdown(true)">
                    <img class="dropDownArrow" src="../img/drop-down-arrow.svg" alt="" />
                  </div>
                  <input type="text" maxlength="16" placeholder="Enter new category" class="newCategoryInput invisible" id="newCategoryInput" oninput="hideCategoryError();" />
                  <div class="newCategoryIconDiv  d-none">
                    <div class="newCategoryIconWrapper" onclick="addNewCategory()">
                      <img class="check-icon" src="../img/check-icon-darkblue.svg" alt="" />
                    </div>
                    <div class="newCategoryIconDivider"></div>
                    <div class="newCategoryIconWrapper" onclick="changeInputToDefault()">
                      <img class="x-icon" src="../img/x-icon.svg" alt="" />
                    </div>
                  </div>
                  <section class="dropDownCategory invisible"></section>
                </div>
                <div class="categoryInvalidDiv invisible">
                  This field is required.
                </div>
              </div>
              <div class="subtaskDiv">
                <label for="subtaskInput">Subtask</label>
                <div class="subtaskInputDiv">
                  <input type="text" maxlength="16" placeholder="Add new subtask" class="subtaskInput" id="subtaskInput" oninput="hideSubtaskError();"/>
                  <div class="plusIconDiv" onclick="createSubtask()">
                    <img src="../img/plus-icon.svg" alt="plus-icon">
                  </div>
                  <div class="subtaskInvalidDiv invisible">Please enter a subtask consisting of maximum 16 letters.</div>
                  <ul class="subtaskList"></ul>
                </div>
              </div>
          </form>
          </div>
          <div class="confirmDiv">
            <div>
                <sup class="required"></sup>
                This field is required.
            </div>
            <div class="clearAndCreateButtonDiv">
              <button class="clearButton" onclick="clearTaskSelectorForm()">
                Clear <img src="../img/x-icon.svg" />
              </button>
              <button type="submit" form="taskSelector" class="createTaskButton">
                Create Task <img src="../img/check-icon.svg" />
              </button>
            </div>
        </section>
    `;
  document.body.innerHTML += addTaskOverlayHTML;
  contactDropDownList(contacts);
  categoryDropDownList(categories);

}

function generateEmptyTask(categoryName) {
  return `
    <div class="slot">
      <div class="noTasksDiv" id="emptyTask-${categoryName}" draggable="true">
        <div class="taskContentContainer">
          <span>No Tasks ${categoryName}</span>
        </div>
      </div>
    </div>
  `;
}

function boardHTML() {
  return `
    <div class="boardHeadline">
      <h1>Board</h1>
      <div class="searchTaskAndAddTask">
        <div class="searchTask">
          <input class="searchTaskInput" placeholder="Find Task" type="text" name="" id="" />
        </div>
        <button class="addTaskButton" onclick="openAddTaskOverlay()">
          Add Task <img src="../img/add-icon.svg" alt="add-icon" />
        </button>
      </div>
    </div>
    <div class="boardHeadlineMobile">
      <div class="headerButton">
        <h1>Board</h1>
        <button class="addTaskButtonMobile">
        <a href="add_task.html">
            <img src="../img/add-icon.svg" alt="add-icon" />
            </a>
        </button>
      </div>
      <div class="searchTaskMobile">
          <input class="searchTaskInputMobile" placeholder="Find Task" type="text" name="" id="" />
      </div>
    </div>
    <div class="taskBoard">
      <div class="toDoTaskList slot">
        <div class="boardCategory">
          <span>To do</span>
          <div class="taskBoardAddTaskDiv" onclick="validateToDo(1)">
            <img src="../img/board-add-task-icon.svg"/ >
          </div>
        </div>
        ${tasks
      .filter((task) => task.category === "To do")
      .map(
        (task) => `
            <div class="taskCard" draggable="true" id="draggableContainer${tasks.indexOf(
          task
        )}">            
              <div class="taskCategory">${task.taskCategory}</div>
              <div class="taskTitle">${task.taskTitle}</div>
              <div class="taskDescription">${task.taskDescription}</div>
              <div class="taskProgressContainer">
                <div class="taskProgressBar"></div>
                <div class="taskProgressCount">${task.progressCount}</div>
              </div>
              <div class="taskContactAndPrio">
                <div class="taskContact"></div>
                <div class="taskPrio"></div>
              </div>
            </div>
          `
      )
      .join("")}
      </div>

      <div class="inProgressTaskList slot">
        <div class="boardCategory">
          <span>In progress</span>
          <div class="taskBoardAddTaskDiv" onclick="validateToDo(2)">
            <img src="../img/board-add-task-icon.svg" />
          </div>
        </div>
        ${tasks
      .filter((task) => task.category === "In progress")
      .map(
        (task) => `
            <div class="taskCard" draggable="true" id="draggableContainer${tasks.indexOf(
          task
        )}">
              <div class="taskCategory">${task.taskCategory}</div>
              <div class="taskTitle">${task.taskTitle}</div>
              <div class="taskDescription">${task.taskDescription}</div>
              <div class="taskProgressContainer">
                <div class="taskProgressBar"></div>
                <div class="taskProgressCount">${task.progressCount}</div>
              </div>
              <div class="taskContactAndPrio">
                <div class="taskContact"></div>
                <div class="taskPrio"></div>
              </div>
            </div>
          `
      )
      .join("")}
      </div>

      <div class="awaitFeedbackTaskList slot">
        <div class="boardCategory">
          <span>Await feedback</span>
          <div class="taskBoardAddTaskDiv" onclick="validateToDo(3)">
            <img src="../img/board-add-task-icon.svg" />
          </div>
        </div>
        ${tasks
      .filter((task) => task.category === "Await feedback")
      .map(
        (task) => `
            <div class="taskCard" draggable="true" id="draggableContainer${tasks.indexOf(
          task
        )}">
              <div class="taskCategory">${task.taskCategory}</div>
              <div class="taskTitle">${task.taskTitle}</div>
              <div class="taskDescription">${task.taskDescription}</div>
              <div class="taskProgressContainer">
                <div class="taskProgressBar"></div>
                <div class="taskProgressCount">${task.progressCount}</div>
              </div>
              <div class="taskContactAndPrio">
                <div class="taskContact"></div>
                <div class="taskPrio"></div>
              </div>
            </div>
          `
      )
      .join("")}
      </div>

      <div class="doneTaskList slot">
        <div class="boardCategory">
          <span>Done</span>
          <div class="taskBoardAddTaskDiv" onclick="validateToDo(4)">
            <img src="../img/board-add-task-icon.svg" />
          </div>
        </div>
        ${tasks
      .filter((task) => task.category === "Done")
      .map(
        (task) => `
            <div class="taskCard" draggable="true" id="draggableContainer${tasks.indexOf(
          task
        )}">
              <div class="taskCategory">${task.taskCategory}</div>
              <div class="taskTitle">${task.taskTitle}</div>
              <div class="taskDescription">${task.taskDescription}</div>
              <div class="taskProgressContainer">
                <div class="taskProgressBar"></div>
                <div class="taskProgressCount">${task.progressCount}</div>
              </div>
              <div class="taskContactAndPrio">
                <div class="taskContact"></div>
                <div class="taskPrio"></div>
              </div>
            </div>
          `
      )
      .join("")}
      </div>
    </div>
  `;
}

