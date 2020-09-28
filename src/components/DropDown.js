import React, { Component } from 'react';

class DropDown extends Component {
    constructor(props) {
        super();
        this.state = {
            value: ''
        };
    
    }

    //handleChange(event) {
    //    this.setState({value: event.target.value});
    //}

    sendData = (event) => {
        console.log(event.target.value);
        this.props.parentCallback(event.target.value,this.props);
    }

    render() {
        const elements = this.props.elements;

        const items = [];

        for (const [index, value] of elements.entries()) {
            items.push(<option key={index}>{value}</option>)
        }

        return (
            <div className="DropDown">
                <p>{this.props.description}</p>
                <select className="DropDownSelect" onChange={this.sendData}>
                    <option value="" selected disabled hidden>Choose one</option>
                    {items}
                </select>
            </div>
        )
    }
}

export default DropDown;