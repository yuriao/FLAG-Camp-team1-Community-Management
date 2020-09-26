import React, {Component} from 'react';

class Button extends Component {
    render() {
        return (
        <button className={ `btn ${this.props.className}`} >{this.props.content}</button>
        );
    }
}

export default Button;