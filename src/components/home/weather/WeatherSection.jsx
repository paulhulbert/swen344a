import React, { PureComponent } from 'react';
import WeatherCard from './WeatherCard';
import {
  fetchCurrentWeatherForZip,
} from '../../../utils/weather/weatherUtils';
import { Map } from 'immutable';

export default class WeatherSection extends PureComponent {

  constructor() {
    super();
    this.handleUpdateWeather = this.handleUpdateWeather.bind(this);
    this.state = {
      weather: null,
      fetchingWeather: true,
    }
  }

  componentDidMount() {
    fetchCurrentWeatherForZip(14623, this.handleUpdateWeather)
  }

  handleUpdateWeather(weather) {
    this.setState({
      fetchingWeather: false,
      weather,
    });
  }

  render() {
    if (this.state.fetchingWeather || !this.state.weather) {
      return null;
    }
    return (
      <div>
        <WeatherCard
          weather={this.state.weather}
        />
      </div>
    );
  }
}