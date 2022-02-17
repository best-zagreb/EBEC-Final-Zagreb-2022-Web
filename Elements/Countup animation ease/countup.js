const countups = document.querySelectorAll(".countup");
const animationDuration = 100; // max value 100
const animationSlowdown = 50; // max value 75

countups.forEach((countup) => {
  countup.innerText = "0";

  const updateCounter = () => {
    const target = countup.getAttribute("data-target");

    const counter = +countup.innerText;

    if (counter < target) {
      countup.innerText = `${Math.ceil(counter + target / animationDuration)}`;

      setTimeout(updateCounter, (counter * animationSlowdown) / target);
    } else {
      countup.innerText = target;
    }
  };

  updateCounter();
});
