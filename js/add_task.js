function generateAddTask() {
  let taskSection = document.querySelector(".addTask");
  taskSection.innerHTML = addTaskHTML();
}

function addTaskHTML() {
  return `
    <div>
      <h1>Add Task</h1>
    </div>
    <div class="taskSelector">
      <div class="taskSelectorLeft">
        <div class="titleDiv">
          <label class="required">Title</label>
          <input
            required
            type="text"
            placeholder="Enter a title"
            class="titleInput"
          />
          <div class="warningDiv">
            <span class="warningTitle invisible">This field is requiered</span>
          </div>
        </div>

        <div class="descriptionDiv">
          <label>Description</label>
          <textarea class="descriptionTextArea" placeholder="Enter a Description"></textarea>
        </div>

        <div class="assignedDiv">
          <label>Assigned to</label>
          <select class="contactsSelect" required>
          <option value="" disabled selected>Select contacts to assign</option>
        </select>
        </div>
      </div>
      <div class="divider"></div>
      <div class="taskSelectorRight">
        <div class="dueDateDiv">
          <label class="required">Due date</label>
          <input class="dateInput" required placeholder="dd/mm/yyyy" />
          <div class="warningDiv">
            <span class="warningDueDate invisible">This field is requiered</span>
          </div>
        </div>
        <div class="prioDiv">
          <label class="prioLabel" >Prio</label>
          <div class="prioButtonsDiv">
          <button class="urgentButton">Urgent <img src="../img/urgent-icon.svg"/> </button>
          <button class="mediumButton">Medium <img src="../img/medium-icon.svg"/> </button>
          <button class="lowButton">Low       <img src="../img/low-icon.svg"/></button>
          </div>
        </div>
        <div class="categoryDiv">
          <label class="required">Category</label>
          <select class="categorySelect" required>
          <option value="" disabled selected>Select Task Category</option>
        </select>
        <div class="warningDiv">
            <span class="warningCategory invisible">This field is requiered</span>
          </div>
        </div>
        <div class="subtaskDiv">
          <label>Subtask</label>
          <input class="subtaskInput" required placeholder="Add new subtask" />
          <div>
            <ul class="invisible">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div  class="confirmDiv">
    <div>
      <p>
        <sup class="required"></sup>
        This field is required
      </p>
    </div>
    <div class="clearAndCheckButtonDiv">
      <button class="clearButton">Clear <img src="../img/x-icon.svg"/></button>
      <button disabled class="checkButton">Create Task <img src="../img/check-icon.svg"/></button>
      </div>
    </div>
  `;
}
