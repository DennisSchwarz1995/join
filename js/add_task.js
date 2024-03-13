async function initAddTask() {
  await loadContacts();
  await loadTasks();
  generateNavbar();
  generateHeader();
  setMediumButtonSelected();
  generateAddTask(contacts);
  setMinDate();
  selectTaskCategory();
  checkValuesForCreateTaskButton();
}

let isCategoryDropdown = false;
let isDropdownOpen = false;
let isAddTaskOpenFromBoard = false;
let categories = ["Technical Task", "User Story", "Javascript", "HTML", "CSS"];
let subtaskIndex = 0;

function generateAddTask(contacts) {
  contactDropDownList(contacts);
  categoryDropDownList(categories);
}

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

function getInitials(name) {
  let names = name.split(" ");
  let initials = names.map((n) => n.charAt(0)).join("");
  return initials.toUpperCase();
}

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

function setMediumButtonSelected() {
  let mediumButton = document.querySelector(".mediumButton");
  setButtonPrio(mediumButton);
}

function openCalendar() {
  let dateInput = document.querySelector(".dateInput");
  dateInput.focus();
  dateInput.showPicker();
}

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
      formValues.priority = button.textContent.trim();
    }
  });
  formValues.category = categoryInput.value.trim();
  formValues.subtasks = Array.from(subtaskList).map((subtask) =>
    subtask.textContent.trim()
  );

  return formValues;
}

function setMinDate() {
  let today = new Date().toISOString().split("T")[0];
  let dateInput = document.querySelector(".dateInput");
  dateInput.setAttribute("min", today);
}

function toggleContactSelection(contactDiv, contactName) {
  let checkBoxIcon = contactDiv.querySelector(".checkBoxIcon");
  let checkBoxIconDiv = contactDiv.querySelector(".checkBoxIconDiv");
  checkBoxIcon.classList.toggle("selectedContactCheckBox");
  contactDiv.classList.toggle("selectedContact");

  if (checkBoxIcon.classList.contains("selectedContactCheckBox")) {
    checkBoxIcon.src = "../img/checkbox-icon-selected.svg";
    checkBoxIconDiv.style.height = "19px";
    createInitialsImage(contactName, contacts);
  } else {
    checkBoxIcon.src = "../img/checkbox-icon.svg";
    checkBoxIconDiv.style.height = "24px";
    removeInitialsImage(contactName);
  }
}

function findContactIndexByName(contactName, contacts) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === contactName) {
      return i;
    }
  }
  return -1;
}

function createInitialsImage(contactName, contacts) {
  let initialsSection = document.querySelector(".contactInitials");
  let initials = getInitials(contactName);
  let contactIndex = findContactIndexByName(contactName, contacts);

  if (contactIndex !== -1) {
    let contactIconHTML = `
      <div class="dropDownContactIcon" style="background-color: ${contacts[contactIndex].color};">${initials}</div>
    `;
    initialsSection.innerHTML += contactIconHTML;
  }
}

function removeInitialsImage(contactName) {
  let initialsSection = document.querySelector(".contactInitials");
  let initialsIcons = initialsSection.querySelectorAll(".dropDownContactIcon");

  initialsIcons.forEach((icon) => {
    if (icon.textContent.trim() === getInitials(contactName)) {
      icon.remove();
    }
  });
}

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

function changeInputField(categoryInput, newCategoryInput, newCategoryIconDiv) {
  categoryInput.classList.add("invisible");
  newCategoryInput.classList.remove("invisible");
  newCategoryIconDiv.classList.remove("d-none");
  setTimeout(() => {
    newCategoryInput.focus();
  }, 100);
  toggleDropdown(true);
}

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

function showCategoryError(categoryInvalidDiv, newCategoryInput) {
  categoryInvalidDiv.textContent =
    "Please enter a category consisting of maximum 16 letters.";
  categoryInvalidDiv.classList.remove("invisible");
  newCategoryInput.classList.add("warning");
}

function hideCategoryError() {
  let categoryInvalidDiv = document.querySelector(".categoryInvalidDiv");
  let newCategoryInput = document.querySelector(".newCategoryInput");
  categoryInvalidDiv.classList.add("invisible");
  newCategoryInput.classList.remove("warning");
}

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

function createSubtask() {
  let subtaskInput = document.querySelector(".subtaskInput");
  let subtaskValue = subtaskInput.value.trim();
  let subtaskList = document.querySelector(".subtaskList");
  let subtaskInvalidDiv = document.querySelector(".subtaskInvalidDiv");

  if (subtaskValue !== "") {
    let subtaskListHTML = `<li class="subtaskLI" data-index="${subtaskIndex}"><span class="subtaskText">${subtaskValue}</span> <div class="subtaskEditDiv"><input maxlength="30" class="subtaskEditInput invisible"/><img src="../img/check-icon-darkblue.svg" alt="check-icon" class="subtaskSaveIcon invisible" onclick="saveEditedSubtask(${subtaskIndex})"></div> <div class="subtaskIconDiv"><img class="editSubtask" src="../img/edit-pencil.svg" alt="edit-pencil" onclick="editSubtask(${subtaskIndex})"> <img class="deleteSubtask" src="../img/delete-trash.svg" alt="delete-trash" onclick="deleteSubtask(${subtaskIndex})"></div></li>`;
    subtaskList.innerHTML += subtaskListHTML;
    subtaskInput.value = "";
    hideSubtaskError();
    subtaskIndex++;
  } else {
    showSubtaskError(subtaskInvalidDiv, subtaskInput);
  }
}

function showSubtaskError(subtaskInvalidDiv, subtaskInput) {
  subtaskInvalidDiv.classList.remove("invisible");
  subtaskInput.classList.add("warning");
}

function hideSubtaskError() {
  let subtaskInvalidDiv = document.querySelector(".subtaskInvalidDiv");
  let subtaskInput = document.querySelector(".subtaskInput");
  subtaskInvalidDiv.classList.add("invisible");
  subtaskInput.classList.remove("warning");
}

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

function saveEditedSubtask(subtaskIndex) {
  let subtaskLI = document.querySelectorAll(".subtaskLI")[subtaskIndex];
  let subtaskInput = subtaskLI.querySelector(".subtaskEditInput");
  let editedSubtaskValue = subtaskInput.value.trim();
  let subtaskSaveIcon = subtaskLI.querySelector(".subtaskSaveIcon");
  let subtaskTextSpan = subtaskLI.querySelector(".subtaskText");
  let subtaskIconDiv = subtaskLI.querySelector(".subtaskIconDiv");
  subtaskTextSpan.textContent = editedSubtaskValue;
  subtaskSaveIcon.classList.add("invisible");
  subtaskInput.classList.add("invisible");
  subtaskIconDiv.classList.remove("invisible");
}

function deleteSubtask(subtaskIndex) {
  let subtaskItem = document.querySelector(
    `.subtaskLI[data-index="${subtaskIndex}"]`
  );
  if (subtaskItem) {
    subtaskItem.remove();
  }
}

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

function clearTaskSelectorForm() {
  clearTaskSelectorInputs();
  clearTaskSelectorButtons();
  clearTaskSelectorHighlights();
  clearTaskSelectorUserImages();
  clearTaskSelectorDropDowns();
  clearTaskSelectorSubtasks();
  checkValuesForCreateTaskButton();
}

function clearTaskSelectorInputs() {
  let inputs = document.querySelectorAll("input");
  let textarea = document.querySelector(".descriptionTextArea");
  inputs.forEach((input) => {
    input.value = "";
  });
  textarea.value = "";
}

function clearTaskSelectorButtons() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
  setMediumButtonSelected();
}

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

function clearTaskSelectorUserImages() {
  let contactIcons = document.querySelector(".contactInitials");
  contactIcons.innerHTML = "";
}

function clearTaskSelectorSubtasks() {
  let subtaskList = document.querySelector(".subtaskList");
  subtaskList.innerHTML = "";
}

function createTask(isAddTaskOpenFromBoard) {
  let formValues = getAddTaskFormValues();
  let taskData = {
    title: formValues.title,
    description: formValues.description,
    assignedContacts: formValues.assignedContacts,
    dueDate: formValues.dueDate,
    priority: formValues.priority,
    category: formValues.category,
    subtasks: formValues.subtasks,
    taskCategory: "to do",
  };
  tasks.push(taskData);
  saveTasks();
  clearTaskSelectorForm();
  showTaskCreationOverlay();
  if (isAddTaskOpenFromBoard) {
    generateTasks();
  }
  if (!isAddTaskOpenFromBoard) {
    setTimeout(() => {
      window.location.href = "board.html";
    }, 2000);
  }
}

function showTaskCreationOverlay() {
  let addTaskOverlay = document.querySelector(".createTaskOverlay");
  addTaskOverlay.classList.remove("slideOut");
  addTaskOverlay.classList.add("slideInCreateTaskOverlay");
  setTimeout(() => {
    addTaskOverlay.classList.remove("slideInCreateTaskOverlay");
    addTaskOverlay.classList.add("slideOut");
  }, 2000);
}
