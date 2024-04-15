
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
  
    if (phoneValueWithoutSpaces.length < 8 && phoneValueWithoutSpaces.length !== 0 || isNaN(phoneValueWithoutSpaces)) {
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

