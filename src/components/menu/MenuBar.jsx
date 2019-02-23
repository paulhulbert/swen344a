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
} from '../../constants/routes';

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
      </Menu>
    );
  }
}

export default withRouter(MenuBar);