import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Table, Spin, Tag } from 'antd';
import News from "../components/News";
import ChatDashboard from '../components/ChatDashboard';
import store from '../pages/redux/Store';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            allTicketsContent: [],
            news: [{
                "subject": "Fitness Center COVID-19 Update",
                "date": "08/05/2020"
            },
            {
                "subject": "New Amenity Guidelines",
                "date": "07/24/2020"
            },
            {
                "subject": "4th of July Holiday",
                "date": "07/03/2020"
            },
            {
                "subject": "Rooftop Lounge and BBQ Grill Now Open!",
                "date": "06/04/2020"
            },
            {
                "subject": "Farewell from the manager",
                "date": "05/10/2020"
            },
            ],
            messages: [{
                "sender": "manager",
                "message": "your work order completed",
                "date": "10/01/2020"
            },
            {
                "sender": "manager",
                "message": "your work order completed",
                "date": "07/05/2020"
            },
            {
                "sender": "manager",
                "message": "your work order completed",
                "date": "06/09/2020"
            },
            {
                "sender": "manager",
                "message": "your work order completed",
                "date": "06/05/2020"
            },]
        }
    }


    componentDidMount() {
        fetch("/communitymanagement/dashboard/resident")
            .then((res) => res.json()) 
            .then(
                (data) => {
                    this.setState({ loading: false });
                    let items = data;
                    if (!items || items.length === 0) {
                        alert('No tickets.');
                    } else { // if there are tickets
                        this.setState({ allTicketsContent: items });
                        console.log(this.state.allTicketsContent);
                    }

                    let id_dat=[];
                    let status_dat=[];
                    let priority_dat=[];
                    items.map((content)=>{
                        id_dat.push(content.id);
                        status_dat.push(content.status);
                        priority_dat.push(content.priority);
                    });
                    sessionStorage.setItem("Resident_ticket_id",id_dat);
                    sessionStorage.setItem("Resident_ticket_status",status_dat);
                    sessionStorage.setItem("Resident_ticket_priority",priority_dat);

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

        let columns = [{
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


        const selectCounterValue = state => state.name;
        const currentValue = selectCounterValue(store.getState());
        // console.log("first name: "+currentValue);
        let completedOrder = [];
        let existingOrder = [];

        this.state.allTicketsContent.map((content, i) => {
            if (content.status === "COMPLETE") {
                completedOrder.push({
                    key: i,
                    ticket_id: <a href={'/communitymanagement/TicketingDetail?ticket=' + content.id.toString()}>{content.id}</a>,
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
                    ticket_id: <a href={'/communitymanagement/TicketingDetail?ticket=' + content.id.toString()}>{content.id}</a>,
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

        return (
            <div className="dashboard">
                <Navigation/>
                <div className="dashboard-main">
                    <div className="balance">
                        {/* <div>Balance Due:</div>
                        <h1>$0.00</h1>
                        <Button className="center" content="Make a Payment" /> */}
                        <h2>Welcome back {currentValue} </h2>
                        <div>
                            <a href="/communitymanagement/TicketingResident">
                                <Button className="center" content="Submit a Work Order" />
                            </a>
                        </div>
                        <div>
                            <a href="/communitymanagement/Calender">
                                <Button content="View Calendar"></Button>
                            </a>
                        </div>
                    </div>
                    <div className="chat-dashboard dashboard-item">
                        <h5 className="chat-title">Messages</h5>
                        {messageDivs}
                        {/* <a href="/communitymanagement/Chat">
                            <Button className="chat-button" content="Let's Chat"></Button>
                        </a> */}
                    </div>
                    <div className="news dashboard-item">
                        <h5 className="news-title">Community News</h5>
                        {newsDivs}
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="work-order">
                        <h5>Existing Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> : <Table scroll={{ y: 500 }} dataSource={existingOrder} columns={columns} />}
                        
                    </div>

                    <div className="work-order work-order-bottom">
                        <h5>Completed Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> : <Table scroll={{ y: 500 }} dataSource={completedOrder} columns={columns} />}
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default Dashboard;