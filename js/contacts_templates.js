let contacts = [];

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
 * The function generates the HTML for the contact list
 * @returns {string}
 */
function contactsHTML() {
  let contactHTML = `
  <div class="contactBoard" id="contactBoard">
    <div class="contactButtonDiv">
      <button onclick="openContactOverlay()" class="addNewContactButton">
      <p>Add new Contact</p>  
      <img class="contactsImage" src="../img/add-contact-icon.svg" />
      </button>
    </div>
    <div class="contactList">`;
  let cardIndex = 0;
  let currentCategory = null;

  // Iterating over each contact to generate HTML for each contact
  contacts.forEach((contact, index) => {
    let fixedColor = contact.color;
    let category = contact.name.charAt(0).toUpperCase();
    if (category !== currentCategory) {
      contactHTML += `
        <div class="categorySection">
          <div class="contactCategoryDiv">
            <span class="letterCategory">${category}</span>
          </div>
          <div class="contactDividerDiv">
            <img class="contactDivider" src="../img/contact-divider.svg" />
          </div>
        </div>`;
      currentCategory = category;
    }
    let cardId = `contactCard_${cardIndex}`;
    contactHTML += `
      <div class="contactCard" id="${cardId}" onclick="highlightSelectedContact(${index}), showContactDetails(${index})">
        <div style="background:${fixedColor};" class="userInitialsDiv">${getInitials(
      contact.name
    )}</div>
        <div class="contactInfoDiv">
          <span class="contactNameSpan">${contact.name}</span>
          <span class="contactMailSpan">${contact.email}</span>
        </div>
      </div>`;
    cardIndex++;
  });
  contactHTML += `
     </div>
    </div>`;

  contactHTML += `
      <div class="detailedView"></div> 
      `;
  return contactHTML;
}

/**
 * This function generates the HTML for the detailed view of a contact
 * @param {Object} contact - the contact object for wich detailed view HTML is generated
 * @returns
 */
function contactsDetailHTML(contact) {
  return `
     <div class="contactDetailedInfo" id="contactDetailedInfo">
        <div class="contactHeadline">
          <h1>Contact Details</h1>
            <div class="contactHeadlineDivider"></div>
          <span class="contactHeadlineSpan">Better with a Team</span>
          <div onclick="closeDetailedView()" class="backArrowDiv invisible"><img src="../img/back-arrow-lightblue.svg" alt="back-arrow-lightblue"></div>
      </div>
        <div class="floatingContactHeader">
          <div class="floatingContactUser" style="background-color: ${
            contact.color
          };"><h2>${getInitials(contact.name)}</h2></div>
          <div class="floatingContactName">
            <h2>${contact.name}</h2>
            <div class="floatingContactEditAndDelete">
              <div class="floatingContactEdit" onclick="openEditContactOverlay()">
                <div class="floatingContactEditImage"></div>
                <span>Edit</span>
              </div>
              <div class="floatingContactDelete" onclick="deleteContact()">
                <div class="floatingContactDeleteImage"></div>  
                <span>Delete</span>
              </div>
            </div>
          </div>
        </div>
        <div class="floatingContactInformation">
          <h4>Contact Information</h4>
        </div>
        <div class="floatingContactDetails">
          <div class="floatingContactEmail">
            <h5>Email</h5>
            <a href="mailto:${contact.email}">${contact.email}</a>
          </div>
          <div class="floatingContactPhone">
            <h5>Phone</h5>
            <p>${contact.phone}</p>
          </div>
        </div>
        <div class="mobileEditAndDeleteMenu invisible" onclick="showMobileEditAndDeleteOverlay()"><img src="../img/dots.svg" alt="dots"></div>
         <div class="mobileEditAndDeleteMenuOverlay slideOut">
         <div class="mobileFloatingContactEditAndDelete">
          <div class="mobileFloatingContactEdit" onclick="openEditContactOverlay(), showMobileEditAndDeleteOverlay()">
           <div class="mobileFloatingContactEditImage"></div>
           <span>Edit</span>
          </div>
         <div class="mobileFloatingContactDelete" onclick="deleteContact(), showMobileEditAndDeleteOverlay()">
            <div class="mobileFloatingContactDeleteImage"></div>  
           <span>Delete</span>
         </div>
        </div>
      </div>
    </div>
  `;
}
