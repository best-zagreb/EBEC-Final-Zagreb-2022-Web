const counters = document.querySelectorAll(".numbers-s__counter");

counters.forEach((counter) => {
  const animate = () => {
    const value = +counter.getAttribute("data-value");
    const data = +counter.innerText;

    const time = value / 100;
    if (data < value) {
      counter.innerText = Math.ceil(data + time);
      setTimeout(animate, 15);
    } else {
      if (counter.getAttribute("needs-plus") === "true") {
        counter.innerText = value + "+";
      } else {
        counter.innerText = value;
      }
    }
  };
  animate();
});
