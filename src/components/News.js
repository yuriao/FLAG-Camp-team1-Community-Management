import React, { Component } from 'react';

class News extends Component {
    render() {
        return (
            <div className="news-item">
                <span className="subject">{this.props.subject}</span>
                <span className="date">{this.props.date}</span>
            </div>
        );
    }
}

export default News;