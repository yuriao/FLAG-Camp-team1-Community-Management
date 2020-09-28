import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Table} from 'antd';
import {Button} from 'antd';
import {Space} from 'antd';
import {DatePicker} from 'antd';
import Ajax from '../components/AJAX'

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
                "priority": "high",
                "fix_date":"09/09/2021",
                "status":"in progress"
            },
            {
                "ticket_id":"0032134",
                "unit": '711',
                "subject": "bear sleeping on sofa",
                "created": "2020-09-11T14:48:00",
                "category": "misc",
                "priority": "medium",  
                "fix_date":"",
                "status":"assigned"              
            },
            {
                "ticket_id":"0123435",
                "unit": '711',
                "subject": "sink clog",
                "created": "2020-09-11T14:48:00",
                "category": "sink",
                "priority": "medium",  
                "fix_date":"",
                "status":"assigned"                
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
      
        let acceptDeclineTagContent_1=
        <div>
          <Button iid={i} onClick={(event)=>this.acceptTicket(event,i)}>Accept</Button>
          <Button iid={i} onClick={(event)=>this.declineTicket(event,i)}>Decline</Button>
        </div>;
        
        let acceptDeclineTagContent_2=
        <div>
          <Space direction="vertical">
            <DatePicker iid={i} onChange={(date, dateString) => this.pushFixDate(date, dateString, i)}>select fix date</DatePicker>
            <div>
              <Button iid={i} onClick={(event)=>this.confirmTickets(event,i)}>Confirm</Button>
              <Button iid={i} onClick={(event)=>this.BacktoAcceptDecline(event,i)}>Back</Button>
            </div>
          </Space>
        </div>;
        
        let acceptDeclineTagContent_3=<Button iid={i} type="primary">Complete</Button>

        console.log(this.state.allTicketsContent[i].status);
        if(this.state.allTicketsContent[i].status==="in progress"){
          if(this.state.allTicketsContent[i].fix_date){ // ticket status: in progress, fixdate provided, indicate staff is on their way
            acceptDeclineTagContent=acceptDeclineTagContent_3;
          }else{// ticket status: in progress, no fix date, staff is considering their fixdate
            acceptDeclineTagContent=acceptDeclineTagContent_2;
          }
          
        }else{ // ticket status: assigned, staff has not accept the ticket assigned to them
          acceptDeclineTagContent=acceptDeclineTagContent_1;
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
            if(items[i].priorty==="high"){
              items[i].priortyidx=3;
            }
            if(items[i].priorty==="medium"){
              items[i].priortyidx=2;
            }
            if(items[i].priorty==="low"){
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
    
    acceptTicket=(event,i)=>{
      let dsource=this.state.allTicketsContent;
      dsource[i].status="in progress";

      this.setState({allTicketsContent:dsource});
      this.reloadTickets();
    }

    pushFixDate=(date, dateString,iid)=>{ 
      let obj={};
      obj[iid]=dateString;
      let existing_fix_date=this.state.fix_date;
      existing_fix_date.push(obj);
      this.setState({fix_date:existing_fix_date});
    }

    BacktoAcceptDecline=(event,i)=>{
      let dsource=this.state.allTicketsContent;
      dsource[i].status="assigned";

      this.setState({allTicketsContent:dsource});
      this.reloadTickets();
    }

    confirmTickets=(event,i)=>{
      let obj=this.state.fix_date.find(o=>Object.keys(o)==i);
      
      Ajax("POST","/tickets/"+sessionStorage.username+"/staff-action", {"status":"in progress"},
          // successful callback
          function(res) {
            console.log("good");
          },
          // failed callback
          function() {
            console.log('fail');
          }
        );
      Ajax('PUT', "/tickets/"+sessionStorage.username+"/staff-update", {"fix_date":obj[i]},
          // successful callback
          function(res) {
            console.log("good");
          },
          // failed callback
          function() {
            console.log('fail');
          }
        );
      
      let existingTicketContent=this.state.allTicketsContent;
      existingTicketContent[i].status="in progress";
      existingTicketContent[i].fix_date=obj[i];
      this.setState({allTicketsContent:existingTicketContent});
      this.reloadTickets();
    }

    declineTicket=()=>{
      
    }
    
    render() {
        console.log(this.state.datasource);
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