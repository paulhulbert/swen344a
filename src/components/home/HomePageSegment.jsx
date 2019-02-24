import React from 'react';
import { PRIMARY_COLOR } from '../../constants/colors';
import { Segment } from 'semantic-ui-react'

export function HomePageSegment({
  title,
  children,
}) {
  return (
    <Segment.Group
      className="home-segment"
    >
      <Segment
        inverted={true}
        color={PRIMARY_COLOR}
        textAlign="center"
      >
        {title}
      </Segment>
      <Segment>
        {children}
      </Segment>
    </Segment.Group>
  );
}