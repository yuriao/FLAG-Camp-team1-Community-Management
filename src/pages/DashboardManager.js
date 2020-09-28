import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import WorkOrder from '../components/WorkOrder';
import { Table } from 'antd';
import News from "../components/News";
import ChatDashboard from '../components/ChatDashboard';

class DashboardManager extends Component {
    constructor() {
        super();
        this.state = {
            allTicketsTag: ['tk1', 'tk2', 'tk3'],
            allTicketsContent: [{
                "ticket_id": "0001233",
                "unit": '711',
                "subject": "water leak",
                "created": "2020-09-18T14:48:00",
                "category": "water",
                "priority": "high",
                "status": "open",
                "review": <Button className="review-btn" content="view" />
            },
            {
                "ticket_id": "0032134",
                "unit": '711',
                "subject": "bear sleeping on sofa",
                "created": "2020-09-11T14:48:00",
                "category": "misc",
                "priority": "medium",
                "status": "assigned",
                "review": <Button className="review-btn" content="view" />
            },
            {
                "ticket_id": "0123435",
                "unit": '711',
                "subject": "sink clog",
                "created": "2020-09-11T14:48:00",
                "category": "sink",
                "priority": "medium",
                "status": "in progress",
                "review": <Button className="review-btn" content="view" />
            }
            ],
            news: [{
                "subject": "news1",
                "date": "mm/dd/yy"
            },
            {
                "subject": "news2",
                "date": "mm/dd/yy"
            },
            {
                "subject": "news3",
                "date": "mm/dd/yy"
            },
            {
                "subject": "news4",
                "date": "mm/dd/yy"
            },
            {
                "subject": "news5",
                "date": "mm/dd/yy"
            },
            ],
            messages: [{
                "sender": "unit 101",
                "message": "noise complaint",
                "date": "mm/dd/yy"
            },
            {
                "sender": "unit 202",
                "message": "review submitted",
                "date": "mm/dd/yy"
            },
            {
                "sender": "unit 303",
                "message": "package missing",
                "date": "mm/dd/yy"
            },
            {
                "sender": "staff Ben",
                "message": "order completed",
                "date": "mm/dd/yy"
            },]
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

        let newsDivs = [];
        this.state.news.map((subject, i) => {
            newsDivs.push(<News
                subject={this.state.news[i].subject}
                date={this.state.news[i].date}
            />)
        })

        let messageDivs = [];
        this.state.messages.map((date, i) => {
            messageDivs.push(<ChatDashboard
                sender={this.state.messages[i].sender}
                message={this.state.messages[i].message}
                date={this.state.messages[i].date}
            />)
        })

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
        ];


        let completed = [{
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
            title: 'Review',
            dataIndex: 'review',
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
            <div className="dashboard">
                <Navigation />
                <div className="dashboard-main">
                    <div className="balance">
                        <Button className="center" content="Manage All Payments" />
                        <Button className="center" content="Manage All Work Orders" />
                    </div>
                    <div className="chat-dashboard dashboard-item">
                        <h5 className="chat-title">Messages</h5>
                        {messageDivs}
                        <Button className="chat-button" content="Let's Chat"></Button>
                    </div>
                    <div className="news dashboard-item">
                        <h5 className="news-title">Community News</h5>
                        {newsDivs}
                        <Button className="chat-button" content="Write a Notice"></Button>
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="work-order">
                        <h5>Existing Work Orders</h5>
                        <Table scroll={{ y: 500 }} dataSource={datasource} columns={columns} />
                        <div>
                            <Button content="Assign a Work Order"></Button>
                        </div>
                        <div>
                            <Button content="View Calendar"></Button>
                        </div>
                    </div>

                    <div className="work-order">
                        <h5>Completed Work Orders</h5>
                        <Table scroll={{ y: 500 }} dataSource={datasource} columns={completed} />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default DashboardManager;