async function initContacts() {
  await loadContacts();
  generateContacts();
  generateNavbar();
  generateHeader();
  checkValuesForSubmitButton();
}

let isContactOverlayOpen = false;
let isEditingContact = false;
let isEditContactOverlayOpen = false;
let isDetailViewOpen = false;

function generateContacts() {
  let contactsList = document.querySelector(".contacts");
  if (contactsList) {
    contactsList.innerHTML = contactsHTML();
  } else {
    console.error("Contacts-List not found");
  }
}

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

function showBackground() {
  let background = document.querySelector(".overlayBackground");
  background.classList.remove("invisible");
}

function hideBackground() {
  let background = document.querySelector(".overlayBackground");
  background.classList.add("invisible");
}

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

function getExistingContactCards(contactList, categoryDiv) {
  return Array.from(
    categoryDiv.parentElement.getElementsByClassName("contactCard")
  );
}

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

function appendContactToCategory(categoryDiv, contactCard) {
  categoryDiv.parentElement.parentNode.insertBefore(
    contactCard,
    categoryDiv.parentElement.nextSibling
  );
}

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

function getExistingCategories(contactList) {
  return Array.from(contactList.getElementsByClassName("letterCategory")).map(
    (element) => element.textContent
  );
}

function getContactName(contactCard) {
  return contactCard
    .querySelector(".contactNameSpan")
    .textContent.toLowerCase();
}

function getCategoryDiv(contactList, category) {
  let categoryDiv = Array.from(
    contactList.getElementsByClassName("letterCategory")
  ).find((element) => element.textContent === category);
  return categoryDiv.parentElement;
}

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

function appendCategoryAndContact(contactList, newCategoryDiv, contactCard) {
  contactList.appendChild(newCategoryDiv);
  contactList.appendChild(contactCard);
}

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

function sortContacts() {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function showCreateOverlay() {
  const createOverlay = document.getElementById("createContactOverlay");
  createOverlay.classList.remove("slideOut");
  createOverlay.classList.add("slideInContactOverlay");
  setTimeout(() => {
    createOverlay.classList.remove("slideInContactOverlay");
    createOverlay.classList.add("slideOut");
  }, 2000);
}

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

function getInitials(name) {
  let names = name.split(" ");
  let initials = names.map((n) => n.charAt(0)).join("");
  return initials.toUpperCase();
}

function capitalizeName(name) {
  let names = name.split(" ");
  let capitalizedNames = names.map(
    (n) => n.charAt(0).toUpperCase() + n.slice(1)
  );
  return capitalizedNames.join(" ");
}

function checkValuesForSubmitButton() {
  let { button } = getFormElements(isEditingContact);
  let isButtonEnabled = isSubmitButtonEnabled();

  if (isButtonEnabled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
}

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

document.addEventListener("DOMContentLoaded", function () {
  let contactForm = document.querySelector(".contactForm");
  contactForm.addEventListener("input", checkValuesForSubmitButton);
});

document.addEventListener("DOMContentLoaded", function () {
  let editContactForm = document.querySelector(".editContactForm");
  editContactForm.addEventListener("input", checkValuesForSubmitButton);
});

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

function getSelectedContactIndex() {
  let contactCards = document.querySelectorAll(".contactCard");
  for (let i = 0; i < contactCards.length; i++) {
    if (contactCards[i].classList.contains("selectedContact")) {
      return i;
    }
  }
  return -1;
}

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

function getSelectedContactIndex() {
  let contactCards = document.querySelectorAll(".contactCard");
  for (let i = 0; i < contactCards.length; i++) {
    if (contactCards[i].classList.contains("selectedContact")) {
      return i;
    }
  }
  return -1;
}

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
