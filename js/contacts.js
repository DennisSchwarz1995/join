let isContactOverlayOpen = false;

function generateContacts() {
  let contacts = document.querySelector(".contacts");
  if (contacts) {
    contacts.innerHTML = contactsHTML();
    contacts.innerHTML += contactsDetailHTML();
  } else {
    console.error("contacts not found");
  }
}

function openContactOverlay() {
  if (isContactOverlayOpen) {
    closeContactOverlay();
  } else {
    let overlay = document.createElement("div");
    overlay.classList.add("contactOverlay");
    overlay.innerHTML = addContactHTML();
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.classList.add("show");
    }, 0);
    isContactOverlayOpen = true;
  }
}

function closeContactOverlay() {
  let overlay = document.querySelector(".contactOverlay");
  if (overlay) {
    overlay.classList.remove("show");
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
  isContactOverlayOpen = false;
}

function addContactToCategory(category, contact) {
  let contactList = document.querySelector(".contactList");
  let existingCategories = getExistingCategories(contactList);

  if (existingCategories.includes(category)) {
    addContactToExistingCategory(contactList, category, contact);
  } else {
    addContactToNewCategory(contactList, category, contact, existingCategories);
  }
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
  return contactCard.querySelector(".contactNameDiv").textContent.toLowerCase();
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
  let newContact = {
    name: formattedName,
    email: email.value.trim(),
    phone: phone.value.trim(),
  };
  addContactToCategory(category, newContact);
  closeContactOverlay();
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
  let randomColor = getComputedStyle(document.documentElement).getPropertyValue(
    `--bg-user-initials-color-${getRandomColor()}`
  );

  let contactCard = document.createElement("div");
  contactCard.classList.add("contactCard");
  let initialsDiv = document.createElement("div");
  initialsDiv.classList.add("userInitialsDiv");
  initialsDiv.textContent = getInitials(contact.name);
  initialsDiv.style.background = randomColor;

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("contactInfoDiv");
  let nameSpan = document.createElement("span");
  nameSpan.classList.add("contactNameDiv");
  nameSpan.textContent = contact.name;
  let emailSpan = document.createElement("span");
  emailSpan.classList.add("contactMailDiv");
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