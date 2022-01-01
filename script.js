function showDate() {

  let h2 = document.querySelector("h2");

  let timeDate = new Date();
  let days = ["Sun","Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[timeDate.getDay()];
  let hour = timeDate.getHours();
  let minutes = timeDate.getMinutes().toString().padStart(2, "0");
    
  h2.innerHTML = `${day} ${hour}:${minutes}`;
}

showDate();

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "ef1f6e14d39c4aa8875abd79b5398d89";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showTemperature(response) {
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let showCityTemp = document.querySelector("#current-temp");
  showCityTemp.innerHTML = `${temperature}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${response.data.weather[0].description}`;
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let humidity = document.querySelector("#humidity-value");
  let windspeed = document.querySelector("#windspeed-value");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  windspeed.innerHTML = `${response.data.wind.speed} km/h`;
  celciusTemperature = response.data.main.temp;
}  

function showPositionTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ef1f6e14d39c4aa8875abd79b5398d89&units=metric`;
  axios.get(apiEndPoint).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionTemp);
}
  let button = document.querySelector("#btn-location");
  button.addEventListener("click", getPosition);


function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit)

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius)

let celciusTemperature = null;

function showHumidityandWindspeed(response) {
  let humidity = document.querySelector("#humidity-value");
  let windspeed = document.querySelector("#windspeed-value");


}
