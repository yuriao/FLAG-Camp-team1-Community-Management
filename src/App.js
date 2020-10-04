import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import TicketingManager from './pages/TicketingManager'
import TicketingStaff from './pages/TicketingStaff'
import TicketingResident from './pages/TicketingResident'
import Registration from './pages/Registration';
import DashboardResident from './pages/DashboardResident';
import Calender from './pages/Calender';
import Login from './pages/Login';
import DashboardManager from './pages/DashboardManager';
import DashboardStaff from './pages/DashboardStaff';
import TicketingDetail from './pages/TicketingDetail';
import Home from './pages/Home';
import PrivateRouter from './components/PrivateRouter';

function App() {
  return (
    <Router basename={'/communitymanagement'}>
      <Route exact path='/' render={() =>
        <Home />
      } />

      <Route exact path='/TicketingResident' render={() =>
        <TicketingResident />
      } />
      <Route exact path='/TicketingManager' render={() =>
        <TicketingManager />
      } />
      <Route exact path='/TicketingStaff' render={() =>
        <TicketingStaff />
      } />
      <Route exact path='/login' render={() =>

        <Login />
      } />
      <Route exact path='/register' render={() =>
        <Registration />
      } />

      <PrivateRouter component = {DashboardResident} path = '/dashboard/resident'/>
      
      <PrivateRouter component = {DashboardManager} path = '/dashboard/manager'/>
      
      <PrivateRouter component = {DashboardStaff} path = '/dashboard/staff'/>



     <Route exact path='/Calender' render={() =>
        <Calender />
      } />


      {/* <Route exact path='/DashboardResident' render={() =>
        <DashboardResident />
      } />

      <Route exact path='/DashboardManager' render={() =>
        <DashboardManager />
      } />

      <Route exact path='/DashboardStaff' render={() =>
        <DashboardStaff />
      } /> */}

      <Route exact path='/TicketingDetail' render={() =>
        <TicketingDetail />
      } />
    </Router>
  );
}

export default App;
