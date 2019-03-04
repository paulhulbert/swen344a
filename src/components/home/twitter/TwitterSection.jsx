import React from 'react';
import {
  TwitterShareButton,
  TwitterTimelineEmbed,
} from "react-twitter-embed";
import { Grid } from 'semantic-ui-react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DEFAULT_TWITTER_TEXT = '';

export default function TwitterSection({
  authProviderData,
}) {
  return (
    <Grid
      centered={true}
      columns={1}
      stretched={true}
      padded="vertically"
    >
      <Grid.Row>
        <TwitterTimelineEmbed
          sourceType="profile"
          userId={authProviderData.get('uid')}
          options={{
            height: 530,
          }}
        />
      </Grid.Row>
      <Grid.Row>
        <TwitterShareButton
          url={process.env.AUTH_DOMAIN}
          options={{
            text: DEFAULT_TWITTER_TEXT
          }}
        />
      </Grid.Row>
    </Grid>
  )
}

TwitterSection.propTypes = {
  authProviderData: ImmutablePropTypes.map.isRequired,
}