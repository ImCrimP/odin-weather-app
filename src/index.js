import APIKey from "./apikey";

let key = APIKey();
console.log(key);

const searchBtn = document.querySelector("#search-btn");
const citySearch = document.querySelector("#city-search");
let city = "";

searchBtn.addEventListener("click", () => {
  city = citySearch.value;
  getCity(city);
});

let temp;

async function getCity(city) {
  const repsonse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`,
    { mode: "cors" }
  );

  const cityData = await repsonse.json();
  console.log(cityData);
  temp = cityData.current.temp_f;
  console.log(temp);
  const maxTemp = cityData.forecast.forecastday[0].day.maxtemp_f;
  console.log(maxTemp);
}

function displayCityInfo(city) {}
