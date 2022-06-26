const backgroundImage = document.querySelector(".background-image");

const scrollContainer = () => {
	return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
	const scrolledPercentage =
		(scrollContainer().scrollTop /
			(scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
		100;

	backgroundImage.style.left = -scrolledPercentage / 8 + "%";
});
