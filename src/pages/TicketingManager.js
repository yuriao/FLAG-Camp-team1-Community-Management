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


class TicketingManager extends Component {
    constructor(){
        super();
        this.state = {
            allTicketsTag: ['tk1','tk2'],    // set initial state with one div
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
            ],
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
           assignment:[],
           datasource:[],
           possible_assignees:["engineer1","engineer2"],
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
            possible_locs:[]
          // possible_loc:['kitchen','water','flooring','painting','windows/doors','yard','pest control','locksmith','trash','yard/pool','misc'],
         }
    }
    
    componentDidMount(){
        this.ReloadTickets();
    }

    // refersh page function 
    ReloadTickets = ()=>{
      
      let all_assignees=this.state.possible_assignees;
      let dsource=[];

      this.state.allTicketsTag.map((cdiv, i) => {
        
        let assigneeTag_1=
        <div>
          <Space direction="vertical">
            <DropDown iid={i} parentCallback = {this.AssignmentCallBack} elements={all_assignees}/>
            <Button iid={i} onClick={(event)=>this.assignTickets(event,i)} shape="round">Confirm</Button> 
          </Space>
        </div>;  //(event)=>this.assignTickets(event,i): add a parameter i to callback
  
        //let assigneeTag_2=<div><Button iid={i} onClick={(event)=>this.cancelAssignment(event,i)} danger>Cancel Assignment</Button></div>;

        //1. trim assignees by category (unfinished)
        let cCategory=this.state.allTicketsContent[i].category;

        //2.check if assignee exists for current ticket
        let assigneeTag=[];
        if (this.state.allTicketsContent[i].assignee){
          console.log(this.state.allTicketsContent[i].assignee);
          let assigneeTag_2=<div>Assigned: {this.state.allTicketsContent[i].assignee} </div>;
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
    HomeBlankCallBack = (childData,childProps) => {
      this.setState({
        unit: childData,
      });
      //console.log(childData);
      
    }
    
    FnameBlankCallBack = (childData,childProps) => {
      this.setState({
        firstName: childData,
      })
      //console.log(childData);
      //console.log(this.state.unit);
    }

    LnameBlankCallBack = (childData,childProps) => {
      this.setState({
        lastName: childData,
      })
    }

    contactDropDownCallBack = (childData,childProps) => {
      this.setState({
        contact_method: childData,
      })
    }

    locationDropDownCallBack = (childData,childProps) => {
      this.setState({
        location: childData,
      })
    }

    categoryDropDownCallBack = (childData,childProps) => {
      let pos_locs=this.state.possible_issue_categories[childData];
      this.setState({
        category: childData,
        possible_locs: pos_locs
      })
    }

    priortyDropDownCallBack = (childData,childProps) => {
      this.setState({
        priorty: childData,
      })
    }

    subjectBlankCallBack = (childData,childProps) => {
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
        
        this.setState({ticketSubmitMessage:"ticket "+ticketData.ticket_id.toString()+" has been submitted"})
        
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
      
    AssignmentCallBack = (childData,childProps) => {
      let existingAssignments=this.state.assignment;
      
      let tiid=childProps.iid;
      let asm=childData;
      let obj={};
      obj[tiid]=asm;
      
      if(existingAssignments.find(o=>Object.keys(o)==tiid)){
        existingAssignments[existingAssignments.findIndex(o=>Object.keys(o)==tiid)]=obj; // change assignment
      }else{
        existingAssignments.push(obj);
      }
      this.setState(
        {assignment:existingAssignments}
      )
    }

    assignTickets=(event,i)=>{
      console.log(this.state.assignment);
      let obj=this.state.assignment.find(o=>Object.keys(o)==i);
      let tid=this.state.allTicketsContent[i].ticket_id;

      //if directly click confirm, set the first assignee
      if(!obj){ 
        obj={i:this.state.possible_assignees[0]};
      }

      // test without backend communication
      // let items=this.state.allTicketsContent;
      // items[i].assignee=obj[i];
      // this.setState({allTicketsContent:items})
      // this.ReloadTickets();
      
      Ajax('PUT', "/tickets/"+tid.toString()+"/assignees", obj[i],
          // successful callback
          function(res) {
            console.log("good");
          },
          // failed callback
          function() {
            console.log('fail');
          }
        );
      this.refershTickets();
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
    //     this.refershTickets();
    // }

    render() {
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
                            
                            <DropDown elements={Object.keys(this.state.possible_issue_categories)} description="Category" parentCallback = {this.categoryDropDownCallBack} />
                            <DropDown elements={this.state.possible_locs} description="Location" parentCallback = {this.locationDropDownCallBack} />
                            <DropDown elements={["high",'medium','low']} description="Priority" parentCallback = {this.priortyDropDownCallBack} />
                        
                        </Col>    
                      </Row>
                      
                      <Button onClick={this.SubmitTickets} type="primary">Submit</Button>
                      <div>{this.state.ticketSubmitMessage}</div>
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