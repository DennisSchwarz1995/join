async function initBoard() {
  await loadTasks();
  await loadContacts();
  generateNavbar();
  generateHeader();
  generateTasks();
  checkAndGenerateEmptyTask();
  addEventListeners();
}

let tasks = [];
let currentTaskCategory = null;

function generateTasks() {
  let toDoTaskList = document.querySelector(".toDoTaskList");
  let inProgressTaskList = document.querySelector(".inProgressTaskList");
  let awaitFeedbackTaskList = document.querySelector(".awaitFeedbackTaskList");
  let doneTaskList = document.querySelector(".doneTaskList");
  toDoTaskList.innerHTML = "";
  inProgressTaskList.innerHTML = "";
  awaitFeedbackTaskList.innerHTML = "";
  doneTaskList.innerHTML = "";
  tasks.forEach((taskData) => {
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

function openAddTaskOverlay(taskCategory) {
  generateAddTaskOverlay(contacts);
  let overlay = document.querySelector(".addTaskOverlay");
  let background = document.querySelector(".addTaskOverlayBackground");
  currentTaskCategory = taskCategory;
  setTimeout(() => {
    overlay.classList.add("show");
    setMediumButtonSelected();
    checkValuesForCreateTaskButton();
  }, 0);
  background.classList.remove("invisible");
}

function closeAddTaskOverlay() {
  let overlay = document.querySelector(".addTaskOverlay");
  let background = document.querySelector(".addTaskOverlayBackground");
  overlay.classList.remove("show");
  clearTaskSelectorForm();
  background.classList.add("invisible");
  setTimeout(() => {
    overlay.remove();
  }, 300);
}

function addEventListeners() {
  let taskCards = document.querySelectorAll(".taskCard");
  taskCards.forEach((taskCard) => {
    taskCard.addEventListener("dragstart", dragStart);
    taskCard.addEventListener("dragend", dragEnd);
  });
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.classList.add("dragging");
}

function dragEnd(event) {
  event.currentTarget.classList.remove("dragging");
}

function getTasksLength() {
  return tasks.length;
}

function countTasksByCategory(category) {
  return tasks.filter((task) => task.category === category).length;
}

function generateAddTaskOverlay(contacts) {
  let addTaskOverlayHTML = `
          <div class="addTaskOverlay">
          <h1>Add Task</h1>
          <div class="closeOverlayButtonDiv" onclick="closeAddTaskOverlay()"><img src="../img/x-icon.svg" alt="x-icon"></div>
            <form class="taskSelector" id="taskSelector" onsubmit="createTask(true, currentTaskCategory); return false;">
            <section class="taskSelectorLeft">
              <div class="titleDiv">
                <label for="titleInput" class="required">Title</label>
                <input
                  type="text"
                  maxlength="30"
                  placeholder="Enter a title"
                  class="titleInput"
                  id="titleInput"
                  oninput="checkValuesForCreateTaskButton()"
                />
                <div class="titleInvalidDiv invisible">This field is required.</div>
              </div>
              <div class="descriptionDiv">
                <label for="descriptionTextArea">Description</label>
                <textarea
                  maxlength="50"
                  class="descriptionTextArea"
                  id="descriptionTextArea"
                  placeholder="Enter a Description"
                ></textarea>
              </div>
              <div class="assignedDiv">
                <label for="contactsSelect">Assigned to</label>
                <div class="contactsSelectDiv">
                  <input
                    type="text"
                    placeholder="Select contacts to assign"
                    class="contactsSelect"
                    id="contactsSelect"
                    onclick="toggleDropdown()"
                    readonly
                  />
                  <div class="dropDownArrowDiv" onclick="toggleDropdown()">
                    <img
                      class="dropDownArrow"
                      src="../img/drop-down-arrow.svg"
                      alt="rop-down-arrow"
                    />
                  </div>
                </div>
                <section class="dropDownContacts invisible"></section>
                <div class="contactInitials"></div>
              </div>
            </section>
            <div class="divider"></div>
            <div class="taskSelectorRight">
              <div class="dueDateDiv">
                <label for="dateInput" class="required">Due date</label>
                <div class="dateSelectDiv">
                  <input
                    type="date"
                    placeholder="MM/DD/YYYY"
                    class="dateInput"
                    id="dateInput"
                    onclick="openCalendar()"
                    onchange="checkValuesForCreateTaskButton()"
                    oninput="checkValuesForCreateTaskButton()"
                  />
                  <div class="calendarDiv" onclick="openCalendar()">
                    <img
                      class="calendar"
                      src="../img/calendar-icon.svg"
                      alt="calendar-icon"
                      onclick="openCalendar()"
                    />
                  </div>
                </div>
                <div class="dueDateInvalidDiv invisible">
                  This Field is required.
                </div>
              </div>
              <div class="prioDiv">
                <label for="urgentButton" class="prioLabel">Prio</label>
                <div class="prioButtonsDiv">
                  <button
                    type="button"
                    class="urgentButton"
                    id="urgentButton"
                    onclick="setButtonPrio(this)"
                  >
                    Urgent <img src="../img/urgent-icon.svg" alt="urgent-icon" />
                  </button>
                  <button
                    type="button"
                    class="mediumButton"
                    onclick="setButtonPrio(this)"
                  >
                    Medium <img src="../img/medium-icon.svg" alt="medium-icon" />
                  </button>
                  <button
                    type="button"
                    class="lowButton"
                    onclick="setButtonPrio(this)"
                  >
                    Low <img src="../img/low-icon.svg" alt="low-icon" />
                  </button>
                </div>
              </div>
              <div class="categoryDiv">
                <label for="categorySelect" class="required">Category</label>
                <div class="categorySelectDiv">
                  <input
                    type="text"
                    placeholder="Select task category"
                    class="categorySelect"
                    id="categorySelect"
                    readonly
                    onclick="toggleDropdown(true)"
                    onchange="checkValuesForCreateTaskButton()"
                  />
                  <div class="dropDownArrowDiv" onclick="toggleDropdown(true)">
                    <img
                      class="dropDownArrow"
                      src="../img/drop-down-arrow.svg"
                      alt="drop-down-arrow"
                    />
                  </div>
                  <input
                    type="text"
                    maxlength="30"
                    placeholder="Enter new category"
                    class="newCategoryInput invisible"
                    id="newCategoryInput"
                    oninput="hideCategoryError();"
                  />
                  <div class="newCategoryIconDiv d-none">
                    <div class="newCategoryIconWrapper" onclick="addNewCategory()">
                      <img
                        class="check-icon"
                        src="../img/check-icon-darkblue.svg"
                        alt="check-icon-darkblue"
                      />
                    </div>
                    <div class="newCategoryIconDivider"></div>
                    <div
                      class="newCategoryIconWrapper"
                      onclick="changeInputToDefault()"
                    >
                      <img class="x-icon" src="../img/x-icon.svg" alt="x-icon" />
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
                  <input
                    type="text"
                    maxlength="30"
                    placeholder="Add new subtask"
                    class="subtaskInput"
                    id="subtaskInput"
                    oninput="hideSubtaskError();"
                  />
                  <div class="plusIconDiv" onclick="createSubtask()">
                    <img src="../img/plus-icon.svg" alt="plus-icon" />
                  </div>
                  <div class="subtaskInvalidDiv invisible">
                    Please enter a subtask consisting of maximum 16 letters.
                  </div>
                  <ul class="subtaskList"></ul>
                </div>
              </div>
            </div>
          </form>
          <section class="confirmDiv">
            <div>
              <sup class="required"></sup>
              This field is required.
            </div>
            <div class="clearAndCreateButtonDiv">
              <button class="clearButton" onclick="clearTaskSelectorForm()">
                Clear <img src="../img/x-icon.svg" alt="x-icon"/>
              </button>
              <button type="submit" form="taskSelector" class="createTaskButton">
                Create Task <img src="../img/check-icon.svg" alt="check-icon" />
              </button>
            </div>
          </section>
        </section>
    `;
  document.body.innerHTML += addTaskOverlayHTML;
  contactDropDownList(contacts);
  categoryDropDownList(categories);
  setMinDate();
}

/**
 *
 * @param {string} categoryName
 * @returns HTML for a card if a category empty
 */
function generateEmptyTask(categoryName) {
  return `
      <div class="noTasksDiv" id="emptyTask-${categoryName}">
        <div class="taskContentContainer">
          <span>No tasks ${categoryName}</span>
        </div>
      </div>
  `;
}

function taskHTML(taskData) {
  let assignedContactsHTML = "";
  if (taskData.assignedContacts) {
    assignedContactsHTML = taskData.assignedContacts
      .map(
        (contact) => `
      <div class="taskContact" style="background: ${contact.color}">${contact.initials}</div>
    `
      )
      .join("");
  }
  return `
    <div class="taskCard" draggable="true">
      <div class="taskCategory" style="background: ${taskData.categoryColor}">${taskData.category}</div>
      <div class="taskTitle">${taskData.title}</div>
      <div class="taskDescription">${taskData.description}</div>
      <div class="taskProgressContainer">
        <div class="taskProgressBar"></div>
        <div class="taskProgressCount">0 / ${taskData.subtasks.length}</div>
      </div>
      <div class="taskContactAndPrio">
        <div class="taskContacts">${assignedContactsHTML}</div>
        <div class="taskPrio">${taskData.priority}</div>
      </div>
    </div>`;
}
