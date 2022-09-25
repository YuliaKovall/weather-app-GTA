// shows current day and time
function updateDateTime() {
  let now = new Date();
  let h2 = document.querySelector("h2");

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = weekDays[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  h2.innerHTML = currentDay + ", " + hours + ":" + minutes;
}
updateDateTime();

// change degrees
function temperatureConverter(event) {
  event.preventDefault();
  let fahrenheit = (19 * 9) / 5 + 32;
  let currentDegrees = document.querySelector("#converting-value");
  currentDegrees.innerHTML = fahrenheit;
}
let frDegree = document.querySelector("#degrees-fahrenheit");
frDegree.addEventListener("click", temperatureConverter);

function temperatureConverter2(event) {
  event.preventDefault();
  let celsius = 19;
  let currentDegrees = document.querySelector("#converting-value");
  currentDegrees.innerHTML = celsius;
}
let csDegree = document.querySelector("#degrees-celsius");
csDegree.addEventListener("click", temperatureConverter2);

// shows current temperature in the city from search
function showCurrentWeather(response, event) {
  console.log(response);
  let h1 = document.querySelector("h1");
  let currentDegrees = document.querySelector("#converting-value");
  let temperature = Math.round(response.data.main.temp);
  let conditions = document.querySelector("#cur-cond");
  let tempFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity-now");
  let pressure = document.querySelector("#pressure-now");
  let tempHigherToday = Math.round(response.data.main.temp_max);
  let highestTempToday = document.querySelector("#highest-today");
  let tempLowerToday = Math.round(response.data.main.temp_min);
  let lowestTempToday = document.querySelector("#lowest-today");

  h1.innerHTML = response.data.name.toUpperCase();
  currentDegrees.innerHTML = temperature;
  // conditions.innerHTML = response.data.weather[0].main;
  feelsLike.innerHTML = tempFeelsLike;
  windSpeed.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  pressure.innerHTML = response.data.main.pressure;
  highestTempToday.innerHTML = tempHigherToday;
  lowestTempToday.innerHTML = tempLowerToday;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function getSearchCity(event) {
  event.preventDefault();

  let apiKey = "1e3dbdc7f40fe05d77910ebef7bfd128";
  let citySearch = document.querySelector("#inputted-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", getSearchCity, updateDateTime);
// shows temperature in current location
function showWeather(response) {
  let h1 = document.querySelector("h1");
  let currentDegrees = document.querySelector("#converting-value");
  let temperature = Math.round(response.data.main.temp);
  let tempFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity-now");
  let pressure = document.querySelector("#pressure-now");
  let tempHigherToday = Math.round(response.data.main.temp_max);
  let highestTempToday = document.querySelector("#highest-today");
  let tempLowerToday = Math.round(response.data.main.temp_min);
  let lowestTempToday = document.querySelector("#lowest-today");
  h1.innerHTML = response.data.name.toUpperCase();
  currentDegrees.innerHTML = temperature;
  feelsLike.innerHTML = tempFeelsLike;
  windSpeed.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  pressure.innerHTML = response.data.main.pressure;
  highestTempToday.innerHTML = tempHigherToday;
  lowestTempToday.innerHTML = tempLowerToday;
}

function retrievePosition(position) {
  let apiKey = "1e3dbdc7f40fe05d77910ebef7bfd128";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let geoButton = document.querySelector("#currentLocationIcon");
geoButton.addEventListener("click", getPosition);
