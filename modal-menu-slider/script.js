const toggle = document.getElementById("toggle"); //nav bar hamburger
const close = document.getElementById("close");
const open = document.getElementById("open"); //signup
const modal = document.getElementById("modal"); //modal container
const navbar = document.getElementById("navbar");

// for document body -> if click in body then close nsv
function closeNavbar(e) {
  console.log("TRIGGERED");
  if (
    document.body.classList.contains("show-nav") &&
    e.target !== toggle &&
    !toggle.contains(e.target) &&
    e.target !== navbar
  ) {
    console.log("first");

    document.body.classList.toggle("show-nav");
    document.body.removeEventListener("click", closeNavbar);
  } else if (!document.body.classList.contains("show-nav")) {
    console.log("second");

    document.body.removeEventListener("click", closeNavbar);
  }
}

// show modal
open.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// close modal when click close button
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// close modal on outside click
window.addEventListener("click", (e) => {
  e.target == modal ? modal.classList.remove("show-modal") : false;
});

// toggle nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  document.body.addEventListener("click", closeNavbar);
});
