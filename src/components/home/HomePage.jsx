import React from 'react';
import WeatherSection from './weather/WeatherSection'
import '../../style/home/homepage.css'
import { HomePageSegment } from './HomePageSegment';
import { Grid, Container } from 'semantic-ui-react';
import TwitterSection from "./twitter/TwitterSection";
import ImmutablePropTypes from 'react-immutable-proptypes';

export default function HomePage({
  authProvierData,
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
            <TwitterSection
              authProvierData={authProvierData}
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

HomePage.propTypes = {
  authProvierData: ImmutablePropTypes.map.isRequired,
}