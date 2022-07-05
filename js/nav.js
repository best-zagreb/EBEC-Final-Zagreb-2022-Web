const primaryNav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  changeNavVisibility(visibility);
});

window.addEventListener("click", function (e) {
  const visibility = primaryNav.getAttribute("data-visible");

  if (
    visibility === "true" &&
    !primaryNav.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    changeNavVisibility(visibility);
  }
});

function changeNavVisibility(visibility) {
  //   console.log(visibility);

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("data-expanded", true);
  } else {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("data-expanded", false);
  }
}
