const pageProgressBar = document.querySelector(".progress-bar");
const showOnPx = 10; // amount of pixels before bar is shown

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  const scrolledPercentage =
    (scrollContainer().scrollTop /
      (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

  // console.log(scrolledPercentage);
  pageProgressBar.style.width = scrolledPercentage + "%";

  if (scrollContainer().scrollTop > showOnPx)
    pageProgressBar.classList.remove("hidden");
  else pageProgressBar.classList.add("hidden");
});
