import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import WorkOrder from '../components/WorkOrder';
import { Table } from 'antd';
import News from "../components/News";
import ChatDashboard from '../components/ChatDashboard';
import ajax from '../components/AJAX';
import StatusTag from "../components/StatusTag";
import PriorityTag from "../components/PriorityTag";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            allTicketsContent: [],
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
                "sender": "manager",
                "message": "your work order completed",
                "date": "mm/dd/yy"
            },
            {
                "sender": "manager",
                "message": "your work order completed",
                "date": "mm/dd/yy"
            },
            {
                "sender": "manager",
                "message": "your work order completed",
                "date": "mm/dd/yy"
            },
            {
                "sender": "manager",
                "message": "your work order completed",
                "date": "mm/dd/yy"
            },]
        }
    }


    componentDidMount() {
        fetch("/communitymanagement/dashboard/resident")
            .then(res => res.json())
            .then(
                (res) => {
                    let items = res;
                    if (!items || items.length === 0) {
                        alert('No tickets.');
                    } else {
                        this.setState({ allTicketsContent: items });
                        console.log(this.state.allTicketsContent);
                    }

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //   this.setState({
                    //     isLoaded: true,
                    //     error
                    //   });
                }
            )
    }

    render() {

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

        let existingOrder = [];
        let completedOrder = [];
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
            title: 'Description',
            dataIndex: 'description',
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

        this.state.allTicketsContent.map((content, i) => {
            if (content.status === "COMPLETED") {
                completedOrder.push({
                    key: i,
                    ticket_id: <a href=''>{content.id}</a>,
                    unit: content.unitNumber,
                    subject: content.subject,
                    created: content.created,
                    priority: <PriorityTag priority={content.priority} />,
                    status: <StatusTag status={content.status} />,
                    description: content.description,
                    fixDate: content.fixDate,
                })
            } else {
                existingOrder.push({
                    key: i,
                    ticket_id: <a href=''>{content.id}</a>,
                    unit: content.unitNumber,
                    subject: content.subject,
                    created: content.created,
                    priority: <PriorityTag priority={content.priority} />,
                    status: <StatusTag status={content.status} />,
                    description: content.description,
                    fixDate: content.fixDate,
                })
            }
        });

        return (
            <div className="dashboard">
                <Navigation
                    dashboard="/DashboardResident"
                    ticket="/TicketingResident"
                    chat="/ChatResident"
                    logout="/logout"
                />
                <div className="dashboard-main">
                    <div className="balance">
                        <div>Balance Due:</div>
                        <h1>$0.00</h1>
                        <Button className="center" content="Make a Payment" />
                        <Button className="center" content="Submit a Work Order" />
                    </div>
                    <div className="chat-dashboard dashboard-item">
                        <h5 className="chat-title">Messages</h5>
                        {messageDivs}
                        <Button className="chat-button" content="Let's Chat"></Button>
                    </div>
                    <div className="news dashboard-item">
                        <h5 className="news-title">Community News</h5>
                        {newsDivs}
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="work-order">
                        <h5>Existing Work Orders</h5>
                        <Table scroll={{ y: 500 }} dataSource={existingOrder} columns={columns} />
                        <Button content="View Calendar"></Button>
                    </div>

                    <div className="work-order">
                        <h5>Completed Work Orders</h5>
                        <Table scroll={{ y: 500 }} dataSource={completedOrder} columns={columns} />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default Dashboard;