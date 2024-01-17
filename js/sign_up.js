async function initSignUp() {
  await loadUsers();
  checkValuesForSignUp();
}

function resetForm() {
  signUpNameInput.value = "";
  signUpEmailInput.value = "";
  signUpPasswordInput.value = "";
  confirmPasswordInput.value = "";
  signUpButton.disabled = true;
  let checkBoxIcon = document.querySelector(".checkBoxIcon");
  checkBoxIcon.src = "../img/checkbox-icon.svg";
}

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

async function checkValuesForSignUp() {
  const button = document.querySelector(".signUpButton");
  const isButtonEnabled = isSignUpButtonEnabled();

  if (isButtonEnabled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
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
      let emailInvalidDiv = document.querySelector(".emailInvalidDiv");
      emailInvalidDiv.classList.add("invisible");
      emailInvalidDiv.classList.remove("visible");
      emailInput.classList.remove("warning");
      checkValuesForSignUp();
    }
  });
});

function isSignUpButtonEnabled() {
  const checkBoxIcon = document.querySelector(".checkBoxIcon");
  const nameInput = document.querySelector(".nameInput");
  const mailInput = document.querySelector(".emailInput");
  const passwordInput = document.querySelector(".passwordInput");
  const confirmPasswordInput = document.querySelector(".confirmPasswordInput");

  const isButtonEnabled =
    checkBoxIcon.src.includes("checkbox-icon-selected.svg") &&
    nameInput.value.trim() !== "" &&
    mailInput.value.trim() !== "" &&
    passwordInput.value.trim() !== "" &&
    confirmPasswordInput.value.trim() !== "" &&
    document.querySelectorAll(".invisible").length === 4 &&
    !document.querySelector(".warning");

  return isButtonEnabled;
}

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
      icon.src = "../img/hide-password-icon.svg";
    }
  });
}

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
      icon.src = "../img/hide-password-icon.svg";
    }
  });
}

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

function showRegistrationOverlay() {
  let overlay = document.querySelector(".signUpOverlay");
  overlay.style.right = "-100%";
  overlay.style.display = "flex";

  overlay.classList.add("overlaySlideIn");

  setTimeout(() => {
    overlay.classList.remove("overlaySlideIn");
    overlay.style.right = "0";
    overlay.style.display = "none";
  }, 5000);
}

function showUserExist() {
  const emailInvalidDiv = document.querySelector(".emailInvalidDiv");
  const emailInput = document.getElementById("signUpEmailInput");
  emailInvalidDiv.textContent =
    "This user already exists, please pick another E-Mail or Login.";
  emailInvalidDiv.classList.add("visible");
  emailInvalidDiv.classList.remove("invisible");
  emailInput.classList.add("warning");
}

function checkNameValidity() {
  const nameInput = document.getElementById("signUpNameInput");
  const nameInvalidDiv = document.querySelector(".nameInvalidDiv");

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

function checkEmailValidity() {
  const emailInput = document.getElementById("signUpEmailInput");
  const emailInvalidDiv = document.querySelector(".emailInvalidDiv");

  if (!emailInput.checkValidity() || emailInput.value.trim() === "") {
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

function checkPasswordLength(password, confirmPassword) {
  const passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  const confirmPasswordInvalidDiv = document.querySelector(
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

function checkPasswordValidity() {
  const passwordInput = document.getElementById("signUpPasswordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");

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

function showPasswordMismatch() {
  const passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  const confirmPasswordInvalidDiv = document.querySelector(
    ".confirmPasswordInvalidDiv"
  );
  const passwordInput = document.getElementById("signUpPasswordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");

  passwordInvalidDiv.textContent =
    "Passwords do not match, please enter two identical passwords";
  confirmPasswordInvalidDiv.textContent =
    "Passwords do not match, please enter two identical passwords";
  passwordInvalidDiv.classList.remove("invisible");
  confirmPasswordInvalidDiv.classList.remove("invisible");

  passwordInput.classList.add("warning");
  confirmPasswordInput.classList.add("warning");
}

function hidePasswordInvalidDiv() {
  const passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  const confirmPasswordInvalidDiv = document.querySelector(
    ".confirmPasswordInvalidDiv"
  );
  const passwordInput = document.getElementById("signUpPasswordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");

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
