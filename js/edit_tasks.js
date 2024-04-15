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
