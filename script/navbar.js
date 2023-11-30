function generateNavbar() {
  let navbar = document.querySelector('.navBar');
  navbar.innerHTML = navbarHTML();
}

function navbarHTML() {
  return `
    <a href="index.html">
      <img src="./img/nav-icon.svg" alt="join-sidebar-logo" />
    </a>

    <div class="navBarBoard">
      <a class="navBarCategories" href="summary.html">
        <div class="navBarMenu">
          <img src="./img/summary-icon.svg" alt="summary-icon" />
          <h4>Summary</h4>
        </div>
      </a>
      <a class="navBarCategories" href="board.html">
        <div class="navBarMenu">
          <img src="./img/board-icon.svg" alt="board-icon" />
          <h4>Board</h4>
        </div>
      </a>
      <a class="navBarCategories" href="add-task.html">
        <div class="navBarMenu">
          <img src="./img/task-icon.svg" alt="task-icon" />
          <h4>Add Task</h4>
        </div>
      </a>
      <a class="navBarCategories" href="contact.html">
        <div class="navBarMenu">
          <img src="./img/contacts-icon.svg" alt="contacts-icon" />
          <h4>Contacts</h4>
        </div>
      </a>
    </div>
    <div class="privacyAndLegal">
      <a class="privacy" href="">Privacy Policy</a>
      <a class="legal" href="">Legal notice</a>
    </div>
  `;
}
