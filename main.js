import {
  getWeatherByLocationEndpoint,
  getIPInfoEndpoint,
  getIPInfo,
  getWeatherInfo,
} from "./fetchdata.js";

const unitSelectorFahrenheitEl = document.querySelector(
  ".unit-selector__fahrenheit"
);
const weatherDetailEls = document.querySelectorAll(".details__detail");
const unitSelectorCelsiusEl = document.querySelector(".unit-selector__celsius");
const weatherSummaryEl = document.querySelector(".weather-summary");
const realTempF = document.createElement("div");
const realTempC = document.createElement("div");
const cityAndTimeEl = document.createElement("div");
const cityEl = document.createElement("div");
const timeEl = document.createElement("div");
const conditionEl = document.createElement("div");
const conditionText = document.createElement("h1");
const conditionIcon = document.createElement("img");
realTempF.classList.add("weather-summary__realtemp");
realTempC.classList.add("weather-summary__realtemp");
cityAndTimeEl.appendChild(cityEl);
cityAndTimeEl.appendChild(timeEl);
cityEl.classList.add("weather-summary__city-time__city");
timeEl.classList.add("weather-summary__city-time__time");
cityAndTimeEl.classList.add("weather-summary__city-time");
conditionEl.appendChild(conditionIcon);
conditionEl.appendChild(conditionText);
conditionEl.classList.add("weather-summary__condition");
weatherSummaryEl.appendChild(realTempC);
weatherSummaryEl.appendChild(realTempF);
weatherSummaryEl.appendChild(cityAndTimeEl);
weatherSummaryEl.appendChild(conditionEl);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const updateTime = () => {
  setTimeout(function () {
    updateTime();
    let date = new Date();
    let month = months[date.getMonth()];
    let dayOfWeek = days[date.getDay()];
    let dayOfMonth = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = `${hours - 12 > 0 ? hours - 12 : hours}:${("0" + minutes).slice(
      -2
    )} - ${dayOfWeek}, ${month} ${dayOfMonth}`;
    document.querySelector(".weather-summary__city-time__time").innerText =
      time;
  }, 1000);
};

updateTime();

const displayWeather = (data) => {
  realTempF.innerText = `${data.current.temp_f}°`;
  realTempC.innerText = `${data.current.temp_c}°`;
  cityEl.innerText = data.location.name;
  conditionText.innerText = data.current.condition.text;
  conditionIcon.setAttribute("src", data.current.condition.icon);
  realTempC.classList.add("hidden");
  weatherDetailEls.forEach(function (element) {
    let child = document.createElement("span");
    let valueEl = element.querySelector("span");
    console.log(valueEl);
    child.innerText = ` ${data.current[`${element.id}`]}`;
    valueEl.appendChild(child);
  });
};

getWeatherInfo()
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    displayWeather(data);
  });

unitSelectorCelsiusEl.addEventListener("click", function () {
  unitSelectorFahrenheitEl.classList.add("inactive-unit");
  unitSelectorCelsiusEl.classList.remove("inactive-unit");
  realTempF.classList.add("hidden");
  realTempC.classList.remove("hidden");
});

unitSelectorFahrenheitEl.addEventListener("click", function () {
  unitSelectorFahrenheitEl.classList.remove("inactive-unit");
  unitSelectorCelsiusEl.classList.add("inactive-unit");
  realTempC.classList.add("hidden");
  realTempF.classList.remove("hidden");
});
