let users = [];

/**
 * Registers an new user 
 */
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

/**
 * Saves  user data to the storage 
 */
async function saveUser() {
  await setItem("users", JSON.stringify(users));
}

/**
 * Loads user data from the storage 
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users")) || [];
  } catch (e) {
    console.error("Loading error:", e);
  }
}
