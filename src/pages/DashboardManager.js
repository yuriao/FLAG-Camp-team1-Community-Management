import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Table, Spin, Tag } from 'antd';
import News from "../components/News";
import ChatDashboard from '../components/ChatDashboard';
import store from '../pages/redux/Store';

class DashboardManager extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            allTicketsContent: [],
            news: [{
                "subject": "n/a",
                "date": "08/05/2020"
            },
            ],
            messages: [{
                "sender": "n/a",
                "message": "n/a",
                "date": "10/01/2020"
            },
            ]
        }
    }

    componentDidMount() {
        fetch("http://localhost:8081/communitymanagement/dashboard/manager",{headers:{"userid":sessionStorage.user_id}})
            .then((res) => res.json())
            .then(
                (data) => {
                    this.setState({ loading: false });
                    let items = data;
                    if (!items || items.length === 0) {
                        alert('No tickets.');
                    } else {
                        this.setState({ allTicketsContent: items });
                        console.log(this.state.allTicketsContent);
                    }

                    let id_dat = [];
                    let status_dat = [];
                    let priority_dat = [];
                    items.map((content) => {
                        id_dat.push(content.id);
                        status_dat.push(content.status);
                        priority_dat.push(content.priority);
                    });
                    sessionStorage.setItem("Manager_ticket_id", id_dat);
                    sessionStorage.setItem("Manager_ticket_status", status_dat);
                    sessionStorage.setItem("Manager_ticket_priority", priority_dat);

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
        let columns = [
            {
                title: 'Ticket ID',
                dataIndex: 'ticket_id',
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
                key: 'priority',
                dataIndex: 'priority',
                render: function (priority) {
                    let color = "";
                    if (priority === 'LOW') {
                        color = 'green';
                    } else if (priority === "HIGH") {
                        color = 'red';
                    } else if (priority === "MEDIUM") {
                        color = 'blue';
                    }
                    return (
                        <Tag color={color} key={priority}>
                            {priority}
                        </Tag>
                    );
                }
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: function (status) {
                    let color = "";
                    if (status === 'OPEN') {
                        color = 'red';
                    } else if (status === "ASSIGNED") {
                        color = 'gold';
                    } else if (status === "COMPLETE") {
                        color = 'green';
                    } else if (status === "INPROGRESS") {
                        color = 'blue';
                    }
                    return (
                        <Tag color={color} key={status}>
                            {status}
                        </Tag>
                    );
                }
            }

        ];

        this.state.allTicketsContent.map((content, i) => {
            if (content.status === "COMPLETE") {
                completedOrder.push({
                    key: i,
                    ticket_id: <a href={'http://localhost:8081/communitymanagement/TicketingDetail?ticket=' + content.id.toString()}>{content.id}</a>,
                    unit: content.unitNumber,
                    subject: content.subject,
                    created: content.created,
                    priority: content.priority,
                    status: content.status,
                    description: content.description,
                    fixDate: content.fixDate,
                })
            } else {
                existingOrder.push({
                    key: i,
                    ticket_id: <a href={'http://localhost:8081/communitymanagement/TicketingDetail?ticket=' + content.id.toString()}>{content.id}</a>,
                    unit: content.unitNumber,
                    subject: content.subject,
                    created: content.created,
                    priority: content.priority,
                    status: content.status,
                    description: content.description,
                    fixDate: content.fixDate,
                })
            }
        });

        const selectCounterValue = state => state.name;
        const currentValue = selectCounterValue(store.getState());

        return (
            <div className="dashboard">
                <Navigation />
                <div className="dashboard-main">

                    <div className="balance">
                        <h2 className="chat-title"> Welcome back {currentValue} </h2>
                        {/* <Button className="center" content="Manage All Payments" /> */}
                        {/* <a href = "/communitymanagement/TicketingManager">
                        */}
                        <div>
                            <a href="/communitymanagement/TicketingManager">
                                <Button className="center" content="Manage All Work Orders" />
                            </a>
                        </div>
                        <div>
                            <a href = "/communitymanagement/Calender">
                                <Button content="View Calendar"></Button>
                            </a> 
                        </div>
                    </div>
                    <div className="chat-dashboard dashboard-item">
                        {/* <h5 className="chat-title">Messages</h5>
                        {messageDivs}
                        <Button className="chat-button" content="Let's Chat"></Button> */}
                    </div>
                    <div className="news dashboard-item">
                        {/* <h5 className="news-title">Community News</h5>
                        {newsDivs}
                        <Button className="chat-button" content="Write a Notice"></Button> */}
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="work-order">
                        <h5>Existing Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> : <Table dataSource={existingOrder} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 160 }} />}
                        {/* <div>
                            <Button content="Assign a Work Order"></Button>
                        </div> */}
                    </div>

                    <div className="work-order work-order-bottom">
                        <h5>Completed Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> : <Table dataSource={completedOrder} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 160 }} />}
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default DashboardManager;