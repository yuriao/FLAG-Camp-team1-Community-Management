import React, { Component } from 'react';

class DropDown extends Component {
    render() {
        const elements = this.props.elements;

        const items = [];

        for (const [index, value] of elements.entries()) {
            items.push(<option key={index}>{value}</option>)
        }

        return (
            <div>
                <p>{this.props.description}</p>
                <select>
                    {items}
                </select>
            </div>
        )
    }
}

export default DropDown;