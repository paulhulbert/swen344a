import React, { PureComponent } from 'react';
import {
  Menu,
  Header,
  Dropdown,
} from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants/colors';
import {
  withRouter,
  Link,
} from 'react-router-dom';
import {
  INDEX_PAGE_ROUTE,
  CALENDAR_PAGE_ROUTE,
  STOCK_CHARTS_ROUTE,
  HISTORY_PAGE_ROUTE,
  TRADE_STOCKS_ROUTE,
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
        <Dropdown item text='Stocks'>
          <Dropdown.Menu>
            <Link to={TRADE_STOCKS_ROUTE} style={{ color: 'black' }}>
              <Dropdown.Item>
                <span style={{ color: 'black' }}>
                  Trade Stocks
                </span>
              </Dropdown.Item>
            </Link>
            <Link to={STOCK_CHARTS_ROUTE}>
              <Dropdown.Item>
                <span style={{ color: 'black' }}>
                  Stock Charts
                </span>
              </Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
        {this.renderMenuItem('History', HISTORY_PAGE_ROUTE)}
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