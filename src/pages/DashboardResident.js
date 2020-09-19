import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import WorkOrder from '../components/WorkOrder';
import Calender from '../pages/Calender';
import Payment from "../components/Payment";

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <Navigation />
                <h2>Submitted Work Orders</h2>
                <div className = "dashboard-main">
                    <WorkOrder title="washer" progress="completed" />
                    <WorkOrder title="washer" progress="completed" />
                    <WorkOrder title="washer" progress="completed" />
                </div>
                <div className = "dashboard-main">
                    <Calender />
                    <Payment />
                </div>
                <Button text ="submit a new work order"/>
                <Footer />
            </div>
        );
    }
}

export default Dashboard;