const OpeningDay = new Date(2022, 06, 22, 10); // 22nd July 2022 at 10 am
// console.log(OpeningDay);
const ClosingDay = new Date(2022, 06, 30); // 29th to 30th July 2022 at midnight
// console.log(ClosingDay);

function calculateTime() {
  const timeDifference = OpeningDay - new Date();

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeDifference / 1000 / 60) % 60);
  const secondsLeft = Math.floor((timeDifference / 1000) % 60);

  return {
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
  };
}

let calculatedTime = calculateTime();

if (new Date() > ClosingDay) {
  // event has ended
  document.querySelector(".countdown").innerHTML = "EVENT ENDED";
} else if (new Date() > OpeningDay) {
  // event has started
  document.querySelector(".countdown").innerHTML = "EVENT LIVE";
} else if (calculatedTime.daysLeft < 1) {
  // last day
  document.querySelector(".countdown__daysWhole").classList.add("hidden");

  document.querySelector(".countdown__hours").innerHTML = (
    "0" + calculatedTime.hoursLeft
  ).slice(-2);
  document.querySelector(".countdown__minutes").innerHTML = (
    "0" + calculatedTime.minutesLeft
  ).slice(-2);
  document.querySelector(".countdown__seconds").innerHTML = (
    "0" + calculatedTime.secondsLeft
  ).slice(-2);

  // set interval to update element every second
  setInterval(function () {
    calculatedTime = calculateTime();

    // could be optimized by checking if the values differ, then update
    document.querySelector(".countdown__hours").innerHTML = (
      "0" + calculatedTime.hoursLeft
    ).slice(-2);
    document.querySelector(".countdown__minutes").innerHTML = (
      "0" + calculatedTime.minutesLeft
    ).slice(-2);
    document.querySelector(".countdown__seconds").innerHTML = (
      "0" + calculatedTime.secondsLeft
    ).slice(-2);
  }, 1000);
} else {
  document.querySelector(".countdown__secondsWhole").classList.add("hidden");

  if (calculatedTime.daysLeft !== 1)
    document.querySelector(".countdown__daysText").innerHTML += "S";

  document.querySelector(".countdown__days").innerHTML =
    calculatedTime.daysLeft;
  document.querySelector(".countdown__hours").innerHTML = (
    "0" + calculatedTime.hoursLeft
  ).slice(-2);
  document.querySelector(".countdown__minutes").innerHTML = (
    "0" + calculatedTime.minutesLeft
  ).slice(-2);

  // set interval to update element every 30 seconds
  setInterval(function () {
    calculatedTime = calculateTime();

    // could be optimized by checking if the values differ, then update
    document.querySelector(".countdown__days").innerHTML =
      calculatedTime.daysLeft;
    document.querySelector(".countdown__hours").innerHTML = (
      "0" + calculatedTime.hoursLeft
    ).slice(-2);
    document.querySelector(".countdown__minutes").innerHTML = (
      "0" + calculatedTime.minutesLeft
    ).slice(-2);
  }, 1000 * 30);
}
