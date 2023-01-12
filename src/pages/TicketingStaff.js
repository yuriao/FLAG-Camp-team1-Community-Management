import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Tag, Spin, Table,Button,Space,DatePicker,TimePicker} from 'antd';
import axios from 'axios'
import { Redirect } from "react-router-dom";

class TicketingStaff extends Component {
    constructor(){
        super();
        this.state = {
          allTicketsTag: [],    // set initial state with one div
          allTicketsContent: [],
          acceptingMessage: "",
          completeingMessage: "",
          fixDate:[],
          fixTime:[],
          datasource:[],
          loading:true,
          submitConfirm:false,
          submitComplete:false,
          submitDecline:false,
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
          
            <Space>
              <Space direction="vertical">
                <DatePicker iid={i} onChange={(date, dateString) => this.pushFixDate(date, dateString, i)}>select fix date</DatePicker>
                <TimePicker iid={i} onChange={(time, timeString) => this.pushFixTime(time, timeString, i)}>select fix time</TimePicker>
                <div>{this.state.acceptingMessage}</div>
              </Space>
              <Space direction="vertical">
                <Button iid={i} onClick={(event)=>this.confirmTickets(event,i)} size="small" shape="round">Confirm</Button>
                <Button iid={i} onClick={(event)=>this.BacktoAcceptDecline(event,i)} size="small" shape="round">Back</Button>
              </Space>            
            </Space>          
        </div>;
        
        let acceptDeclineTagContent_3=
        <Space direction="vertical">
          <Button iid={i} onClick={(event)=>this.completeTicket(event,i)} type="primary" size="small" shape="round">Complete</Button>
          <div>{this.state.completeingMessage}</div>
        </Space>

        let acceptDeclineTagContent_4=<Tag color={'green'} >Complete</Tag>

        console.log(items[i].status);
        if(items[i].status==="INPROGRESS"){
          if(items[i].fixDate){ // ticket status: in progress, fixdate provided, indicate staff is on their way
            acceptDeclineTagContent=acceptDeclineTagContent_3;
          }else{// ticket status: in progress, no fix date, staff is considering their fixdate
            acceptDeclineTagContent=acceptDeclineTagContent_2;
          }
          
        }else if(items[i].status==="COMPLETE"){ // ticket status: assigned, staff has not accept the ticket assigned to them
          acceptDeclineTagContent=acceptDeclineTagContent_4;
        }else{
          acceptDeclineTagContent=acceptDeclineTagContent_1;
        }

        dsource.push({
            key: i,
            ticket_id: <Button href={'http://localhost:8081/communitymanagement/TicketingDetail?ticket='+items[i].id.toString()} onClick={this.TicketIdStore(items[i].id)} type="link">{items[i].id}</Button>, 
            unit: items[i].unitNumber, 
            subject: items[i].subject, 
            created: items[i].created, 
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
        axios.get('http://localhost:8081/communitymanagement/dashboard/staff',{headers:{userid:sessionStorage.user_id}})
        .then((response) => {
          console.log(response);
          let items =response.data;
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
            //items[i].status="ASSIGNED"
            tags.push(i);
            })

            this.setState({allTicketsTag:tags});
            this.setState({allTicketsContent:items},()=>{console.log(items);this.reloadTickets(items,tags);});//setState is async
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
      this.reloadTickets(dsource,this.state.allTicketsTag);
    }

    pushFixDate=(date, dateString,iid)=>{ 
      let obj={};
      obj[iid]=dateString;
      let existing_fixDate=this.state.fixDate;
      existing_fixDate.push(obj);
      this.setState({fixDate:existing_fixDate});
    }

    pushFixTime=(time, timeString,iid)=>{ 
      let obj={};
      obj[iid]=timeString;
      let existing_fixTime=this.state.fixTime;
      existing_fixTime.push(obj);
      this.setState({fixTime:existing_fixTime});
    }


    BacktoAcceptDecline=(event,i)=>{
      let dsource=this.state.allTicketsContent;
      dsource[i].status="ASSIGNED";

      this.setState({allTicketsContent:dsource});
      this.reloadTickets(dsource,this.state.allTicketsTag);
    }

    confirmTickets=(event,i)=>{
      this.setState({submitConfirm:true})
      let obj=this.state.fixDate.find(o=>Object.keys(o)==i);
      let obj1=this.state.fixTime.find(o=>Object.keys(o)==i);
      axios.post("http://localhost:8081/communitymanagement/tickets/"+this.state.allTicketsContent[i].id+"/staff-action", {action:"accept"},{headers:{userid:sessionStorage.user_id}})
      .then((response)=> {
        console.log(response);
      })
      .catch((error)=> {
        console.log(error);
      });

      console.log(obj[i]+" "+obj1[i]);
      axios.put("http://localhost:8081/communitymanagement/tickets/"+this.state.allTicketsContent[i].id+"/staff-update", {fixDate:obj[i]+" "+obj1[i]},{headers:{userid:sessionStorage.user_id}})
      .then((response)=> {
        console.log(response);
        this.setState({submitConfirm:false});
        alert('Work in progress. Consult resident and manager if further info is needed');
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
      this.setState({submitDecline:true});
      axios.post("http://localhost:8081/communitymanagement/tickets/"+this.state.allTicketsContent[i].id+"/staff-action", {action:"decline"},{headers:{userid:sessionStorage.user_id}})
      .then((response)=> {
        console.log(response);
        alert('Ticket declined')
        this.setState({submitDecline:false});
        this.refreshTickets();
      })
      .catch((error)=> {
        console.log(error);
      });
    }

    completeTicket=(event,i)=>{
      this.setState({submitComplete:true})
      axios.post("http://localhost:8081/communitymanagement/tickets/"+this.state.allTicketsContent[i].id+"/staff-action", {action:"complete"},{headers:{userid:sessionStorage.user_id}})
      .then((response)=> {
        console.log(response);
        this.setState({submitComplete:false});
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
          title: 'Priority',
          dataIndex: 'priority',
          sorter: (a, b) => a.priortyidx - b.priortyidx,
          sortDirections: ['descend', 'ascend'],
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
                    Staff {sessionStorage.getItem("user_id")} updating orders
                </div>
                <div class="stafforderTable">
                <Space direction="vertical">
                <Button onClick={this.refreshTickets}>refresh Ticket</Button>
                    {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Spin spinning={this.state.submitConfirm||this.state.submitComplete||this.state.submitDecline} tip="submitting..." ><Table dataSource={this.state.datasource} columns={columns}  pagination={{ pageSize: 50 }} scroll={{ y: 450 }}/></Spin>}
                </Space>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default TicketingStaff;