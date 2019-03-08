import React from 'react';
import { Menu } from 'semantic-ui-react';
import { SECONDARY_COLOR } from '../../constants/colors';

export default function BottomMenu() {
  return (
    <Menu
      color={SECONDARY_COLOR}
      fixed="bottom"
      inverted
    />
  );
}
