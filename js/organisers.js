const organiserTemplate = document.querySelector("[data-org-template]");
const organisers = document.querySelectorAll("[data-team]");

console.log(organisers);

fetch("../data/organisers.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((organiser) => {
      const organiserElement =
        organiserTemplate.content.cloneNode(true).children[0];

      const organiserImgElement = organiserElement.querySelector(
        ".org__image-container > img"
      );
      const organiserNameElement = organiserElement.querySelector(".org__name");
      const organiserFunctionElement =
        organiserElement.querySelector(".org__function");
      const organiserEmailContainerElement = organiserElement.querySelector(
        ".org__email-container"
      );
      const organiserEmailElement =
        organiserElement.querySelector(".org__email");

      organiserImgElement.setAttribute("src", organiser.imgUrl);
      organiserNameElement.textContent = organiser.name;
      organiserFunctionElement.textContent = organiser.function;
      organiserEmailContainerElement.setAttribute(
        "href",
        "mailto:" + organiser.email
      );
      organiserEmailElement.textContent = organiser.email;

      //   console.log(organiserImgElement);

      organiser.team === "local"
        ? organisers[0].append(organiserElement)
        : organisers[1].append(organiserElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });
