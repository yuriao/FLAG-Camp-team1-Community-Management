import React, {Component} from 'react';

class WorkOrder extends Component {
    render() {
        return(
            <div className = "workorder"> 
                <p> {this.props.id}</p>     
                <p>{this.props.unit}</p>
                <p>{this.props.category}</p>  
                <p>{this.props.description}</p>
                <p>{this.props.status}</p>
            </div>
        );
    }
}

export default WorkOrder;