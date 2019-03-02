import React from 'react';
import WeatherSection from './weather/WeatherSection'
import '../../style/home/homepage.css'
import { HomePageSegment } from './HomePageSegment';
import { Grid, Container } from 'semantic-ui-react';
import Twitter from "./Twitter";

export default function HomePage({
 providerData,
}) {
  return (
    <Container>
      <Grid
        columns={3}
        stretched={true}
      >
        <Grid.Column>
          <HomePageSegment
            title="Twitter"
          >
            <Twitter
                providerData={providerData}
            />
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