function initBoard() {
  generateBoard();
  generateNavbar();
  generateHeader();
}

function generateBoard() {
  let board = document.querySelector(".board");
  board.innerHTML = boardHTML();
}
const tasks = [
  {
    category: "To do",
    taskCategory: "Technical Task",
    taskTitle: "Kochwelt Page & Recipe Recommender",
    taskDescription: "Build start page with recipe recommendation",
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
  }
];



function boardHTML() {
  return `
    <div class="boardHeadline">
      <h1>Board</h1>
      <div class="searchTaskAndAddTask">
        <div class="searchTask">
          <input class="searchTaskInput" placeholder="Find Task" type="text" name="" id="" />
        </div>
        <button class="addTaskButton">
          Add Task <img src="../img/add-icon.svg" alt="add-icon" />
        </button>
      </div>
    </div>

    <div class="taskBoard">
      <div class="toDoTaskList">
        <div class="boardCategory">
          <span>To do</span>
          <div class="taskBoardAddTaskDiv">
            <img src="../img/board-add-task-icon.svg" />
          </div>
        </div>
        ${tasks
          .filter(task => task.category === "To do")
          .map(task => `
            <div class="taskCard">
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
          `).join('')}
      </div>

      <div class="inProgressTaskList">
        <div class="boardCategory">
          <span>In progress</span>
          <div class="taskBoardAddTaskDiv">
            <img src="../img/board-add-task-icon.svg" />
          </div>
        </div>
        ${tasks
          .filter(task => task.category === "In progress")
          .map(task => `
            <div class="taskCard">
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
          `).join('')}
      </div>

      <div class="awaitFeedbackTaskList">
        <div class="boardCategory">
          <span>Await feedback</span>
          <div class="taskBoardAddTaskDiv">
            <img src="../img/board-add-task-icon.svg" />
          </div>
        </div>
        ${tasks
          .filter(task => task.category === "Await feedback")
          .map(task => `
            <div class="taskCard">
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
          `).join('')}
      </div>

      <div class="doneTaskList">
        <div class="boardCategory">
          <span>Done</span>
          <div class="taskBoardAddTaskDiv">
            <img src="../img/board-add-task-icon.svg" />
          </div>
        </div>
        ${tasks
          .filter(task => task.category === "Done")
          .map(task => `
            <div class="taskCard">
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
          `).join('')}
      </div>
    </div>
  `;
}

function generateEmptyTask() {
  let taskCards = document.querySelectorAll(".taskCardDiv");
  taskCards.forEach((taskCard, index) => {
    let categoryName = document.querySelectorAll(".boardCategory span")[index]
      .textContent;
    taskCard.innerHTML = emptyTaskHTML(categoryName);
  });
}

function emptyTaskHTML(categoryName) {
  return `
      <div class="noTasksDiv">
        <span>No Tasks ${categoryName}</span>
      </div>
    `;
}

function taskHTML() {
  return `
  <div class="taskCard">
  <div class="taskCategory">Title</div>
  <div class="taskTitle"></div>
  <div class="taskDescription"></div>
  <div class="taskProgressContainer">
      <div class="taskProgressBar"></div>
      <div class="taskProgressCount"></div>
  </div>
  <div class="taskContactAndPrio">
      <div class="taskContact"></div>
      <div class="taskPrio"></div>
  </div>
 </div>
   
   `;
}