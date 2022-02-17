const countups = document.querySelectorAll(".countup");
const animationDuration = 100; // max value 100

countups.forEach((countup) => {
  countup.innerText = "0";

  const updateCounter = () => {
    const target = countup.getAttribute("data-target");

    const counter = +countup.innerText;

    if (counter < target) {
      countup.innerText = `${Math.ceil(counter + target / animationDuration)}`;

      setTimeout(updateCounter, 12.5); // max value 25
    } else {
      countup.innerText = target;
    }
  };

  updateCounter();
});
