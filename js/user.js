let users = [];

async function registerUser() {
  users.push({
    name: signUpNameInput.value,
    email: signUpEmailInput.value,
    password: signUpPasswordInput.value,
    confirmPassword: confirmPasswordInput.value,
  });

  saveUser();
  resetForm();

  showRegistrationOverlay();
  setTimeout(() => {
    window.location.href = "login.html";
  }, 3000);
}

async function saveUser() {
  await setItem("users", JSON.stringify(users));
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users")) || [];
  } catch (e) {
    console.error("Loading error:", e);
  }
}
