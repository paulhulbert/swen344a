import React, { PureComponent } from 'react';
import WeatherCard from './WeatherCard';
import {
  getFullForecastForZip,
} from '../../../utils/weather/weatherUtils';
import { List } from 'immutable';
import moment from 'moment';
import { DATE_FORMAT } from '../../../constants/formats';
import '../../../style/home/weather.css';

export default class WeatherSection extends PureComponent {

  constructor() {
    super();
    this.state = {
      weather: List(),
      fetchingWeather: true,
    }
    this.handleUpdateWeather = this.handleUpdateWeather.bind(this);
    this.renderWeatherItem = this.renderWeatherItem.bind(this);
  }

  componentDidMount() {
    getFullForecastForZip(14623, this.handleUpdateWeather);
  }

  handleUpdateWeather(weather) {
    this.setState({
      fetchingWeather: false,
      weather,
    });
  }

  renderWeatherItem(weather, index) {
    const dayLabel = moment(weather.get('date', DATE_FORMAT)).format('ddd');
    return (
      <div key={dayLabel}>
        <WeatherCard
          isToday={index === 0}
          dayLabel={dayLabel}
          weather={weather}
        />
      </div>
    );
  }

  render() {
    if (this.state.fetchingWeather) {
      return null;
    }
    return this.state.weather.map(this.renderWeatherItem);
  }
}