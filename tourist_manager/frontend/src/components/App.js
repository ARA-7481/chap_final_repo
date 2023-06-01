import React, { Component, Fragment } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './accounts/Login';
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
import Dashboard from './pages/Dashboard';
import Dailyqueue from './pages/Dailyqueue';
import Statistics from './pages/Statistics';
import Datacard from './pages/Datacard';
import AdminDashboard from './pages/AdminDashboard';
import { ViewportProvider } from './reusable/sizeAdjust';
import Quickstats from './pages/quickstats';
import QuickstatParent from './pages/QuickstatParent';
import Reporting from './pages/Reporting';
import DailyquequePrintPreview from './pages/DailyquequePrintPreview';

function AppContent() {
  const location = useLocation();
  return ( 
    <Fragment>
      
       {
       location.pathname !== '/login' && 
       location.pathname !== '/dashboard' && 
       location.pathname !== '/quickstats' && 
       location.pathname !== '/admindashboard' && 
       location.pathname !== '/register' &&
       location.pathname !== '/report' &&
       location.pathname !== '/dailyprint' &&
       location.pathname !== '/vehicledetail' &&
       location.pathname !== '/' && (
        <Header />
      )}
      
        <Routes>
          <Route exact path="/" element={<Landingpage />} />
          <Route exact path="/login" element={<Landingpage />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/vehicledetail" element={<VehicleDetail />} />
          <Route exact path="/unauthorized" element={<Unauthorized />} />
          <Route exact path="/overview" element={<Overview />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/daily" element={<Dailyqueue />} />
          <Route exact path="/statistics" element={<Statistics />} />
          <Route exact path="/datacard" element={<Datacard />} />
          <Route exact path="/admindashboard" element={<AdminDashboard />} />
          <Route exact path="/quickstats" element={<QuickstatParent />} />
          <Route exact path="/report" element={<Reporting />} />
          <Route exact path="/dailyprint" element={<DailyquequePrintPreview />} />
        </Routes>
      
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