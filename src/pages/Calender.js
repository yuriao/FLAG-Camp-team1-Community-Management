import React, {Component} from 'react';

import { Calendar } from 'antd';
import {CalendarRequest} from '../components/CalendarAxios';
import moment from 'moment';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

class Calender extends Component{
  constructor(){
    super();
    this.state = {
     allTicket:[], 
   

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
}

 getAllData =()=>{
   CalendarRequest().then(response=>{
     console.log("GET RESPONSE: ",response);
     if(response.status == 200){

      let item=response.data; 
      console.log("item is:", item);
      if (!item || item.length === 0) {
        alert('No data!');
    } else {
        this.setState({ allTicket: item });
        console.log(this.state.allTicket);
    }
      
    }
   })
 
 }

  getListData=(value)=> {


    let listData = [];
    this.state.allTicket.map((item, i) => {
      console.log(value);
      console.log("created:",item.created);

      if (moment(value).format('YYYY-MM-DD') === moment(item.created).format('YYYY-MM-DD') ) {
        listData.push(item);
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
              <span className={`event-${item.priority}`}>●</span>
              {item.description}
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
        <div>

        <Navigation/>
        </div>

       <div>
       <Calendar   dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
       </div>
      
        <div>
        <Footer/>
        </div>
        
      </div>
      
    );
  }

}


export default Calender;