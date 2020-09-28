import React, { Component } from 'react';
import { Input } from 'antd';

class Blank extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        };
    
    }

    sendData = (event) => {
        this.props.parentCallback(event.target.value,this.props);
    }

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