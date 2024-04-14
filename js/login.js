/**
 * Initializes the login process by loading users and checking login values 
 */
async function initLogin() {
  await loadUsers();
  checkValuesForLogin();
}

/**
 * Logs in the user by checking if he exist and redirceting him to summary or it displays him a user-password mismatch message 
 */
function login() {
  if (checkIfUserExists()) {
    redirectToSummary();
  } else {
    showUserPasswordMismatch();
  }
}

/**
 * Logs user in as a guest 
 */
function guestLogin() {
  redirectToSummary();
  let guest = "guest"
  localStorage.setItem("userFullName", JSON.stringify(guest));
}

/**
 * Finds the users name by email and stores it in storage 
 * @param {string} email - email of the user 
 * @returns {string|null} - name of the user if found, otherwise null 
 */
function findUserNameByEmail(email) {
  let user = users.find((u) => u.email === email);
  if (user) {
    localStorage.setItem("userFullName", JSON.stringify(user.name));
    return user.name;
  }
  return null;
}

/**
 * Redirects the user to the summars page after setting users name in storage 
 */
function redirectToSummary() {
  let emailInput = document.getElementById("emailInput").value;
  let userName = findUserNameByEmail(emailInput);
  if (userName) {
    saveUserName(name);
  }

  window.location.href = "summary.html";
}

/**
 * Saves the users name to the storage 
 * @param {string} name 
 */
function saveUserName(name) {
  let initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  localStorage.setItem("userInitials", JSON.stringify(initials));
  localStorage.setItem("userFullName", JSON.stringify(name));
}

/**
 * Checks if user exists by comparing the entered mail and password with the stored data 
 * @returns {boolean} - true if user exists, otherwise false 
 */
function checkIfUserExists() {
  let email = document.getElementById("emailInput");
  let password = document.getElementById("passwordInput");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  if (user) {
    resetForm();
    return true;
  } else {
    return false;
  }
}

/**
 * Resets the login form by clearing input field and disabling the login button 
 */
function resetForm() {
  let userName = findUserNameByEmail(emailInput.value);
  if (userName) {
    saveUserName(userName);
  }
  emailInput.value = "";
  passwordInput.value = "";
  loginButton.disabled = true;
  let checkBoxIcon = document.querySelector(".checkBoxIcon");
  checkBoxIcon.src = "../img/checkbox-icon.svg";
}

/**
 * Toggles the checkbox icons 
 */
function toggleCheckBox() {
  let checkBoxIcon = document.querySelector(".checkBoxIcon");
  if (checkBoxIcon.src.includes("checkbox-icon.svg")) {
    checkBoxIcon.src = "../img/checkbox-icon-selected.svg";
    checkBoxIcon.style.width = "19px";
    checkBoxIcon.style.height = "19px";
  } else {
    checkBoxIcon.src = "../img/checkbox-icon.svg";
    checkBoxIcon.style.width = "24px";
    checkBoxIcon.style.height = "24px";
  }
}

/**
 * Checks the values for login and enables/disables the login button 
 */
function checkValuesForLogin() {
  let button = document.querySelector(".loginButton");
  let isButtonEnabled = isLoginButtonEnabled();

  if (isButtonEnabled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
}

/**
 * Adds an event listener to the login form to the checkValueForLogin function 
 */
document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector(".loginForm");
  form.addEventListener("keyup", checkValuesForLogin);
});

/**
 * Checks if the login button should be enabled based on the validity of email and password
 * @returns {boolean} - true if login button should be enabled, otherwise false 
 */
function isLoginButtonEnabled() {
  let emailInput = document.querySelector(".emailInput");
  let passwordInput = document.querySelector(".passwordInput");

  let isButtonEnabled =
    emailInput.value.trim() !== "" &&
    passwordInput.value.trim() !== "" &&
    document.querySelectorAll(
      ".emailInvalidDiv.invisible, .passwordInvalidDiv.invisible"
    ).length === 2 &&
    !document.querySelector(".warning");

  return isButtonEnabled;
}

/**
 * Checks the validity of the enterd email adress
 * @returns {boolean} - true if mail is valid, otherwise false 
 */
function checkEmailValidity() {
  let emailInput = document.getElementById("emailInput");
  let emailInvalidDiv = document.querySelector(".emailInvalidDiv");
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value) || emailInput.value.trim() === "") {
    if (emailInput.value !== "") {
      emailInvalidDiv.textContent = "Please enter a valid E-Mail.";
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
 * Checks the validity of the entered password length 
 */
function checkPasswordValidity() {
  let passwordInput = document.getElementById("passwordInput");
  let passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");

  if (passwordInput.value.length < 8 && passwordInput.value.length !== 0) {
    showPasswordLengthInvalid();
  } else {
    passwordInvalidDiv.classList.add("invisible");
    passwordInput.classList.remove("warning");
  }
}

/**
 * Displays a message if there is a mismatch between entered password and mail adress 
 */
function showUserPasswordMismatch() {
  let passwordInput = document.getElementById("passwordInput");
  let passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  passwordInvalidDiv.textContent = "Incorrect Email adress or password.";
  passwordInvalidDiv.classList.remove("invisible");
  passwordInput.classList.add("warning");

  let emailInput = document.getElementById("emailInput");
  let emailInvalidDiv = document.querySelector(".emailInvalidDiv");
  emailInvalidDiv.textContent = "Incorrect Email adress or password.";
  emailInvalidDiv.classList.remove("invisible");
  emailInput.classList.add("warning");
}

/**
 * Displays a message indicationg that the password length is valid 
 */
function showPasswordLengthInvalid() {
  let passwordInput = document.getElementById("passwordInput");
  let passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  passwordInvalidDiv.textContent =
    "Password must be at least 8 characters long";
  passwordInvalidDiv.classList.remove("invisible");
  passwordInput.classList.add("warning");
}

/**
 * Changes the icon of the password input field based on the user interaction 
 */
function changePasswordInputIcon() {
  let icon = document.querySelector(".passwordIcon");
  let passwordInput = document.getElementById("passwordInput");

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
 * Toggles the visibility of the password in the password input field 
 */
function togglePasswordInputType() {
  let icon = document.querySelector(".passwordIcon");
  let passwordInput = document.getElementById("passwordInput");

  if (passwordInput.type === "password") {
    icon.src = "../img/show-password-icon.svg";
    passwordInput.type = "text";
  } else {
    icon.src = "../img/hide-password-icon.svg";
    passwordInput.type = "password";
  }
}

/** 
 * Removes the overlay once the animation has ended  
 */
document.addEventListener("DOMContentLoaded", function () {
  let overlay = document.querySelector(".overlay");

  overlay.addEventListener("animationend", function () {
    overlay.remove();
  });
});


