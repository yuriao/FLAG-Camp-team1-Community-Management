import React, {Component} from 'react';

class WorkOrder extends Component {
    render() {
        return(
            <div className = "workorder"> 
                <h2> {this.props.title}</h2>     
                <p>{this.props.user}</p>
                <p>{this.props.progress}</p>    
            </div>
        );
    }
}

export default WorkOrder;