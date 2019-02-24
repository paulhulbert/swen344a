import React from 'react';
import WeatherSection from './weather/WeatherSection'
import '../../style/home/homepage.css'
import { HomePageSegment } from './HomePageSegment';
import { Grid, Container } from 'semantic-ui-react';

export default function HomePage() {
  return (
    <Container>
      <Grid columns={3}>
        <Grid.Column>
          <HomePageSegment
            title="Twitter"
          >
          </HomePageSegment>
        </Grid.Column>
        <Grid.Column>
          <HomePageSegment
            title="Weather"
          >
            <WeatherSection />
          </HomePageSegment>
        </Grid.Column>
          <Grid.Column>
            <HomePageSegment
              title="Stocks"
            >
            </HomePageSegment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}