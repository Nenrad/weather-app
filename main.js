import {
  getWeatherByLocationEndpoint,
  getIPInfoEndpoint,
  getIPInfo,
  getWeatherInfo,
} from "./fetchdata.js";

const updateTime = () => {
  setTimeout(function () {
    updateTime();
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = `${hours - 12 > 0 ? hours - 12 : hours}:${("0" + minutes).slice(
      -2
    )}:${("0" + seconds).slice(-2)}`;
    document.querySelector(".container__clock").innerText = time;
  }, 1000);
};

updateTime();

const displayWeather = (data) => {
  const weatherEl = document.querySelector(".container__weather");
  const cityEl = document.createElement("div");
  cityEl.classList.add("weather__city");
  cityEl.innerText = `${data.location.name}, ${data.location.region}`;
  weatherEl.appendChild(cityEl);
  const tempEl = document.createElement("div");
  tempEl.classList.add("weather__temp");
  tempEl.innerText = `${data.current.temp_f}°F`;
  weatherEl.appendChild(tempEl);
  weatherEl.appendChild(forecastEl);
};

getWeatherInfo()
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    displayWeather(data);
  });
