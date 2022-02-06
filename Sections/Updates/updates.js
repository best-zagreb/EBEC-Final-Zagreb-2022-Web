// contains a bug where the scroll height is equal to client height on start of script
// and because of that, part of the overflowing contant wont be recognized and therefore
// the containing post will not be able to be expanded

const postsArray = document.querySelectorAll(".post");
const titlesArray = document.querySelectorAll(".post__title");
const textsArray = document.querySelectorAll(".post__text");
const btnsArray = document.querySelectorAll(".post__button");

const textMaxHeight = textsArray[0].style.maxHeight;

for (let index = 0; index < postsArray.length; index++) {
  // console.log(textsArray[index].scrollHeight);
  // console.log(textsArray[index].clientHeight);

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
  if (!textsArray[index].classList.contains("expanded")) {
    // shrink all posts
    for (let i = 0; i < textsArray.length; i++)
      if (textsArray[i].classList.contains("expanded")) {
        titlesArray[i].classList.remove("expanded");
        textsArray[i].style.maxHeight = textMaxHeight;
        textsArray[i].classList.remove("expanded");
        btnsArray[i].style.transform = "rotate(0deg)";
      }

    // expand desired post
    textsArray[index].classList.add("expanded");
    titlesArray[index].classList.add("expanded");
    textsArray[index].style.maxHeight = textsArray[index].scrollHeight + "px";
    btnsArray[index].style.transform = "rotate(180deg)";
  } else {
    // shrink desired post
    textsArray[index].classList.remove("expanded");
    titlesArray[index].classList.remove("expanded");
    textsArray[index].style.maxHeight = textMaxHeight;
    btnsArray[index].style.transform = "rotate(0deg)";

    // scroll to top of post
    if (postsArray[index].getBoundingClientRect().top < 0)
      postsArray[index].scrollIntoView(true); // allign to top = true
  }
}
