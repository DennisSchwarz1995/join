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