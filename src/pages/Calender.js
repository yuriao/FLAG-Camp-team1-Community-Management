import React, {Component} from 'react';

import { Spin,Calendar } from 'antd';
import {CalendarRequest} from '../components/CalendarAxios';
import moment from 'moment';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import axios from 'axios'

class Calender extends Component{
  constructor(){
    super();
    this.state = {
     allTicket:[], 
     ticketId:[],
     loading:true

//       ticketDetail: { "ticket_id": "1423124315",
//           "user_name": "daloias",
//           "assignee": ["Umisc co."],
//           "subject": "bear sleeping on sofa",
//           "description": "I can see from the window that the bear is sleeping on my sofa and eat all the snacks around it! I'm so afraid to go inside now...",
//           "category": "misc",
//           "issue": "",
//           "ticket_status":"in progress",
//           "created":"09-19-2020T20:30:23",
//           "fix_date":"09-19-2020T21:30:23",
//           "priority": "high"}
// ,
//       ticketComments:[
//           {
//               "user_name": "Manager",
//               "created": ["09-19-2020T20:40:23"],
//               "body": ["Umisc co. will fix this issue"],
//           },
//           {
//           "user_name": "Umisc co.",
//           "created": ["09-19-2020T21:20:23"],
//           "body": ["We will be there after preperation"],
//       }],
//       listData:[],
//       currentComment:[]
  }
}



componentDidMount(){
    this.getAllData();
    // let usr_type=sessionStorage.getItem("user_type");
    // if(usr_type=="RESIDENT"){
    //     this.setState({ticketId:sessionStorage.getItem("Resident_ticket_id").split(",")})
    // }
    // if(usr_type=="MANAGER"){
    //     this.setState({ticketId:sessionStorage.getItem("Manager_ticket_id").split(",")})
    // }
    // if(usr_type=="STAFF"){
    //     this.setState({ticketId:sessionStorage.getItem("Staff_ticket_id").split(",")})
    // }
}

 getAllData =()=>{
  
    // axios.get("http://localhost:8080/communitymanagement/calendar?from=2020-01-01&to=2021-01-01")
    // .then((response) => {
    // // successful callback
    // console.log(response);
    // let item=response.data;
    // console.log("item is:", item);
    // if (!item || item.length === 0) {
    //   alert('No data!');
    //   this.setState({ loading: false });
    // } else {
    //     this.setState({ loading: false });
    //     this.setState({ allTicket: item });
    //     console.log(this.state.allTicket);
    // }
    // }).catch((error)=> {
    //         console.log(error);
    //         this.setState({loading:false});
    // });
   CalendarRequest().then(response=>{
     console.log("GET RESPONSE: ",response);
     if(response.status == 200){

      let item=response.data; 
      console.log("item is:", item);
      if (!item || item.length === 0) {
        alert('No data!');
        this.setState({ loading: false });
    } else {
        this.setState({ loading: false });
        this.setState({ allTicket: item });
        console.log(this.state.allTicket);
    }
      
    }else{
      console.log(response);
    }
   })
 
 }

  getListData=(value)=> {


    let listData = [];
    this.state.allTicket.map((item, i) => {
      console.log(value);
      console.log("created:",item.created);
      console.log("fixed:",item.fixDate);
      //if (moment(value).format('YYYY-MM-DD') === moment(item.fixDate).format('YYYY-MM-DD') && this.state.ticketId.includes(item.id)) {

      let usrType=sessionStorage.getItem('user_type');
      if(item.fixDate){ // show all tickets, if has a fix date then display fixDate, else display create date
        if (moment(value).format('YYYY-MM-DD') === moment(item.fixDate).format('YYYY-MM-DD')) {
          listData.push(item);
        }
      }else{
        if (moment(value).format('YYYY-MM-DD') === moment(item.created).format('YYYY-MM-DD')) {
          listData.push(item);
        }
      }
      

      

      
    })
    
    return listData;
  }

   
   
  
  
  dateCellRender=(value)=> {
 
    const listData = this.getListData(value);
    
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.created}>
              
              {/*<span className={`event-${item.priority}`}>●</span>*/}
              {/* item.description} */}
             
              <a href={'/communitymanagement/TicketingDetail?ticket='+item.id.toString()}><span className={`event-${item.status}`}>●</span> {item.id}</a>
            </li>
          ))
        }
      </ul>
    );
  }
  
  getMonthData=(value)=> {
   
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  monthCellRender=(value)=> {
   
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  
  render(){
    return (
      <div>
        <Navigation/>
        <div class="calenderWelcome">
            Ticket Calender
        </div>
        <div >
            <span className={`event-OPEN`}>●</span>submitted <span className={`event-ASSIGNED`}>●</span>Manager acknowledged <span className={`event-INPROGRESS`}>●</span>Staffs on their way <span className={`event-COMPLETE`}>●</span> Complete, please write review inside ticket
        </div>
       <div>
       {this.state.loading ? <div className="loadingSpin"><Spin tip="Loading Calendar..." /></div> :<Calendar   dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />}
       </div>
      
        <div>
        <Footer/>
        </div>
        
      </div>
      
    );
  }

}


export default Calender;