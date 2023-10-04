import APIKey from "./apikey";

let key = APIKey();
console.log(key);

getCity("london");

async function getCity(city) {
  const repsonse = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`,
    { mode: "cors" }
  );
  repsonse.json().then(function (repsonse) {
    console.log(repsonse);
  });
}
