let rightNow = new Date();
function formattedDate(rightNow) {
  let newMonth = rightNow.getMonth();
  let date = rightNow.getDate();
  let newDay = rightNow.getDay();

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

  return `${day}, ${month} ${date}`;
}

let finalDate = document.querySelector("#current-date");
finalDate.innerHTML = formattedDate(rightNow);

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
let time = document.querySelector("time");
let theTime = new Date();
time.innerHTML = formattedTime(theTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);

function showCityTemp(result) {
  console.log(result.data);

  document.querySelector("#city").innerHTML = result.data.name;
  document.querySelector("h3").innerHTML = Math.round(result.data.main.temp);
  document.querySelector("#H").innerHTML = Math.round(
    result.data.main.temp_max
  );
  document.querySelector("#L").innerHTML = Math.round(
    result.data.main.temp_min
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    result.data.main.feels_like
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
  );
}

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#user-input").value;
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCityTemp);

  console.log(apiUrl);
}
