/**
 * Generates the HTML header and sets it in the header element
 * Activates navigation items 
 */
function generateHeader() {
  let header = document.querySelector('.header');
  header.innerHTML = headerHTML();
  setActiveNavItem();
  displayUserInitials();
}
/**
 * Lougs out the user by cleaning the loacal storage and navigate him to the start site 
 */
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

/**
 * @returns the HTML content for the header
 */
function headerHTML() {
  return `
  <div class="headerWrapper">
  <img class="logoMobile" src="../img/join-logo-mobile.svg" alt="join-logo">
  <h4 class="title">Kanban Project Management Tool</h4>
  <div class="headerMenu">
    <a href="help.html">
      <img class="helpIcon" src="../img/help-icon.svg" alt="help-icon" />
    </a>
    <div class="userInitialsContainer" onclick="togglePopupMenu()">
      <h4 class="userInitials">DS</h4>
    </div>
    <div class="popupMenu">
      <a class="navBarActive" href="legal_notice.html">Legal Notice</a>
      <a class="navBarActive" href="privacy_policy.html">Privacy Policy</a>
      <a onclick="logout()">Log out</a>
    </div>
  </div>
  </div>
`;
}

/**
 * Toggles the display of the popup menu 
 */
function togglePopupMenu() {
  let menu = document.querySelector(".popupMenu");
  menu.style.display =
    menu.style.display === "none" || menu.style.display === ""
      ? "flex"
      : "none";
}

/**
 * closes the popup menu when a click event happens outside of the menu 
 */
document.addEventListener("click", function (event) {
  let menu = document.querySelector(".popupMenu");
  let userInitialsContainer = document.querySelector(".userInitialsContainer");

  if (
    menu.style.display === "flex" &&
    !userInitialsContainer.contains(event.target)
  ) {
    menu.style.display = "none";
  }
});

/**
 * Displays users initals in the header 
 */
function displayUserInitials() {
  let userInitialsContainer = document.querySelector(".userInitials");
  let storedInitials = localStorage.getItem("userInitials");

  if (storedInitials) {
    let parsedInitials = storedInitials.replace(/"/g, "");
    userInitialsContainer.textContent = parsedInitials;
  } else {
    userInitialsContainer.textContent = "G";
  }
}