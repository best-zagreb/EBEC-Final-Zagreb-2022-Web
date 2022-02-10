// contains a bug where the scroll height is equal to client height on start of script
// and because of that, part of the overflowing contant wont be recognized and therefore
// the containing post will not be able to be overflow

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
