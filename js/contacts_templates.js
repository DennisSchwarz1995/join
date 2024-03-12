let contacts = [];

function contactsHTML() {
  let contactHTML = `
  <div class="contactBoard">
    <div class="contactButtonDiv">
      <button onclick="openContactOverlay()" class="addNewContactButton">
        <p>Add new Contact</p> <img src="../img/add-contact-icon.svg" />
      </button>
    </div>
    <div class="contactList">`;
  let cardIndex = 0;
  let currentCategory = null;
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

  contactHTML += `<div class="contactDetailedInfo">
      <div class="contactHeadline">
        <h1>Contact Details</h1>
        <div class="contactHeadlineDivider"></div>
        <span class="contactHeadlineSpan">Better with a Team</span>
      </div>
      <div class="detailedView"></div>`;
  return contactHTML;
}

function contactsDetailHTML(contact) {
  return `
      <div class="floatingContactDiv">
        <div class="floatingContactHeader">
          <div class="floatingContactUser" style="background-color: ${
              contact.color
            };"><h2>${getInitials(contact.name)}</h2>
          </div>
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
      </div>
      <div id="detailedContactMenuResponsive">
      <button class="responsivContactMenuButton" onclick="detailedContactMenuResponsive()">
        <img src="../img/three-points.svg" alt="">
      </button>
    </div>
    </div>
  `;
}