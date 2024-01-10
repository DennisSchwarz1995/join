let hasBeenLoadedOnce = false;
function firstLoad() {
  if (!hasBeenLoadedOnce) {
    console.log("hi");
  }
}

function checkInputs() {
  if (document.getElementById("emailInput").value == "") {
  }
}

function toggleCheckBox() {
  var checkBoxIcon = document.querySelector(".checkBoxIcon");

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

document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.querySelector(".overlay");

  overlay.addEventListener("animationend", function () {
    overlay.remove();
  });
});
