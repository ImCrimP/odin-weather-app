import APIKey from "./apikey";
import { format, isSameHour, getHours, parseISO } from "date-fns";

let key = APIKey();

let cityData;

let tempFer = true;

let tempConvertBtn = document.querySelector("#f-c-change");
let ferDisplay = document.querySelector("#fer");
let celDisplay = document.querySelector("#cel");

const degreeDisplay = document.querySelector("#temp");
const dayLowDisplay = document.querySelector("#low");
const dayHighDisplay = document.querySelector("#high");

tempConvertBtn.addEventListener("click", () => {
  console.log("temp button clicked");
  if (tempFer) {
    tempFer = false;
    celDisplay.style.fontWeight = "600";
    ferDisplay.style.fontWeight = "400";
  } else {
    tempFer = true;
    celDisplay.style.fontWeight = "400";
    ferDisplay.style.fontWeight = "600";
  }

  if (cityData != undefined && cityData != null) {
    tempChangeBtn();
  }
});

const searchBtn = document.querySelector("#search-btn");
const citySearch = document.querySelector("#city-search");
let city = "";
let tempCity = "chicago";
getCity(tempCity);

searchBtn.addEventListener("click", () => {
  city = citySearch.value;
  getCity(city);
});

citySearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault();
    city = citySearch.value;
    getCity(city);
  }
});

let temp;

async function getCity(city) {
  try {
    const repsonse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`,
      { mode: "cors" }
    );

    cityData = await repsonse.json();

    const cityName = document.querySelector("#city-name");
    let cityCountryDisplay = `${cityData.location.name}, ${cityData.location.country}`;
    cityName.textContent = cityCountryDisplay;

    const timeDisplay = document.querySelector("#city-time");
    const time = cityData.location.localtime;
    const formatDate = format(new Date(time), "ccc MMM dd, yyyy | p");

    timeDisplay.textContent = formatDate;

    tempChangeBtn();

    console.log(cityData);
    temp = cityData.current.temp_f;
    console.log(temp);
    const maxTemp = cityData.forecast.forecastday[0].day.maxtemp_f;
    console.log(maxTemp);
  } catch {
    alert("Enter a valid city name.");
  }
}

function tempChangeBtn() {
  console.log(cityData);
  const tempF = `${cityData.current.temp_f}°F`;
  const tempC = `${cityData.current.temp_c}°C`;

  const conditionDisplay = document.querySelector("#condition");

  conditionDisplay.textContent = cityData.current.condition.text;
  const currentConditionImg = document.querySelector("#currentImg");
  currentConditionImg.src = cityData.current.condition.icon;
  currentConditionImg.alt = `${cityData.current.condition.text} image`;

  const dayLowF = `Low: ${cityData.forecast.forecastday[0].day.mintemp_f}°F`;
  const dayLowC = `Low: ${cityData.forecast.forecastday[0].day.mintemp_c}°C`;
  const dayHighF = `High: ${cityData.forecast.forecastday[0].day.maxtemp_f}°F`;
  const dayHighC = `High: ${cityData.forecast.forecastday[0].day.maxtemp_c}°C`;

  if (tempFer) {
    degreeDisplay.textContent = tempF;
    dayLowDisplay.textContent = dayLowF;
    dayHighDisplay.textContent = dayHighF;
  } else {
    degreeDisplay.textContent = tempC;
    dayLowDisplay.textContent = dayLowC;
    dayHighDisplay.textContent = dayHighC;
  }
  const currentTime = new Date(cityData.location.localtime);

  let timeStart;

  for (let i = 0; i < 24; i++) {
    let timeStamp = new Date(cityData.forecast.forecastday[0].hour[i].time);

    console.log(isSameHour(currentTime, timeStamp));
    if (isSameHour(currentTime, timeStamp)) {
      console.log(timeStamp);

      let timeStart = getHours(timeStamp);
      console.log(timeStart);

      let timeRestart = 0;
      for (let j = 0; j < 24; j++) {
        console.log("hour", timeStart);
        let timeDisplayDay = document.querySelector(`#time${j}`);
        let degreeDisplayDay = document.querySelector(`#degree${j}`);
        let iconDisplay = document.querySelector(`#logo${j}`);
        let conditionText = document.querySelector(`#condition-text${j}`);

        if (timeStart <= 23) {
          if (timeStart < 12) {
            let timePlaceholder = timeStart;
            if (timeStart == 0) {
              timePlaceholder = 12;
            }
            timeDisplayDay.textContent = `${timePlaceholder}AM`;
          } else {
            let timePlaceholder = timeStart;
            if (timeStart == 12) {
              timePlaceholder = 24;
            }
            timeDisplayDay.textContent = `${timePlaceholder - 12}PM`;
          }

          if (tempFer) {
            degreeDisplayDay.textContent = `${cityData.forecast.forecastday[0].hour[timeStart].temp_f}°F`;
          } else {
            degreeDisplayDay.textContent = `${cityData.forecast.forecastday[0].hour[timeStart].temp_c}°C`;
          }

          iconDisplay.src =
            cityData.forecast.forecastday[0].hour[timeStart].condition.icon;
          iconDisplay.alt =
            cityData.forecast.forecastday[0].hour[timeStart].condition.text;

          conditionText.textContent =
            cityData.forecast.forecastday[0].hour[timeStart].condition.text;
          console.log(conditionText.textContent);
        }

        if (timeStart > 23) {
          if (timeRestart < 12) {
            let restartPlaceholder = timeRestart;
            if (timeRestart == 0) {
              restartPlaceholder = 12;
            }
            timeDisplayDay.textContent = `${restartPlaceholder}AM`;
          } else {
            let restartPlaceholder = timeRestart;
            if (timeRestart == 12) {
              restartPlaceholder = 24;
            }
            timeDisplayDay.textContent = `${restartPlaceholder - 12}PM`;
          }

          if (tempFer) {
            degreeDisplayDay.textContent = `${cityData.forecast.forecastday[1].hour[timeRestart].temp_f}°F`;
          } else {
            degreeDisplayDay.textContent = `${cityData.forecast.forecastday[1].hour[timeRestart].temp_c}°C`;
          }

          iconDisplay.src =
            cityData.forecast.forecastday[1].hour[timeRestart].condition.icon;
          iconDisplay.alt =
            cityData.forecast.forecastday[1].hour[timeRestart].condition.text;

          conditionText.textContent =
            cityData.forecast.forecastday[1].hour[timeRestart].condition.text;
          console.log(conditionText.textContent);
          timeRestart++;
        }

        timeStart++;
      }

      const dayOneName = document.querySelector("#day1");
      const dayTwoName = document.querySelector("#day2");

      const dayOneIcon = document.querySelector("#icon1");
      const dayTwoIcon = document.querySelector("#icon2");

      const dayOneText = document.querySelector("#condition-text-day1");
      const dayTwoText = document.querySelector("#condition-text-day2");

      const dayOneLow = document.querySelector("#low-1");
      const dayTwoLow = document.querySelector("#low-2");

      const dayOneHigh = document.querySelector("#high-1");
      const dayTwoHigh = document.querySelector("#high-2");

      let dayDate = parseISO(cityData.forecast.forecastday[1].date);
      console.log(dayDate);

      //let fixedDate = dayDate.addDays(new Date(dayDate), 1);

      const formatDayOne = format(new Date(dayDate), "ccc");
      console.log(formatDayOne);

      dayOneName.textContent = formatDayOne;
      dayOneIcon.src = cityData.forecast.forecastday[1].day.condition.icon;
      dayOneIcon.alt = cityData.forecast.forecastday[1].day.condition.text;
      dayOneText.textContent =
        cityData.forecast.forecastday[1].day.condition.text;

      if (tempFer) {
        dayOneLow.textContent = `${cityData.forecast.forecastday[1].day.mintemp_f}°F`;
        dayOneHigh.textContent = `${cityData.forecast.forecastday[1].day.maxtemp_f}°F`;
      } else {
        dayOneLow.textContent = `${cityData.forecast.forecastday[1].day.mintemp_c}°C`;
        dayOneHigh.textContent = `${cityData.forecast.forecastday[1].day.maxtemp_c}°C`;
      }
      let dayDate2 = parseISO(cityData.forecast.forecastday[2].date);

      //let fixedDate2 = dayDate2.addDays(new Date(dayDate2), 1);

      const formateDayTwo = format(new Date(dayDate2), "ccc");
      console.log(formateDayTwo);

      dayTwoName.textContent = formateDayTwo;
      dayTwoIcon.src = cityData.forecast.forecastday[2].day.condition.icon;
      dayTwoIcon.alt = cityData.forecast.forecastday[2].day.condition.text;
      dayTwoText.textContent =
        cityData.forecast.forecastday[2].day.condition.text;

      if (tempFer) {
        dayTwoLow.textContent = `${cityData.forecast.forecastday[2].day.mintemp_f}°F`;
        dayTwoHigh.textContent = `${cityData.forecast.forecastday[2].day.maxtemp_f}°F`;
      } else {
        dayTwoLow.textContent = `${cityData.forecast.forecastday[2].day.mintemp_c}°C`;
        dayTwoHigh.textContent = `${cityData.forecast.forecastday[2].day.maxtemp_c}°C`;
      }
    }
  }
}
