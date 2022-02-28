import {
  getWeatherByLocationEndpoint,
  getIPInfoEndpoint,
  getIPInfo,
  getWeatherInfo,
} from "./fetchdata.js";

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
  const weatherSummaryEl = document.querySelector(".weather-summary");
  const realTempEl = document.createElement("div");
  const cityAndTimeEl = document.createElement("div");
  const cityEl = document.createElement("div");
  const timeEl = document.createElement("div");
  const conditionEl = document.createElement("div");
  const conditionText = document.createElement("h1");
  const conditionIcon = document.createElement("img");
  realTempEl.classList.add("weather-summary__realtemp");
  cityAndTimeEl.appendChild(cityEl);
  cityAndTimeEl.appendChild(timeEl);
  cityEl.classList.add("weather-summary__city-time__city");
  timeEl.classList.add("weather-summary__city-time__time");
  cityAndTimeEl.classList.add("weather-summary__city-time");
  conditionEl.appendChild(conditionIcon);
  conditionEl.appendChild(conditionText);
  conditionEl.classList.add("weather-summary__condition");
  weatherSummaryEl.appendChild(realTempEl);
  weatherSummaryEl.appendChild(cityAndTimeEl);
  weatherSummaryEl.appendChild(conditionEl);
  realTempEl.innerText = `${data.current.temp_f}°`;
  cityEl.innerText = data.location.name;
  conditionText.innerText = data.current.condition.text;
  conditionIcon.setAttribute("src", data.current.condition.icon);
};

getWeatherInfo()
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    displayWeather(data);
  });
