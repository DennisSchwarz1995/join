function generateContacts() {
    let contact = document.querySelector('.contact');
    contact.innerHTML = addContact() + addressbook(); 
  }
  
  function addContact() {
    return `
    <div class="contactButton">
        <button class="fullColorButton interBold">Add new contact <img class="addContactIcn" src="img/add-contact.svg"></button>
    </div>
    `;
  }

  function addressbook() {
    return `
    <div class="addressbookContainer">
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