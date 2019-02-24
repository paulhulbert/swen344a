import React, { PureComponent } from 'react';
import WeatherCard from './WeatherCard';
import {
  fetchFullFiveDayForecastForZip,
} from '../../../utils/weather/weatherUtils';
import { List } from 'immutable';
import moment from 'moment';
import { DATE_FORMAT } from '../../../constants/formats';
import { Segment } from 'semantic-ui-react';
import '../../../style/home/weather.css';
import { PRIMARY_COLOR } from '../../../constants/colors';

export default class WeatherSegment extends PureComponent {

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
    fetchFullFiveDayForecastForZip(14623, this.handleUpdateWeather);
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
    return (
      <Segment.Group className="weather-segment">
        <Segment
          inverted={true}
          color={PRIMARY_COLOR}
          textAlign="center"
        >
          Weather
        </Segment>
        <Segment>
          {this.state.weather.map(this.renderWeatherItem)}
        </Segment>
      </Segment.Group>
    );
  }
}