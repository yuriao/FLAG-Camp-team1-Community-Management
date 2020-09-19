import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <div className = "nav">
                <a href = "#dashboard" className = "left-nav">Dashboard</a>
                <a href = "#ticket" className = "left-nav">Ticket</a>
                <a href = "#chat" className = "left-nav">Chat</a>
                <a href = "#logout" className = "right-nav">Logout</a>
            </div>
        );
    }
}

export default Navigation;