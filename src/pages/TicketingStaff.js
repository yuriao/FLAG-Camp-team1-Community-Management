import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Table} from 'antd';
import {Button} from 'antd';
import {Space} from 'antd';
import {DatePicker} from 'antd';
import Ajax from '../components/AJAX'

const columns=[{
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
    sorter: (a, b) => a.priortyidx - b.priortyidx,
    sortDirections: ['descend', 'ascend'],
  },    
  {
    title: 'To Do',
    dataIndex: 'acceptDecline',
  },      
];

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
          ],
          fix_date:[],
          datasource:[]
       }
    }

    reloadTickets=()=>{
            
      let dsource=[];

      this.state.allTicketsTag.map((cdiv, i) => {
      let acceptDeclineTagContent=[];
      
      let acceptDeclineTagContent_stage1=<div><Button iid={i} onClick={this.acceptTickets}>Accept</Button><Button>Decline</Button></div>;
      let acceptDeclineTagContent_stage2=<div><Space><DatePicker iid={i} onChange={(date, dateString) => this.pushFixDate(date, dateString, i)}>select fix date</DatePicker><Button iid={i} onClick={this.submitTickets}>Confirm</Button><Button iid={i} onClick={this.BacktoAcceptDecline}>Back</Button>;</Space></div>;
      let acceptDeclineTagContent_stage3=<Button iid={i}>Complete</Button>

      if(this.state.allTicketsContent[i].assignee){
        if(this.state.allTicketsContent[i].fix_date){
          acceptDeclineTagContent=acceptDeclineTagContent_stage3;
        }else{
          acceptDeclineTagContent=acceptDeclineTagContent_stage2;
        }
        
      }else{
        acceptDeclineTagContent=acceptDeclineTagContent_stage1;
      }

      dsource.push({
          key: i,
          ticket_id: <a href=''>{this.state.allTicketsContent[i].ticket_id}</a>, 
          unit: this.state.allTicketsContent[i].unit, 
          subject: this.state.allTicketsContent[i].subject, 
          created: this.state.allTicketsContent[i].created, 
          category: this.state.allTicketsContent[i].category, 
          priority: this.state.allTicketsContent[i].priority,
          acceptDecline: acceptDeclineTagContent
      })
    });
    this.setState({datasource:dsource});
  }
    // the point is, we only display 7 days on page, so only need 7 arrays. for exact days info, will pass from db and will add checking codes later
    // if need props, use this.props to access
    componentDidMount(){
      this.reloadTickets();
    }


    refershTickets=()=>{
      Ajax('GET', '/tickets/staff?'+sessionStorage.username, [],
        // successful callback
        function(res) {
          let items = JSON.parse(res);
          if (!items || items.length === 0) {
            console.log('No tickets.');
          } else {
          let ttags = [];
          
            //convert priorty for sorting
          items.map((cdiv,i)=>{
            if(items[i].priorty.equals("high")){
              items[i].priortyidx=3;
            }
            if(items[i].priorty.equals("medium")){
              items[i].priortyidx=2;
            }
            if(items[i].priorty.equals("low")){
              items[i].priortyidx=1;
            }

            ttags.push(i);
          })

          this.setState({allticketsContent:items});
          this.setState({allTicketsTag:ttags});
          this.reloadTickets();
          }
        },
        // failed callback
        function() {
          console.log('Cannot load tickets.');
        }
      );
      
    }
    
    BacktoAcceptDecline=(event)=>{
      let acceptDeclineTagContent=<div><Button iid={event.target.iid} onClick={this.acceptTicket}>Accept</Button><Button>Decline</Button></div>;
      this.state.datasource[event.target.iid].acceptDecline=acceptDeclineTagContent;
      this.setState();
    }

    pushFixDate=(date, dateString,iid)=>{ 
      let obj={};
      obj[iid]=dateString;
      this.state.fix_date.push(obj);
    }

    acceptTicket=(event)=>{
      let acceptDeclineTagContent=<div><Space><DatePicker onChange={(date, dateString) => this.pushFixDate(date, dateString, event.target.iid)}>select fix date</DatePicker><Button iid={event.target.iid} onClick={this.submitTickets}>Confirm</Button><Button iid={event.target.iid} onClick={this.BacktoAcceptDecline}>Back</Button>;</Space></div>
      this.state.datasource[event.target.iid].acceptDecline=acceptDeclineTagContent;
      this.setState();
    }

    assignTickets=(event)=>{
      let obj=this.state.fix_date.find(o=> o.iid === event.target.iid);
      this.state.allTicketsContent[event.target.iid].fix_date=obj.iid;
      Ajax('POST', "/tickets", this.state.allTicketsContent[event.target.iid],
          // successful callback
          function(res) {
            console.log("good");
          },
          // failed callback
          function() {
            console.log('fail');
          }
        );
      let i=event.target.iid;
      let assigneeTagContent=<Button iid={i}>Complete</Button>;
      this.state.datasource[event.target.iid].acceptDecline=assigneeTagContent;
      this.setState();
    }

    render() {
        console.log(this.state.datasource);
        return(
            <div>
                <Navigation/>

                <div class="managerWelcome">
                    Welcome Staff
                </div>
                <h3> Your Orders </h3>
                <Space direction="vertical">
                  <Button>Refersh Ticket</Button>
                  <Table scroll={{y:500}} dataSource={this.state.datasource} columns={columns} />
                </Space>
                
                <Footer/>
            </div>
        );
    }
}

export default TicketingStaff;