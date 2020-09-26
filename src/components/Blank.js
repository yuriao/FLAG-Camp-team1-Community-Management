import React, { Component } from 'react';
import { Input } from 'antd';

class Blank extends Component {
    render() {
        return (
            <div className="blank">
                <p>{this.props.text}</p>
                <Input placeholder={this.props.text} />
            </div>
        );
    }
}

export default Blank;