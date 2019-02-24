import { fromJS, Map, List } from 'immutable';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/formats';

// API Docs: https://openweathermap.org/api
const WEATHER_API_KEY = '08e5475b6a4cf6a8daaec9f44e76575f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const DEFAULT_ZIP = 14623 //Henrietta, NY

function forecastToMap(forecast, ignoreCurrentTemp, city, date) {
  const dailyTemperatures = forecast.get('main');
  return fromJS({
    currentTemp: ignoreCurrentTemp ? null : Math.round(dailyTemperatures.get('temp')),
    highTemp: Math.round(dailyTemperatures.get('temp_max')),
    lowTemp: Math.round(dailyTemperatures.get('temp_min')),
    location: city ? city : forecast.get('name'),
    date: date ? date : moment().format(DATE_FORMAT),
  });
}

export function fetchCurrentWeatherForZip(zip = DEFAULT_ZIP, callback) {
  fetch(`${BASE_URL}/weather?zip=${zip},us&appid=${WEATHER_API_KEY}&units=imperial`)
    .then(response => response.json())
    .then(fromJS)
    .then(forecastToMap)
    .then(callback);
}

function threeHourToDaily(threeHourForecast) {
  return threeHourForecast.get('list').reduce((resultingForecast, forecast) => {
    const forecastDateTime = moment(forecast.get('dt_txt'), 'YYYY-MM-DD HH:mm:ss');
    if (forecastDateTime.date() === moment().date()) {
      return resultingForecast;
    }
    const forecastKey = forecastDateTime.format(DATE_FORMAT);
    const threeHourWeather = forecastToMap(forecast, true, threeHourForecast.getIn(['city', 'name']), forecastKey);
    const existingDayWeather = resultingForecast.get(forecastKey);
    if (!existingDayWeather) {
      return resultingForecast.set(forecastKey, threeHourWeather);
    }
    let updatedDayWeather = existingDayWeather;
    const threeHourLow = threeHourWeather.get('lowTemp');
    const threeHourHigh = threeHourWeather.get('highTemp');
    if (threeHourLow < existingDayWeather.get('lowTemp')) {
      updatedDayWeather.set('lowTemp', threeHourLow);
    }
    if (threeHourHigh > existingDayWeather.get('highTemp')) {
      updatedDayWeather.set('highTemp', threeHourHigh);
    }
    return resultingForecast.set(forecastKey, updatedDayWeather);
  }, Map()).toList();
}

export function fetchForecastForZip(zip = DEFAULT_ZIP, callback) {
  fetch(`${BASE_URL}/forecast/?zip=${zip},us&appid=${WEATHER_API_KEY}&units=imperial`)
    .then(response => response.json())
    .then(fromJS)
    .then(threeHourToDaily)
    .then(callback);
}

export function fetchFullFiveDayForecastForZip(zip = DEFAULT_ZIP, callback) {
  fetchCurrentWeatherForZip(zip, (currentWeather) => {
    const fiveDayForecast = List([currentWeather]);
    fetchForecastForZip(zip, (futureForecast) => {
      callback(fiveDayForecast.concat(futureForecast));
    })
  });
}