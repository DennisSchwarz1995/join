async function initLogin() {
 await loadUsers();
 checkValuesForLogin();
}

function login() {
  let email = document.getElementById("emailInput");
  let password = document.getElementById("passwordInput");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  console.log(user);
  if (user) {
    console.log("user gefunden");
  }
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
  let mailInput = document.querySelector(".emailInput");
  let passwordInput = document.querySelector(".passwordInput");
  if (
    mailInput.value === "" ||
    passwordInput.value === ""
  ) {
    button.setAttribute("disabled", "disabled");
  } else {
    button.removeAttribute("disabled");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector(".loginForm");
  form.addEventListener("keyup", function () {
    checkValuesForLogin();
  });

  let checkBoxIcon = document.querySelector(".checkBoxIcon");
  checkBoxIcon.addEventListener("click", function () {
    checkValuesForLogin();
  });
});


document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.querySelector(".overlay");

  overlay.addEventListener("animationend", function () {
    overlay.remove();
  });
});

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
      icon.src = "../img/hide-password-icon.svg";
    }
  });
}

function togglePasswordInputType() {
  let icon = document.querySelector(".passwordIcon");
  let passwordInput = document.getElementById("passwordInput");

  if (icon.src.includes("lock-icon.svg")) {
    return;
  }

  if (passwordInput.type === "password") {
    icon.src = "../img/show-password-icon.svg";
    passwordInput.type = "text";
  } else {
    icon.src = "../img/hide-password-icon.svg";
    passwordInput.type = "password";
  }
}
