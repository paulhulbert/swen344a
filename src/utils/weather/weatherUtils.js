import { fromJS } from 'immutable';

// API Docs: https://openweathermap.org/api
const WEATHER_API_KEY = '08e5475b6a4cf6a8daaec9f44e76575f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const DEFAULT_ZIP = 14623 //Henrietta, NY

function processWeatherForProps(weather) {
  const dailyTemperatures = weather.get('main');
  return fromJS({
    currentTemp: Math.round(dailyTemperatures.get('temp')),
    highTemp: Math.round(dailyTemperatures.get('temp_max')),
    lowTemp: Math.round(dailyTemperatures.get('temp_min')),
    location: weather.get('name'),
  });
}

export function fetchCurrentWeatherForZip(zip = DEFAULT_ZIP, callback) {
  fetch(`${BASE_URL}/weather?zip=${zip},us&appid=${WEATHER_API_KEY}&units=imperial`)
    .then(response => response.json())
    .then(fromJS)
    .then(processWeatherForProps)
    .then(callback);
}

function threeHourToDaily(threeHourForecast) {
  return threeHourForecast;
}

export function fetchForecastForZip(zip = DEFAULT_ZIP, callback) {
  fetch(`${BASE_URL}/forecast/?zip=${zip},us&appid=${WEATHER_API_KEY}&units=imperial`)
    .then(response => response.json())
    .then(fromJS)
    .then(threeHourToDaily)
    .then(callback);
}