setTimeout(() => {
  const hamburger = document.getElementById("hamburger");
  const navUL = document.getElementById("nav-ul");
}, 100);

setTimeout(() => {
  console.log("Ovdje");
}, 1000);

setTimeout(() => {
  hamburger.addEventListener("click", () => {
    console.log("Kliknuto");
    navUL.classList.toggle("show");
  });
}, 100);

$(window).scroll(function () {
  if ($(window).scrollTop() >= 50) {
    $(".headerClass").css("background", "hsl(100, 28%, 15%)");
  } else {
    $(".headerClass").css("background", "hsl(217, 28%, 15%)");
  }
});
