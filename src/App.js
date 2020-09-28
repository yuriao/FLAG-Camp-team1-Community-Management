import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TicketingManager from './pages/TicketingManager'
import TicketingStaff from './pages/TicketingStaff'
import TicketingResident from './pages/TicketingResident'

import DashboardResident from './pages/DashboardResident';
import Calender from './pages/Calender';
import Login from './pages/Login';
import DashboardManager from './pages/DashboardManager';
import DashboardStaff from './pages/DashboardStaff';

function App() {
  return (
    <Router basename={'/'}>
      <Route exact path='/' render={() =>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
          </a>
          </header>
        </div>
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
        <Login/>
      }/>

      <Route exact path='/Calender' render={() =>
        <Calender/>
      }/>


      {/* <Route exact path='/register' render={() =>
        <RegistrationForm />
      } /> */}

      <Route exact path='/DashboardResident' render={() =>
        <DashboardResident />
      } />

      <Route exact path='/DashboardManager' render={() =>
        <DashboardManager />
      } />

      <Route exact path='/DashboardStaff' render={() =>
        <DashboardStaff />
      } />
    </Router>
  );
}

export default App;
