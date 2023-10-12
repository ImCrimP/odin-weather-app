import APIKey from "./apikey";
import { format } from "date-fns";

let key = APIKey();

let cityData;

let tempFer = true;

let tempConvertBtn = document.querySelector("#f-c-change");
let ferDisplay = document.querySelector("#fer");
let celDisplay = document.querySelector("#cel");

const degreeDispley = document.querySelector("#temp");
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
    const tempF = `${cityData.current.temp_f}°F`;
    const tempC = `${cityData.current.temp_c}°C`;
    const dayLowF = `Low: ${cityData.forecast.forecastday[0].day.mintemp_f}°F`;
    const dayLowC = `Low: ${cityData.forecast.forecastday[0].day.mintemp_c}°C`;
    const dayHighF = `High: ${cityData.forecast.forecastday[0].day.maxtemp_f}°F`;
    const dayHighC = `High: ${cityData.forecast.forecastday[0].day.maxtemp_c}°C`;
    if (tempFer) {
      degreeDispley.textContent = tempF;
      dayLowDisplay.textContent = dayLowF;
      dayHighDisplay.textContent = dayHighF;
    } else {
      degreeDispley.textContent = tempC;
      dayLowDisplay.textContent = dayLowC;
      dayHighDisplay.textContent = dayHighC;
    }
  }
});

const searchBtn = document.querySelector("#search-btn");
const citySearch = document.querySelector("#city-search");
let city = "";

searchBtn.addEventListener("click", () => {
  city = citySearch.value;
  getCity(city);
});

let temp;

async function getCity(city) {
  //try {
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
    degreeDispley.textContent = tempF;
    dayLowDisplay.textContent = dayLowF;
    dayHighDisplay.textContent = dayHighF;
  } else {
    degreeDispley.textContent = tempC;
    dayLowDisplay.textContent = dayLowC;
    dayHighDisplay.textContent = dayHighC;
  }

  console.log(cityData);
  temp = cityData.current.temp_f;
  console.log(temp);
  const maxTemp = cityData.forecast.forecastday[0].day.maxtemp_f;
  console.log(maxTemp);
  // } //catch {
  //alert("Enter a valid city name.");
  //}
}

function tempChangeBtn(cityData) {
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

  if (cityData != undefined || cityData != null) {
    const tempF = `${cityData.current.temp_f}°F`;
    const tempC = `${cityData.current.temp_c}°C`;
    if (tempFer) {
      degreeDispley.textContent = tempF;
    } else {
      degreeDispley.textContent = tempC;
    }
  }
}

function displayCityInfo(city) {}
