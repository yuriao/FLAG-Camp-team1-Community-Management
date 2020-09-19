import React, { Component } from 'react';

class Blank extends Component {
    render() {
        return (
            <div className="blank">
                <p>{this.props.text}</p>
                <input type="text" required>
                </input>
            </div>
        );
    }
}

export default Blank;