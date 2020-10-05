import React, { Component } from 'react';
import { Tag } from "antd";

class StatusTag extends Component {

	render() {
		if (this.props.status === "OPEN")
			return (
				<Tag color="red">OPEN</Tag>
			); else if (this.props.status === "ASSIGNED") {
				return (
					<Tag color="gold">ASSIGNED</Tag>
				);
			} else if (this.props.status === "INPROGRESS"){
				return (
					<Tag color="blue">IN PROGRESS</Tag>
				);
			} else if (this.props.status === "COMPLETE"){
				return (
					<Tag color="green">COMPLETED</Tag>
				);
			}
	}
}

export default StatusTag;