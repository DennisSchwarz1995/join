async function initLogin() {
  await loadUsers();
  checkValuesForLogin();
}

function login() {
  if (checkIfUserExists()) {
    redirectToSummary();
  } else {
    showUserPasswordMismatch();
  }
}


function guestLogin() {
  redirectToSummary();
}

function findUserNameByEmail(email) {
  let user = users.find((u) => u.email === email);
  if (user) {
    localStorage.setItem("userFullName", JSON.stringify(user.name));
    return user.name;
  }
  return null;
}

function redirectToSummary() {
  let emailInput = document.getElementById("emailInput").value;
  let userName = findUserNameByEmail(emailInput);
  if (userName) {
    saveUserName(name);
  }

  window.location.href = "summary.html";
}

function saveUserName(name) {
  let initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  localStorage.setItem("userInitials", JSON.stringify(initials));
  localStorage.setItem("userFullName", JSON.stringify(name));
}

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

function checkValuesForLogin() {
  let button = document.querySelector(".loginButton");
  let isButtonEnabled = isLoginButtonEnabled();

  if (isButtonEnabled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector(".loginForm");
  form.addEventListener("keyup", checkValuesForLogin);
});

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

function showPasswordLengthInvalid() {
  let passwordInput = document.getElementById("passwordInput");
  let passwordInvalidDiv = document.querySelector(".passwordInvalidDiv");
  passwordInvalidDiv.textContent =
    "Password must be at least 8 characters long";
  passwordInvalidDiv.classList.remove("invisible");
  passwordInput.classList.add("warning");
}

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

document.addEventListener("DOMContentLoaded", function () {
  let overlay = document.querySelector(".overlay");

  overlay.addEventListener("animationend", function () {
    overlay.remove();
  });
});
