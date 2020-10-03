import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <div className = "nav">
                <a href = {this.props.dashboard} className = "left-nav">Dashboard</a>
                <a href = {this.props.ticket} className = "left-nav">Ticket</a>
                <a href = {this.props.chat} className = "left-nav">Chat</a>
                <a href = {this.props.logout} className = "right-nav">Logout</a>
            </div>
        );
    }
}

export default Navigation;