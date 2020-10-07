import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Blank from '../components/Blank';
import DropDown from "../components/DropDown";
import {Table, Spin, Button,Space, Tag} from 'antd';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

class TicketingResident extends Component {
    constructor() {
        super();
        this.state = {
            allTicketsTag: ['tk1', 'tk2', 'tk3', 'tk4'],
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
        }
    }

    componentDidMount(){
          this.refreshTickets();
          this.loadIssueCategory();       
    }

    loadIssueCategory=()=>{
      axios.get('/communitymanagement/ticket-issue-categories')
      .then((response) => {
        let items =response.data;
        this.setState({possible_issue_categories:items})
        console.log("good");
        console.log(items);
        console.log(Object.keys(items));
      })
      .catch((error)=> {
        console.log(error);
      });
    }

    reloadTickets = (items,tags)=>{      
        let dsource=[];
  
        tags.map((cdiv, i) => {
          
        let tagColor = "";
        let tagText = "";
        if (items[i].status ==='OPEN') {
            tagColor = 'red';
            tagText = "Submitted";
        } else if (items[i].status === "ASSIGNED") {
            tagColor = 'gold';
            tagText = "Manager received";
        } else if (items[i].status === "COMPLETE"){
            tagColor = 'green';
            tagText = "Complete, open ticket to write review";
        } else if (items[i].status === "INPROGRESS"){
            tagColor = 'blue';
            tagText = "Staff accept";
        }

        let statusTag=<Tag color={tagColor} >{tagText}</Tag>;

        let humanDateFormat="N/A";
        if(items[i].fixDate){
            let dateObject = new Date(items[i].fixDate);
            humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
        }else{
            humanDateFormat ="N/A";
        }
       
        
        dsource.push({
            key: i,
            ticket_id: <Button href={'/communitymanagement/TicketingDetail?ticket='+items[i].ticketId.toString()}  type="link">{items[i].ticketId}</Button>, 
            //unit: items[i].unit_number, 
            subject: items[i].subject, 
            fix: humanDateFormat, 
            //category: items[i].issue, 
            status: statusTag,
        })
        });
        this.setState({loading:false});
        this.setState({datasource:dsource}); // it is suggested that try not to directly change state var as next setState may discard the change, use setsTATE instead
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
      console.log(this.state.issue_category_id_current);
      let idx=this.state.possible_locs.findIndex(o=>o==childData);
      console.log(this.state.issue_category_id_current[idx]);
      this.setState({
        location: childData,
        issue_category_id: this.state.issue_category_id_current[idx]
      })
    }

    categoryDropDownCallBack = (childData,childProps,idx) => { // how backend's issue-category-id works? issue-category-id has pre-defined id for pre-defined categoty-locatoin combinations
      console.log(this.state.possible_issue_categories);
      
      let pos_locs=this.state.possible_issue_categories[childData];
      let pos_loc_name=[];
      let issue_category_id_c=[];
      if(pos_locs){
        for(var k in pos_locs){
          pos_loc_name.push(k);
          issue_category_id_c.push(pos_locs[k]);
        } 

      }else{
        pos_locs=["not aviliable"];
      }

      this.setState({
        category: childData,
        issue_category_id_current:issue_category_id_c,
        possible_locs: pos_loc_name
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
        this.setState({ticketSubmitMessage:"Submitting Ticket..."})
        // let today = new Date();
        // let time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"T"+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //Be aware... Backend need to accept json, so no "string" for keys
        let ticketData = {
          unitNumber: this.state.unit,
          subject: this.state.subject,
          issueCategoryId: this.state.issue_category_id,
          description: this.state.description+"\n"+"location: "+this.state.location+"\n"+"Contact method: "+this.state.contact_method,
          availability: "available",
          priority:this.state.priorty
        };
        console.log(ticketData);

        axios.post('/communitymanagement/tickets/submit', ticketData)
        .then((response)=> {
          console.log(response);
          alert("Thank you! Ticket has been submitted");
          this.refreshTickets();
        })
        .catch((error)=> {
          console.log(error);
          alert("Ticket submission failed. Contact Manager for support")
        });
      }

      refreshTickets=()=>{
        this.setState({loading:true});
        this.setState({ticketSubmitMessage:""})
        axios.get('/communitymanagement/tickets/resident')
        .then((response) => {
          console.log(response);
          let items =response.data.tickets;
          let tags =[];
          
          
          let id_dat=sessionStorage.Resident_ticket_id
          let priority_dat=sessionStorage.Resident_ticket_priority;
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

    render() {
        // const { TextArea } = Input;
        // const location = ["--None--", "Balcony/Patio", "Dining Room", "Elevator", "Exterior",
        //     "Hallway", "Kitchen", "Laundry Room", "Living Room", "Master Bathroom",
        //     "Master Bedroom", "Other Bathroom", "Other Bedroom", "Stairs", "Unit Wide", "Utility Closet"];
        // const category = ["--None--", "Appliance", "Electrical", "Exterior", "HVAC", "Interior",
        //     "Locks/Keys", "Plumbing"];
        // const contact = ["--None--", "phone", "email"];

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
            title: 'Will be fixed at',
            dataIndex: 'fix',
            sorter: (a, b) => Date.parse(a.fix) - Date.parse(b.fix),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        ];

        return (
            <div className="ticketing-resident">
                <Navigation />
                <div className="main">
                    <h3> Submit a Work Order </h3>
                  <Container fluid>
                      <Row>
                        <Col xs={4}>
                            <Row>  
                                <Col>
                                    <Blank text="Home" parentCallback = {this.HomeBlankCallBack}/>
                                    <Blank text="First Name" parentCallback = {this.FnameBlankCallBack}/>
                                    <Blank text="Last Name" parentCallback = {this.LnameBlankCallBack}/>
                                    <p>Description</p>
                                    <input text="Description" className = "description-box" onChange={this.DescriptionCallBack}></input>
                                    <Button onClick={this.SubmitTickets} type="primary">Submit</Button>
                                    <div>{this.state.ticketSubmitMessage}</div>
                                </Col>                  
                                <Col>
                                    <Blank text="Ticket Title" parentCallback = {this.subjectBlankCallBack}/>
                                    <DropDown elements={['phone','email','textMassage']} description="Contact Method" parentCallback = {this.contactDropDownCallBack}/>
                                    
                                    <DropDown elements={Object.keys(this.state.possible_issue_categories)} description="Location" parentCallback = {this.categoryDropDownCallBack} />
                                    <DropDown elements={this.state.possible_locs} description="Category" parentCallback = {this.locationDropDownCallBack} />
                                    <DropDown elements={["HIGH",'MEDIUM','LOW']} description="Priority" parentCallback = {this.priortyDropDownCallBack} />
                                
                                </Col> 
                            </Row>   
                      </Col>
                     
                        <Col xs={8}>

                            <h5>Maintenance History</h5>
                                <Button onClick={this.refreshTickets}>refresh Ticket</Button>
                                {this.state.loading ? <Spin tip="Loading Tickets..." /> :<Table dataSource={this.state.datasource} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 250 }}/>}
                        </Col>  
                      </Row>                   
                    </Container>
                    
                </div>
                <Footer />
            </div>
        );
    }
}

export default TicketingResident;