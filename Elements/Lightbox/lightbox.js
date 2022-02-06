const lightbox = document.createElement("div");
lightbox.id = "lightbox";

const images = document.querySelectorAll("img");

images.forEach((image) => {
  image.addEventListener("click", (e) => {
    lightbox.classList.add("active");

    const img = document.createElement("img");
    img.src = image.src;

    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }

    lightbox.appendChild(img);
  });
});

document.body.appendChild(lightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove("active");
});
