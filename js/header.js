function generateHeader() {
  let header = document.querySelector('.header');
  header.innerHTML = headerHTML();
  setActiveNavItem();
  displayUserInitials();
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function headerHTML() {
  return `
    <h4>Kanban Project Management Tool</h4>
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
  `;
}

function togglePopupMenu() {
  let menu = document.querySelector(".popupMenu");
  menu.style.display =
    menu.style.display === "none" || menu.style.display === ""
      ? "flex"
      : "none";
}

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