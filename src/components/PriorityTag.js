import React, { Component } from 'react';
import { Tag } from "antd";

class PriorityTag extends Component {

	render() {
		if (this.props.priority === "LOW")
			return (
				<Tag color="green">LOW</Tag>
			); else if (this.props.priority === "HIGH") {
				return (
					<Tag color="red">HIGH</Tag>
				);
			} else {
				return (
					<Tag color="blue">MEDIUM</Tag>
				);
			}
	}
}

export default PriorityTag;