import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Table, Spin, Button,Space, Tag} from 'antd';
import Blank from '../components/Blank';
import DropDown from "../components/DropDown";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { Redirect } from "react-router-dom";

class TicketingManager extends Component {
    constructor(){
        super();
        this.state = {
            allTicketsTag: [],    // set initial state with one div
            allTicketsContent: [],
           ticketSubmitMessage:"",
           unit:'',
           lastName:'',
           firstName:'',
           contact_method:'',
           location:'',
           category:'',
           priorty:'',
           subject:'',
           description:'',
           issue_category_id:0,
           issue_category_id_current:0,
           assignment:[],
           datasource:[],
           possible_issue_categories:{
             "kitchen": ["sink", "dishwasher"], 
             "bathroom": ["sink", "furniture","floor"],
             "toilet":["sink","bathtub","clog"],
             "yard maintaince": ['pool','yard'],
             "water":["pipe explode","pipe clog","pipe freeze"],
             "pest control":["kitchen","bedroom","toliet","living room","patio","storage","basement"],
             "locksmith":[],
             "trash":[],
             "misc":[]
            },
          possible_locs:[],
          loading:true,
          submitAssignment:false,
          movingTo:-1
          // possible_loc:['kitchen','water','flooring','painting','windows/doors','yard','pest control','locksmith','trash','yard/pool','misc'],
         }
    }
    
    componentDidMount(){
        if(sessionStorage.getItem("user_type")!="MANAGER"){
            alert("Only manager can access management ticketing system");
            this.setState({movingTo:7});
        }else{
          this.refreshTickets();
          //this.loadIssueCategory();
        }
        
    }

    // loadIssueCategory=()=>{
    //   axios.get('/communitymanagement/ticket-issue-categories')
    //   .then((response) => {
    //     let items =response.data;
    //     this.setState({possible_issue_categories:items})
    //     console.log("good");
    //     console.log(items);
    //     console.log(Object.keys(items));
    //   })
    //   .catch((error)=> {
    //     console.log(error);
    //   });
    // }

    // refresh page function 
    reloadTickets = (items,tags)=>{      
      let dsource=[];
      let status_dat=sessionStorage.Manager_ticket_status;
      status_dat=status_dat.split(",");

      tags.map((cdiv, i) => {
        
        let recommend_assignees_dat=items[i].recommendStaff;       
        
        let recommend_assignees=[];
        let recommend_assignees_idx=[];
         
        if(recommend_assignees_dat){
            recommend_assignees_dat.map((c,i)=>{
            recommend_assignees.push(recommend_assignees_dat[i].name);
            recommend_assignees_idx.push(recommend_assignees_dat[i].userId);
          })
        }else{
          recommend_assignees=["Not available"];
        }
        
        let assigneeTag_1=
        <div>         
            <Space direction='horizontal'>
              <DropDown iid={i} parentCallback = {this.AssignmentCallBack} elements={recommend_assignees}/>
              <Button iid={i} onClick={(event)=>this.assignTickets(event,i)} size="small" shape="round">Confirm</Button>
            </Space>
        </div>;  //(event)=>this.assignTickets(event,i): add a parameter i to callback
  
        //let assigneeTag_2=<div><Button iid={i} onClick={(event)=>this.cancelAssignment(event,i)} danger>Cancel Assignment</Button></div>;

        //1.check if assignee exists for current ticket
        let assigneeTag=[];
        if (items[i].assignees){
          let assigneeTag_2=<div>Assigned: {items[i].assignees[0].name} </div>;
          assigneeTag=assigneeTag_2;
        
        }else{
          assigneeTag=assigneeTag_1;
        }

        let dateObject = new Date(items[i].submittedDate);
        let humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
        
        if(status_dat[i]!='COMPLETE'){ // NOT SHOWING COMPLETED TICKETS
          dsource.push({
              key: i,
              ticket_id: <Button href={'/communitymanagement/TicketingDetail?ticket='+items[i].ticketId.toString()}  type="link">{items[i].ticketId}</Button>, 
              //unit: items[i].unit_number, 
              subject: items[i].issue, 
              created: humanDateFormat, 
              //category: items[i].issue, 
              priority: items[i].priority,
              priortyidx: items[i].priortyidx,
              assignee: assigneeTag,
          })
        }
      });
      this.setState({loading:false});
      this.setState({datasource:dsource}); // it is suggested that try not to directly change state var as next setState may discard the change, use setsTATE instead
    }

    //TicketIdStore = (tid) =>{
    //  sessionStorage.setItem('inquiredTicketID', tid);
    //}

    // // if need props, use this.props to access
    // HomeBlankCallBack = (childData,childProps) => {
    //   this.setState({
    //     unit: childData,
    //   });
    //   console.log(childData);
      
    // }
    
    // FnameBlankCallBack = (childData,childProps) => {
    //   this.setState({
    //     firstName: childData,
    //   })
    //   //console.log(childData);
    //   //console.log(this.state.unit);
    // }

    // LnameBlankCallBack = (childData,childProps) => {
    //   this.setState({
    //     lastName: childData,
    //   })
    // }

    // contactDropDownCallBack = (childData,childProps) => {
    //   this.setState({
    //     contact_method: childData,
    //   })
    // }

    // locationDropDownCallBack = (childData,childProps) => {
    //   console.log(this.state.issue_category_id_current);
    //   let idx=this.state.possible_locs.findIndex(o=>o==childData);
    //   console.log(this.state.issue_category_id_current[idx]);
    //   this.setState({
    //     location: childData,
    //     issue_category_id: this.state.issue_category_id_current[idx]
    //   })
    // }

    // categoryDropDownCallBack = (childData,childProps,idx) => { // how backend's issue-category-id works? issue-category-id has pre-defined id for pre-defined categoty-locatoin combinations
    //   console.log(this.state.possible_issue_categories);
      
    //   let pos_locs=this.state.possible_issue_categories[childData];
    //   let pos_loc_name=[];
    //   let issue_category_id_c=[];
    //   if(pos_locs){
    //     for(var k in pos_locs){
    //       pos_loc_name.push(k);
    //       issue_category_id_c.push(pos_locs[k]);
    //     } 

    //   }else{
    //     pos_locs=["not aviliable"];
    //   }

    //   this.setState({
    //     category: childData,
    //     issue_category_id_current:issue_category_id_c,
    //     possible_locs: pos_loc_name
    //   })
      
    // }

    // priortyDropDownCallBack = (childData,childProps) => {
    //   this.setState({
    //     priorty: childData,
    //   })
    // }

    // subjectBlankCallBack = (childData,childProps) => {
    //   this.setState({
    //     subject: childData,
    //   })
    // }

    // DescriptionCallBack = (event) => {
    //   this.setState({
    //     description: event.target.value,
    //   })
    // }

    

    // SubmitTickets=()=>{
    //     console.log(this.state.unit);
    //     this.setState({ticketSubmitMessage:"Submitting Ticket..."})
    //     // let today = new Date();
    //     // let time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"T"+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     //Be aware... Backend need to accept json, so no "string" for keys
    //     let ticketData = {
    //       unitNumber: this.state.unit,
    //       subject: this.state.subject,
    //       issueCategoryId: this.state.issue_category_id,
    //       description: this.state.description+"\n"+"location: "+this.state.location,
    //       availability: "available",
    //       priority:this.state.priorty
    //     };
    //     console.log(ticketData);

    //     axios.post('/communitymanagement/tickets/submit', ticketData)
    //     .then((response)=> {
    //       console.log(response);
    //       this.setState({ticketSubmitMessage:"Thank you! Ticket has been submitted"})
    //       this.refreshTickets();
    //     })
    //     .catch((error)=> {
    //       console.log(error);
    //       this.setState({ticketSubmitMessage:"Ticket submission failed. Check console log for details"})
    //     });
        
        
    //   }

    refreshTickets=()=>{
        this.setState({loading:true});
        this.setState({ticketSubmitMessage:""})
        axios.get('http://localhost:8081/communitymanagement/tickets/manager',{headers:{"userid":sessionStorage.user_id}})
        .then((response) => {
          console.log(response);
          let items =response.data.tickets;
          let tags =[];
          
          
          let id_dat=sessionStorage.Manager_ticket_id
          let priority_dat=sessionStorage.Manager_ticket_priority;
          console.log(id_dat);
          id_dat=id_dat.split(",");
          priority_dat=priority_dat.split(",");

          if (!items || items.length === 0) {
            console.log('No tickets.');
            this.setState({loading:false});
          } else {
              //convert priorty for sorting
            
            
            items.map((cdiv,i)=>{
            
              let idx=id_dat.findIndex((o)=>o==items[i].ticketId);
              items[i].priority=priority_dat[idx];
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
            this.setState({allticketsContent:items},()=>{console.log(items);this.reloadTickets(items,tags);});//setState is async
          }
        })
        .catch((error)=> {
          console.log(error);
          this.setState({loading:false});
        });
      }
      
    AssignmentCallBack = (childData,childProps) => {
      let existingAssignments=this.state.assignment;
      let iid=childProps.iid;
      //console.log(this.state.allticketsContent);
      let recommend_assignees_dat=this.state.allticketsContent[iid].recommendStaff; //{name,id}
      //console.log(recommend_assignees_dat);
      let assigneeName=childData;
      let assigneeIdx=recommend_assignees_dat[recommend_assignees_dat.findIndex(o=>o.name==assigneeName)].userId;
      let obj={};
      obj[iid]=[assigneeName,assigneeIdx];
      
      if(existingAssignments.find(o=>Object.keys(o)==iid)){
        existingAssignments[existingAssignments.findIndex(o=>Object.keys(o)==iid)]=obj; // change assignment
      }else{
        existingAssignments.push(obj);
      }
      this.setState(
        {assignment:existingAssignments}
      )
    }

    assignTickets=(event,i)=>{
      this.setState({submitAssignment:true})
      console.log(this.state.assignment);
      let obj=this.state.assignment.find(o=>Object.keys(o)==i);
      console.log(obj[i][1]);
      console.log(this.state.allticketsContent[i]);
      let tid=this.state.allticketsContent[i].ticketId;
      console.log("http://localhost:8081/communitymanagement/tickets/"+tid.toString()+"/assignees");
      axios.put("http://localhost:8081/communitymanagement/tickets/"+tid.toString()+"/assignees", {assignees:[obj[i][1]]}, {headers:{userid:sessionStorage.user_id}}) // return userId
        .then((response)=> {
          console.log(response);
          let items=this.state.allticketsContent;
          items[i].assignees=[];
          items[i].assignees.push({name:[obj[i][0]],userId:[obj[i][1]]});
          this.setState({allticketsContent:items,submitAssignment:false});
          this.reloadTickets(items,this.state.allTicketsTag);
          this.refreshTickets();
        })
        .catch((error)=>  {
          console.log(error);
        });
      
    }

    // cancelAssignemnt=(event,i)=>{
    //   this.state.allTicketsContent[event.target.iid].assignee="";
    //   this.state.allTicketsContent[event.target.iid].status="open";
    //   Ajax('POST', "/tickets", this.state.allTicketsContent[event.target.iid],
    //       // successful callback
    //       function(res) {
    //         console.log("good");
    //       },
    //       // failed callback
    //       function() {
    //         console.log('fail');
    //       }
    //     );
    //     this.refreshTickets();
    // }

    render() {
      
      if(this.state.movingTo==7){
        return (<Redirect to="/" />)
      } 

      const columns=[{
        title: 'Ticket ID',
        dataIndex: 'ticket_id',
        render: (text) => <a>{text}</a>,
      },
      //{
      //  title: 'Unit',
      //  dataIndex: 'unit',
      //},
      {
        title: 'issue type',
        dataIndex: 'subject',
      },
      {
        title: 'Submitted time',
        dataIndex: 'created',
        sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created),
        sortDirections: ['descend', 'ascend'],
      },
      //{
      //  title: 'Category',
      //  dataIndex: 'category',
      //},
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
        title: 'Assign Staff',
        dataIndex: 'assignee',
      },  
    ];
      return(
        <div>
            <Navigation/>

            <div class="managerWelcome">
                Manager updating tickets
            </div>

             <Container fluid>
              <Row>
            {/*    <Col xs={4}>
                  <h3> Submit a Work Order </h3>
                  <div>
                    <Space direction="vertical">
                      <Row class='TicketSubmitManager'>  
                        <Col>
                            <Blank text="Home" parentCallback = {this.HomeBlankCallBack}/>
                            <Blank text="First Name" parentCallback = {this.FnameBlankCallBack}/>
                            <Blank text="Last Name" parentCallback = {this.LnameBlankCallBack}/>
                            <p>Description</p>
                            <input text="Description" className = "description-box" onChange={this.DescriptionCallBack}></input>
                            
                        </Col>                  
                        <Col>
                            <Blank text="Ticket Title" parentCallback = {this.subjectBlankCallBack}/>
                            <DropDown elements={['phone','email']} description="Contact Method" parentCallback = {this.contactDropDownCallBack}/>
                            
                            <DropDown elements={Object.keys(this.state.possible_issue_categories)} description="Location" parentCallback = {this.categoryDropDownCallBack} />
                            <DropDown elements={this.state.possible_locs} description="Category" parentCallback = {this.locationDropDownCallBack} />
                            <DropDown elements={["HIGH",'MEDIUM','LOW']} description="Priority" parentCallback = {this.priortyDropDownCallBack} />
                        
                        </Col>    
                      </Row>
                      
                      <Button onClick={this.SubmitTickets} type="primary">Submit</Button>
                      <div>{this.state.ticketSubmitMessage}</div>
                    </Space>
                  </div> 
                </Col> */}
                
                <Col>
                  <h3> Existing Work Orders </h3>
                  <Space direction="vertical">
                    <Button onClick={this.refreshTickets}>refresh Ticket</Button>
                    {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Spin tip="Assigning ticket..."  spinning={this.state.submitAssignment}><Table dataSource={this.state.datasource} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 300 }}/></Spin>}
                  </Space>
                </Col>
              </Row>
            </Container>
            
            <Footer/>
        </div>
      );
  }
}

export default TicketingManager;