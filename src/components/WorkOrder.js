import React, {Component} from 'react';

class WorkOrder extends Component {
    render() {
        return(
            <div className = "workorder"> 
                <span>{this.props.id}</span>     
                <span>{this.props.subject}</span>
                <span>{this.props.priority}</span>  
                <span>{this.props.description}</span>
                <span>{this.props.status}</span>
            </div>
        );
    }
}

export default WorkOrder;