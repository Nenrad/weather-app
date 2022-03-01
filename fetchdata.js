export const API_KEY = "key=2122d203b2714d18815193819222801";
export const BASE_URL = "http://api.weatherapi.com/v1";
export const CURRENT_WEATHER_METHOD = "/current.json?";
export const IP_LOOKUP_METHOD = "/ip.json?";
export const FORECAST_LOOKUP_METHOD = "/forecast.json?";
export const CONFIG = "&aqi=no&alerts=yes";
export const IP_LOOKUP_ENDPOINT = "https://api.ipify.org/?format=json";

export const getWeatherByLocationEndpoint = (city) => {
  return `${BASE_URL + FORECAST_LOOKUP_METHOD + API_KEY}&q=${city}${CONFIG}`;
};

export const getIPInfoEndpoint = async () => {
  const res = await fetch(IP_LOOKUP_ENDPOINT);
  const data = await res.json();
  return `${BASE_URL + IP_LOOKUP_METHOD + API_KEY}&q=${data.ip}`;
};

export const getIPInfo = async () => {
  const endpoint = await getIPInfoEndpoint();
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const obj = {
        city: data.city,
        region: data.region,
      };
      return obj;
    });
};

export const getWeatherInfo = async () => {
  return await getIPInfo().then((obj) => {
    return fetch(getWeatherByLocationEndpoint(obj.city));
  });
};
