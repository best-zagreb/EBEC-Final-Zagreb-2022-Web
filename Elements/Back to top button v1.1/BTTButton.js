const backToTopButton = document.querySelector(".backToTopBtn")
const showOnPx = 100; // amount of pixels before button is shown

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > showOnPx)
        backToTopButton.classList.remove("hidden");
    else
        backToTopButton.classList.add("hidden");
    
})

backToTopButton.addEventListener("click", goToTop)

function goToTop() {
    document.body.scrollIntoView({
        behavior: "smooth",
    }); // function scrolls the page to bring the element it is being called upon into view
};