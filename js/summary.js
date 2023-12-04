async function init() {
  await generateNavbar();
  await generateHeader();
  generateSummary();
}

function generateSummary() {
  let summary = document.querySelector(".summary");
  summary.innerHTML = summaryHTML();
}

function summaryHTML() {
  return `
    <div class="summaryHeadline">
      <h1>Join 360</h1>
      <div class="summaryHeadlinedivider"></div>
      <span>Key Metrics at a Glance</span>
    </div>


    <div class="summaryBoardAndGreetingDiv">
    <div class="summaryBoard">
      <div class="summaryBoardWrapper">
        <div class="toDoDiv hoverDiv">
          <a href=""></a>
          <div class="toDoImage">
          </div>
          <div class="toDoAmountDiv">
            <p>1</p>
            <span>To-Do</span>
          </div>
        </div>

        <div class="doneDiv hoverDiv">
          <a href=""></a>
          <div class="doneDivImage">
          </div>
          <div class="doneAmountDiv">
            <p>1</p>
            <span>Done</span>
          </div>
        </div>
      </div>

      <div class="urgentDiv hoverDiv">
        <a href=""></a>
        <div class="urgentDivLeft">
          <img src="../img/summary-urgent-icon.svg" alt="summary-urgent" />
          <div>
            <div class="urgentAmountDiv">
              <p>2</p>
            </div>
            <span>Urgent</span>
          </div>
        </div>
        <div class="urgentDivider"></div>
        <div class="urgentDivRight">
          <p class="urgentDeadlineDate">Dezember 12, 2023</p>
          <span>Upcoming Deadline</span>
        </div>
      </div>
      <div class="summaryBoardWrapper">
        <div class="tasksInBoardDiv hoverDiv">
          <div class="tasksInBoardAmountDiv">
            <p>1</p>
            <a href=""></a>
            <span
              >Tasks in <br />
              Board</span
            >
          </div>
        </div>
        <div class="tasksInProgressDiv hoverDiv">
          <div class="tasksInProgressAmountDiv">
            <p>1</p>
            <a href=""></a>
            <span
              >Tasks in <br />
              Progress</span
            >
          </div>
        </div>
        <div class="awaitingFeedbackDiv hoverDiv">
          <div class="awaitingFeedbackAmountDiv">
            <p>1</p>
            <a href=""></a>
            <span
              >Awaiting <br />
              Feedback</span
            >
          </div>
        </div>
      </div>

    </div>


    <div class="greetingDiv">
      <h2>Good Morning,</h2>
      <span class="greetingSpan">Dennis Schwarz</span>
      
    </div>
   </div>
  `;
}