import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Table} from 'antd';
import {Button} from 'antd';

class TicketingStaff extends Component {
    constructor(){
        super();
        this.state = {
            allTicketsTag: ['tk1','tk2','tk3'],    // set initial state with one div
            allTicketsContent: [{
                "ticket_id":"0001233",
                "unit": '711',
                "subject": "water leak",
                "created": "2020-09-18T14:48:00",
                "category": "water",
                "priority": "high"
            },
            {
                "ticket_id":"0032134",
                "unit": '711',
                "subject": "bear sleeping on sofa",
                "created": "2020-09-11T14:48:00",
                "category": "misc",
                "priority": "medium"                
            },
            {
                "ticket_id":"0123435",
                "unit": '711',
                "subject": "sink clog",
                "created": "2020-09-11T14:48:00",
                "category": "sink",
                "priority": "medium"                
            }
        ]
         }
    }
    // the point is, we only display 7 days on page, so only need 7 arrays. for exact days info, will pass from db and will add checking codes later
    // if need props, use this.props to access

    refershTickets(){
        let cDivs = this.state.allTicketsTag;
        //fetchAPI to get all tickets
        cDivs.push('tk')
        this.setState({customDiv: cDivs })
      }

    render() {
        let datasource=[];
        let columns=[{
            title: 'Ticket ID',
            dataIndex: 'ticket_id',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'Unit',
            dataIndex: 'unit',
          },
          {
            title: 'Subject',
            dataIndex: 'subject',
          },
          {
            title: 'Submitted time',
            dataIndex: 'created',
            sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created),
            sortDirections: ['descend', 'ascend'],
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
            title: 'To Do',
            dataIndex: 'acceptDecline',
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
                acceptDecline: <div><Button>Accept</Button><Button>Decline</Button></div>

          })
        });


        return(
            <div>
                <Navigation/>

                <div class="managerWelcome">
                    Welcome Staff
                </div>
                <h2> Your Orders </h2>
                <Button>Refersh Ticket</Button>
                <br/>
                <Table scroll={{y:500}} dataSource={datasource} columns={columns} />
                <Footer/>
            </div>
        );
    }
}

export default TicketingStaff;