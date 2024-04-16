/**
 * Loads contacts and tasks, generates navbar and header, generates UI components
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
      <div class="dropDownContactDiv" onclick="toggleContactSelection(this, '${contact.name}')">
          <div class="contactWrapper">
            <div class="dropDownContactIcon" style="background-color: ${contact.color};"> ${getInitials(contact.name)}</div>
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
 * @param {Array} categories - List of categories .
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
 * Creates a new task based on the form values selected
 * @param {boolean} isAddTaskOpenFromBoard
 * @param {string} taskCategory - The assigned taskcategory from the board, to display it in the right tasklist.
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
 * Gets form values for creating a task
 * @returns {Object} - Form values.
 */
function getAddTaskFormValues() {
  let formValues = {};
  let titleInput = document.querySelector(".titleInput");
  let descriptionTextArea = document.querySelector(".descriptionTextArea");
  let dueDateInput = document.querySelector(".dateInput");
  let categoryInput = document.querySelector(".categorySelect");
  let subtaskList = document.querySelectorAll(".subtaskLI .subtaskText");

  formValues.title = titleInput.value.trim();
  formValues.description = descriptionTextArea.value.trim();
  formValues.assignedContacts = getAssignedContacts(); 
  formValues.dueDate = dueDateInput.value;
  formValues.priority = getSelectedPriority();  
  formValues.category = categoryInput.value.trim();
  formValues.categoryColor = getCategoryColor(formValues.category);
  formValues.subtasks = Array.from(subtaskList).map(subtask => subtask.textContent.trim());
  return formValues;
}

/**
 * Auxiliary function to get the formvalues for the assigned contacts
 * @returns {Object} - Name, color and initials from the contact
 */
function getAssignedContacts() {
  let assignedContacts = document.querySelectorAll(".selectedContact");
  return Array.from(assignedContacts).map((contact) => {
    let name = contact.querySelector(".dropDownContactName").textContent.trim();
    let color = contact.querySelector(".dropDownContactIcon").style.backgroundColor;
    let initials = getInitials(name);
    return { name, color, initials };
  });
}

/**
 * Auxiliary function to get the formvalues for the assigned priobutton
 * @returns {string} the path from the src of the image to display on the task.
 */
function getSelectedPriority() {
  let prioButtons = document.querySelectorAll(".prioButtonsDiv button");
  let priority = null;
  prioButtons.forEach((button) => {
    if (button.classList.contains("selected")) {
      let buttonImageSrc = button.querySelector("img").src;
      let relativeImagePath = buttonImageSrc.substring(buttonImageSrc.indexOf("/img"));
      priority = relativeImagePath;
    }
  });
  return priority;
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
 * Finds the index of a contact in the contacts array based on the name
 * @param {*} contactName - Name of the contacts
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
        highlightSelectedTask(categoryInput,  categoryDiv, dropDownCategoryDivs, newCategoryInput);
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
function highlightSelectedTask(categoryInput, categoryDiv, dropDownCategoryDivs, newCategoryInput) {
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
  dropDownCategoryDivs.forEach((div) => {div.classList.remove("selectedCategory");});
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
    addCategoryAndHighlight(newCategory, categoryInput, newCategoryInput, newCategoryIconDiv);
    hideCategoryError();
  }
}

/**
 * Shows category error message
 * @param {HTMLElement} categoryInvalidDiv
 * @param {HTMLElement} newCategoryInput
 */
function showCategoryError(categoryInvalidDiv, newCategoryInput) {
  categoryInvalidDiv.textContent = "Please enter a category consisting of maximum 16 letters.";
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
 * Checks values to disable or enable the create task button
 */
function checkValuesForCreateTaskButton() {
  let createTaskButton = document.querySelector(".createTaskButton");
  let titleInput = document.querySelector(".titleInput");
  let dateInput = document.querySelector(".dateInput");
  let categorySelect = document.querySelector(".categorySelect");
  if (titleInput.value !== "" && dateInput.value !== "" && categorySelect.value !== "") {
    createTaskButton.removeAttribute("disabled");
  } else {
    createTaskButton.setAttribute("disabled", "disabled");
  }
}

/**
 * If the clicked element is not part of or a trigger for any popup it closes any open popups by adding the 'invisible' class to them
 * @param {Event} event - The click event on the document
 */
document.addEventListener("click", function (event) {
  if (!event.target.closest(".taskCardMovePopup") && !event.target.closest(".dropDownContacts") && !event.target.closest(".dropDownCategory") && !event.target.classList.contains("taskCardMoveButton") &&
    !event.target.classList.contains("contactsSelect") &&
    !event.target.classList.contains("categorySelect")
  ) {
    document.querySelectorAll(".taskCardMovePopup, .dropDownContacts, .dropDownCategory").forEach((popup) => { popup.classList.add("invisible");});
  }
});
