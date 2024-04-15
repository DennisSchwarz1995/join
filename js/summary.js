/**
 * Initializes the summary page
 */
async function initSummary() {
  generateNavbar();
  generateHeader();
  await loadTasks();
  generateSummary();
  displayUserGreeting();
  updateGreetingBasedOnTime();
}

/**
 * Displays the user greeting based on stored user full name
 */
function displayUserGreeting() {
  let greetingSpan = document.querySelector(".greetingSpan");
  if (greetingSpan) {
    let userFullName = localStorage.getItem("userFullName");
    if (userFullName) {
      let parsedFullName = JSON.parse(userFullName);
      greetingSpan.textContent = parsedFullName;
    } else {
      greetingSpan.textContent = "Guest";
    }
  }
}

/**
 * Updates the greeting based on the current time of day
 */
function updateGreetingBasedOnTime() {
  let greetingTime = document.querySelector(".greetingTime");
  if (greetingTime) {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      greetingTime.textContent = "Good Morning,";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingTime.textContent = "Good Afternoon,";
    } else {
      greetingTime.textContent = "Good Evening,";
    }
  }
}

/**
 * Generates the summary section based on task metrics.
 */
function generateSummary() {
  let tasksLength = getTasksLength();
  let todoTasksCount = countTasksByCategory("to do");
  let inProgressTasksCount = countTasksByCategory("in progress");
  let awaitFeedbackTaskCount = countTasksByCategory("await feedback");
  let urgentTasksInfo = getUrgentTasksInfo();

  let summary = document.querySelector(".summary");
  summary.innerHTML += summaryHTML(
    tasksLength,
    todoTasksCount,
    inProgressTasksCount,
    awaitFeedbackTaskCount,
    urgentTasksInfo.count,
    urgentTasksInfo.nearestDueDate
  );
}

/**
 * Generates HTML for the summary section
 * @param {*} tasksLength -Total number of tasks
 * @param {*} todoTasksCount -Number of tasks in todo category
 * @param {*} inProgressTasksCount -Number of tasks in in progress category
 * @param {*} awaitFeedbackTaskCount- Number of tasks in await feedback category
 * @returns {string} - HTML string for the summary section
 */
function summaryHTML(
  tasksLength,
  todoTasksCount,
  inProgressTasksCount,
  awaitFeedbackTaskCount,
  urgentTaskCount,
  urgentTaskNearestDueDate
) {
  return `
    <header class="summaryHeadline">
      <h1>Join 360</h1>
      <div class="summaryHeadlinedivider"></div>
      <span>Key Metrics at a Glance</span>
    </header>
     <div class="summaryHeadlinedividerMobile"></div> 
    <main class="summaryBoardAndGreetingDiv">
      <section class="summaryBoard">
        <div class="summaryBoardWrapper">
          <a href="board.html" class="toDoDiv hoverDiv">
            <div class="toDoImage"></div>
            <div class="toDoAmountDiv">
              <p>${todoTasksCount}</p>
              <span>To-Do</span>
            </div>
          </a>
          <a href="board.html" class="doneDiv hoverDiv">
            <div class="doneDivImage"></div>
            <div class="doneAmountDiv">
              <p>1</p>
              <span>Done</span>
            </div>
          </a>
        </div>
        <a href="board.html" class="urgentDiv hoverDiv">
          <div class="urgentDivLeft">
            <img src="../img/summary-urgent-icon.svg" alt="summary-urgent" />
            <div>
              <div class="urgentAmountDiv">
                <p>${urgentTaskCount}</p>
              </div>
              <span>Urgent</span>
            </div>
          </div>
          <div class="urgentDivider"></div>
          <div class="urgentDivRight">
            <p class="urgentDeadlineDate">${urgentTaskNearestDueDate}</p>
            <span>Upcoming Deadline</span>
          </div>
        </a>
        <div class="summaryBoardWrapper">
          <a href="board.html" class="tasksInBoardDiv hoverDiv">
            <div class="tasksInBoardAmountDiv">
              <p>${tasksLength}</p>
              <span
                >Tasks in <br />
                Board</span
              >
            </div>
          </a>
          <a href="board.html" class="tasksInProgressDiv hoverDiv">
            <div class="tasksInProgressAmountDiv">
              <p>${inProgressTasksCount}</p>
              <span
                >Tasks in <br />
                Progress</span
              >
            </div>
          </a>
          <a href="board.html" class="awaitingFeedbackDiv hoverDiv">
            <div class="awaitingFeedbackAmountDiv">
              <p>${awaitFeedbackTaskCount}</p>
              
              <span
                >Awaiting <br />
                Feedback</span
              >
            </div>
          </a>
        </div>
      </section>
      <section class="greetingDiv">
        <h2 class="greetingTime"></h2>
        <span class="greetingSpan"></span>
      </section>
    </main>
  `;
}

/**
 * @returns the length of the tasks array
 */
function getTasksLength() {
  return tasks.length;
}

/**
 * Counts the amount of tasks in a given tasklist
 * @param {string} category -  The category to be filtered by
 * @returns {number} - The amount of tasks with the taskcategory property
 */
function countTasksByCategory(category) {
  return tasks.filter((task) => task.taskCategory === category).length;
}

/**
 * Retrieves information about urgent tasks.
 * @returns {Object} An object containing:
 *  - count: The total number of urgent tasks.
 *  - nearestDueDate: The nearest due date among the urgent tasks, formatted as YYYY-MM-DD. If no urgent tasks exist, this will be null.
 */
function getUrgentTasksInfo() {
  let urgentTasks = tasks.filter(
    (task) => task.priority === "/img/urgent-icon.svg"
  );
  let count = urgentTasks.length;
  let nearestDueDate = null;
  if (urgentTasks.length > 0) {
    let dueDates = urgentTasks.map((task) => new Date(task.dueDate));
    nearestDueDate = new Date(Math.min(...dueDates));
    nearestDueDate = nearestDueDate.toISOString().slice(0, 10);
  }
  return {
    count,
    nearestDueDate,
  };
}
