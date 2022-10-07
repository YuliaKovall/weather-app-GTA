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
setInterval(updateDateTime, 0);

// adds a day to forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

// adds an image to forecast
function getImage(conditionsID) {
  console.log(conditionsID);
  if (conditionsID == 800) {
    return "src/sun.png";
  }
  if (conditionsID == 801 || conditionsID == 802) {
    return "src/few-clouds.png";
  }
  if (conditionsID == 803 || conditionsID == 804) {
    return "src/cloud.png";
  }
  if (conditionsID >= 500 && conditionsID <= 531) {
    return "src/rain.png";
  }
  if (conditionsID >= 200 && conditionsID <= 232) {
    return "src/thunderstorm.png";
  }
  if (conditionsID >= 300 && conditionsID <= 321) {
    return "src/fog.png";
  }
  if (conditionsID >= 701 && conditionsID <= 741) {
    return "src/fog.png";
  }
  if (conditionsID >= 600 && conditionsID <= 622) {
    return "src/snow.png";
  }
}
// displays forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = '<div class = "row">';
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col weather-days">
    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
    <img src="${getImage(forecastDay.weather[0].id)}" width="40px"> <br>
    <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}</span>°/
    <span class="forecast-temp-max">${Math.round(forecastDay.temp.min)}</span>°
    </div>
`;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// shows current temperature in the city from search
function showCurrentWeather(response, event) {
  console.log(response);
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
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  celciusTemp = Math.round(response.data.main.temp);
  if (response.data.weather[0].id == 800) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/sun.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your sunglasses";
  }
  if (
    response.data.weather[0].id == 801 ||
    response.data.weather[0].id == 802
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/few-clouds.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your sunscreen";
  }
  if (
    response.data.weather[0].id == 803 ||
    response.data.weather[0].id == 804
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/cloud.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your jacket";
  }
  if (
    response.data.weather[0].id >= 500 &&
    response.data.weather[0].id <= 531
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/rain.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your umbrella";
  }
  if (
    response.data.weather[0].id >= 200 &&
    response.data.weather[0].id <= 232
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/thunderstorm.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your umbrella";
  }
  if (
    response.data.weather[0].id >= 300 &&
    response.data.weather[0].id <= 321
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/fog.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Be careful on the road";
  }
  if (
    response.data.weather[0].id >= 701 &&
    response.data.weather[0].id <= 741
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/fog.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Be careful on the road";
  }
  if (
    response.data.weather[0].id >= 600 &&
    response.data.weather[0].id <= 622
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/snow.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML = "Keep warm";
  }
  getForecast(response.data.coord);
}
function getSearchCity(city) {
  let apiKey = "1e3dbdc7f40fe05d77910ebef7bfd128";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputted-city");
  getSearchCity(cityInputElement.value);
}
let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);
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
  celciusTemp = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  if (response.data.weather[0].id == 800) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/sun.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your sunglasses";
  }
  if (
    response.data.weather[0].id == 801 ||
    response.data.weather[0].id == 802
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/few-clouds.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your sunscreen";
  }
  if (
    response.data.weather[0].id == 803 ||
    response.data.weather[0].id == 804
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/cloud.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your jacket";
  }
  if (
    response.data.weather[0].id >= 500 &&
    response.data.weather[0].id <= 531
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/rain.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your umbrella";
  }
  if (
    response.data.weather[0].id >= 200 &&
    response.data.weather[0].id <= 232
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/thunderstorm.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Don't forget your umbrella";
  }
  if (
    response.data.weather[0].id >= 300 &&
    response.data.weather[0].id <= 321
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/fog.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Be careful on the road";
  }
  if (
    response.data.weather[0].id >= 701 &&
    response.data.weather[0].id <= 741
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/fog.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML =
      "Be careful on the road";
  }
  if (
    response.data.weather[0].id >= 600 &&
    response.data.weather[0].id <= 622
  ) {
    document.querySelector("#weather-icon-main").innerHTML =
      '<img src="src/snow.png" width="60px">';
    document.querySelector("#note-for-today").innerHTML = "Keep warm";
  }
}

function retrievePosition(position) {
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let urlForGeo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
  axios.get(urlForGeo).then(displayForecast);
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let geoButton = document.querySelector("#currentLocationIcon");
geoButton.addEventListener("click", getPosition);

// change degrees

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#converting-value");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#converting-value");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let csDegree = document.querySelector("#degrees-celsius");
csDegree.addEventListener("click", displayCelciusTemperature);

let frDegree = document.querySelector("#degrees-fahrenheit");
frDegree.addEventListener("click", displayFarenheitTemperature);

getSearchCity("kyiv");
