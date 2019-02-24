import React from 'react';

import { Card, Icon, Image } from 'semantic-ui-react'

export default function WeatherCard({
  weather,
}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{`${weather.get('currentTemp')}° F`}</Card.Header>
        <Card.Meta>{weather.get('location')}</Card.Meta>
        <Card.Description>
          <span>High of {weather.get('highTemp')}</span>
          <br/>
          <span>Low of {weather.get('lowTemp')}</span>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}