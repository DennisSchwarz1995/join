function initAddTask() {
  generateAddTask();
  generateNavbar();
  generateHeader();
}


function generateAddTask() {
  let taskSection = document.querySelector(".addTask");
  taskSection.innerHTML = addTaskHTML();
}

function addTaskHTML() {
  return `
    <div>
      <h1 class="taskHeadline">Add Task</h1>
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
              <div class="contactsSelectDiv">
              
              <input placeholder="Select contacts to assign" class="contactsSelect" required/>
              <div class="dropDownArrowDiv" onclick="openContactsDropdown()">
              <img class="dropDownArrow" src="../img/drop-down-arrow.svg" alt="">
              </div>
              </div>
              <section class="dropDownContacts">
                <div class="dropDownContactDiv">  
                  <div class="dropDownContactInfo">
                    <div class="dropDownContactIcon"></div>
                    <div class="dropDownContactName"></div>
                  </div>
                </div>
              
              </section>
          
        
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
          <option value="option1" disabled selected>Select Task Category</option>
          <option value="option2">Technical Task</option>
          <option value="option3">User Story</option>
          <option value="option4">HTML</option>
          <option value="option5">CSS</option>
          <option value="option6">JavaScript</option>
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
    <div class="clearAndCreateButtonDiv">
      <button class="clearButton">Clear <img src="../img/x-icon.svg"/></button>
      <button disabled class="createButton">Create Task <img src="../img/check-icon.svg"/></button>
      </div>
    </div>
  `;
}

function openContactsDropdown() {
  var element = document.querySelector('.dropDownArrowDiv')
  if (element) {
      element.dispatchEvent(new Event("click"));
  }
}


























function addTask() {
    let title = document.querySelector('.titleInput').value;
    let description = document.querySelector('.descriptionTextArea').value;
}


function addSubTask() {
  
}
