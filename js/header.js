function generateHeader() {
  let header = document.querySelector('.header');
  header.innerHTML = headerHTML();
  setActiveNavItem();
}

function headerHTML() {
  return `
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
        <a href="">Log out</a>
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


