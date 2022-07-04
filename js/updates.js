const postTemplate = document.querySelector("[data-post-template]");
const posts = document.querySelector(".posts");

fetch("../data/posts.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((post) => {
      const postElement = postTemplate.content.cloneNode(true).children[0];

      const postImgElement = postElement.querySelector(".post__image");
      const postTitleElement = postElement.querySelector(".post__title");
      const postTagElement = postElement.querySelector(".post__tag > a");
      const postBodyElement = postElement.querySelector(".post__text");
      const postDateElement = postElement.querySelector(".post__date");

      postElement.setAttribute("id", post.id);
      postImgElement.setAttribute("src", post.imgUrl);
      postTitleElement.textContent = post.title;
      postTagElement.textContent = post.tag;
      postDateElement.textContent = post.date;

      [post.body].map((paragraphObjects) => {
        paragraphObjects.forEach((object) => {
          postBodyElement.textContent += object.paragraph + "\n";
        });
      });

      //   console.log(postImgElement);

      posts.append(postElement);
    });
  })
  .then(() => {
    // contains a bug where the scroll height is equal to client height on start of script
    // and because of that, part of the overflowing contant wont be recognized and therefore
    // the containing post will not be able to be overflow

    const postsArray = document.querySelectorAll(".post");
    const titlesArray = document.querySelectorAll(".post__title");
    const textsArray = document.querySelectorAll(".post__text");
    const btnsArray = document.querySelectorAll(".post__button");

    const textMaxHeight = textsArray[0].style.maxHeight;

    for (let index = 0; index < postsArray.length; index++) {
      //   console.log(textsArray[index].scrollHeight);
      //   console.log(textsArray[index].clientHeight);

      if (textsArray[index].scrollHeight > textsArray[index].clientHeight) {
        btnsArray[index].classList.remove("hidden");

        btnsArray[index].addEventListener("click", () => {
          togglePostView(index);
        });

        textsArray[index].addEventListener("click", () => {
          togglePostView(index);
        });
      }
    }

    function togglePostView(index) {
      if (!textsArray[index].classList.contains("overflow")) {
        // shrink all posts
        for (let i = 0; i < textsArray.length; i++)
          if (textsArray[i].classList.contains("overflow")) {
            titlesArray[i].classList.remove("white-space");
            textsArray[i].style.maxHeight = textMaxHeight;
            textsArray[i].classList.remove("overflow");
            btnsArray[i].style.transform = "rotate(0deg)";
          }

        // expand desired post
        textsArray[index].classList.add("overflow");
        titlesArray[index].classList.add("white-space");
        textsArray[index].style.maxHeight =
          textsArray[index].scrollHeight + "px";
        btnsArray[index].style.transform = "rotate(180deg)";
      } else {
        // shrink desired post
        textsArray[index].classList.remove("overflow");
        titlesArray[index].classList.remove("white-space");
        textsArray[index].style.maxHeight = textMaxHeight;
        btnsArray[index].style.transform = "rotate(0deg)";

        // scroll to top of post
        if (postsArray[index].getBoundingClientRect().top < 0)
          postsArray[index].scrollIntoView(true); // allign to top = true
      }
    }
  })
  .then(() => {
    // lightbox

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";

    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) return;

      lightbox.classList.remove("active");
    });

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
      if (!image.getAttribute("data-disable-lightbox")) {
        console.log(image.getAttribute("data-disable-lightbox"));
        image.addEventListener("click", () => {
          lightbox.classList.add("active");

          const img = document.createElement("img");
          img.src = image.src;

          while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
          }

          lightbox.appendChild(img);
        });
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });
