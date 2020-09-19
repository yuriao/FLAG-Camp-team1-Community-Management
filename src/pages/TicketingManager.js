import React, {Component} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TicketQuickShot from '../components/TicketQuickShot';
import Button from 'react-bootstrap/Button';

class TicketingManager extends Component {
    constructor(){
        super();
        this.state = {
            allTicketsTag: ['tk1','tk2','tk3'],    // set initial state with one div
            allTicketsContent: [{
                "ticket_id":"0001233",
                "subject": "water leak",
                "created": "09/18/2020",
                "priority": "high"
            },
            {
                "ticket_id":"0032134",
                "subject": "bear sleeping on sofa",
                "created": "09/10/2020",
                "priority": "medium"                
            },
            {
                "ticket_id":"0123435",
                "subject": "sink clog",
                "created": "09/11/2020",
                "priority": "medium"                
            }
        ]
         }
    }
    // the point is, we only display 7 days on page, so only need 7 arrays. for exact days info, will pass from db and will add checking codes later
    // if need props, use this.props to access
    addTickets(){
        let cDivs = this.state.allTicketsTag;
        //fetchAPI to create ticket
        cDivs.push('tk')
        this.setState({customDiv: cDivs })
      }

    refershTickets(){
        let cDivs = this.state.allTicketsTag;
        //fetchAPI to get all tickets
        cDivs.push('tk')
        this.setState({customDiv: cDivs })
      }

    render() {
        let ticketDivs=[];
        this.state.allTicketsTag.map((cdiv, i) => {
            ticketDivs.push(<TicketQuickShot 
                ticket_id={this.state.allTicketsContent[i].ticket_id} 
                subject={this.state.allTicketsContent[i].subject} 
                created={this.state.allTicketsContent[i].created} 
                priority={this.state.allTicketsContent[i].priority} 
                key={cdiv} 
                id={cdiv}/>);
          })
        return(
            <div>
                <Navigation/>

                <div class="managerWelcome">
                    Welcome Manager
                </div>
                <Button variant="primary" size="sm">Refersh</Button>
                <Button variant="primary" size="sm">Add</Button>
                <div class="allTicketItems">
                     {ticketDivs}
                </div>
                <div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default TicketingManager;