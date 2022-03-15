import {
  getWeatherByLocationEndpoint,
  getIPInfoEndpoint,
  getIPInfo,
  getWeatherInfoFromIP,
  getRegionsForAutocomplete,
  getRegionsForAutocompleteEndpoint,
  getWeatherInfoFromCityAndRegion,
} from "./fetchdata.js";

let deleteButtonEls = document.querySelectorAll(
  ".detail-bar__saved-locations__locations__location__delete-button"
);
const searchEl = document.querySelector(".detail-bar__search__input");
const unitSelectorFahrenheitEl = document.querySelector(
  ".unit-selector__fahrenheit"
);
const saveLocationButtonEl = document.querySelector(
  ".detail-bar__save-locations__header__button"
);
let dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownEl = document.querySelector(".dropdown");
const searchInputEl = document.querySelector(".detail-bar__search__input");
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

retrieveAndDisplayWeatherData();

searchEl.addEventListener("click", (event) => {
  dropdownEl.classList.remove("hidden");
  event.stopPropagation();
});

document.body.addEventListener("click", () => {
  dropdownEl.classList.add("hidden");
});

searchInputEl.addEventListener("keyup", updateAutocompleteOptions);

searchInputEl.addEventListener("click", updateAutocompleteOptions);

saveLocationButtonEl.addEventListener("click", displaySavedLocation);

//FUNCTIONS TO ADD EVENT LISTENERS
function addEventListenersToSavedLocations() {
  let savedLocationEls = document.querySelectorAll(
    ".detail-bar__saved-locations__locations__location__search-button"
  );
  savedLocationEls.forEach((el) => {
    el.addEventListener("click", () => {
      getWeatherInfoFromCityAndRegion(el.innerText)
        .then((res) => res.json())
        .then((data) => {
          displayWeather(data);
        });
    });
  });
}

function addEventListenersToDeleteButtons() {
  deleteButtonEls.forEach((el) => {
    el.addEventListener("click", () => {
      let container = document.getElementById(`container-for-${el.id}`);
      container.remove();
      savedLocations.splice(savedLocations.indexOf(el.id), 1);
    });
  });
}

function addEventListenersToDropdownItems() {
  dropdownItems.forEach((el) => {
    el.addEventListener("click", (event) => {
      searchInputEl.value = "";
      dropdownEl.classList.add("hidden");
      event.stopPropagation();
      getWeatherInfoFromCityAndRegion(el.innerText)
        .then((res) => res.json())
        .then((data) => {
          displayWeather(data);
        });
    });
  });
}

//DISPLAYING FUNCTIONS
function displayAutocompleteOptions(obj, input) {
  while (dropdownEl.firstChild) {
    dropdownEl.removeChild(dropdownEl.lastChild);
  }
  let autocompleteLocations = [];
  for (let i in obj) {
    let location = `${obj[i].name}, ${obj[i].region}`;
    if (
      location.toLowerCase().includes(input) &&
      autocompleteLocations.indexOf(location) === -1 &&
      obj[i].name &&
      obj[i].region
    ) {
      autocompleteLocations.push(location);
    }
  }
  for (let index in autocompleteLocations) {
    let dropdownItem = document.createElement("div");
    dropdownItem.classList.add("dropdown-item");
    dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItem.innerText = autocompleteLocations[index];
    dropdownEl.appendChild(dropdownItem);
  }
}

function displaySavedLocation() {
  let buttonId = currentLocation.replace(/\s/g, "").replace(/,/g, "");
  if (
    !savedLocations.includes(
      currentLocation.replace(/\s/g, "").replace(/,/g, "")
    )
  ) {
    savedLocations.push(currentLocation.replace(/\s/g, "").replace(/,/g, ""));
    let savedLocationEl = document.createElement("div");
    savedLocationEl.classList.add(
      "detail-bar__saved-locations__locations__location"
    );
    savedLocationEl.setAttribute("id", `container-for-${buttonId}`);
    let locationsEl = document.querySelector(
      ".detail-bar__saved-locations__locations"
    );
    savedLocationEl.innerHTML = `
    <aside class="detail-bar__saved-locations__locations__location__search-button">${currentLocation}</aside>
    <button class="detail-bar__saved-locations__locations__location__delete-button" id="${buttonId}">Delete</button>
    `;
    locationsEl.appendChild(savedLocationEl);
    deleteButtonEls = document.querySelectorAll(
      ".detail-bar__saved-locations__locations__location__delete-button"
    );
    addEventListenersToDeleteButtons();
    addEventListenersToSavedLocations();
  }
}

function displayWeather(data) {
  realTempF.innerText = `${data.current.temp_f}°`;
  realTempC.innerText = `${data.current.temp_c}°`;
  cityEl.innerText = data.location.name;
  currentLocation = `${data.location.name}, ${data.location.region}`;
  currentCondition = data.current.condition.text;
  conditionText.innerText = data.current.condition.text;
  conditionIcon.setAttribute("src", data.current.condition.icon);
  realTempC.classList.add("hidden");
  weatherDetailEls.forEach(function (element) {
    let child = document.createElement("span");
    let valueEl = element.querySelector("span");
    if (valueEl.firstChild) {
      valueEl.removeChild(valueEl.firstChild);
    }
    child.innerText = ` ${data.current[`${element.id}`]}`;
    valueEl.appendChild(child);
  });
}

function updateAutocompleteOptions() {
  while (dropdownEl.firstChild) {
    dropdownEl.removeChild(dropdownEl.lastChild);
  }
  if (searchInputEl.value) {
    getRegionsForAutocomplete(searchInputEl.value).then((res) => {
      let input = searchInputEl.value.toLowerCase();
      displayAutocompleteOptions(res, input);
      addEventListenersToDropdownItems();
    });
  }
}

function retrieveAndDisplayWeatherData() {
  getWeatherInfoFromIP()
    .then((res) => res.json())
    .then((data) => {
      displayWeather(data);
    });
}

//CLOCK FUNCTION
function updateTime() {
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
}

let currentLocation;

let savedLocations = [];

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

updateTime();

let currentCondition;
