// Date //

function formattedDate() {
  let rightNow = new Date();
  let newMonth = rightNow.getMonth();
  let date = rightNow.getDate();
  let newDay = rightNow.getDay();
  let year = rightNow.getFullYear();

  let months = [
    "Janurary",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[newMonth];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[newDay];

  return `${day} ${month} ${date}, ${year}`;
}

let finalDate = document.querySelector("#current-date");
finalDate.innerHTML = formattedDate();

// Time //

function formattedTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let time = document.querySelector("#time");
let theTime = new Date();
time.innerHTML = formattedTime(theTime);

// Search City //

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#user-input").value;
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCityTemp);

  console.log(apiUrl);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);

//Define getForecast Funcation//
function getForecast(coord) {
  console.log(coord);
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// Display Current Temperature //

function showCityTemp(result) {
  console.log(result.data);
  fahrenheitTemperature = result.data.main.temp;

  document.querySelector("#city").innerHTML = result.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#H").innerHTML = Math.round(
    result.data.main.temp_max
  );
  document.querySelector("#L").innerHTML = Math.round(
    result.data.main.temp_min
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    result.data.main.feels_like
  );

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(result.data.main.feels_like);

  let description = document.querySelector("#description");
  description.innerHTML = result.data.weather[0].description;

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = result.data.wind.speed;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
  );

  getForecast(result.data.coord);
}

// C/F //

function showCelcius(event) {
  event.preventDefault();

  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;

  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = Math.round(celciusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

// Formatting Forecast Days //

function formatForecast(date) {
  let newDate = new Date(date * 1000);
  let day = newDate.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

// 6 day forcast / /

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">${formatForecast(
          forecastDay.dt
        )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fahrenheitTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
displayForecast();
