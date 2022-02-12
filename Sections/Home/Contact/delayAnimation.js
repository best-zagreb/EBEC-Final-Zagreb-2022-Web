const animationContainers = document.querySelectorAll(".rhombus-svg");

for (let index = 0; index < animationContainers.length; index++) {
	animationContainers[index].style.animationDelay = Math.random() * 4 + "s";
}
