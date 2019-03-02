import { fromJS, Map, List } from 'immutable';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/formats';
import firebase from 'firebase/app';
import 'firebase/database';
import { WEATHER_CACHE_LENGTH_MINS } from '../../constants/weatherConstants';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
  console.warn('No weather API key detected');
}

// API Docs: https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const DEFAULT_ZIP = 14623 //Henrietta, NY

function getForecastPath(zip, date) {
  return `forecast/${zip}/${date}`;
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

function forecastToMap(forecast, ignoreCurrentTemp, city, date) {
  const dailyTemperatures = forecast.get('main');
  return fromJS({
    currentTemp: ignoreCurrentTemp ? null : Math.round(dailyTemperatures.get('temp')),
    highTemp: Math.round(dailyTemperatures.get('temp_max')),
    lowTemp: Math.round(dailyTemperatures.get('temp_min')),
    location: city ? city : forecast.get('name'),
    date: date ? date : moment().format(DATE_FORMAT),
    weatherDescription: {
      mainDescription: forecast.get('weather').first().get('main'),
      detailedDescription: capitalizeWord(forecast.get('weather').first().get('description')),
    },
  });
}

function fetchCurrentWeatherForZip(zip = DEFAULT_ZIP, callback) {
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

function fetchFutureForecastForZip(zip = DEFAULT_ZIP, callback) {
  fetch(`${BASE_URL}/forecast/?zip=${zip},us&appid=${WEATHER_API_KEY}&units=imperial`)
    .then(response => response.json())
    .then(fromJS)
    .then(threeHourToDaily)
    .then(callback);
}

function fetchFullFiveDayForecastForZip(todayDate, zip = DEFAULT_ZIP, callback) {
  fetchCurrentWeatherForZip(zip, (currentWeather) => {
    let fullForecast = List([currentWeather]);
    fetchFutureForecastForZip(zip, (futureForecast) => {
      fullForecast = fullForecast.concat(futureForecast);
      // cache forecast for future use, and to avoid overloading API
      writeForecast(todayDate, zip, fullForecast)
      callback(fullForecast);
    })
  });
}

export function getFullForecastForZip(zip = DEFAULT_ZIP, callback) {
  const todayDate = moment().format(DATE_FORMAT);
  fetchCachedForecast(todayDate, zip, callback);
}

function fetchCachedForecast(todayDate, zip, callback) {
  return firebase.database().ref(getForecastPath(zip, todayDate)).once('value').then((response) => {
    const dayForecast = fromJS(response.val());
    if (!dayForecast || moment() > dayForecast.get('expireMillis')) {
      return fetchFullFiveDayForecastForZip(todayDate, zip, callback);
    }
    callback(dayForecast.get('forecast'));
  });
}

function writeForecast(date, zip, fullForecast) {
  const fetchMoment = moment();
  const expireMoment = fetchMoment.add(WEATHER_CACHE_LENGTH_MINS, 'minutes');
  firebase.database().ref(getForecastPath(zip, date)).set({
    forecast: fullForecast.toJS(),
    fetchMillis: fetchMoment.valueOf(),
    expireMillis: expireMoment.valueOf(), 
  });
}