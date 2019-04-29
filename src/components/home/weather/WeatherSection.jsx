import React, { PureComponent } from 'react';
import WeatherCard from './WeatherCard';
import {
  getFullForecastForZip,
} from '../../../utils/weather/weatherUtils';
import { List } from 'immutable';
import moment from 'moment';
import { DATE_FORMAT } from '../../../constants/formats';
import '../../../style/home/weather.css';
import LoadingState from '../../common/LoadingState';
import firebase from 'firebase';
import 'firebase/database';

export default class WeatherSection extends PureComponent {

  constructor() {
    super();
    this.state = {
      weather: List(),
      fetchingWeather: true,
      zipCode: 14623,
    }
    this.handleUpdateWeather = this.handleUpdateWeather.bind(this);
    this.renderWeatherItem = this.renderWeatherItem.bind(this);
    this.handleUpdateZipCodeInput = this.handleUpdateZipCodeInput.bind(this);
    this.writeZipCode = this.writeZipCode.bind(this);
  }

  componentDidMount() {
    firebase.database().ref("userZipCode/" + firebase.auth().currentUser.uid).once('value').then((response) => {
      this.setState({
        zipCode: response.val() ? response.val().zipCode : 14623,
      })
    });

    getFullForecastForZip(this.state.zipCode, this.handleUpdateWeather);
  }

  handleUpdateZipCodeInput(event) {
    const zipCode = event.target.value;
    this.setState({
      zipCode,
    })
  }

  writeZipCode() {
    firebase.database().ref("userZipCode/" + firebase.auth().currentUser.uid).set({
      zipCode: this.state.zipCode,
    });
    this.setState({
      fetchingWeather: true,
    })
    getFullForecastForZip(this.state.zipCode, this.handleUpdateWeather);
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
      return <LoadingState />;
    }
    return (<div>
      <div>
        <input value={this.state.zipCode} onChange={this.handleUpdateZipCodeInput}/>
        <button id="form-button-control-public" onClick={this.writeZipCode}>Submit</button>
      </div>
      {this.state.weather.map(this.renderWeatherItem)}
    </div>)
  }
}