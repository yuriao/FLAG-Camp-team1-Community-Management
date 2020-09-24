import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import WorkOrder from '../components/WorkOrder';
import Calender from '../pages/Calender';
import Payment from "../components/Payment";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            allTicketsTag: ['tk1','tk2','tk3'], 
            allTicketsContent: [{
                "id": "0001233",
                "unit": "001",
                "category": "sink",
                "description": "water leak",
                "status": "in progress"

            },
            {
                "id": "0001233",
                "unit": "001",
                "category": "sink",
                "description": "water leak",
                "status": "in progress"
            },
            {
                "id": "0001233",
                "unit": "001",
                "category": "sink",
                "description": "water leak",
                "status": "in progress"
            }
            ]
        }
    }
    render() {
        let ticketDivs = [];
        this.state.allTicketsTag.map((cdiv, i) => {
            ticketDivs.push(<WorkOrder
                id={this.state.allTicketsContent[i].id}
                unit={this.state.allTicketsContent[i].unit}
                category={this.state.allTicketsContent[i].category}
                description={this.state.allTicketsContent[i].description}
                status={this.state.allTicketsContent[i].status}
                key={cdiv} 
                id={cdiv}
            />);
        })
        return (
            <div className="dashboard">
                <Navigation />
                <h2>Submitted Work Orders</h2>
                <div className="dashboard-main">
                    {ticketDivs}
                </div>
                <div className="dashboard-main">
                    <Calender />
                    <Payment />
                </div>
                <Button text="submit a new work order" />
                <Footer />
            </div>
        );
    }
}

export default Dashboard;