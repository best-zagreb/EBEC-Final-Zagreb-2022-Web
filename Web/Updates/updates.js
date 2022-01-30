// contains a bug where the scroll height is equal to client height on start of script
// and because of that, part of the overflowing contant wont be recognized and therefore
// the containing post will not be able to be expanded

const postsArray = document.querySelectorAll(".post");
const textsArray = document.querySelectorAll(".post__text");
const expandBtnsArray = document.querySelectorAll(".post__expand-button");
const shrinkBtnsArray = document.querySelectorAll(".post__shrink-button");

for (let index = 0; index < postsArray.length; index++) {
	// console.log(textsArray[index].scrollHeight);
	// console.log(textsArray[index].clientHeight);

	if (textsArray[index].scrollHeight > textsArray[index].clientHeight) {
		expandBtnsArray[index].classList.remove("hidden");

		expandBtnsArray[index].addEventListener("click", () => {
			expandPost(index);
		});

		textsArray[index].addEventListener("click", () => {
			expandPost(index);
		});
	}
}

function expandPost(index) {
	// shrink all other posts
	for (let i = 0; i < postsArray.length; i++) {
		// console.log(textsArray[i].scrollHeight);

		if (textsArray[i].clientHeight > textsArray[index].clientHeight) {
			shrinkPost(i);
		}
	}

	// expand desired post
	textsArray[index].classList.add("expanded");

	expandBtnsArray[index].classList.add("hidden");
	expandBtnsArray[index].removeEventListener("click", () => {});

	shrinkBtnsArray[index].addEventListener("click", () => {
		shrinkPost(index);

		postsArray[index].scrollIntoView(true); // allign to top = true
	});
	shrinkBtnsArray[index].classList.remove("hidden");
}

function shrinkPost(index) {
	// shrink desired post
	textsArray[index].classList.remove("expanded");

	shrinkBtnsArray[index].classList.add("hidden");
	shrinkBtnsArray[index].removeEventListener("click", () => {});

	expandBtnsArray[index].classList.remove("hidden");
}
