/**
 * Initializes contacts, generating HTML, and seting up UI elements
 */
async function initContacts() {
  await loadContacts();
  generateContacts();
  generateNavbar();
  generateHeader();
  generateNavbarMobile();
  checkValuesForSubmitButton();
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
    setTimeout(() => {}, 300);
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
}

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


