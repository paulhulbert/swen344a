import React from 'react';

import { Card, List, Header, Icon } from 'semantic-ui-react'

function getWeatherIconName(weatherMainDescription) {
  switch (weatherMainDescription) {
    case 'Thunderstorm':
      return 'lightning';
    case 'Drizzle':
      return 'cloud-drizzle';
    case 'Rain':
      return 'umbrella';
    case 'Snow':
      return 'snowflake';
    case 'Clouds':
      return 'cloud';
    case 'Clear':
      return 'sun';
    default:
      return 'question circle';
  }
}

function renderTodayWeatherIcon(weatherDescription) {
  const weatherMainDescription = weatherDescription.get('mainDescription');
  return (
    <Header as='h4' icon={true} className="today-weather-icon">
      <Icon name={getWeatherIconName(weatherMainDescription)} />
      {weatherDescription.get('detailedDescription') || weatherMainDescription}
    </Header>
  )
}

function renderDailyHighAndLow(high, low) {
  return (
    <List
      horizontal={true}
    >
      <List.Item>
        <Header
          sub={true}
        >
          {`${high}°`}
        </Header>
      </List.Item>
      <List.Item>
        <Header
          color='grey'
          sub={true}
        >
          {`${low}°`}
        </Header>
      </List.Item>
    </List>
  )
}

function renderTodayWeather(weather, dayLabel) {
  const currentTemp = weather.get('currentTemp');
  return (
    <div className="today-weather">
      <Header
        as="h1"
      >
        {dayLabel}
        <Header.Subheader>
          {`${currentTemp}° F`}
        </Header.Subheader>
      </Header>
      {renderTodayWeatherIcon(weather.get('weatherDescription'))}
      <Header
        as="h4"
        className="city-label"
      >
        {weather.get('location')}
      </Header>
      {renderDailyHighAndLow(weather.get('highTemp'), weather.get('lowTemp'))}
    </div>
  )
}

function renderCardHeader(dayLabel, weatherMainDescription) {
  return (
    <List
      horizontal={true}
      relaxed={true}
    >
      <List.Item>
        {dayLabel}
      </List.Item>
      <List.Item>
        <Icon name={getWeatherIconName(weatherMainDescription)} />
      </List.Item>
    </List>
  )
}

export default function WeatherCard({
  weather,
  dayLabel,
  isToday,
}) {
  if (isToday) {
    return renderTodayWeather(weather, dayLabel);
  }
  const weatherDescription = weather.get('weatherDescription');
  const weatherMainDescription = weatherDescription.get('mainDescription');
  return (
    <Card
      fluid={true}
    >
      <Card.Content>
        <Card.Header>
          {renderCardHeader(dayLabel, weatherMainDescription)}
        </Card.Header>
        <Card.Meta>{weatherDescription.get('detailedDescription') || weatherMainDescription}</Card.Meta>
        <Card.Description>
          {renderDailyHighAndLow(weather.get('highTemp'), weather.get('lowTemp'))}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}