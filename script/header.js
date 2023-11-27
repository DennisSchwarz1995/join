function generateHeader() {
  let header = document.querySelector('.header');
  header.innerHTML = headerHTML();
}

function headerHTML() {
  return `
    <h4>Kanban Project Management Tool</h4>
    <div class="headerMenu">
      <a href="">
        <img src="./img/help-icon.svg" alt="help-icon" />
      </a>
      <div class="userInitialsContainer" onclick="togglePopupMenu()">
        <h4 class="userInitials">DS</h4>
      </div>
      <div class="popupMenu">
        <a href="">Legal Notice</a>
        <a href="">Privacy Policy</a>
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

/**
 * Active Background for the Links (doesn't work until the href refers to something)
 */
document.querySelectorAll(".navBarCategories").forEach((link) => {
  if (link.href === window.location.href) {
    link.setAttribute("aria-current", "page");
  }
});
