const hamburgerSvg = $("#hamburger");
const hamburgerMenu = $("#hamburger-menu");

function toggleHamburgerMenu() {
    hamburgerMenu.slideDown(500);
}

function removeHamburgerMenu() {
    hamburgerMenu.slideUp(500);
}
