/**
 * Loads contacts and tasks, generates navbar and header, 
 * generates UI components 
 */
async function initAddTask() {
  
  await loadContacts();
  await loadTasks();
  generateNavbar();
  generateHeader();
  generateNavbarMobile();
  setMediumButtonSelected();
  generateAddTask(contacts);
  setMinDate();
  selectTaskCategory();
  checkValuesForCreateTaskButton();
}

let isCategoryDropdown = false;
let isDropdownOpen = false;
let isAddTaskOpenFromBoard = false;
let isShowCreationOverlayOpenFromBoard = false;
let categories = ["Technical Task", "User Story", "Javascript", "HTML", "CSS"];
let taskId = 1;

/**
 * Generates the add task form 
 * @param {Array} contacts  - List of contacts 
 */
function generateAddTask(contacts) {
  contactDropDownList(contacts);
  categoryDropDownList(categories);
}

/**
 * Generates contacts dropdown list.
 * @param {Array} contacts  - List of contacts .
 */
function contactDropDownList(contacts) {
  let contactDropDown = "";
  contacts.forEach((contact) => {
    contactDropDown += `
      <div class="dropDownContactDiv" onclick="toggleContactSelection(this, '${
        contact.name
      }')">
          <div class="contactWrapper">
            <div class="dropDownContactIcon" style="background-color: ${
              contact.color
            };"> ${getInitials(contact.name)}</div>
            <div class="dropDownContactName">${contact.name}</div>
          </div>
            <div class="checkBoxIconDiv">
            <img class="checkBoxIcon"src="../img/checkbox-icon.svg" />
           </div>
      </div>
    `;
  });
  let dropDownContacts = document.querySelector(".dropDownContacts");
  dropDownContacts.innerHTML = contactDropDown;
}

/**
 * Generates category dropdown list.
 * @param {Array} categories  - List of categories .
 */
function categoryDropDownList(categories) {
  let categoryDropdownHTML = "";
  categories.forEach((category) => {
    categoryDropdownHTML += `<div class="dropDownCategoryDiv">${category}</div>`;
  });
  categoryDropdownHTML += `<div class="dropDownCategoryDiv">Create new Category</div>`;

  let dropDownCategory = document.querySelector(".dropDownCategory");
  dropDownCategory.innerHTML = categoryDropdownHTML;

  let categoryDivs = document.querySelectorAll(".dropDownCategoryDiv");
  categoryDivs.forEach((categoryDiv) => {
    categoryDiv.addEventListener("click", function () {
      selectTaskCategory(categoryDiv);
    });
  });
}

/**
 * Generates initials from the names of the contacts 
 * @param {Array} name 
 * @returns 
 */
function getInitials(name) {
  let names = name.split(" ");
  let initials = names.map((n) => n.charAt(0)).join("");
  return initials.toUpperCase();
}

/**
 * Toggles visability of the dropdown menu 
 * @param {boolean} isCategoryDropdown -Indicates if it's a category Dropdown 
 */
function toggleDropdown(isCategoryDropdown) {
  let { selectArrow, selectDropdown } = getDropDownElements(isCategoryDropdown);
  if (isDropdownOpen) {
    selectDropdown.classList.remove("visible");
    selectDropdown.classList.add("invisible");
    selectArrow.classList.remove("rotate");
    checkValuesForCreateTaskButton();
  } else {
    selectDropdown.classList.remove("invisible");
    selectDropdown.classList.add("visible");
    selectArrow.classList.add("rotate");
    checkValuesForCreateTaskButton();
  }
  isDropdownOpen = !isDropdownOpen;
}

/**
 * Gets Elements related to dropdown
 * @param {boolean} isCategoryDropdown -Indicates if it's a category Dropdown
 * @returns {Object} Dropdown Elements 
 */
function getDropDownElements(isCategoryDropdown) {
  let selectInput, selectArrow, selectDropdown;

  if (isCategoryDropdown) {
    selectInput = document.querySelector(".categorySelect");
    selectArrow = document.querySelector(".categoryDiv .dropDownArrow");
    selectDropdown = document.querySelector(".dropDownCategory");
  } else {
    selectInput = document.querySelector(".contactsSelect");
    selectArrow = document.querySelector(".assignedDiv .dropDownArrow");
    selectDropdown = document.querySelector(".dropDownContacts");
  }

  return {
    selectInput,
    selectArrow,
    selectDropdown,
  };
}

/**
 * Sets priority of the button 
 * @param {HTMLElement} clickedButton 
 */
function setButtonPrio(clickedButton) {
  let buttons = document.querySelectorAll(
    ".urgentButton, .mediumButton, .lowButton"
  );

  buttons.forEach((button) => {
    if (button === clickedButton) {
      let buttonImage = button.querySelector("img");
      switch (button.classList.value) {
        case "urgentButton":
          button.style.background = "var(--bg-color-red)";
          buttonImage.style.filter = "brightness(0) invert(1)";
          button.classList.add("selected");
          break;
        case "mediumButton":
          button.style.background = "var(--bg-color-yellow)";
          buttonImage.style.filter = "brightness(0) invert(1)";
          button.classList.add("selected");
          break;
        case "lowButton":
          button.style.background = "var(--bg-color-green)";
          buttonImage.style.filter = "brightness(0) invert(1)";
          button.classList.add("selected");
          break;
        default:
          break;
      }
      button.style.color = "var(--text-color-white)";
    } else {
      button.style.background = "var(--text-color-white)";
      button.style.color = "var(--main-color-black)";
      let buttonImage = button.querySelector("img");
      buttonImage.style.filter = "";
      button.classList.remove("selected");
    }
  });
}

/**
 * Sets medium priority selected
 */
function setMediumButtonSelected() {
  let mediumButton = document.querySelector(".mediumButton");
  setButtonPrio(mediumButton);
}

/**
 * Opens the Calender 
 */
function openCalendar() {
  let dateInput = document.querySelector(".dateInput");
  dateInput.focus();
  dateInput.showPicker();
}


/**
 * Gets form values for creating a task 
 * @returns {Object} Form values.  
 */
function getAddTaskFormValues() {
  let formValues = {};
  let titleInput = document.querySelector(".titleInput");
  let descriptionTextArea = document.querySelector(".descriptionTextArea");
  let assignedContacts = document.querySelectorAll(".selectedContact");
  let dueDateInput = document.querySelector(".dateInput");
  let prioButtons = document.querySelectorAll(".prioButtonsDiv button");
  let categoryInput = document.querySelector(".categorySelect");
  let subtaskList = document.querySelectorAll(".subtaskLI .subtaskText");

  formValues.title = titleInput.value.trim();
  formValues.description = descriptionTextArea.value.trim();
  formValues.assignedContacts = Array.from(assignedContacts).map((contact) => {
    let name = contact.querySelector(".dropDownContactName").textContent.trim();
    let color = contact.querySelector(".dropDownContactIcon").style
      .backgroundColor;
    let initials = getInitials(name);
    return { name, color, initials };
  });
  formValues.dueDate = dueDateInput.value;
  prioButtons.forEach((button) => {
    if (button.classList.contains("selected")) {
      let buttonImageSrc = button.querySelector("img").src;
      let relativeImagePath = buttonImageSrc.substring(
        buttonImageSrc.indexOf("/img")
      );
      formValues.priority = relativeImagePath;
    }
  });
  formValues.category = categoryInput.value.trim();
  formValues.categoryColor = getCategoryColor(formValues.category);
  formValues.subtasks = Array.from(subtaskList).map((subtask) =>
    subtask.textContent.trim()
  );

  return formValues;
}

/**
 * Sets minimum date for date input 
 */
function setMinDate() {
  let today = new Date().toISOString().split("T")[0];
  let dateInput = document.querySelector(".dateInput");
  dateInput.setAttribute("min", today);
}

/**
 * Toggles contact selection
 * @param {HTMLElement} contactDiv - Div Element 
 * @param {string} contactName - Name of the contact 
 */
function toggleContactSelection(contactDiv, contactName) {
  let checkBoxIcon = contactDiv.querySelector(".checkBoxIcon");
  let checkBoxIconDiv = contactDiv.querySelector(".checkBoxIconDiv");
  let isSelected = checkBoxIcon.classList.contains("selectedContactCheckBox");

  if (!isSelected) {
    checkBoxIcon.classList.add("selectedContactCheckBox");
    contactDiv.classList.add("selectedContact");
    checkBoxIcon.src = "../img/checkbox-icon-selected.svg";
    checkBoxIconDiv.style.height = "19px";
    createInitialsImage(contactName, contacts);
  } else {
    checkBoxIcon.classList.remove("selectedContactCheckBox");
    contactDiv.classList.remove("selectedContact");
    checkBoxIcon.src = "../img/checkbox-icon.svg";
    checkBoxIconDiv.style.height = "24px";
    removeInitialsImage(contactName);
  }
}

/**
 * Finds the index of a contact in the contacts array based on the name 
 * @param {*} contactName -Name of the contacts
 * @param {*} contacts - List of contact objects 
 * @returns Index of the contact
 */
function findContactIndexByName(contactName, contacts) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === contactName) {
      return i;
    }
  }
  return -1;
}

/**
 * Creates image of the initals of the contact with html and css elements 
 * @param {string} contactName - Name of the Contact
 * @param {Array} contacts - List of contacts 
 */
function createInitialsImage(contactName, contacts) {
  let initialsSection = document.querySelector(".contactInitials");
  let initials = getInitials(contactName);
  let contactIndex = findContactIndexByName(contactName, contacts);

  if (contactIndex !== -1) {
    let contactIconHTML = `
      <div class="dropDownContactIcon" data-contact="${contactName}" style="background-color: ${contacts[contactIndex].color};">${initials}</div>
    `;
    initialsSection.innerHTML += contactIconHTML;
  }
}

/**
 * Removes initals image for a contact 
 * @param {string} contactName - Name of the contact 
 */
function removeInitialsImage(contactName) {
  let initialsSection = document.querySelector(".contactInitials");
  let initialsIcons = initialsSection.querySelectorAll(".dropDownContactIcon");

  initialsIcons.forEach((icon) => {
    if (icon.getAttribute("data-contact") === contactName) {
      icon.remove();
    }
  });
}

/**
 * Selects task category
 * @param {HTMLElement} selectedCategoryDiv 
 */
function selectTaskCategory(selectedCategoryDiv) {
  let categoryInput = document.querySelector(".categorySelect");
  let newCategoryInput = document.querySelector(".newCategoryInput");
  let newCategoryIconDiv = document.querySelector(".newCategoryIconDiv");
  let dropDownCategoryDivs = document.querySelectorAll(".dropDownCategoryDiv");
  dropDownCategoryDivs.forEach((categoryDiv) => {
    if (categoryDiv === selectedCategoryDiv) {
      if (categoryDiv.textContent.trim() === "Create new Category") {
        changeInputField(categoryInput, newCategoryInput, newCategoryIconDiv);
      } else {
        highlightSelectedTask(
          categoryInput,
          categoryDiv,
          dropDownCategoryDivs,
          newCategoryInput
        );
      }
    }
  });
}

/**
 * Changes input field to create a new category 
 * @param {HTMLElement} categoryInput 
 * @param {HTMLElement} newCategoryInput 
 * @param {HTMLElement} newCategoryIconDiv 
 */
function changeInputField(categoryInput, newCategoryInput, newCategoryIconDiv) {
  categoryInput.classList.add("invisible");
  newCategoryInput.classList.remove("invisible");
  newCategoryIconDiv.classList.remove("d-none");
  setTimeout(() => {
    newCategoryInput.focus();
  }, 100);
  toggleDropdown(true);
}

/**
 * Highlights selected task category
 * @param {HTMLElement} categoryInput - Category input.
 * @param {HTMLElement} categoryDiv - Selected category div.
 * @param {NodeList} dropDownCategoryDivs - Category dropdown divs.
 * @param {HTMLElement} newCategoryInput - New category input.
 */
function highlightSelectedTask(
  categoryInput,
  categoryDiv,
  dropDownCategoryDivs,
  newCategoryInput
) {
  categoryInput.value = categoryDiv.textContent.trim();
  dropDownCategoryDivs.forEach((div) => {
    div.classList.remove("selectedCategory");
  });
  categoryDiv.classList.add("selectedCategory");
  toggleDropdown(true);
  newCategoryInput.classList.add("invisible");
  categoryInput.classList.remove("invisible");
}

/**
 * Changes input to default 
 */
function changeInputToDefault() {
  let newCategoryInput = document.querySelector(".newCategoryInput");
  let categoryInput = document.querySelector(".categorySelect");
  let newCategoryIconDiv = document.querySelector(".newCategoryIconDiv");
  let dropDownCategoryDivs = document.querySelectorAll(".dropDownCategoryDiv");
  let categoryInvalidDiv = document.querySelector(".categoryInvalidDiv");
  dropDownCategoryDivs.forEach((div) => {
    div.classList.remove("selectedCategory");
  });
  categoryInput.value = "";
  newCategoryInput.value = "";
  newCategoryInput.classList.add("invisible");
  newCategoryIconDiv.classList.add("d-none");
  categoryInput.classList.remove("invisible");
  categoryInvalidDiv.classList.add("invisible");
  newCategoryInput.classList.remove("warning");
}

/**
 * Adds a new category to the list of categorys 
 */
function addNewCategory() {
  let categoryInput = document.querySelector(".categorySelect");
  let categoryInvalidDiv = document.querySelector(".categoryInvalidDiv");
  let newCategoryInput = document.querySelector(".newCategoryInput");
  let newCategoryIconDiv = document.querySelector(".newCategoryIconDiv");
  let newCategory = newCategoryInput.value.trim();

  if (newCategory === "") {
    showCategoryError(categoryInvalidDiv, newCategoryInput);
  } else {
    addCategoryAndHighlight(
      newCategory,
      categoryInput,
      newCategoryInput,
      newCategoryIconDiv
    );
    hideCategoryError();
  }
}

/**
 * Shows category error message 
 * @param {HTMLElement} categoryInvalidDiv 
 * @param {HTMLElement} newCategoryInput 
 */
function showCategoryError(categoryInvalidDiv, newCategoryInput) {
  categoryInvalidDiv.textContent =
    "Please enter a category consisting of maximum 16 letters.";
  categoryInvalidDiv.classList.remove("invisible");
  newCategoryInput.classList.add("warning");
}

/**
 * Hides the category error 
 */
function hideCategoryError() {
  let categoryInvalidDiv = document.querySelector(".categoryInvalidDiv");
  let newCategoryInput = document.querySelector(".newCategoryInput");
  categoryInvalidDiv.classList.add("invisible");
  newCategoryInput.classList.remove("warning");
}

/**
 * Adds a new category and highlights it 
 * @param {string} newCategory -new category to add 
 * @param {HTMLElement} categoryInput - category input 
 * @param {HTMLElement} newCategoryInput -new category input 
 * @param {HTMLElement} newCategoryIconDiv -new category icon html element 
 */
function addCategoryAndHighlight(
  newCategory,
  categoryInput,
  newCategoryInput,
  newCategoryIconDiv
) {
  categories.push(newCategory);
  categoryDropDownList(categories);
  categoryInput.value = newCategory;
  newCategoryInput.value = "";
  newCategoryInput.classList.add("invisible");
  categoryInput.classList.remove("invisible");
  newCategoryIconDiv.classList.add("d-none");

  let dropDownCategoryDivs = document.querySelectorAll(".dropDownCategoryDiv");
  dropDownCategoryDivs.forEach((div) => {
    if (div.textContent.trim() === newCategory) {
      highlightSelectedTask(
        categoryInput,
        div,
        dropDownCategoryDivs,
        newCategoryInput
      );
      toggleDropdown(true);
    }
  });
}

/**
 * Creates a subtask 
 */
function createSubtask() {
  let subtaskInput = document.querySelector(".subtaskInput");
  let subtaskValue = subtaskInput.value.trim();
  let subtaskList = document.querySelector(".subtaskList");
  let subtaskInvalidDiv = document.querySelector(".subtaskInvalidDiv");

  if (subtaskValue !== "") {
    let subtaskIndex = subtaskList.children.length;
    let subtaskListHTML = `<li class="subtaskLI" data-index="${subtaskIndex}"><span class="subtaskText">${subtaskValue}</span> <div class="subtaskEditDiv"><input maxlength="16" class="subtaskEditInput invisible"/><img src="../img/check-icon-darkblue.svg" alt="check-icon" class="subtaskSaveIcon invisible" onclick="saveEditedSubtask(${subtaskIndex})"></div> <div class="subtaskIconDiv"><img class="editSubtask" src="../img/edit-pencil.svg" alt="edit-pencil" onclick="editSubtask(${subtaskIndex})"> <img class="deleteSubtask" src="../img/delete-trash.svg" alt="delete-trash" onclick="deleteSubtask(${subtaskIndex})"></div></li>`;
    subtaskList.innerHTML += subtaskListHTML;
    subtaskInput.value = "";
    hideSubtaskError();
  } else {
    showSubtaskError(subtaskInvalidDiv, subtaskInput);
  }
}

/**
 * Shows subtask error 
 * @param {HTMLElement} subtaskInvalidDiv -Error div
 * @param {HTMLElement} subtaskInput -Subtask input 
 */
function showSubtaskError(subtaskInvalidDiv, subtaskInput) {
  subtaskInvalidDiv.classList.remove("invisible");
  subtaskInput.classList.add("warning");
}

/**
 * Hides subtask error.
 */
function hideSubtaskError() {
  let subtaskInvalidDiv = document.querySelector(".subtaskInvalidDiv");
  let subtaskInput = document.querySelector(".subtaskInput");
  subtaskInvalidDiv.classList.add("invisible");
  subtaskInput.classList.remove("warning");
}

/**
 * Edits a subtask
 * @param {number} subtaskIndex 
 */
function editSubtask(subtaskIndex) {
  let subtaskLI = document.querySelectorAll(".subtaskLI")[subtaskIndex];
  let subtaskText = subtaskLI.textContent.trim();
  let subtaskInput = subtaskLI.querySelector(".subtaskEditInput");
  let subtaskSaveIcon = subtaskLI.querySelector(".subtaskSaveIcon");
  let subtaskIconDiv = subtaskLI.querySelector(".subtaskIconDiv");
  subtaskSaveIcon.classList.remove("invisible");
  subtaskInput.classList.remove("invisible");
  subtaskIconDiv.classList.add("invisible");
  subtaskInput.value = subtaskText;
  subtaskInput.focus();
  subtaskInput.select();
}

/**
 * Saves edited subtask.
 * @param {number} subtaskIndex - Index of the subtask.
 */
function saveEditedSubtask(subtaskIndex) {
  let subtaskLI = document.querySelectorAll(".subtaskLI")[subtaskIndex];
  let subtaskInput = subtaskLI.querySelector(".subtaskEditInput");
  let editedSubtaskValue = subtaskInput.value.trim();
  let subtaskSaveIcon = subtaskLI.querySelector(".subtaskSaveIcon");
  let subtaskTextSpan = subtaskLI.querySelector(".subtaskText");
  let subtaskIconDiv = subtaskLI.querySelector(".subtaskIconDiv");
  if (editedSubtaskValue === "") {
    subtaskInput.classList.add("warning");
    subtaskInput.focus();
    return;
  }
  subtaskTextSpan.textContent = editedSubtaskValue;
  subtaskSaveIcon.classList.add("invisible");
  subtaskInput.classList.add("invisible");
  subtaskIconDiv.classList.remove("invisible");
}

/**
 * Deletes a subtask.
 * @param {number} subtaskIndex - Index of the subtask.
 */
function deleteSubtask(subtaskIndex) {
  let subtaskItem = document.querySelector(
    `.subtaskLI[data-index="${subtaskIndex}"]`
  );
  if (subtaskItem) {
    subtaskItem.remove();
  }
}

/**
 * Checks values to disable or enable the create task button 
 */
function checkValuesForCreateTaskButton() {
  let createTaskButton = document.querySelector(".createTaskButton");
  let titleInput = document.querySelector(".titleInput");
  let dateInput = document.querySelector(".dateInput");
  let categorySelect = document.querySelector(".categorySelect");

  if (
    titleInput.value !== "" &&
    dateInput.value !== "" &&
    categorySelect.value !== ""
  ) {
    createTaskButton.removeAttribute("disabled");
  } else {
    createTaskButton.setAttribute("disabled", "disabled");
  }
}

/**
 * Clears all input fiels and resets selectors to their default state in the fom
 */
function clearTaskSelectorForm() {
  clearTaskSelectorInputs();
  clearTaskSelectorButtons();
  clearTaskSelectorHighlights();
  clearTaskSelectorUserImages();
  clearTaskSelectorDropDowns();
  clearTaskSelectorSubtasks();
  checkValuesForCreateTaskButton();
}

/**
 * Clears all input fields in the task selector 
 */
function clearTaskSelectorInputs() {
  let inputs = document.querySelectorAll("input");
  let textarea = document.querySelector(".descriptionTextArea");
  inputs.forEach((input) => {
    input.value = "";
  });
  textarea.value = "";
}

/**
 * Deselects all buttons in the task selector form 
 */
function clearTaskSelectorButtons() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
  setMediumButtonSelected();
}

/**
 * Clears all highlighted categorys in the task selector form
 */
function clearTaskSelectorHighlights() {
  let categoryInput = document.querySelector(".categorySelect");
  let dropDownCategoryDivs = document.querySelectorAll(".dropDownCategoryDiv");
  dropDownCategoryDivs.forEach((div) => {
    div.classList.remove("selectedCategory");
  });
  categoryInput.value = "";
  let dropDownContactsDivs = document.querySelectorAll(".dropDownContactDiv");
  dropDownContactsDivs.forEach((div) => {
    div.classList.remove("selectedContact");
    let checkBoxIcon = div.querySelector(".checkBoxIcon");
    if (checkBoxIcon) {
      checkBoxIcon.classList.remove("selectedContactCheckBox");
      checkBoxIcon.src = "../img/checkbox-icon.svg";
      let checkBoxIconDiv = div.querySelector(".checkBoxIconDiv");
      checkBoxIconDiv.style.height = "24px";
    }
  });
}
/**
 * Closes all dropdowns in the task selector form 
 */
function clearTaskSelectorDropDowns() {
  let categoryDropdown = document.querySelector(".dropDownCategory");
  let contactDropdown = document.querySelector(".dropDownContacts");
  let categoryArrow = document.querySelector(".categoryDiv .dropDownArrow");
  let contactArrow = document.querySelector(".assignedDiv .dropDownArrow");

  if (categoryDropdown.classList.contains("visible")) {
    categoryDropdown.classList.remove("visible");
    categoryDropdown.classList.add("invisible");
    categoryArrow.classList.remove("rotate");
  }

  if (contactDropdown.classList.contains("visible")) {
    contactDropdown.classList.remove("visible");
    contactDropdown.classList.add("invisible");
    contactArrow.classList.remove("rotate");
  }
}

/**
 * Clears the list of selected contact images in the task selector form 
 */
function clearTaskSelectorUserImages() {
  let contactIcons = document.querySelector(".contactInitials");
  contactIcons.innerHTML = "";
}

/**
 * Clears the list of subtasks in the task selector form 
 */
function clearTaskSelectorSubtasks() {
  let subtaskList = document.querySelector(".subtaskList");
  subtaskList.innerHTML = "";
}

/**
 * Creates a new task based on the form values selected 
 * @param {boolean} isAddTaskOpenFromBoard 
 * @param {string} taskCategory 
 */
function createTask(isAddTaskOpenFromBoard, taskCategory) {
  let formValues = getAddTaskFormValues();
  let taskData = {
    id: getTaskMaxID(),
    title: formValues.title,
    description: formValues.description,
    assignedContacts: formValues.assignedContacts,
    dueDate: formValues.dueDate,
    priority: formValues.priority,
    category: formValues.category,
    categoryColor: formValues.categoryColor,
    taskCategory: taskCategory || "to do",
    subtasks: formValues.subtasks.map((subtask, index) => ({
      id: `subtask-${index}`,
      description: subtask,
      completed: false,
    })),
    subtasksAmount: formValues.subtasks.length,
  };
  processTask(taskData);
  if (isAddTaskOpenFromBoard) {
    updateBoard();
    showTaskCreationOverlay(true);
    addDragAndDropEventListeners();
  } else {
    redirectToBoard();
    showTaskCreationOverlay(false);
  }
}

/**
 * Finds the maximum ID of existing tasks and
 * @returns {number} The next available ID for a new task
 */
function getTaskMaxID() {
  let maxID = 0;
  tasks.forEach((task) => {
    if (task.id > maxID) {
      maxID = task.id;
    }
  });
  return maxID + 1;
}

/**
 * Shows an overlay that shows the task creation status 
 * @param {boolean} isShowCreationOverlayOpenFromBoard 
 */
function showTaskCreationOverlay(isShowCreationOverlayOpenFromBoard) {
  let addTaskOverlay = document.querySelector(".createTaskOverlay");

  if (isShowCreationOverlayOpenFromBoard) {
    addTaskOverlay.classList.remove("slideOut");
    addTaskOverlay.classList.add("slideInCreateTaskOverlayBoard");
    setTimeout(() => {
      addTaskOverlay.classList.remove("slideInCreateTaskOverlayBoard");
      addTaskOverlay.classList.add("slideOut");
    }, 2000);
  } else {
    addTaskOverlay.classList.remove("slideOut");
    addTaskOverlay.classList.add("slideInCreateTaskOverlayAddTask");
    setTimeout(() => {
      addTaskOverlay.classList.remove("slideInCreateTaskOverlayAddTask");
      addTaskOverlay.classList.add("slideOut");
    }, 2000);
  }
}

/**
 * Gets the color of a specific task category 
 * @param {string} category 
 * @returns the color of the task category 
 */
function getCategoryColor(category) {
  let prefix = `var(--task-category-color-`;
  switch (category) {
    case "Technical Task":
      return `${prefix + "technical-task)"}`;
    case "User Story":
      return `${prefix + "user-story)"}`;
    case "Javascript":
      return `${prefix + "javascript)"}`;
    case "HTML":
      return `${prefix + "html)"}`;
    case "CSS":
      return `${prefix + "css)"}`;
    default:
      return `${prefix + "default)"}`;
  }
}

/**
 * Brings User to the board with a delay 
 */
function redirectToBoard() {
  setTimeout(() => {
    window.location.href = "board.html";
  }, 2000);
}
/**
 * Processes and saves the new taskdata 
 * @param {object} taskData 
 */
function processTask(taskData) {
  tasks.push(taskData);
  saveTasks();
  clearTaskSelectorForm();
}

/** 
 * Updates the board 
 * */ 
function updateBoard() {
  closeAddTaskOverlay();
  generateTasks();
  checkAndGenerateEmptyTask();
}
