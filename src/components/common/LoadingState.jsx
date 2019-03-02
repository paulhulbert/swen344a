import React from 'react';
import {
  Loader,
} from 'semantic-ui-react';

export default function LoadingState() {
  return (
    <Loader inverted={true}>
      Loading
    </Loader>
  );
}