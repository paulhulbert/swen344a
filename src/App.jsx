import React, { PureComponent } from 'react'
import HomePage from './components/home/HomePage';
import CalendarPage from './components/calendar/CalendarPage';
import StocksPage from './components/stocks/StocksPage';
import withAuth from './utils/withAuth';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MenuBar from './components/menu/MenuBar';
import { 
  INDEX_PAGE_ROUTE,
  CALENDAR_PAGE_ROUTE,
  STOCKS_PAGE_ROUTE,
} from './constants/routes';
import './style/app.css';
import BottomMenu from './components/menu/BottomMenu';

export default class App extends PureComponent {
  render() {
    return (
      <>
        <Router>
          <div className="active-page">
            <MenuBar />
            <Route
              exact={true}
              path={INDEX_PAGE_ROUTE}
              component={withAuth(HomePage)}
            />
            <Route
              path={CALENDAR_PAGE_ROUTE}
              component={withAuth(CalendarPage)}
            />
            <Route
              path={STOCKS_PAGE_ROUTE}
              component={withAuth(StocksPage)}
            />
            <BottomMenu />
          </div>
        </Router>
      </>
    )
  }
}