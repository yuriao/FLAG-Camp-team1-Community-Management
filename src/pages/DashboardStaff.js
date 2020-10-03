import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import WorkOrder from '../components/WorkOrder';
import { Table } from 'antd';
import News from "../components/News";
import ChatDashboard from '../components/ChatDashboard';
import StatusTag from "../components/StatusTag";
import PriorityTag from "../components/PriorityTag";

class DashboardStaff extends Component {
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
                    <div className="work-order">
                        <h5>Assigned Work Orders</h5>
                        <Table scroll={{ y: 500 }} dataSource={datasource} columns={columns} />
                        <div>
                            <Button content="Manage Your Orders"></Button>
                        </div>
                    </div>



                    <div className="work-order">
                        <h5>Completed Work Orders</h5>
                        <Table scroll={{ y: 500 }} dataSource={datasource} columns={completed} />
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="work-order">
                        <h5> Work Order In Progress</h5>
                        <Table scroll={{ y: 500 }} dataSource={datasource} columns={columns} />
                        <div>
                            <Button content="View Calendar"></Button>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default DashboardStaff;