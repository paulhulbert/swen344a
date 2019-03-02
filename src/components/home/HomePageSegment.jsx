import React from 'react';
import { PRIMARY_COLOR } from '../../constants/colors';
import { Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';

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

HomePageSegment.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}