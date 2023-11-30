function generateContacts() {
    let contact = document.querySelector('.contact');
    contact.innerHTML = addContactButton() + addressbook(); 
  }

  function openContact() {
    let contactDetail = document.querySelector('.contactDetail');
    contactDetail.innerHTML = openContactTemplate(); 
  }

  function editContactPopup() {
    let editContactPopup = document.querySelector('.editContactPopup');
    editContactPopup.innerHTML = editContact();
    document.querySelector('.flexContactFormSaveEdit').classList.add('d-none');
  }

  function addContactPopup() {
    let addContactPopup = document.querySelector('.addContactPopup');
    addContactPopup.innerHTML = addContact();
  }

  function closeEditContactPopup() {
    document.getElementById('closeEdit').classList.add('d-none');
    document.getElementById('backgroundEdit').classList.add('d-none');
  }

  function closeAddContactPopup() {
    document.getElementById('closeAdd').classList.add('d-none');
    document.getElementById('backgroundAdd').classList.add('d-none');
  }

  function saveEditContact() {
    document.querySelector('.flexContactForm').classList.add('d-none');
    document.querySelector('.flexContactFormSaveEdit').classList.remove('d-none');
  }

  //Template functions
  
  function addContactButton() {
    return `
    <div class="contactButton">
        <button class="fullColorButton interBold" onclick="addContactPopup()">Add new contact <img class="addContactIcn" src="img/add-contact.svg"></button>
    </div>
    `;
  }

  function addressbook() {
    return `
    <div class="addressbookContainer" onclick="openContact()">
        <div class="letter">A</div>
        <hr>
        <a href="#" class="shortContact">
            <div class="addressbookContactInitials">
                <div>AM</div>
            </div>
            <div>
                <div class="addressbookFullname">Anton Mayer</div>
                <div class="addressbookEmail">anton@gmail.com</div>
            </div>
        </a>
    </div>
    `
  }

  function openContactTemplate() {
    return `
    <div class="flexContactDetail">
            <div class="contactInitials">
                <div>AM</div>
            </div>
            <div class="contactDetailName">
                <span class="fullname" id="fullname">Anton Mayer</span>
                <div class="thirdButtonGroup">
                    <button class="thirdButton interRegular" onclick="editContactPopup()"><img src="img/edit-pencil.svg" alt="">Edit</button>
                    <button class="thirdButton interRegular"><img src="img/delete-trash.svg" alt="">Delete</button>
                </div>
            </div>
        </div>
        <div class="contactInformationSection interRegular">
            <p class="contactInformation">Contact Information</p>
            <p class="contactLabel interBold">Email</p>
            <p id="email">anton@gmail.com</p>
            <p class="contactLabel interBold">Phone</p>
            <p id="phone">+49 111 11 111 1</p>
        </div>
    `
  }

  function editContact() {
    return `
    <div class="background" id="backgroundEdit"></div>
    <div class="editContact" id="closeEdit">
        <div class="actionHeaderContact">
            <div class="actionHeaderContactStyle">
                <img src="img/logo-action-contact.svg">
                <p>Edit contact</p>
            </div>
            <div class="blueLine"></div>
        </div>
        <div class="flexContactForm" id="flexContactForm">
            <div class="contactInitials">
                <div>LM</div>
            </div>
            <div>
                <div class="contactForm">
                    <div class="addContactField interRegular"><input type="text" id="fullnameEdit" class="formFields" placeholder="Name"><img src="img/add-contact-name.svg"></div>
                    <div class="addContactField interRegular"><input type="text" id="emailEdit" class="formFields" placeholder="Email"><img src="img/add-contact-email.svg"></div>
                    <div class="addContactField interRegular"><input type="text" id="phoneEdit" class="formFields" placeholder="Phone"><img src="img/add-contact-phone.svg"></div>
                </div>
                <div class="actionEditContactButton">
                    <button class="secondaryButton interRegular" onclick="closeEditContactPopup()">Cancel</button>
                    <button class="interBold saveContact" onclick="saveEditContact()">Save<img src="img/check.svg"></button>
                </div>
            </div>
        </div>
        <div class="flexContactFormSaveEdit">
            <div class="afterEditName">
                <span class="fullname" id="fullname">Anton Mayer</span>
                <div class="thirdButtonGroup">
                    <button class="thirdButton interRegular" onclick="editContactPopup()"><img src="img/edit-pencil.svg" alt="">Edit</button>
                    <button class="thirdButton interRegular"><img src="img/delete-trash.svg" alt="">Delete</button>
                </div>
            </div>
            <div class="contactInformationSectionEdit interRegular">
                <p class="contactInformationEdit">Contact Information</p>
                <p class="contactLabelEdit interBold">Email</p>
                <p id="emailEdit">anton@gmail.com</p>
                <p class="contactLabelEdit interBold">Phone</p>
                <p id="phoneEdit">+49 111 11 111 1</p>
            </div>
    </div>
    <button class="close" onclick="closeEditContactPopup()"><img src="img/close.svg""></button>
    `
  }

  function addContact() {
    return `
    <div class="background" id="backgroundAdd"></div>
    <div class="addContact" id="closeAdd">
        <div class="actionHeaderContact">
            <div class="actionHeaderContactStyle">
                <img src="img/logo-action-contact.svg">
                <p>Add contact</p>
                <div class="subheader interRegular">Tasks are better with a team!</div>
            </div>
            <div class="blueLine"></div>
        </div>
        <div class="flexContactForm">
            <div class="newContactImage">
                <img src="img/person.svg" alt="">
            </div>
            <div>
                <div class="contactForm">
                    <div class="addContactField interRegular"><input type="text" id="fullnameAdd" class="formFields" placeholder="Name"><img src="img/add-contact-name.svg"></div>
                    <div class="addContactField interRegular"><input type="text" id="emailAdd" class="formFields" placeholder="Email"><img src="img/add-contact-email.svg"></div>
                    <div class="addContactField interRegular"><input type="text" id="phoneAdd" class="formFields" placeholder="Phone"><img src="img/add-contact-phone.svg"></div>
                </div>
                <div class="actionAddContactButton">
                    <button class="secondaryButton interRegular" onclick="closeAddContactPopup()">Cancel</button>
                    <button class="addNewContact interBold">Create contact<img src="img/check.svg"></button>
                </div>
            </div>
        </div>
        <button class="close" onclick="closeAddContactPopup()"><img src="img/close.svg""></button>
    </div>
    `
  }