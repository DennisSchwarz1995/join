function initHeaderAndNavTemplates() {
  let user = localStorage.getItem("userFullName");
  if (
    document.referrer.includes("signup.html") ||
    document.referrer.includes("login.html") ||
    !user
  ) {
    generateNavbar();
    generateHeader();
    showLimitedHeaderAndNavbar();
  } else {
    generateNavbar();
    generateHeader();
  }
}

function showLimitedHeaderAndNavbar() {
  let navBarBoard = document.querySelector(".navBarBoard");
  navBarBoard.classList.add("invisible");
  let headerMenu = document.querySelector(".headerMenu");
  headerMenu.classList.add("invisible");
}
