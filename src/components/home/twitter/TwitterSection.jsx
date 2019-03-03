import React from 'react';
import {TwitterShareButton, TwitterTimelineEmbed} from "react-twitter-embed";
import ImmutablePropTypes from 'react-immutable-proptypes';

const DEFAULT_TWITTER_TEXT = '';

export default function TwitterSection({
  authProvierData,
}) {
  return (
    <div>
      <TwitterTimelineEmbed
        sourceType="profile"
        userId={authProvierData.get('uid')}
        autoHeight={true}
      />
      <TwitterShareButton
        url={process.env.AUTH_DOMAIN}
        options={{
          text: DEFAULT_TWITTER_TEXT
        }}
      />
    </div>
  )
}

TwitterSection.propTypes = {
  authProvierData: ImmutablePropTypes.map.isRequired,
}