function generateNavbar() {
  let navbar = document.querySelector(".navBar");
  navbar.innerHTML = navbarHTML();
  setActiveNavItem();
}

function navbarHTML() {
  return `
    <a href="summary.html">
      <img src="../img/nav-icon.svg" alt="join-sidebar-logo" />
    </a>
    <div class="navBarBoard" id="navBarBoard">
      <a class="navBarCategories navBarActive" href="summary.html">
        <div class="navBarMenu">
          <img src="../img/summary-icon.svg" alt="summary-icon" />
          <h5>Summary</h5>
        </div>
      </a>
      <a class="navBarCategories navBarActive" href="board.html">
        <div class="navBarMenu">
          <img src="../img/board-icon.svg" alt="board-icon" />
          <h5>Board</h5>
        </div>
      </a>
      <a class="navBarCategories navBarActive" href="add_task.html">
        <div class="navBarMenu">
          <img src="../img/task-icon.svg" alt="task-icon" />
          <h5>Add Task</h5>
        </div>
      </a>
      <a class="navBarCategories navBarActive" href="contacts.html">
        <div class="navBarMenu">
          <img src="../img/contacts-icon.svg" alt="contacts-icon" />
          <h5>Contacts</h5>
        </div>
      </a>
    </div>
    <div class="privacyAndLegal">
      <a class="privacy navBarActive" href="privacy_policy.html">Privacy Policy</a>
      <a class="legal navBarActive" href="legal_notice.html">Legal notice</a>
    </div>
  `;
}

function setActiveNavItem() {
  let currentPath = window.location.pathname;
  let navbarElements = document.querySelectorAll(".navBarActive");

  navbarElements.forEach((element) => {
    let href = element.getAttribute("href");
    if (currentPath.includes(href)) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

