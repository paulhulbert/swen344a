import React, { PureComponent } from 'react';
import {
  Menu,
  Header,
} from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants/colors';
import {
  withRouter,
  Link,
} from 'react-router-dom';
import {
  INDEX_PAGE_ROUTE,
  CALENDAR_PAGE_ROUTE,
  STOCKS_PAGE_ROUTE,
  HISTORY_PAGE_ROUTE,
  TRADE_PAGE_ROUTE
} from '../../constants/routes';
import PropTypes from 'prop-types';
import LogOutButton from '../login/LogOutButton';
import SelfAdaptive from './SelfAdaptive'

class MenuBar extends PureComponent {
  renderMenuItem(name, route) {
    const { pathname } = this.props.location;
    return (
      <Menu.Item
        active={pathname === route}
      >
        <Link
          to={route}
        >
          {name}
        </Link>
      </Menu.Item>
    )
  }

  renderLogOutButton() {
    return (
      <Menu.Item>
        <LogOutButton />
      </Menu.Item>
    )
  }

  renderSelfAdaptiveComponent() {
    return (
        <Menu.Item>
          <SelfAdaptive/>
        </Menu.Item>
    )
  }

  render() {
    return (
      <Menu
        color={PRIMARY_COLOR}
        fixed="top"
        inverted={true}
      >
        {this.renderMenuItem('SÜT', INDEX_PAGE_ROUTE)}
        {this.renderMenuItem('Calendar', CALENDAR_PAGE_ROUTE)}
        {this.renderMenuItem('Stocks', STOCKS_PAGE_ROUTE)}
        {this.renderMenuItem('History', HISTORY_PAGE_ROUTE)}
        {this.renderMenuItem('Trade', TRADE_PAGE_ROUTE)}
        {this.renderSelfAdaptiveComponent()}
        <Menu.Menu
          position='right'
        >
          {this.renderLogOutButton()}
        </Menu.Menu>
      </Menu>
    );
  }
}

MenuBar.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(MenuBar);