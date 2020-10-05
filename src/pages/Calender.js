import React, {Component} from 'react';

import { Calendar } from 'antd';
import {CalendarRequest} from '../components/CalendarAxios';

class Calender extends Component{
  constructor(){
    super();
    this.state = {
      singleTicket:
      {
        
      }

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
      this.setState({
        singleTicket: item,
      })   
       console.log(this.state.singleTicket);
    }
   })
 
 }

  getListData=(value)=> {
    let listData;
    this.state.singleTicket.map(item=>{

      console.log("item created date:", item.created);
      console.log(value.date());

      //不能只用date()
      if(value.date() == (item.created).date()){ //2020-10-04 time
       listData = [{
          type: item.priority,
          content: item.description,
      }]}
    });
    return listData;

  //  const dataFromResponse = this.getAllData();
  //   console.log("Come to getListData");
  //   let listData; 
       

  //   this.dataFromResponse.map(element => {
  //     console.log("item created date:", element.created);
  //     console.log(value.date());
  //       if(element.created == value.date()){         
  //         this.listData = [{
  //           type: element.priority,
  //           content: element.description,
  //         }]
  //    }
  //    return listData || [];

  //   });
  


    // switch (value.date()) { //如果value.date()==8,显示8的内容，如果不符合以下任何一个case，什么也不显示
    //   case 8:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event.' },
    //       { type: 'normal', content: 'This is usual event.' },
    //     ]; break;
    //   case 10:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event.' },
    //       { type: 'normal', content: 'This is usual event.' },
    //       { type: 'error', content: 'This is error event.' },
    //     ]; break;

    //     case 13:
    //       listData = [
           
    //         { type: 'error', content: 'TEST' },
    //       ]; break;

    //   case 15:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event' },
    //       { type: 'normal', content: 'This is very long usual event。。....' },
    //       { type: 'error', content: 'This is error event 1.' },
    //       { type: 'error', content: 'This is error event 2.' },
    //       { type: 'error', content: 'This is error event 3.' },
    //       { type: 'error', content: 'This is error event 4.' },
    //     ]; break;
    //   default:
    // }
    // return listData || [];
  }
  
  dateCellRender=(value)=> {
    //拿到每一个日期格子，去getListData看看这个格子有没有内容
    const listData = this.getListData(value);
    // const listData = this.getAllData();
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content}>
              <span className={`event-${item.type}`}>●</span>
              {item.content}
            </li>
          ))
        }
      </ul>
    );
  }
  
  getMonthData=(value)=> {
    // console.log("get month data", value);
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  monthCellRender=(value)=> {
    // console.log("month cell render value is: ", value); 
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
     
      <Calendar   dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
    );
  }

}


export default Calender;