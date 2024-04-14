/**
 * Initializes contacts, generating HTML, and seting up UI elements
 */
async function initContacts() {
  await loadContacts();
  generateContacts();
  generateNavbar();
  generateHeader();
  checkValuesForSubmitButton();
  checkWindowSize();
}

let isContactOverlayOpen = false;
let isEditingContact = false;
let isEditContactOverlayOpen = false;
let isDetailViewOpen = false;

/**
 * Generates HTML for the contact list and updates the DOM
 */
function generateContacts() {
  let contactsList = document.querySelector(".contacts");
  if (contactsList) {
    contactsList.innerHTML = contactsHTML();
  } else {
    console.error("Contacts-List not found");
  }
}

/**
 * Function to check window size for the mobile version 
 */
function checkWindowSize() {
  if (isMobileDevice()) {
    document.getElementById('contactDetailedInfo').style.display = 'none'
  }
}

/**
 * 
 * @returns {boolean} - the window size 
 */
function isMobileDevice() {
  return window.innerWidth <= 768;
}

/**
 * Opens the contact overlay for adding a new contact
 */
function openContactOverlay() {
  isEditingContact = false;
  let overlay = document.querySelector(".contactOverlay");
  if (isContactOverlayOpen) {
    closeContactOverlay();
    cancelInput();
  } else {
    setTimeout(() => {
      overlay.classList.add("show");
    }, 0);
    isContactOverlayOpen = true;
    showBackground();
  }
}

/**
 * Closes the contact overlay 
 */
function closeContactOverlay() {
  let overlay = document.querySelector(
    ".contactOverlay.show, .editContactOverlay.show"
  );
  if (overlay) {
    overlay.classList.remove("show");
    setTimeout(() => { }, 300);
    cancelInput();
    hideBackground();
  }
  isContactOverlayOpen = false;
  isEditContactOverlayOpen = false;
}

/**
 * Shows the background for the contact overlay 
 */
function showBackground() {
  let background = document.querySelector(".overlayBackground");
  background.classList.remove("invisible");
}

/**
 * Hides the background for the overlay 
 */
function hideBackground() {
  let background = document.querySelector(".overlayBackground");
  background.classList.add("invisible");
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

/**
 * Adds a contact to the specified category 
 * @param {string} category - The category to which the contact will be added
 * @param {Object} contact - The contact object to be added
 */
function addContactToCategory(category, contact) {
  let contactList = document.querySelector(".contactList");
  let existingCategories = getExistingCategories(contactList);

  if (existingCategories.includes(category)) {
    addContactToExistingCategory(contactList, category, contact);
  } else {
    addContactToNewCategory(contactList, category, contact, existingCategories);
  }
  sortContacts();
  generateContacts();
}

/**
 * Adds a contact to an exisisting category 
 * @param {HTMLElement} contactList 
 * @param {string} category - the category to which the contact belongs 
 * @param {Object} contact - the contact to be added 
 */
function addContactToExistingCategory(contactList, category, contact) {
  let contactCard = createContactCard(contact);
  let categoryDiv = getCategoryDiv(contactList, category);
  let existingContactCards = getExistingContactCards(contactList, categoryDiv);

  let insertionIndex = getInsertionIndex(contact, existingContactCards);

  if (insertionIndex !== -1) {
    insertContactAtCurrentPosition(
      contactCard,
      categoryDiv.parentElement,
      insertionIndex
    );
  } else {
    appendContactToCategory(categoryDiv, contactCard);
  }
}

/**
 * Adds a contact to a new category in the contact list
 * @param {HTMLElement} contactList - The contact list container
 * @param {string} category - The category to which the contact belongs
 * @param {Object} contact - The contact object to be added
 * @param {string[]} existingCategories - Array of existing categories
 */
function addContactToNewCategory(
  contactList,
  category,
  contact,
  existingCategories
) {
  let newCategoryDiv = createCategoryDiv(category);
  let contactCard = createContactCard(contact);

  let insertionIndex = existingCategories.findIndex(
    (existingCategory) => category.localeCompare(existingCategory) <= 0
  );

  if (insertionIndex !== -1) {
    insertCategoryAndContact(
      contactList,
      newCategoryDiv,
      contactCard,
      insertionIndex
    );
  } else {
    appendCategoryAndContact(contactList, newCategoryDiv, contactCard);
  }
}

/**
 * Gets an array of existing contact cards within a specific category
 * @param {HTMLElement} contactList - contact list container 
 * @param {HTMLElement} categoryDiv -category div element
 * @returns {HTMLElement[]} - Array of existing contact cards 
 */
function getExistingContactCards(contactList, categoryDiv) {
  return Array.from(
    categoryDiv.parentElement.getElementsByClassName("contactCard")
  );
}

/**
 * Gets a contact card at a specified position within its parent element 
 * @param {HTMLElement} contactCard 
 * @param {HTMLElement} parentElement 
 * @param {number} insertionIndex 
 */
function insertContactAtCurrentPosition(
  contactCard,
  parentElement,
  insertionIndex
) {
  parentElement.insertBefore(
    contactCard,
    parentElement.children[insertionIndex]
  );
}

/**
 * Appends a contact card to a category section in the contact list 
 * @param {HTMLElement} categoryDiv -Category div element 
 * @param {HTMLElement} contactCard -Contact card to be appended 
 */
function appendContactToCategory(categoryDiv, contactCard) {
  categoryDiv.parentElement.parentNode.insertBefore(
    contactCard,
    categoryDiv.parentElement.nextSibling
  );
}

/**
 * Sets the insertion index for a new contact card within an array of existin contact card 
 * @param {Object} newContact -the new contact object 
 * @param {HTMLElement[]} existingContactCards  - array of existing contact card elements 
 * @returns 
 */
function getInsertionIndex(newContact, existingContactCards) {
  let newContactName = newContact.name.toLowerCase();

  for (let i = 0; i < existingContactCards.length; i++) {
    let existingContactName = getContactName(existingContactCards[i]);

    if (newContactName < existingContactName) {
      return i;
    }
  }
  return -1;
}

/**
 * Gets an array of existing categories from the contact list 
 * @param {HTMLElement} contactList - Contact list container 
 * @returns {string[]} Array of existion categories 
 */
function getExistingCategories(contactList) {
  return Array.from(contactList.getElementsByClassName("letterCategory")).map(
    (element) => element.textContent
  );
}

/**
 * Retrieves the name of a contact from its contact card element 
 * @param {HTMLElement} contactCard - Contact card element 
 * @returns {string} - The name of the Conact 
 */
function getContactName(contactCard) {
  return contactCard
    .querySelector(".contactNameSpan")
    .textContent.toLowerCase();
}

/**
 * Retrieves the category div element from its specific category 
 * @param {HTMLElement} contactList - Contact list container
 * @param {string} category - Category name 
 * @returns {HTMLElement} - Category div element 
 */
function getCategoryDiv(contactList, category) {
  let categoryDiv = Array.from(
    contactList.getElementsByClassName("letterCategory")
  ).find((element) => element.textContent === category);
  return categoryDiv.parentElement;
}

/**
 * Creates a new category div element with the specified category name
 * @param {string} category - The category name
 * @returns {HTMLElement} The newly created category div element
 */
function createCategoryDiv(category) {
  let newCategoryDiv = document.createElement("div");
  newCategoryDiv.classList.add("categorySection");
  newCategoryDiv.innerHTML = `
    <div class="contactCategoryDiv">
      <span class="letterCategory">${category}</span>
    </div>
    <div class="contactDividerDiv">
      <img class="contactDivider" src="../img/contact-divider.svg" />
    </div>
  `;
  return newCategoryDiv;
}

/**
 * Inserts a category div and its corresponding contact card into the contact list at a specified index
 * @param {HTMLElement} contactList - The contact list container
 * @param {HTMLElement} newCategoryDiv - The category div element to be inserted
 * @param {HTMLElement} contactCard - The contact card element to be inserted
 * @param {number} insertionIndex - The index at which the category and contact card should be inserted
 */
function insertCategoryAndContact(
  contactList,
  newCategoryDiv,
  contactCard,
  insertionIndex
) {
  contactList.insertBefore(
    newCategoryDiv,
    contactList.children[insertionIndex * 2]
  );
  contactList.insertBefore(
    contactCard,
    contactList.children[insertionIndex * 2 + 1]
  );
}

/**
 * Appends a category div and its contact card to the contact list 
 * @param {HTMLElement} contactList - Contact list container
 * @param {HTMLElement} newCategoryDiv - New category div element 
 * @param {HTMLElement} contactCard - Contact card element to be appended 
 */
function appendCategoryAndContact(contactList, newCategoryDiv, contactCard) {
  contactList.appendChild(newCategoryDiv);
  contactList.appendChild(contactCard);
}

/**
 * Creates contact and push it into array 
 */
function createContact() {
  let name = document.getElementById("fullname");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let formattedName = capitalizeName(name.value.trim());
  let category = formattedName.charAt(0).toUpperCase();
  let randomColor = getRandomColor();
  let newContact = {
    name: formattedName,
    email: email.value.trim(),
    phone: phone.value.trim(),
    color: `var(--bg-user-initials-color-${randomColor})`,
  };
  contacts.push(newContact);
  sortContacts();
  saveContact();
  addContactToCategory(category, newContact);
  closeContactOverlay();
  cancelInput();
  showCreateOverlay();
  showContactDetails(contacts.indexOf(newContact));
  highlightSelectedContact(contacts.indexOf(newContact));
}

/**
 * Sorts the contacts alphabetically 
 */
function sortContacts() {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Shows the overlay to create a contact
 */
function showCreateOverlay() {
  const createOverlay = document.getElementById("createContactOverlay");
  createOverlay.classList.remove("slideOut");
  createOverlay.classList.add("slideInContactOverlay");
  setTimeout(() => {
    createOverlay.classList.remove("slideInContactOverlay");
    createOverlay.classList.add("slideOut");
  }, 2000);
};

/**
 * Gets the category section element for the specified category
 * If the section does not exist, creates a new one 
 * @param {string} category - Category name 
 * @returns {HTMLElement} - The category section element 
 */
function getCategorySection(category) {
  let existingCategorySection = Array.from(
    document.querySelectorAll(".categorySection")
  ).find(
    (section) =>
      section.querySelector(".letterCategory").textContent === category
  );
  if (existingCategorySection) {
    return existingCategorySection;
  } else {
    return createNewCategorySection(category);
  }
}

/**
 * Creates a new category section with the specified category name 
 * @param {string} category - The category name  
 * @returns {HTMLElement} - The newly created category section element
 */
function createNewCategorySection(category) {
  let newCategorySection = document.createElement("div");
  newCategorySection.classList.add("categorySection");
  let categoryDiv = document.createElement("div");
  categoryDiv.classList.add("contactCategoryDiv");
  categoryDiv.innerHTML = `<span class="letterCategory">${category}</span>`;
  let dividerDiv = document.createElement("div");
  dividerDiv.classList.add("contactDividerDiv");
  dividerDiv.innerHTML = `<img class="contactDivider" src="../img/contact-divider.svg" />`;
  newCategorySection.appendChild(categoryDiv);
  newCategorySection.appendChild(dividerDiv);
  contactList.appendChild(newCategorySection);
  return newCategorySection;
}

/**
 * Creates a contact card element for the given contact information 
 * @param {string} contact - Contact information object
 * @returns {HTMLElement} - New created category section element 
 */
function createContactCard(contact) {
  let contactCard = document.createElement("div");
  contactCard.classList.add("contactCard");

  let initialsDiv = document.createElement("div");
  initialsDiv.classList.add("userInitialsDiv");
  initialsDiv.textContent = getInitials(contact.name);
  initialsDiv.style.background = contact.color;

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("contactInfoDiv");

  let nameSpan = document.createElement("span");
  nameSpan.classList.add("contactNameSpan");
  nameSpan.textContent = contact.name;

  let emailSpan = document.createElement("span");
  emailSpan.classList.add("contactMailSpan");
  emailSpan.textContent = contact.email;

  infoDiv.appendChild(nameSpan);
  infoDiv.appendChild(emailSpan);

  contactCard.appendChild(initialsDiv);
  contactCard.appendChild(infoDiv);

  return contactCard;
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
 * Checks the form input values to enable or disable the submit button
 */
function checkValuesForSubmitButton() {
  let { button } = getFormElements(isEditingContact);
  let isButtonEnabled = isSubmitButtonEnabled();

  if (isButtonEnabled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
}

/**
 * Checks if the submit button should be enabled based on form input validation
 * @returns {boolean} - True if the submit button should be enabled, otherwise false
 */
function isSubmitButtonEnabled() {
  let {
    nameInput,
    emailInput,
    phoneInput,
    nameInvalidDiv,
    emailInvalidDiv,
    phoneInvalidDiv,
  } = getFormElements(isEditingContact);

  let isButtonEnabled =
    nameInput.value.trim() !== "" &&
    emailInput.value.trim() !== "" &&
    phoneInput.value.trim() !== "" &&
    nameInvalidDiv.classList.contains("invisible") &&
    emailInvalidDiv.classList.contains("invisible") &&
    phoneInvalidDiv.classList.contains("invisible") &&
    !document.querySelector(".warning");

  return isButtonEnabled;
}

/**
 * Checks the calidity of the email input 
 * @returns {boolean} - True if the input is valid, otherwise false 
 */
function checkEmailValidity() {
  let { emailInput, emailInvalidDiv } = getFormElements(isEditingContact);
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value) || emailInput.value.trim() === "") {
    if (emailInput.value !== "") {
      emailInvalidDiv.classList.remove("invisible");
      emailInput.classList.add("warning");
    } else {
      emailInvalidDiv.classList.add("invisible");
      emailInput.classList.remove("warning");
    }
    return false;
  } else {
    emailInvalidDiv.classList.add("invisible");
    emailInput.classList.remove("warning");
    return true;
  }
}

/**
 * Checks the validity of the phone number input 
 * @returns {boolean} - True if the number is valid, otherwise false 
 */
function checkPhoneNumberValidity() {
  let { phoneInput, phoneInvalidDiv } = getFormElements(isEditingContact);
  let phoneValueWithoutSpaces = phoneInput.value.replace(/\s/g, "");

  if (
    phoneValueWithoutSpaces.length < 8 &&
    phoneValueWithoutSpaces.length !== 0
  ) {
    phoneInvalidDiv.classList.remove("invisible");
    phoneInput.classList.add("warning");
    return false;
  } else {
    phoneInvalidDiv.classList.add("invisible");
    phoneInput.classList.remove("warning");
    return true;
  }
}

/**
 * Checks the validity of the contact name input 
 */
function checkContactNameValidity() {
  let { nameInput, nameInvalidDiv } = getFormElements(isEditingContact);

  if (!nameInput.checkValidity() || nameInput.value.trim() === "") {
    nameInvalidDiv.classList.remove("invisible");
    nameInput.classList.add("warning");
  } else {
    nameInvalidDiv.classList.add("invisible");
    nameInput.classList.remove("warning");
  }

  if (nameInput.value === "") {
    nameInvalidDiv.classList.add("invisible");
    nameInput.classList.remove("warning");
  }
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
    checkMobile();
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
 * Checks if the device is a mobile device and adjusts the UI layout accordingly.
 */
function checkMobile() {
  if (isMobileDevice()) {
    let contactDetailedInfo = document.querySelector('.contactDetailedInfo');
    let contactList = document.querySelector('.contactList');
    let contactButtonDiv = document.querySelector('.contactButtonDiv');
    let board = document.querySelector('.contactBoard');
    let justiyedContactBoard = document.querySelector('.contacts')
    if (contactDetailedInfo) {
      contactDetailedInfo.style.display = 'flex';
    }
    if (contactList) {
      contactList.style.display = 'none';
    }
    if (contactButtonDiv) {
      contactButtonDiv.style.display = 'none';
    }
    if (board) {
      board.style.display = 'none';

    }
    if (justiyedContactBoard) {
      justiyedContactBoard.style.justifyContent = 'center';
    }
    document.getElementsByClassName('contactDetailedInfo').innerHTML += '<img src="../img/x-icon.svg"> '
  }
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
 * Gets form elements based on whether the form is for editing a contact or creating a new one
 * @param {boolean} isEditingContact - Indicates whether the form is for editing a contact
 * @returns {object} An object containing references to the form elements
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
 * Deletes the selected contact from the contact list 
 */
async function deleteContact() {
  let selectedIndex = getSelectedContactIndex();
  if (selectedIndex !== -1) {
    contacts.splice(selectedIndex, 1);
    closeContactOverlay();
    saveContact();
    await loadContacts();
    generateContacts();
    isDetailViewOpen = false;
  }
}

/*
function checkIfMobileDevice(){
  if( window.screen.width < 1024){ 
    let elementToShow = document.getElementById("contactDetailedInfo"); 
    let elementToHide = document.getElementById("contactBoard"); 
    let justifyElement = document.getElementById("contacts"); 
    let backImage = document.getElementById("contactsBackImage"); 
    justifyElement.style.justifyContent = "center"; 
    elementToHide.style.display = "none";
    elementToShow.style.display = "flex"; 
    backImage.style.display ="flex"
    justifyElement.style.overflow = "hidden"
  }else{
    let elementToShow = document.getElementById("contactDetailedInfo");
    let elementToHide = document.getElementById("contactBoard");
    let justifyElement = document.getElementById("contacts");
    let backImage = document.getElementById("contactsBackImage"); 
    justifyElement.style.justifyContent = ""; 
    elementToHide.style.display = ""; 
    elementToShow.style.display = ""; 
    backImage.style.display =""; 
    justifyElement.style.overflow = "";   
  }
}; 

function backToPageStart(){
window.location.href ="contacts.html"
}

window.addEventListener("resize", checkIfMobileDevice); */