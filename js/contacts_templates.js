function contactsHTML() {
    return `
      <div class="contactBoard">
        <div class="contactButtonDiv">
          <button onclick="openContactOverlay()" class="addNewContactButton">
            Add new Contact <img src="../img/add-contact-icon.svg" />
          </button>
        </div>
        <div class="contactList">
  
        <div class="categorySection">
          <div class="contactCategoryDiv">
            <span class="letterCategory">A</span>
          </div>
          <div class="contactDividerDiv">
            <img class="contactDivider" src="../img/contact-divider.svg" />
          </div>
        </div>
          <div class="contactCard">
            <div style="background:#FFA35E;" class="userInitialsDiv">AM</div>
            <div class="contactInfoDiv">
              <span class="contactNameDiv">Anton Mayer</span>
              <span class="contactMailDiv">antonm@gmail.com</span>
            </div>
          </div>
  
          <div class="categorySection">
          <div class="contactCategoryDiv">
            <span class="letterCategory">B</span>
          </div>
          <div class="contactDividerDiv">
            <img class="contactDivider" src="../img/contact-divider.svg" />
          </div>
          </div>
          <div class="contactCard">
            <div style="background:#FF4646;" class="userInitialsDiv">BS</div>
            <div class="contactInfoDiv">
              <span class="contactNameDiv">Bernd Schmidt</span>
              <span class="contactMailDiv">bernds@web.com</span>
            </div>
          </div>
          <div class="categorySection">
          <div class="contactCategoryDiv">
            <span class="letterCategory">E</span>
          </div>
          <div class="contactDividerDiv">
            <img class="contactDivider" src="../img/contact-divider.svg" />
          </div>
          </div>
          <div class="contactCard">
            <div style="background:#6E52FF;" class="userInitialsDiv">EL</div>
            <div class="contactInfoDiv">
              <span class="contactNameDiv">Erich Lang</span>
              <span class="contactMailDiv">erichl@gmx.com</span>
            </div>
          </div>
          <div class="categorySection">
          <div class="contactCategoryDiv">
            <span class="letterCategory">G</span>
          </div>
          <div class="contactDividerDiv">
            <img class="contactDivider" src="../img/contact-divider.svg" />
          </div>
          </div>
          <div class="contactCard">
            <div style="background:#0038FF;" class="userInitialsDiv">GK</div>
            <div class="contactInfoDiv">
              <span class="contactNameDiv">Günther Kunz</span>
              <span class="contactMailDiv">güntherk@yahoo.com</span>
            </div>
          </div>
  
          <div class="categorySection">
          <div class="contactCategoryDiv">
            <span class="letterCategory">K</span>
          </div>
          <div class="contactDividerDiv">
            <img class="contactDivider" src="../img/contact-divider.svg" />
          </div>
          </div>
          <div class="contactCard">
            <div style="background:#FFC701;" class="userInitialsDiv">KP</div>
            <div class="contactInfoDiv">
              <span class="contactNameDiv">Katrin Pritz</span>
              <span class="contactMailDiv">katrinp@gmail.com</span>
            </div>
          </div>
  
          <div class="categorySection">
          <div class="contactCategoryDiv">
            <span class="letterCategory">M</span>
          </div>
          <div class="contactDividerDiv">
            <img class="contactDivider" src="../img/contact-divider.svg" />
          </div>
          </div>
          <div class="contactCard">
            <div style="background:#C3FF2B;" class="userInitialsDiv">MR</div>
            <div class="contactInfoDiv">
              <span class="contactNameDiv">Martin Ruffing</span>
              <span class="contactMailDiv">martinr@gmail.com</span>
            </div>
          </div>
  </div>
  
  </div>
    `;
  }
  
  function contactsDetailHTML() {
    return `
      <div class="contactDetailedInfo">
        <div class="contactHeadline">
          <h1>Contacts</h1>
          <div class="contactHeadlineDivider"></div>
          <span class="contactHeadlineSpan">Better with a Team</span>
        </div>
  
        <div class="floatingContactDiv">
          <div class="floatingContactHeader">
            <div style="background:#FFA35E;" class="floatingContactUser"><h2>AM</h2></div>
            <div class="floatingContactName">
              <h2>Anton Mayer</h2>
              <div class="floatingContactEditAndDelete">
                <div class="floatingContactEdit">
                  <div class="floatingContactEditImage">
                  
                  </div>
                  <span>Edit</span>
                </div>
                <div class="floatingContactDelete">
                <div class="floatingContactDeleteImage">
                  
                </div>  
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
                  <p>antonm@gmail.com</p>
                </div>
                <div class="floatingContactPhone">
                 <h5>Phone</h5>
                 <p>+49 1111 111 11 1</p>
                </div>
              
              </div>
        </div>
      </div>
    `;
  }
  
  function addContactHTML() {
    return `
      <form onsubmit="createContact(); return false;"class="addContact">
        <div class="contactHeaderDiv">
          <div class="contactHeader">
            <img src="../img/logo-action-contact.svg">
            <h1>Add contact</h1>
            <h3>Tasks are better with a team!</h3>
          </div>
          <div class="addContactDivider"></div>
        </div>
        <div class="addContactForm">
          <div class="userIconDiv">
            <img src="../img/empty-user-icon.svg" alt="empty-user-icon">
          </div>
          <div class="formAndButtonDiv">
            <div class="contactForm">
              <div onclick="closeContactOverlay()" class="closeButtonDiv"><img src="../img/x-icon.svg"></div>
              <div class="addContactField"><input type="text" oninvalid="setCustomValidity('Please enter a name.')" oninput="setCustomValidity('')" required id="fullname" class="formFields" placeholder="Name"><img class="addContactFormIcon" src="../img/add-contact-name.svg"></div>
              <div class="addContactField"><input type="email" oninvalid="setCustomValidity('Please enter a valid E-Mail.')" oninput="setCustomValidity('')" required id="email" class="formFields" placeholder="Email"><img class="addContactFormIcon" src="../img/add-contact-email.svg"></div>
              <div class="addContactField"><input type="number" oninvalid="setCustomValidity('Please enter a valid Phonenumber.')" oninput="setCustomValidity('')" required id="phone" class="formFields" placeholder="Phone"><img class="addContactFormIcon" src="../img/add-contact-phone.svg"></div>
            </div>
            <div class="addContactButtonDiv">
              <button type="button" class="cancelButton">Cancel<img src="../img/x-icon.svg" ></button>
              <button type="submit" class="createContactButton">Create contact<img src="../img/check.svg"></button>
            </div>
          </div>
        </div>
      </form>
    `;
  }