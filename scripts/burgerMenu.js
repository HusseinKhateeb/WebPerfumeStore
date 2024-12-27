document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.getElementById("burgerMenu");
    const navMenu = document.getElementById("navMenu");

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            if (navMenu.classList.contains("show")) {
                navMenu.style.maxHeight = navMenu.scrollHeight + "px";
                navMenu.style.opacity = "1";
            } else {
                navMenu.style.maxHeight = "0";
                navMenu.style.opacity = "0";
            }
        });
    }
});
