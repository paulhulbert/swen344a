import React from 'react';
import '../../style/home/Twitter.css'
import {TwitterShareButton, TwitterTimelineEmbed} from "react-twitter-embed";

export default function Twitter({
    providerData,
}) {
    return (
        <div
            className="twitter-panel"
        >
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName={providerData[0].displayName}
                options={{height: 400}}
            />
            <TwitterShareButton
                url={'https://web-engineering-spring-2019.firebaseapp.com/'}
                options={{ text: '' }}
            />
        </div>

    )
}