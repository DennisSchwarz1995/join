/**
 * Generates the overlay for adding a new task 
 * @param {Array} contacts - List of contact objects 
 */
function generateAddTaskOverlay(contacts) {
    let addTaskOverlay = document.querySelector(".addTaskOverlay");
    let addTaskOverlayHTML = `
            <h1>Add Task</h1>
            <div class="closeOverlayButtonDiv" onclick="closeAddTaskOverlay(false)"><img src="../img/x-icon.svg" alt="x-icon"></div>
              <form class="taskSelector" id="taskSelector" onsubmit="createTask(true, currentTaskCategory); return false;">
              <section class="taskSelectorLeft">
                <div class="titleDiv">
                  <label for="titleInput" class="required">Title</label>
                  <input
                    type="text"
                    maxlength="20"
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
                    placeholder="Enter a description"
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
                  <section class="dropDownContacts invisible"></section>
                </div>
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
                  <label class="prioLabel">Prio</label>
                  <div class="prioButtonsDiv">
                    <button
                      type="button"
                      class="urgentButton"
                      id="urgentButton"
                      onclick="setButtonPrio(this)"
                    >
                      <span>Urgent</span> <img src="../img/urgent-icon.svg" alt="urgent-icon" />
                    </button>
                    <button
                      type="button"
                      class="mediumButton"
                      onclick="setButtonPrio(this)"
                    >
                    <span>Medium</span> <img src="../img/medium-icon.svg" alt="medium-icon" />
                    </button>
                    <button
                      type="button"
                      class="lowButton"
                      onclick="setButtonPrio(this)"
                    >
                    <span>Low</span> <img src="../img/low-icon.svg" alt="low-icon" />
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
                      maxlength="12"
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
                      maxlength="16"
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
              <div class="requiredInfoDiv">
                <sup class="required"></sup>
                <span>This field is required.</span>
              </div>
              <div class="clearAndCreateButtonDiv">
                <button class="clearButton" onclick="clearTaskSelectorForm()">
                 <span>Clear</span> <img src="../img/x-icon.svg" alt="x-icon"/>
                </button>
                <button type="submit" form="taskSelector" class="createTaskButton">
                 <span>Create Task</span> <img src="../img/check-icon.svg" alt="check-icon" />
                </button>
              </div>
            </section>
          
      `;
    addTaskOverlay.innerHTML = addTaskOverlayHTML;
    contactDropDownList(contacts);
    categoryDropDownList(categories);
    setMinDate();
  }
/**
 * Generates the HTML for editing a task 
 * @param {Object} task -Task object to be edited 
 */
  function generateEditTaskHTML(task) {
   console.log(task);
    let editTaskOverlay = document.querySelector(".taskCardDetailedView");
    let editTaskHTML = `
    <div class="closeButtonWrapper">
    <div class="closeButtonDiv" onclick="closeAddTaskOverlay(true)">
      <img src="../img/x-icon.svg" alt="x-icon" />
    </div>
    </div>
      <form
        class="editTaskForm"
        id="editTaskForm"
        onsubmit="saveTaskEdits(${task.id}); return false;"
      >
        <div class="titleDiv">
            <label for="editTitleInput" class="required">Title</label>
          <input
            type="text"
            maxlength="20"
            placeholder="Enter a title"
            class="titleInput"
            id="editTitleInput"
            value="${task.title}"
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
                placeholder="Enter a description"
              >${task.description}</textarea>
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
          <div class="dropDownContactsWrapper">
          <section class="dropDownContacts editTaskDropDownContacts invisible"></section>
          </div>
          <div class="contactInitials editTaskContactInitials"></div>
        </div>
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
              value="${task.dueDate}"
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
          <div class="dueDateInvalidDiv invisible">This Field is required.</div>
        </div>
        <div class="prioDiv">
          <label class="prioLabel">Prio</label>
          <div class="prioButtonsDiv">
            <button
              type="button"
              class="urgentButton"
              id="urgentButton"
              onclick="setButtonPrio(this)"
            >
              <span>Urgent</span> <img src="../img/urgent-icon.svg" alt="urgent-icon" />
            </button>
            <button
              type="button"
              class="mediumButton"
              onclick="setButtonPrio(this)"
            >
            <span>Medium</span> <img src="../img/medium-icon.svg" alt="medium-icon" />
            </button>
            <button type="button" class="lowButton" onclick="setButtonPrio(this)">
            <span>Low</span> <img src="../img/low-icon.svg" alt="low-icon" />
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
              oninput="checkValuesForCreateTaskButton()"
              value="${task.category}"
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
              maxlength="12"
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
          <div class="categoryInvalidDiv invisible">This field is required.</div>
        </div>
        <div class="subtaskDiv">
          <label for="subtaskInput">Subtask</label>
          <div class="subtaskInputDiv">
            <input
              type="text"
              maxlength="16"
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
            <ul class="subtaskList editTaskSubtaskList"></ul>
          </div>
        </div>
      </form>
      <section class="confirmDiv editTaskConfirmDiv">
      <div class="requiredInfoDiv">
                <sup class="required"></sup>
                <span>This field is required.</span>
              </div>
          <div class="clearAndCreateButtonDiv">
            <button type="button" class="clearButton" onclick="clearTaskSelectorForm()">
            <span>Clear</span> <img src="../img/x-icon.svg" alt="Clear icon" />
            </button>
            <button type="submit" form="editTaskForm" class="createTaskButton">
              <span>Save Changes</span> <img src="../img/check-icon.svg" alt="Save icon" />
            </button>
          </div>
        </section>
    `;
    editTaskOverlay.innerHTML = editTaskHTML;
    contactDropDownList(contacts);
    categoryDropDownList(categories);
    generateAssignedContacts(task.assignedContacts);
    highlightAssignedContacts(task.assignedContacts);
    getButtonPrio(task.priority);
    generateSubtasks(task.subtasks);
    highlightSelectedTaskCategory();
    setMinDate();
  }
