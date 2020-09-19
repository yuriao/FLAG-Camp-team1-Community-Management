import React, {Component} from 'react';

// {} is javascript expression in jsx
class TicketQuickShot extends Component {
    constructor(){
        super();
    }
    render() {
        return(
            <div class="ticketQuickShotBasePanel">
                <div class="ticketQuickShotPanel">
                    <a class="ticketLink" href="">{this.props.ticket_id}</a>
                    <div class="subjectTag">{this.props.subject} </div>
                    <p>{this.props.created}</p>
                    <div>
                        {this.props.priority}
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketQuickShot;