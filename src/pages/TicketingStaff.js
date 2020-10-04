import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Spin, Table,Button,Space,DatePicker} from 'antd';
import axios from 'axios'
import { Redirect } from "react-router-dom";

class TicketingStaff extends Component {
    constructor(){
        super();
        this.state = {
          allTicketsTag: [],    // set initial state with one div
          allTicketsContent: [],
          fixDate:[],
          datasource:[],
          loading:true,
          movingTo:-1
       }
    }

    componentDidMount(){
      if(sessionStorage.getItem("user_type")!="STAFF"){
        alert("Only staff can access staff ticketing system");
        this.setState({movingTo:7});
      }else{
          this.refreshTickets();
      }
    } 

    reloadTickets=(items,tags)=>{
            
      let dsource=[];

      tags.map((cdiv, i) => {
     
        let acceptDeclineTagContent=[];
      
        let acceptDeclineTagContent_1=
        <div>
          <Button iid={i} onClick={(event)=>this.acceptTicket(event,i)} size="small" shape="round">Accept</Button>
          <Button iid={i} onClick={(event)=>this.declineTicket(event,i)} size="small" shape="round">Decline</Button>
        </div>;
        
        let acceptDeclineTagContent_2=
        <div>
          <Space direction="vertical">
            <DatePicker iid={i} onChange={(date, dateString) => this.pushFixDate(date, dateString, i)}>select fix date</DatePicker>
            <div>
              <Button iid={i} onClick={(event)=>this.confirmTickets(event,i)} size="small" shape="round">Confirm</Button>
              <Button iid={i} onClick={(event)=>this.BacktoAcceptDecline(event,i)} size="small" shape="round">Back</Button>
            </div>
          </Space>
        </div>;
        
        let acceptDeclineTagContent_3=<Button iid={i} onClick={(event)=>this.completeTickets(event,i)} type="primary" size="small" shape="round">Complete</Button>

        console.log(items[i].status);
        if(items[i].status==="INPROGRESS"){
          if(items[i].fixDate){ // ticket status: in progress, fixdate provided, indicate staff is on their way
            acceptDeclineTagContent=acceptDeclineTagContent_3;
          }else{// ticket status: in progress, no fix date, staff is considering their fixdate
            acceptDeclineTagContent=acceptDeclineTagContent_2;
          }
          
        }else{ // ticket status: assigned, staff has not accept the ticket assigned to them
          acceptDeclineTagContent=acceptDeclineTagContent_1;
        }

        dsource.push({
            key: i,
            ticket_id: <Button href="/communitymanagement/TicketingDetail" onClick={this.TicketIdStore(this.state.allTicketsContent[i].ticket_id)} type="link">{this.state.allTicketsContent[i].ticket_id}</Button>, 
            unit: items[i].unit, 
            subject: items[i].subject, 
            created: items[i].created, 
            category: items[i].category, 
            priority: items[i].priority,
            acceptDecline: acceptDeclineTagContent
        })
    });
    this.setState({loading:false});
    this.setState({datasource:dsource});
  }
    
  TicketIdStore = (tid) =>{
      sessionStorage.setItem('inquiredTicketID', 'tid');
    }

   
    refreshTickets=()=>{
        this.setState({loading:true});
        this.setState({ticketSubmitMessage:""})
        axios.get('/communitymanagement/tickets/staff')
        .then((response) => {
          console.log(response);
          let items =response.data.tickets;
          let tags =[];
          if (!items || items.length === 0) {
            console.log('No tickets.');
            this.setState({loading:false});
          } else {
              //convert priorty for sorting
            items.map((cdiv,i)=>{
            if(items[i].priorty==="HIGH"){
              items[i].priortyidx=3;
            }
            if(items[i].priorty==="MEDIUM"){
              items[i].priortyidx=2;
            }
            if(items[i].priorty==="LOW"){
              items[i].priortyidx=1;
            }

            tags.push(i);
            })

            this.setState({allTicketsTag:tags});
            this.setState({allticketsContent:items},()=>{console.log(items);this.ReloadTickets(items,tags);});//setState is async
          }
        })
        .catch((error)=> {
          console.log(error);
          this.setState({loading:false});
        });
      }
    
    acceptTicket=(event,i)=>{
      let dsource=this.state.allTicketsContent;
      dsource[i].status="INPROGRESS";

      this.setState({allTicketsContent:dsource});
      this.reloadTickets();
    }

    pushFixDate=(date, dateString,iid)=>{ 
      let obj={};
      obj[iid]=dateString;
      let existing_fixDate=this.state.fixDate;
      existing_fixDate.push(obj);
      this.setState({fixDate:existing_fixDate});
    }

    BacktoAcceptDecline=(event,i)=>{
      let dsource=this.state.allTicketsContent;
      dsource[i].status="ASSIGNED";

      this.setState({allTicketsContent:dsource});
      this.reloadTickets();
    }

    confirmTickets=(event,i)=>{
      let obj=this.state.fixDate.find(o=>Object.keys(o)==i);
      
      axios.post("/communitymanagement/tickets/"+this.state.allTicketsContent[i].ticketId+"/staff-action", {action:"accept"})
      .then((response)=> {
        console.log(response);
      })
      .catch((error)=> {
        console.log(error);
      });
      axios.put("/communitymanagement/tickets/"+this.state.allTicketsContent[i].ticketId+"/staff-update", {fixDate:obj[i]},)
      .then((response)=> {
        console.log(response);
        alert('Work in progress. Consult resident and manager if further info is needed')
        this.refreshTickets();
      })
      .catch((error)=> {
        console.log(error);
      });

      // let existingTicketContent=this.state.allTicketsContent;
      // existingTicketContent[i].status="INPROGRESS";
      // existingTicketContent[i].fixDate=obj[i];
      // this.setState({allTicketsContent:existingTicketContent});
      // this.reloadTickets();
    }

    declineTicket=(event,i)=>{
      axios.post("/communitymanagement/tickets/"+this.state.allTicketsContent[i].ticketId+"/staff-action", {action:"decline"})
      .then((response)=> {
        console.log(response);
        alert('Ticket declined')
        this.refreshTickets();
      })
      .catch((error)=> {
        console.log(error);
      });
    }

    completeTicket=(event,i)=>{
      axios.post("/communitymanagement/tickets/"+this.state.allTicketsContent[i].ticketId+"/staff-action", {action:"complete"})
      .then((response)=> {
        console.log(response);
        alert('Ticket completed! Your work is greatly appriciated!')
        this.refreshTickets();
      })
      .catch((error)=> {
        console.log(error);
      });
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
        if(this.state.movingTo==7){
          return (<Redirect to="/" />)
        } 

        return(
            <div>
                <Navigation/>

                <div class="managerWelcome">
                    Welcome Staff
                </div>
                <h3> Your Orders </h3>
                <Space direction="vertical">
                <Button onClick={this.refreshTickets}>refresh Ticket</Button>
                    {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{y:600}} dataSource={this.state.datasource} columns={columns} />}
                </Space>
                
                <Footer/>
            </div>
        );
    }
}

export default TicketingStaff;