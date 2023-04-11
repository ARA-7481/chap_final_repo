import React, { Component, Fragment } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './accounts/Login';
import Register from './accounts/Register';
import { Provider } from 'react-redux';
import store from '../store';
import Header from './reusable/Header';
import Unauthorized from './common/Unauthorized';

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);

import { loadUser } from '../actions/auth';
import VehicleDetail from './pages/VehicleDetail';
import Overview from './pages/Overview';
import Logout from './accounts/Logout';
import Landingpage from './pages/Landingpage';

function AppContent() {
  const location = useLocation();

  return (
    <Fragment>
       {location.pathname !== '/' && 
       location.pathname !== '/login' && 
       location.pathname !== '/register' && (
        <Header />
      )}
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Landingpage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/vehicledetail" element={<VehicleDetail />} />
          <Route exact path="/unauthorized" element={<Unauthorized />} />
          <Route exact path="/overview" element={<Overview />} />
        </Routes>
      </div>
    </Fragment>
  );
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppContent />
        </Router>
      </Provider>
    );
  }
}

root.render(<App />);