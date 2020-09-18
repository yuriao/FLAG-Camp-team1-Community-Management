import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Blank from './components/Blank';

class TicketingResident extends Component {
    // constructor
    // functions
    render() {
        return (
            <div className="ticketing-resident">
                <Navigation />
                <div className="main">
                    <Blank text = "test"/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default TicketingResident;