import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Table, Spin, Tag } from 'antd';
import News from "../components/News";
import ChatDashboard from '../components/ChatDashboard';
import store from '../pages/redux/Store';

class DashboardStaff extends Component {
    constructor() {
        super();
        this.state = {
            loading : true,
            allTicketsContent: [],
            messages: [{
                "sender": "manager",
                "message": "a work order was assigned to you",
                "date": "10/01/2020"
            },
            {
                "sender": "unit 202",
                "message": "review submitted",
                "date": "09/23/2020"
            },
            {
                "sender": "manager",
                "message": "a work order was assigned to you",
                "date": "09/03/2020"
            },
            {
                "sender": "unit 202",
                "message": "review submitted",
                "date": "08/20/2020"
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

                    let id_dat=[];
                    let status_dat=[];
                    let priority_dat=[];
                    items.map((content)=>{
                        id_dat.push(content.id);
                        status_dat.push(content.status);
                        priority_dat.push(content.priority);
                    });
                    sessionStorage.setItem("Staff_ticket_id",id_dat);
                    sessionStorage.setItem("Staff_ticket_status",status_dat);
                    sessionStorage.setItem("Staff_ticket_priority",priority_dat);

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
                    ticket_id: <a href={'/communitymanagement/TicketingDetail?ticket='+content.id.toString()}>{content.id}</a>,
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
                    ticket_id: <a href={'/communitymanagement/TicketingDetail?ticket='+content.id.toString()}>{content.id}</a>,
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
                    ticket_id: <a href={'/communitymanagement/TicketingDetail?ticket='+content.id.toString()}>{content.id}</a>,
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
                    <div className = "staff-welcome">
                        {/* <Button className="center" content="Manage All Payments" /> */}
                        <h2>Welcome back {currentValue} </h2>
                        <a href = "/communitymanagement/TicketingStaff">
                            <Button content="Manage Your Orders"></Button>
                        </a>
                    </div>
                    
                    <div className="work-order work-order-bottom">
                        <h5>Assigned Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{ y: 500 }} dataSource={assignedOrder} columns={columns} />}
                        {/* <div>
                            <a href = "/communitymanagement/TicketingStaff">
                                <Button content="Manage Your Orders"></Button>
                            </a>
                        </div> */}

                    </div>

                </div>

                <div className="dashboard-main">
                    <div className="work-order">
                        <h5> Work Order In Progress</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{ y: 500 }} dataSource={inprogressOrder} columns={columns} />}
                        {/* <div>
                            <a href = "/communitymanagement/Calender">
                                <Button content="View Calendar"></Button>
                            </a>
                        </div> */}
                    </div>
                    <div className="work-order work-order-bottom">
                        <h5>Completed Work Orders</h5>
                        {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{ y: 500 }} dataSource={completedOrder} columns={columns} />}
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default DashboardStaff;