import React, { Component } from 'react';

class ChatDashboard extends Component {
    render() {
        return (
            <div className="chat-item">
                <span className="sender">{this.props.sender}</span>
                <span className="message">{this.props.message}</span>
                <span className="date">{this.props.date}</span>
            </div>
        );
    }
}

export default ChatDashboard;