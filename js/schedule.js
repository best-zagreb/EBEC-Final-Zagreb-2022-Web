const scheduleTemplate = document.querySelector("[data-sch-template]");
const scheduleDiv = document.querySelector(".days");
const colorsForActivities = ["#506D84", "#889EAF", "#D4B499", "#F3D5C0"];

fetch("../data/schedule.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((day) => {
      const dayElement = scheduleTemplate.content.cloneNode(true).children[0];

      dayElement.querySelector(".sch__date").textContent = day.date;
      dayElement.querySelector(".sch__dow").textContent = day.dow;
      const dayTitleElement = dayElement.querySelector(".day__title");

      const infoLocationElement = dayElement.querySelector(".day__location");
      const activitiesElement = dayElement.querySelector(".activities");
      //Kartica prije hovera

      for (let i = 0; i < day.title.length; i++) {
        dayTitleElement.textContent = day.title;
      }

      //Kartica nakon hovera
      if (day.location) {
        infoLocationElement.textContent = "Location: " + day.location;
      } else {
        infoLocationElement.style.display = "none";
      }

      let prevNum = -1,
        randNum = -1,
        prevNum1 = -1,
        prevNum2 = -1,
        color1 = -1,
        color2 = -1;

      const activityTemplate = dayElement.querySelector(
        "[data-activity-template]"
      );

      for (let index = 0; index < day.activities.length; index++) {
        const activityElement = activityTemplate.content.cloneNode(true);

        const singleActivityElement =
          activityElement.querySelector(".activity");
        const singleActivityNameElement =
          activityElement.querySelector(".activity_name");
        const singleActivityTimeElement =
          activityElement.querySelector(".activity_time");

        const firstActivityElement =
          activityElement.querySelector(".activity1");
        const firstActivityNameElement =
          activityElement.querySelector(".activity_name1");
        const firstActivityTimeElement =
          activityElement.querySelector(".activity_time1");

        const secondActivityElement =
          activityElement.querySelector(".activity2");
        const secondActivityNameElement =
          activityElement.querySelector(".activity_name2");
        const secondActivityTimeElement =
          activityElement.querySelector(".activity_time2");
        //doubleActivity
        if (day.activities[index].bindNext) {
          do {
            color1 = Math.round(
              Math.random() * (colorsForActivities.length - 1)
            );
            color2 = Math.round(
              Math.random() * (colorsForActivities.length - 1)
            );
          } while (
            color1 == prevNum ||
            color2 == prevNum ||
            color1 == prevNum1 ||
            color2 == prevNum2 ||
            color1 == color2
          );
          prevNum = -1;
          prevNum1 = color1;
          prevNum2 = color2;
          firstActivityElement.style.background = colorsForActivities[color1];
          secondActivityElement.style.background = colorsForActivities[color2];

          if (color1 == 2 || color1 == 3) {
            firstActivityNameElement.style.color = "black";
            firstActivityTimeElement.style.color = "rgba(0,0,0,0.75)";
          } else {
            firstActivityNameElement.style.color = "white";
            firstActivityTimeElement.style.color = "rgba(255,255,255,0.75)";
          }
          if (color2 == 2 || color2 == 3) {
            secondActivityNameElement.style.color = "black";
            secondActivityTimeElement.style.color = "rgba(0,0,0,0.75)";
          } else {
            secondActivityNameElement.style.color = "white";
            secondActivityTimeElement.style.color = "rgba(255,255,255,0.75)";
          }

          singleActivityElement.style.display = "none";
          firstActivityNameElement.textContent =
            day.activities[index].activityName;
          firstActivityTimeElement.textContent =
            day.activities[index].startTime +
            " - " +
            day.activities[index].endTime;
          index++;
          secondActivityNameElement.textContent =
            day.activities[index].activityName;
          secondActivityTimeElement.textContent =
            day.activities[index].startTime +
            " - " +
            day.activities[index].endTime;
        }
        //singleActivity
        else {
          firstActivityElement.style.display = "none";
          secondActivityElement.style.display = "none";
          do {
            randNum = Math.round(
              Math.random() * (colorsForActivities.length - 1)
            );
          } while (
            randNum == prevNum ||
            randNum == color1 ||
            randNum == color2
          );
          prevNum = randNum;

          singleActivityElement.style.background = colorsForActivities[randNum];
          if (randNum == 2 || randNum == 3) {
            singleActivityNameElement.style.color = "black";
            singleActivityTimeElement.style.color = "rgba(0,0,0,0.75)";
          } else {
            singleActivityNameElement.style.color = "white";
            singleActivityTimeElement.style.color = "rgba(255,255,255,0.75)";
          }
          singleActivityNameElement.textContent =
            day.activities[index].activityName;
          singleActivityTimeElement.textContent =
            day.activities[index].startTime +
            " - " +
            day.activities[index].endTime;
        }

        activitiesElement.append(activityElement);
      }

      scheduleDiv.append(dayElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });
