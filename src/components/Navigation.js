import React, { Component } from 'react';
import {LogoutRequest} from './AccountAxios';
import {withRouter} from 'react-router-dom';
import { Redirect } from "react-router-dom";

class Navigation extends Component {

    constructor(){
        super();
        this.state  = {
           movingTo:-1
        };

    }

    logoutFunc= () => {
        LogoutRequest().then(
        response =>{          
            const status = response.status;
            if(status === 200){
                alert("You have logged out successfully!");
                this.setState({movingTo:7});
            }
            console.log(response);
        }
        ).catch(error =>{
            console.log("error info: ",error);
    })};



    redirectDashboard= (event)=>{
        let userType=sessionStorage.getItem("user_type");
        if(userType){
            if(userType==="RESIDENT"){
                this.setState({movingTo:0});
            }
            if(userType==="MANAGER"){
                this.setState({movingTo:1});
                console.log(this.state.movingTo)
            }
            if(userType==="STAFF"){
                this.setState({movingTo:2});
            }
        }else{
            this.setState({movingTo:7});
        }
    }
    redirectTicketing= ()=>{
        let userType=sessionStorage.getItem("user_type");
        if(userType){
            if(userType==="RESIDENT"){
                this.setState({movingTo:3});
            }
            if(userType==="MANAGER"){
                this.setState({movingTo:4});
            }
            if(userType==="STAFF"){
                this.setState({movingTo:5});
            }
        }else{
            this.setState({movingTo:7});
        }   
    }

    redirectCalendar= ()=>{
        this.setState({movingTo:6});
    }

   
    render() {
        if(this.state.movingTo===0){
            return (<Redirect to="/DashboardResident" />)
        }
        if(this.state.movingTo===1){
            return (<Redirect to="/DashboardManager" />)
        }        
        if(this.state.movingTo===2){
            return (<Redirect to="/DashboardStaff" />)
        }         
        if(this.state.movingTo===3){
            return (<Redirect to="/TicketingResident" />)
        }      
        if(this.state.movingTo===4){
            return (<Redirect to="/TicketingManager" />)
        }  
        if(this.state.movingTo===5){
            return (<Redirect to="/TicketingStaff" />)
        }   
        if(this.state.movingTo===6){
             return (<Redirect to="/Calender" />)
        }        
        if(this.state.movingTo===7){
            return (<Redirect to="/" />)
        }                               
        return (
            <div className = "nav">
                <p onClick={this.redirectDashboard} className = "left-nav" >Dashboard</p>
                <p onClick={this.redirectTicketing} className = "left-nav">Ticket</p>
                <p onClick={this.redirectCalendar} className = "left-nav">Calendar</p>
                <p onClick={this.logoutFunc} className = "left-nav">Logout</p>
            </div>
        );
    }
}

export default withRouter(Navigation);