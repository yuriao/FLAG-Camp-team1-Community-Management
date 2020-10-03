import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Table, Spin, Button,Space} from 'antd';
import Blank from '../components/Blank';
import DropDown from "../components/DropDown";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'


class TicketingManager extends Component {
    constructor(){
        super();
        this.state = {
            allTicketsTag: ['tk1','tk2'],    // set initial state with one div
            allTicketsContent: [{
                "ticket_id":"0001233",
                "unit_number": '711',
                "subject": "water leak",
                "submitted_date": "2020-09-18T14:48:00",
                "issue": "water",
                "recommendStaff": []
            },
            {
                "ticket_id":"0032134",
                "unit_number": '711',
                "subject": "bear sleeping on sofa",
                "submitted_date": "2020-09-11T14:48:00",
                "issue": "misc",
                "recommendStaff": []                
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
           issue_category_id:0,
           assignment:[],
           datasource:[],
           all_assignee:["engineer1","engineer2"],
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
          
          // possible_loc:['kitchen','water','flooring','painting','windows/doors','yard','pest control','locksmith','trash','yard/pool','misc'],
         }
    }
    
    componentDidMount(){
        this.refershTickets();
        this.loadIssueCategory();
    }

    loadIssueCategory=()=>{
      axios.get('/communitymanagement/ticket-issue-categories')
      .then((response) => {
        let items =response.data;
        this.setState({possible_issue_categories:items})
        console.log("good");
        console.log(Object.keys(items));
      })
      .catch((error)=> {
        console.log(error);
      });
    }

    // refersh page function 
    ReloadTickets = (items,tags)=>{
      
      let dsource=[];
      let all_assignees_dat=[];

      tags.map((cdiv, i) => {
        
        let current_assignees_dat=items[i].recommendStaff;
        
        
        let current_assignees=[];
        let current_assignees_idx=[];
         
        if(current_assignees_dat){
          current_assignees_dat.map((c,i)=>{
            current_assignees.push(current_assignees_dat[i].name);
            current_assignees_idx.push(current_assignees_dat[i].userId);

            let obj={};
            obj[current_assignees_dat[i].name]=current_assignees_dat[i].userId;
            all_assignees_dat.push(obj);
          })
        }else{
          current_assignees=["Not available"];
        }

        console.log(current_assignees);
        
        let assigneeTag_1=
        <div>  
            <DropDown iid={i} parentCallback = {this.AssignmentCallBack} elements={current_assignees}/>
            <Button iid={i} onClick={(event)=>this.assignTickets(event,i)} shape="round">Confirm</Button> 
        </div>;  //(event)=>this.assignTickets(event,i): add a parameter i to callback
  
        //let assigneeTag_2=<div><Button iid={i} onClick={(event)=>this.cancelAssignment(event,i)} danger>Cancel Assignment</Button></div>;

        //1.check if assignee exists for current ticket
        let assigneeTag=[];
        if (items.assignee){
          console.log(items.assignee);
          
          let assigneeTag_2=<div>Assigned: {items.assignee} </div>;
          assigneeTag=assigneeTag_2;
        
        }else{
          assigneeTag=assigneeTag_1;
        }

        let dateObject = new Date(items[i].submittedDate);
        let humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
        
        dsource.push({
            key: i,
            ticket_id: <Button href='/communitymanagement/TicketingDetail' onClick={this.TicketIdStore(items[i].ticketId)} type="link">{items[i].ticketId}</Button>, 
            //unit: items[i].unit_number, 
            subject: items[i].issue, 
            created: humanDateFormat, 
            //category: items[i].issue, 
            //priority: items[i].priority,
            assignee: assigneeTag,
        })

        all_assignees_dat.push(current_assignees_dat);
      });
      this.setState({loading:false});
      this.setState({datasource:dsource}); // it is suggested that try not to directly change state var as next setState may discard the change, use setsTATE instead
      this.setState({all_assignee:all_assignees_dat})
    }

    TicketIdStore = (tid) =>{
      sessionStorage.setItem('inquiredTicketID', 'tid');
    }

    // if need props, use this.props to access
    HomeBlankCallBack = (childData,childProps) => {
      this.setState({
        unit: childData,
      });
      console.log(childData);
      
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

    categoryDropDownCallBack = (childData,childProps,idx) => {
      let pos_locs=this.state.possible_issue_categories[childData];
      if(pos_locs){

      }else{
        pos_locs=["not aviliable"];
      }
      this.setState({
        category: childData,
        issue_category_id:idx,
        possible_locs: pos_locs
      })
      console.log(this.state.issue_category_id);
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
        // let today = new Date();
        // let time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"T"+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let ticketData = {
          "UnitNumber": this.state.unit,
          "Subject": this.state.subject,
          "IssueCategoryId": this.state.issue_category_id,
          "Description": this.state.description+"\n"+"location: "+this.state.location,
          "Availability": "available",
          "Priority":this.state.priorty
        };
        console.log(ticketData);

        axios.post('/communitymanagement/tickets/submit', ticketData)
        .then((response)=> {
          console.log(response);
        })
        .catch((error)=> {
          console.log(error);
        });
        this.setState({ticketSubmitMessage:"Thank you! Ticket has been submitted"})
        
      }

    refershTickets=()=>{
        this.setState({loading:true});
        axios.get('/communitymanagement/tickets/manager')
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
            if(items[i].priorty==="high"){
              items[i].priortyidx=3;
            }
            if(items[i].priorty==="medium"){
              items[i].priortyidx=2;
            }
            if(items[i].priorty==="low"){
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
      
    AssignmentCallBack = (childData,childProps) => {
      let existingAssignments=this.state.assignment;
      let iid=childProps.iid;
      let current_assignees_dat=this.state.all_assignee[iid];

      let assigneeName=childData;
      let assigneeIdx=current_assignees_dat[current_assignees_dat.findIndex(o=>Object.keys(o)==assigneeName)];
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
      console.log(this.state.assignment);
      let obj=this.state.assignment.find(o=>Object.keys(o)==i);
      let tid=this.state.allTicketsContent[i].ticket_id;

      axios.put("/communitymanagement/tickets/"+tid.toString()+"/assignees", obj[1]) // return userId
        .then((response)=> {
          console.log(response);
        })
        .catch((error)=>  {
          console.log(error);
        });
      this.refershTickets();

        // test without backend communication
      let items=this.state.allTicketsContent;
      items[i].assignee=obj[i];
      this.setState({allTicketsContent:items})
      this.ReloadTickets(items,this.state.allTicketsTag);
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
      //{
      //  title: 'Unit',
      //  dataIndex: 'unit',
      //},
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
      //{
      //  title: 'Category',
      //  dataIndex: 'category',
      //},
      //{
        //title: 'Priority',
        //dataIndex: 'priority',
        //sorter: (a, b) => a.priortyidx - b.priortyidx,
        //sortDirections: ['descend', 'ascend'],
      //},    
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
                
                <Col xs={8}>
                  <h3> Existing Work Orders </h3>
                  <Space direction="vertical">
                    <Button onClick={this.refershTickets}>Refersh Ticket</Button>
                    {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table scroll={{y:400}} dataSource={this.state.datasource} columns={columns} />}
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