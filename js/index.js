// Countdown
const countdown = document.querySelector(".countdown");
const countdownEventStatus = document.querySelector(".countdown__event-status");
const countdownDays = document.querySelector(".countdown__days");
const countdownDaysText = document.querySelector(".countdown__days-text");
const countdownHours = document.querySelector(".countdown__hours");
const countdownMinutes = document.querySelector(".countdown__minutes");
const countdownSeconds = document.querySelector(".countdown__seconds");
const countdownSecondsText = document.querySelector(".countdown__secs-text");

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
  countdown.innerText = "";
  countdown.appendChild(countdownEventStatus);
  countdownEventStatus.innerText = "EVENT ENDED";
} else if (new Date() > OpeningDay) {
  // event has started
  countdown.innerText = "";
  countdown.appendChild(countdownEventStatus);
  countdownEventStatus.innerText = "EVENT LIVE";
  countdownEventStatus.style.fontSize = "3em";
} else if (calculatedTime.daysLeft < 1) {
  // last day
  countdownDays.classList.add("hidden");
  countdownDaysText.classList.add("hidden");

  countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
  countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);
  countdownSeconds.innerText = ("0" + calculatedTime.secondsLeft).slice(-2);

  // set interval to update element every second
  setInterval(function () {
    calculatedTime = calculateTime();

    // could be optimized by checking if the values differ, then update
    countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
    countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);
    countdownSeconds.innerText = ("0" + calculatedTime.secondsLeft).slice(-2);
  }, 1000);
} else {
  countdownSeconds.classList.add("hidden");
  countdownSecondsText.classList.add("hidden");

  if (calculatedTime.daysLeft !== 1) countdownDaysText.innerText += "S";

  countdownDays.innerText = calculatedTime.daysLeft;
  countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
  countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);

  // set interval to update element every 30 seconds
  setInterval(function () {
    calculatedTime = calculateTime();

    // could be optimized by checking if the values differ, then update
    countdownDays.innerText = calculatedTime.daysLeft;
    countdownHours.innerText = ("0" + calculatedTime.hoursLeft).slice(-2);
    countdownMinutes.innerText = ("0" + calculatedTime.minutesLeft).slice(-2);
  }, 1000 * 30);
}

// posts loading from json

const postTemplate = document.querySelector("[data-post-template]");
const posts = document.querySelector(".posts");
let numberOfPosts = 2;

fetch("../data/posts.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((post) => {
      if (numberOfPosts > 0) {
        const postElement = postTemplate.content.cloneNode(true).children[0];

        const postTitleElement = postElement.querySelector(".post__title");
        const postBodyElement = postElement.querySelector(".post__text");
        const postDateElement = postElement.querySelector(".post__date");
        const postReadMoreElement = postElement.querySelector(
          ".post__read-more-link"
        );

        postElement.setAttribute("id", post.id);
        postTitleElement.textContent = post.title;
        postDateElement.textContent = post.date;
        postReadMoreElement.setAttribute("href", "updates#" + post.id);

        [post.body].map((paragraphObjects) => {
          paragraphObjects.forEach((object) => {
            postBodyElement.textContent += object.paragraph + "\n";
          });
        });

        //   console.log(postImgElement);

        posts.append(postElement);
        numberOfPosts--;
      } else {
        return;
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });

// contacts loading from json

const contactTemplate = document.querySelector("[data-contact-template]");
const contacts = document.querySelector(".contacts");

fetch("../data/contacts.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((contact) => {
      const contactElement =
        contactTemplate.content.cloneNode(true).children[0];

      const contactImgElement = contactElement.querySelector(".contact__image");
      const contactNameElement = contactElement.querySelector(
        ".contact-info__name"
      );
      const contactFunctionElement = contactElement.querySelector(
        ".contact-info__function"
      );
      const contactEmailElement = contactElement.querySelector(
        ".contact-info__email"
      );
      const contactTelElement =
        contactElement.querySelector(".contact-info__tel");

      contactImgElement.setAttribute("href", contact.imgUrl);
      contactNameElement.textContent = contact.name;
      contactFunctionElement.textContent = contact.function;
      contactEmailElement.textContent = contact.email;
      contactEmailElement.setAttribute("href", "mailto:" + contact.email);
      contactTelElement.textContent = contact.tel;
      contactTelElement.setAttribute(
        "href",
        "tel:" + contact.tel.replace(/\s/g, "")
      );

      //   console.log(contactImgElement);

      contacts.append(contactElement);
    });
  })
  .then(() => {
    // if url with specified contact section (#contact)
    if (window.location.hash.split("#")[1] === "contact")
      document
        .querySelector('[id="' + window.location.hash.split("#")[1] + '"]')
        .scrollIntoView(true);
  })
  .catch((err) => {
    console.error(err);
  });
