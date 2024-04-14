function initHeaderAndNavTemplates() {
  let user = localStorage.getItem("userFullName");
  generateNavbarMobile();
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
  let navBarLink = document.querySelector(".navBar a");
  navBarLink.addEventListener("click", function (event) {
    event.preventDefault();
  });
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
