import React, { Component } from 'react';
import {LogoutRequest} from './AccountAxios';
import {withRouter} from 'react-router-dom';

class Navigation extends Component {

    logoutFunc= () => {

  LogoutRequest().then(
                response =>{          
                    const status = response.status;
                    if(status == 200){
                      alert("You have logged out successfully!");
                      this.props.history.push('/');

                    }
                    console.log(response);
                }
                ).catch(error =>{
                    console.log("error info: ",error);
                })

     
};

    render() {
        return (
            <div className = "nav">
                <a href = "#dashboard" className = "left-nav">Dashboard</a>
                <a href = "#ticket" className = "left-nav">Ticket</a>
                <a href = "#chat" className = "left-nav">Chat</a>
                <a onClick = {this.logoutFunc} href = "#logout" className = "right-nav">Logout</a>
            </div>
        );
    }
}

export default withRouter(Navigation);