import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { PRIMARY_COLOR } from '../../constants/colors';

export default function HomePageSegment({
  title,
  children,
}) {
  return (
    <Segment.Group
      className="home-segment"
    >
      <Segment
        inverted
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
  children: PropTypes.node.isRequired,
};
