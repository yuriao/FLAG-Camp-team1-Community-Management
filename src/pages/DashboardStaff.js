import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import WorkOrder from '../components/WorkOrder';
import { Table, Spin, Tag } from 'antd';
import News from "../components/News";
import ChatDashboard from '../components/ChatDashboard';
import StatusTag from "../components/StatusTag";
import PriorityTag from "../components/PriorityTag";

class DashboardStaff extends Component {
    constructor() {
        super();
        this.state = {
            loading : true,
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

    componentDidMount() {
        fetch("/communitymanagement/dashboard/staff")
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({loading : false});
                    let items = data;
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

        let assignedOrder = [];
        let completedOrder = [];
        let inprogressOrder = [];
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
                } else if (priority === "MEDIUM"){
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
            render: function(status) {
                let color = "";
                if (status ==='OPEN') {
                    color = 'red';
                } else if (status === "ASSIGNED") {
                    color = 'gold';
                } else if (status === "COMPLETE"){
                    color = 'green';
                } else if (status === "INPROGRESS"){
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
                    ticket_id: <a href = "/communitymanagement/TicketingDetail">{content.id}</a>,
                    unit: content.unitNumber,
                    subject: content.subject,
                    created: content.created,
                    priority: content.priority,
                    status: content.status,
                    description: content.description,
                    fixDate: content.fixDate,
                })
            } else if (content.status === "ASSIGNED"){
                assignedOrder.push({
                    key: i,
                    ticket_id: <a href = "/communitymanagement/TicketingDetail">{content.id}</a>,
                    unit: content.unitNumber,
                    subject: content.subject,
                    created: content.created,
                    priority: content.priority,
                    status: content.status,
                    description: content.description,
                    fixDate: content.fixDate,
                })
            } else if (content.status === "INPROGRESS"){
                inprogressOrder.push({
                    key: i,
                    ticket_id: <a href = "/communitymanagement/TicketingDetail">{content.id}</a>,
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
                <Navigation />

                <div className="dashboard-main">
                    <div className="work-order">
                        <h5>Assigned Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{ y: 500 }} dataSource={assignedOrder} columns={columns} />}
                        <div>
                            <a href = "/communitymanagement/TicketingStaff">
                                <Button content="Manage Your Orders"></Button>
                            </a>
                        </div>
                    </div>

                    <div className="work-order work-order-bottom">
                        <h5>Completed Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{ y: 500 }} dataSource={completedOrder} columns={columns} />}
                    </div>
                </div>

                <div className="dashboard-main work-order-bottom">
                    <div className="work-order">
                        <h5> Work Order In Progress</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{ y: 500 }} dataSource={inprogressOrder} columns={columns} />}
                        <div>
                            <a href = "/communitymanagement/Calender">
                                <Button content="View Calendar"></Button>
                            </a>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default DashboardStaff;