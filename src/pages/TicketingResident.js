import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Blank from '../components/Blank';
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import { Table, Input, Dropdown } from 'antd';

class TicketingResident extends Component {
    constructor() {
        super();
        this.state = {
            allTicketsTag: ['tk1', 'tk2', 'tk3', 'tk4'],
            allTicketsContent: [{
                "ticket_id": "0001233",
                "unit": '711',
                "subject": "water leak",
                "created": "2020-09-18T14:48:00",
                "category": "water",
                "priority": "high",
                "status": "open",
                "review": <Button className="ticket-history-btn" content="comment" />
            },
            {
                "ticket_id": "0032134",
                "unit": '711',
                "subject": "bear sleeping on sofa",
                "created": "2020-09-11T14:48:00",
                "category": "misc",
                "priority": "medium",
                "status": "assigned",
                "review": <Button className="ticket-history-btn" content="comment" />
            },
            {
                "ticket_id": "0123435",
                "unit": '711',
                "subject": "sink clog",
                "created": "2020-09-11T14:48:00",
                "category": "sink",
                "priority": "medium",
                "status": "completed",
                "review": <Button className="ticket-history-btn" content="review" />
            },
            {
                "ticket_id": "0001394218",
                "unit": '900',
                "subject": "kitchen",
                "created": "2020-09-18T14:48:00",
                "category": "water",
                "priority": "high",
                "status": "completed",
                "review": <Button className="ticket-history-btn" content="review" />
            },
            ],
        }
    }
    render() {
        const { TextArea } = Input;
        const location = ["--None--", "Balcony/Patio", "Dining Room", "Elevator", "Exterior",
            "Hallway", "Kitchen", "Laundry Room", "Living Room", "Master Bathroom",
            "Master Bedroom", "Other Bathroom", "Other Bedroom", "Stairs", "Unit Wide", "Utility Closet"];
        const category = ["--None--", "Appliance", "Electrical", "Exterior", "HVAC", "Interior",
            "Locks/Keys", "Plumbing"];
        const contact = ["--None--", "phone", "email"];

        let datasource = [];
        let columns = [{
            title: 'Ticket ID',
            dataIndex: 'ticket_id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
        ];

        this.state.allTicketsTag.map((cdiv, i) => {
            datasource.push({
                key: i,
                ticket_id: <a href=''>{this.state.allTicketsContent[i].ticket_id}</a>,
                unit: this.state.allTicketsContent[i].unit,
                subject: this.state.allTicketsContent[i].subject,
                created: this.state.allTicketsContent[i].created,
                category: this.state.allTicketsContent[i].category,
                priority: this.state.allTicketsContent[i].priority,
                status: this.state.allTicketsContent[i].status,
                review: this.state.allTicketsContent[i].review,
            })
        });

        return (
            <div className="ticketing-resident">
                <Navigation />
                <div className="main">
                    <div className = "dashboard-main">
                        <h2> SUBMIT A WORK ORDER </h2>
                        <h5>Contact Info</h5>
                        <Blank text="Home" />
                        <Blank text="First Name" />
                        <Blank text="Last Name" />
                        <Blank text="Email" />
                        <Blank text="Phone" />
                        <DropDown elements={contact} description="Preferred Contact Method" />
                        <h5 className = "ticketing-subtitle" >Issue Description</h5>
                        <DropDown elements={location} description="Location" />
                        <DropDown elements={category} description="Category" />
                        <p>Description</p>
                        <TextArea rows={4} />
                        <div className="buttons">
                            <Button className="ticket-btn" content="submit" />
                            <Button className="ticket-btn" content="cancel" />
                        </div>
                    </div>
                    <div className = "dashboard-main">
                        <div className="work-order maintenance-history">
                            <h5>Maintenance History</h5>
                            <Table dataSource={datasource} columns={columns} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default TicketingResident;