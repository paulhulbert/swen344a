import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from './components/home/HomePage';
import CalendarPage from './components/calendar/CalendarPage';
import StocksPage from './components/stocks/StocksPage';
import AuthWrapper from './components/wrappers/AuthWrapper';
import MenuBar from './components/menu/MenuBar';
import {
  INDEX_PAGE_ROUTE,
  CALENDAR_PAGE_ROUTE,
  STOCKS_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
} from './constants/routes';
import './style/app.css';
import LoginPage from './components/login/LoginPage';

export default function App() {
  return (
    <>
      <Router>
        <div className="active-page">
          <MenuBar />
          <Route
            exact
            path={INDEX_PAGE_ROUTE}
            component={AuthWrapper(HomePage)}
          />
          <Route
            path={CALENDAR_PAGE_ROUTE}
            component={AuthWrapper(CalendarPage)}
          />
          <Route
            path={STOCKS_PAGE_ROUTE}
            component={AuthWrapper(StocksPage)}
          />
          <Route
            path={LOGIN_PAGE_ROUTE}
            component={LoginPage}
          />
        </div>
      </Router>
    </>
  );
}
