/**
 * Initializes the sing up process by loading users and checking values for sign up 
 */
async function initSignUp() {
  await loadUsers();
  checkValuesForSignUp();
}

/**
 * Resets the sign-up form by clearing input fields and disabling sign up button 
 */
function resetForm() {
  signUpNameInput.value = "";
  signUpEmailInput.value = "";
  signUpPasswordInput.value = "";
  confirmPasswordInput.value = "";
  signUpButton.disabled = true;
  let checkBoxIcon = document.querySelector(".checkBoxIcon");
  checkBoxIcon.src = "../img/checkbox-icon.svg";
}

/**
 * Shows the registration overlay by adding the 'viable' clas
 */
function showRegistrationOverlay() {
  let overlay = document.querySelector(".signUpOverlay");
  overlay.classList.add("visible");
  overlay.classList.remove("invisible");
}

/**
 * Checks if the sign-up button should be enabled based on input values 
 */
async function checkValuesForSignUp() {
  let button = document.querySelector(".signUpButton");
  const isButtonEnabled = isSignUpButtonEnabled();

  if (isButtonEnabled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
}

/**
 * Checks if the sign-up button should be enabled   
 * @returns {boolean} - True if button should be enabled 
 */
function isSignUpButtonEnabled() {
  let checkBoxIcon = document.querySelector(".checkBoxIcon");
  let nameInput = document.querySelector(".nameInput");
  let mailInput = document.querySelector(".emailInput");
  let passwordInput = document.querySelector(".passwordInput");
  let confirmPasswordInput = document.querySelector(".confirmPasswordInput");

  const isButtonEnabled =
    checkBoxIcon.src.includes("checkbox-icon-selected.svg") &&
    nameInput.value.trim() !== "" &&
    mailInput.value.trim() !== "" &&
    passwordInput.value.trim() !== "" &&
    confirmPasswordInput.value.trim() !== "" &&
    document.querySelectorAll(
      ".nameInvalidDiv.invisible, .emailInvalidDiv.invisible, .passwordInvalidDiv.invisible, .confirmPasswordInvalidDiv.invisible"
    ).length === 4 &&
    !document.querySelector(".warning");

  return isButtonEnabled;
}

/**
 * Changes the password input icon based on user ineraction 
 */
function changePasswordInputIcon() {
  let icon = document.querySelector(".passwordIcon");
  let passwordInput = document.getElementById("signUpPasswordInput");

  passwordInput.addEventListener("blur", function () {
    if (passwordInput.value.trim() === "") {
      icon.src = "../img/lock-icon.svg";
    }
  });

  passwordInput.addEventListener("input", function () {
    if (passwordInput.value.trim() === "") {
      passwordInput.type = "password";
      icon.src = "../img/lock-icon.svg";
    } else {
      if (
        passwordInput.type === "text" &&
        !icon.src.includes("show-password-icon.svg")
      ) {
        icon.src = "../img/show-password-icon.svg";
      } else if (
        passwordInput.type === "password" &&
        !icon.src.includes("hide-password-icon.svg")
      ) {
        icon.src = "../img/hide-password-icon.svg";
      }
    }
  });
}

/**
 * Changes the confirm password input icon based on user interaction 
 */
function changeConfirmPasswordInputIcon() {
  let icon = document.querySelector(".confirmPasswordIcon");
  let confirmPasswordInput = document.getElementById("confirmPasswordInput");

  confirmPasswordInput.addEventListener("blur", function () {
    if (confirmPasswordInput.value.trim() === "") {
      icon.src = "../img/lock-icon.svg";
    }
  });

  confirmPasswordInput.addEventListener("input", function () {
    if (confirmPasswordInput.value.trim() === "") {
      confirmPasswordInput.type = "password";
      icon.src = "../img/lock-icon.svg";
    } else {
      if (
        confirmPasswordInput.type === "text" &&
        !icon.src.includes("show-password-icon.svg")
      ) {
        icon.src = "../img/show-password-icon.svg";
      } else if (
        confirmPasswordInput.type === "password" &&
        !icon.src.includes("hide-password-icon.svg")
      ) {
        icon.src = "../img/hide-password-icon.svg";
      }
    }
  });
}

/**
 * Toggles the password input type between text and password 
 */
function togglePasswordInputType() {
  let icon = document.querySelector(".passwordIcon");
  let passwordInput = document.getElementById("signUpPasswordInput");

  if (passwordInput.type === "password") {
    icon.src = "../img/show-password-icon.svg";
    passwordInput.type = "text";
  } else {
    icon.src = "../img/hide-password-icon.svg";
    passwordInput.type = "password";
  }
}

/**
 * Toggles the confirm password input type between text and password 
 */
function toggleConfirmPasswordInputType() {
  let icon = document.querySelector(".confirmPasswordIcon");
  let confirmPasswordInput = document.getElementById("confirmPasswordInput");

  if (confirmPasswordInput.type === "password") {
    icon.src = "../img/show-password-icon.svg";
    confirmPasswordInput.type = "text";
  } else {
    icon.src = "../img/hide-password-icon.svg";
    confirmPasswordInput.type = "password";
  }
}

/**
 * Displays a message indicating that the user already exists 
 */
function showUserExist() {
  let emailInvalidDiv = document.querySelector(".emailInvalidDiv");
  let emailInput = document.getElementById("signUpEmailInput");
  emailInvalidDiv.textContent =
    "This user already exists, please pick another E-Mail or Login.";
  emailInvalidDiv.classList.add("visible");
  emailInvalidDiv.classList.remove("invisible");
  emailInput.classList.add("warning");
}

/**
 * Checks the validity of the entered name 
 */
function checkNameValidity() {
  let nameInput = document.getElementById("signUpNameInput");
  let nameInvalidDiv = document.querySelector(".nameInvalidDiv");

  if (!nameInput.checkValidity() || nameInput.value.trim() === "") {
    nameInvalidDiv.textContent = "Please enter a valid name.";
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
 * Checks the validity of the entered email  
 */
function checkEmailValidity() {
  let emailInput = document.getElementById("signUpEmailInput");
  let emailInvalidDiv = document.querySelector(".emailInvalidDiv");
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value) || emailInput.value.trim() === "") {
    emailInvalidDiv.textContent = "Please enter a valid E-Mail.";
    emailInvalidDiv.classList.remove("invisible");
    emailInput.classList.add("warning");
  } else {
    emailInvalidDiv.classList.add("invisible");
    emailInput.classList.remove("warning");
  }

  if (emailInput.value === "") {
    emailInvalidDiv.classList.add("invisible");
    emailInput.classList.remove("warning");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector(".signUpForm");
  let checkBoxIcon = document.querySelector(".checkBoxIcon");
  let emailInput = document.getElementById("signUpEmailInput");

  form.addEventListener("keyup", checkValuesForSignUp);
  checkBoxIcon.addEventListener("click", checkValuesForSignUp);

  emailInput.addEventListener("input", function () {
    const existingUser = users.find((user) => user.email === emailInput.value);
    if (existingUser) {
      showUserExist();
    } else {
      checkEmailValidity();
    }
  });
});

/**
 * Checks the length validity of the password and confirm password
 * Displays error messages if the passwords are less than 8 characters long
 * @param {string} password -The password entered by the user
 * @param {string} confirmPassword -The confirmed password entered by the user
 */
function checkPasswordLength(password, confirmPassword) {
  let passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  let confirmPasswordInvalidDiv = document.querySelector(
    ".confirmPasswordInvalidDiv"
  );

  if (password.length < 8) {
    passwordInvalidDiv.textContent =
      "Password must be at least 8 characters long";
    passwordInvalidDiv.classList.remove("invisible");
    signUpPasswordInput.classList.add("warning");
  } else {
    passwordInvalidDiv.classList.add("invisible");
    signUpPasswordInput.classList.remove("warning");
  }

  if (confirmPassword.length < 8) {
    confirmPasswordInvalidDiv.textContent =
      "Password must be at least 8 characters long";
    confirmPasswordInvalidDiv.classList.remove("invisible");
    confirmPasswordInput.classList.add("warning");
  } else {
    confirmPasswordInvalidDiv.classList.add("invisible");
    confirmPasswordInput.classList.remove("warning");
  }
}

/**
 * Checks the validity of the entered password, and displays error message if it doesent match
 */
function checkPasswordValidity() {
  let passwordInput = document.getElementById("signUpPasswordInput");
  let confirmPasswordInput = document.getElementById("confirmPasswordInput");

  if (passwordInput.value.length > 0 && confirmPasswordInput.value.length > 0) {
    if (passwordInput.value === confirmPasswordInput.value) {
      checkPasswordLength(passwordInput.value, confirmPasswordInput.value);
    } else {
      showPasswordMismatch();
    }
  } else {
    hidePasswordInvalidDiv();
  }
}

/**
 * Diplays error message when the password do not match 
 */
function showPasswordMismatch() {
  let passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  let confirmPasswordInvalidDiv = document.querySelector(
    ".confirmPasswordInvalidDiv"
  );
  let passwordInput = document.getElementById("signUpPasswordInput");
  let confirmPasswordInput = document.getElementById("confirmPasswordInput");

  passwordInvalidDiv.textContent =
    "Passwords do not match.";
  confirmPasswordInvalidDiv.textContent =
    "Passwords do not match.";
  passwordInvalidDiv.classList.remove("invisible");
  confirmPasswordInvalidDiv.classList.remove("invisible");

  passwordInput.classList.add("warning");
  confirmPasswordInput.classList.add("warning");
}

/**
 * Hides password error message 
 */
function hidePasswordInvalidDiv() {
  let passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  let confirmPasswordInvalidDiv = document.querySelector(
    ".confirmPasswordInvalidDiv"
  );
  let passwordInput = document.getElementById("signUpPasswordInput");
  let confirmPasswordInput = document.getElementById("confirmPasswordInput");

  passwordInvalidDiv.classList.add("invisible");
  confirmPasswordInvalidDiv.classList.add("invisible");

  passwordInput.classList.remove("warning");
  confirmPasswordInput.classList.remove("warning");

  if (passwordInput.value.trim() === "") {
    passwordInput.classList.remove("warning");
  }

  if (confirmPasswordInput.value.trim() === "") {
    confirmPasswordInput.classList.remove("warning");
  }
}
