/*
 * Highlights the selected contact card and shows its details
 * @param {number} index - The index of the selected contact card
 */
function highlightSelectedContact(index) {
  let contactCards = document.querySelectorAll(".contactCard");
  contactCards.forEach((card, i) => {
    if (i === index) {
      if (card.classList.contains("selectedContact")) {
        card.classList.remove("selectedContact");
        card.onclick = function () {
          highlightSelectedContact(i);
          showContactDetails(i);
        };
      } else {
        card.classList.add("selectedContact");
        card.onclick = null;
      }
    } else {
      card.classList.remove("selectedContact");
      card.onclick = function () {
        highlightSelectedContact(i);
        showContactDetails(i);
      };
    }
  });
}

/**
 * Shows the detailed view of a contact
 * @param {number} index - The index of the contact to display details for
 */
function showContactDetails(index) {
  let contact = contacts[index];
  let detailedView = document.querySelector(".detailedView");
  if (isDetailViewOpen) {
    detailedView.classList.add("slideOut");
    setTimeout(() => {
      detailedView.innerHTML = contactsDetailHTML(contact);
      detailedView.classList.remove("slideOut");
      detailedView.classList.add("slideIn");
    }, 300);
  } else {
    detailedView.innerHTML = contactsDetailHTML(contact);
    detailedView.classList.add("slideIn");
  }
  isDetailViewOpen = true;
}

/**
 * Opens the edit contact overlay, fills the form with the selected contact's information, and shows the background overlay
 */
function openEditContactOverlay() {
  isEditingContact = true;
  let overlay = document.querySelector(".editContactOverlay");
  if (overlay) {
    overlay.classList.add("show");
    fillEditFormInputs();
    showBackground();
    isEditContactOverlayOpen = true;
  }
}

/**
 * Fills the edit contact form inputs with the information of the selected contact.
 */
function fillEditFormInputs() {
  let selectedContactIndex = getSelectedContactIndex();
  if (selectedContactIndex !== -1) {
    let contact = contacts[selectedContactIndex];
    let nameInput = document.querySelector("#editFullname");
    let emailInput = document.querySelector("#editEmail");
    let phoneInput = document.querySelector("#editPhone");
    let userIconDiv = document.querySelector(".editContactForm .userIconDiv");

    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;
    userIconDiv.style.backgroundColor = contact.color;
    userIconDiv.innerHTML = `<h2>${getInitials(contact.name)}</h2>`;
  }
}

/**
 * Gets the index of the selected contact card
 * @returns {number} The index of the selected contact card, or -1 if none is selected
 */
function getSelectedContactIndex() {
  let contactCards = document.querySelectorAll(".contactCard");
  for (let i = 0; i < contactCards.length; i++) {
    if (contactCards[i].classList.contains("selectedContact")) {
      return i;
    }
  }
  return -1;
}

/**
 * Saves the edited contact informations
 */
function saveEditedContact() {
  let selectedContactIndex = getSelectedContactIndex();
  if (selectedContactIndex !== -1) {
    let nameInput = document.querySelector("#editFullname");
    let emailInput = document.querySelector("#editEmail");
    let phoneInput = document.querySelector("#editPhone");

    let editedContact = {
      name: capitalizeName(nameInput.value.trim()),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      color: contacts[selectedContactIndex].color,
    };

    contacts[selectedContactIndex] = editedContact;
    sortContacts();
    saveContact();
    generateContacts();
    closeContactOverlay();
    showContactDetails(selectedContactIndex);
    highlightSelectedContact(selectedContactIndex);
  }
}

/**
 * Deletes the selected contact from the contacts list
 */
async function deleteContact() {
  let selectedIndex = getSelectedContactIndex();
  if (selectedIndex !== -1) {
    contacts.splice(selectedIndex, 1);
    closeContactOverlay();
    await saveContact();
    loadContacts();
    generateContacts();
    isDetailViewOpen = false;
  }
}

/**
 * Fills the edit contact form inputs with the information of the selected contact
 */
function fillEditFormInputs() {
  let selectedContactIndex = getSelectedContactIndex();
  if (selectedContactIndex !== -1) {
    let contact = contacts[selectedContactIndex];
    let nameInput = document.querySelector("#editFullname");
    let emailInput = document.querySelector("#editEmail");
    let phoneInput = document.querySelector("#editPhone");
    let userIconDiv = document.querySelector(".editContactForm .userIconDiv");

    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;
    userIconDiv.style.backgroundColor = contact.color;
    userIconDiv.innerHTML = `<h2>${getInitials(contact.name)}</h2>`;
  }
}

/**
 * Gets the index of the selected contact card
 * @returns {number} The index of the selected contact card, or -1 if none is selected
 */
function getSelectedContactIndex() {
  let contactCards = document.querySelectorAll(".contactCard");
  for (let i = 0; i < contactCards.length; i++) {
    if (contactCards[i].classList.contains("selectedContact")) {
      return i;
    }
  }
  return -1;
}

/**
 * Saves the edited contact information
 */
function saveEditedContact() {
  let selectedContactIndex = getSelectedContactIndex();
  if (selectedContactIndex !== -1) {
    let nameInput = document.querySelector("#editFullname");
    let emailInput = document.querySelector("#editEmail");
    let phoneInput = document.querySelector("#editPhone");

    let editedContact = {
      name: capitalizeName(nameInput.value.trim()),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      color: contacts[selectedContactIndex].color,
    };

    contacts[selectedContactIndex] = editedContact;
    sortContacts();
    saveContact();
    generateContacts();
    closeContactOverlay();
    showContactDetails(selectedContactIndex);
    highlightSelectedContact(selectedContactIndex);
  }
}

/**
 * Deletes the selected contact from the contact list
 */
async function deleteContact() {
  let selectedIndex = getSelectedContactIndex();
  if (selectedIndex !== -1) {
    contacts.splice(selectedIndex, 1);
    closeContactOverlay();
    await saveContact();
    await loadContacts();
    generateContacts();
    isDetailViewOpen = false;
  }
}


/**
 * Closes the detailed view on mobile devices
 */
function closeDetailedView() {
  let detailedViews = document.querySelectorAll(".detailedView");
  detailedViews.forEach(function (view) {
    view.classList.add("slideOut");
  });
}


/**
 * Shows an overlay for the edit and delete function on mobile devices
 */
function showMobileEditAndDeleteOverlay() {
  let overlay = document.querySelector(".mobileEditAndDeleteMenuOverlay");
  overlay.classList.toggle("show");
  overlay.classList.toggle("slideOut");
}

/**
 * Generates random color for styling purposes
 * @returns - A random Color
 */
function getRandomColor() {
  let colorSuffixes = [
    "lightorange",
    "mediumorange",
    "darkorange",
    "lightblue",
    "darkblue",
    "cyan",
    "lightpink",
    "mediumpink",
    "darkpink",
    "purple",
    "lightyellow",
    "mediumyellow",
    "darkyellow",
    "green",
    "red",
    "violet",
  ];

  return colorSuffixes[Math.floor(Math.random() * colorSuffixes.length)];
}

/**
 * Extracts the initals from a given name
 * @param {string} name - The name from which to extract initals
 * @returns {string} - The extracted initals
 */
function getInitials(name) {
  let names = name.split(" ");
  let initials = names.map((n) => n.charAt(0)).join("");
  return initials.toUpperCase();
}

/**
 * Capitalizes the first letter of each word in a sting
 * @param {string} name  - The name to capitalize
 * @returns {sting} - The capitalized string
 */
function capitalizeName(name) {
  let names = name.split(" ");
  let capitalizedNames = names.map(
    (n) => n.charAt(0).toUpperCase() + n.slice(1)
  );
  return capitalizedNames.join(" ");
}

/**
 * Event listener for form input changes to enable or disable the submit button.
 */
document.addEventListener("DOMContentLoaded", function () {
  let contactForm = document.querySelector(".contactForm");
  contactForm.addEventListener("input", checkValuesForSubmitButton);
});

document.addEventListener("DOMContentLoaded", function () {
  let editContactForm = document.querySelector(".editContactForm");
  editContactForm.addEventListener("input", checkValuesForSubmitButton);
});

/**
 * Gets the form elements based on whether the form is for editing a contact or creating a new one
 * @param {boolean} isEditingContact - Indicates whether the form is for editing a contact
 * @returns An object containing references to the form elements
 */
function getFormElements(isEditingContact) {
  let nameInput, emailInput, phoneInput;
  let nameInvalidDiv, emailInvalidDiv, phoneInvalidDiv;
  let button;

  if (isEditingContact) {
    nameInput = document.getElementById("editFullname");
    emailInput = document.getElementById("editEmail");
    phoneInput = document.getElementById("editPhone");
    nameInvalidDiv = document.querySelector(".editContactNameInvalidDiv");
    emailInvalidDiv = document.querySelector(".editContactEmailInvalidDiv");
    phoneInvalidDiv = document.querySelector(".editContactPhoneInvalidDiv");
    button = document.getElementById("saveContactButton");
  } else {
    nameInput = document.getElementById("fullname");
    emailInput = document.getElementById("email");
    phoneInput = document.getElementById("phone");
    nameInvalidDiv = document.querySelector(".contactNameInvalidDiv");
    emailInvalidDiv = document.querySelector(".contactEmailInvalidDiv");
    phoneInvalidDiv = document.querySelector(".contactPhoneInvalidDiv");
    button = document.getElementById("createContactButton");
  }

  return {
    nameInput,
    emailInput,
    phoneInput,
    nameInvalidDiv,
    emailInvalidDiv,
    phoneInvalidDiv,
    button,
  };
}

/**
 * Cancels input for the contact overlay
 */
function cancelInput() {
  let nameInput = document.getElementById("fullname");
  let emailInput = document.getElementById("email");
  let phoneInput = document.getElementById("phone");
  if (
    nameInput.value.trim() !== "" ||
    emailInput.value.trim() !== "" ||
    phoneInput.value.trim() !== ""
  ) {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    checkEmailValidity();
    checkPhoneNumberValidity();
    checkContactNameValidity();
    checkValuesForSubmitButton();
  } else {
    closeContactOverlay();
  }
}
