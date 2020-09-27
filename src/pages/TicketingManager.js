import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Table} from 'antd';
import {Button} from 'antd';
import {Space} from 'antd';
import Blank from '../components/Blank';
import DropDown from "../components/DropDown";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
    title: 'Assign Staff',
    dataIndex: 'assignee',
  },  
];

class TicketingManager extends Component {
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
           unit:'',
           lastName:'',
           firstName:'',
           contact_method:'',
           location:'',
           category:'',
           priorty:'',
           subject:'',
           description:'',
           assignment:[],
           datasource=[],
           possible_assignees=["engineer1","engineer2"],
           possible_categories=[],
         }
    }
    
    componentDidMount(){
        this.ReloadTickets();
    }

    // refersh page function 
    ReloadTickets = ()=>{
      
      let all_assignees=this.state.possible_assignees;
      let dsource=[];

      let assigneeTag_1=<div><Space><DropDown iid={i} parentCallback = {this.HomeBlankCallBack} elements={all_assignees}/><Button iid={i} onClick={this.assignTickets} primary>Confirm</Button></Space></div>
      let assigneeTag_2=<div><Button iid={i} onClick={this.cancelAssignment} danger>Cancel Assignment</Button></div>
      
      this.state.allTicketsTag.map((cdiv, i) => {
        
        //1. trim assignees by category (unfinished)
        let cCategory=this.state.allTicketsContent[i].category;

        //1.check if assignee exists for current ticket
        let assigneeTag=[];
        if (this.state.allTicketsContent.assignee){
          assigneeTag=assigneeTag_2;
        }else{
          assigneeTag=assigneeTag_1;
        }

        dsource.push({
            key: i,
            ticket_id: <a href=''>{this.state.allTicketsContent[i].ticket_id}</a>, 
            unit: this.state.allTicketsContent[i].unit, 
            subject: this.state.allTicketsContent[i].subject, 
            created: this.state.allTicketsContent[i].created, 
            category: this.state.allTicketsContent[i].category, 
            priority: this.state.allTicketsContent[i].priority,
            assignee: assigneeTag,
        })
      });
      this.setState({datasource:dsource}); // it is suggested that try not to directly change state var as next setState may discard the change, use setsTATE instead
    }

    loadAssignee=()=>{

    }

    // if need props, use this.props to access
    HomeBlankCallBack = (childData) => {
      this.setState({
        unit: childData,
      });
      //console.log(childData);
      
    }
    
    FnameBlankCallBack = (childData) => {
      this.setState({
        firstName: childData,
      })
      //console.log(childData);
      //console.log(this.state.unit);
    }

    LnameBlankCallBack = (childData) => {
      this.setState({
        lastName: childData,
      })
    }

    contactDropDownCallBack = (childData) => {
      this.setState({
        contact_method: childData,
      })
    }

    locationDropDownCallBack = (childData) => {
      this.setState({
        location: childData,
      })
    }

    categoryDropDownCallBack = (childData) => {
      this.setState({
        category: childData,
      })
    }

    priortyDropDownCallBack = (childData) => {
      this.setState({
        priorty: childData,
      })
    }

    subjectBlankCallBack = (childData) => {
      this.setState({
        subject: childData,
      })
    }

    DescriptionCallBack = (event) => {
      this.setState({
        description: event.target.value,
      })
    }

    

    SubmitTickets=()=>{
        console.log(this.state.unit);
        let today = new Date();
        let time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"T"+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let ticketData = {
          "ticket_id": Math.random().toString(12).substring(2, 9) + Math.random().toString(12).substring(2, 9),
          //"user_id": sessionStorage.user_id,
          "user_id": '123',
          "firstName": this.state.firstName,
          "lastName":  this.state.lastName,
          "unit":this.state.unit,
          "priority": this.state.priorty,
          "subject": this.state.subject,
          "location": this.state.location,
          "issue": this.state.location,
          "description": this.state.description,
          "category": this.state.category,
          "created": time,
          "availability": "",
          "assignee": "",
          "fix_date":"",
          "ticket_status":"",
          "contact_method":this.state.contact_method,
          "status":"open"
        };
        console.log(ticketData);
        //fetchAPI to create ticket
        Ajax('POST', "/tickets", ticketData,
          // successful callback
          function(res) {
            console.log("good");
          },
          // failed callback
          function() {
            console.log('fail');
          }
        );

        
      }

    refershTickets=()=>{
        Ajax('GET', '/tickets/manager', [],
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
            this.ReloadTickets();
            }
          },
          // failed callback
          function() {
            console.log('Cannot load tickets.');
          }
        );
        
      }
      
    AssignmentCallBack = (childData) => {
      let existingAssignments=this.state.assignment;
      let tiid=childData.iid;
      let asm=childData.assignment;
      let obj={};
      obj[tiid]=asm;
      existingAssignments.push(obj);
      this.setState(
        {assignment:existingAssignments}
      )
    }

    assignTickets=(event)=>{
      console.log(event.target.iid);
      let obj=this.state.assignment.find(o=>o.tiid==event.target);
      
      this.state.allTicketsContent[event.target.iid].assignee=obj.tiid;
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
      let assigneeTagContent=<Button iid={i} onClick={this.cancelTicket}>Cancel</Button>;;
      this.state.datasource[event.target.iid].assignee=assigneeTagContent;
      this.setState();
    }

    cancelTickets=(event)=>{
      this.state.allTicketsContent[event.target.iid].assignee="";
      this.state.allTicketsContent[event.target.iid].status="open";
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
      let assigneeTagContent=<div><DropDown iid={event.target.iid} parentCallback = {this.AssignmentCallBack} elements={['Engineer1','Engineer2']}/><Button iid={event.target.iid} onClick={this.assignTickets}>Confirm</Button></div>;
      this.state.datasource[event.target.iid].assignee=assigneeTagContent;
      this.setState();
    }

    render() {
      console.log(this.state.datasource);
        return(
            <div>
                <Navigation/>

                <div class="managerWelcome">
                    Welcome Manager
                </div>
                <Container fluid>
                  <Row>
                    <Col xs={4}>
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
                                <DropDown elements={['pos1','pos2']} description="Location" parentCallback = {this.locationDropDownCallBack} />
                                <DropDown elements={['electricity','water','flooring','painting','windows/doors','yard','pest control','locksmith','trash','yard/pool','misc']} description="Category" parentCallback = {this.categoryDropDownCallBack} />
                                <DropDown elements={["high",'medium','low']} description="Priority" parentCallback = {this.priortyDropDownCallBack} />
                            
                            </Col>    
                          </Row>
                          
                          <Button onClick={this.SubmitTickets}>Submit</Button>
                        </Space>
                      </div> 
                    </Col>
                    
                    <Col>
                      <h3> Existing Work Orders </h3>
                      <Space direction="vertical">
                        <Button>Refersh Ticket</Button>
                        <Table scroll={{y:400}} dataSource={this.state.datasource} columns={columns} />
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