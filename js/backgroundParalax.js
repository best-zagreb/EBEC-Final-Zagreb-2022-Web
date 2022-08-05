// Background paralax

const backgroundElement = document.createElement("div");
backgroundElement.classList.add("background-image");
document.querySelector("body").appendChild(backgroundElement);

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  const scrolledPercentage =
    (scrollContainer().scrollTop /
      (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

  backgroundElement.style.left = -scrolledPercentage / 8 + "%";
});
