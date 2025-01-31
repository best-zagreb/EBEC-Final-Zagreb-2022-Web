// Back to top button
const backToTopBtn = document.createElement("div");
backToTopBtn.classList.add("backToTopBtn", "hidden");
backToTopBtn.setAttribute("title", "Scroll to top"); // tooltip
backToTopBtn.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 512 512">
    <g transform="translate(0, 512) scale(0.1, -0.1)"
    fill="#000000" stroke="none">
        <path d="M150 5059 c-55 -25 -95 -62 -123 -114 -21 -38 -22 -55 -25 -335 -2
        -206 0 -307 8 -335 19 -63 63 -118 122 -150 l53 -30 2375 0 2375 0 53 30 c59
        32 103 87 122 150 8 28 10 129 8 335 -3 280 -4 297 -25 335 -28 52 -68 89
        -123 114 -45 20 -52 21 -2410 21 -2358 0 -2365 -1 -2410 -21z"/>
        <path d="M2502 3735 c-23 -7 -59 -25 -78 -40 -53 -40 -1386 -1711 -1407 -1763
        -38 -96 -9 -212 73 -286 65 -59 108 -66 404 -66 252 0 263 -1 311 -24 28 -12
        65 -40 84 -61 68 -78 65 -49 71 -695 l5 -585 28 -47 c30 -52 73 -89 130 -113
        54 -22 820 -22 874 0 57 24 100 61 130 113 l28 47 5 585 c6 646 3 617 71 695
        19 21 56 49 84 61 48 23 59 24 311 24 289 0 331 6 396 60 84 70 118 216 70
        307 -30 58 -1293 1689 -1344 1735 -66 61 -158 81 -246 53z"/>
    </g>
</svg>`;
document.querySelector("body").appendChild(backToTopBtn);

const bttBtnShowOnPx = 100; // amount of pixels before button is shown

backToTopBtn.addEventListener("click", () => {
  document.body.scrollIntoView();
});

// Background paralax
const backgroundElement = document.createElement("div");
backgroundElement.classList.add("background-image");
document.querySelector("body").appendChild(backgroundElement);

// Default
const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  const scrolledPercentage =
    (scrollContainer().scrollTop /
      (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

  // Back to top button
  if (scrollContainer().scrollTop > bttBtnShowOnPx)
    backToTopBtn.classList.remove("hidden");
  else backToTopBtn.classList.add("hidden");

  // Background paralax
  backgroundElement.style.left = -scrolledPercentage / 8 + "%";
});

// Share button
const shareBtn = document.createElement("div");
shareBtn.classList.add("share-btn");
shareBtn.style.cursor = "pointer";
shareBtn.setAttribute("title", "Share this website"); // tooltip
shareBtn.innerHTML = `<svg
            class="footer-social__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"
            />
          </svg>`;
document.querySelector(".footer-social").appendChild(shareBtn);

if (navigator.share) {
  shareBtn.addEventListener("click", async () => {
    try {
      await navigator.share({
        title: document.title,
        text: "Check out this awesome page!",
        url: window.location.href,
      });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  });
} else {
  console.log("Web Share API not supported in this browser.");
}
