import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Blank from '../components/Blank';
import DropDown from "../components/DropDown";
import Button from "../components/Button";

class TicketingResident extends Component {
    // constructor
    // functions
    render() {
        const location = ["--None--", "Balcony/Patio", "Dining Room", "Elevator", "Exterior",
            "Hallway", "Kitchen", "Laundry Room", "Living Room", "Master Bathroom",
            "Master Bedroom", "Other Bathroom", "Other Bedroom", "Stairs", "Unit Wide", "Utility Closet"];
        const category = ["--None--", "Appliance", "Electrical", "Exterior", "HVAC", "Interior",
            "Locks/Keys", "Plumbing"];
        const contact = ["--None--", "phone", "email"];
        return (
            <div className="ticketing-resident">
                <Navigation />
                <div className="main">
                    <h1> SUBMIT A WORK ORDER </h1>
                    <h2>Contact Info</h2>
                    <Blank text="Home" />
                    <Blank text="First Name" />
                    <Blank text="Last Name" />
                    <Blank text="Email" />
                    <Blank text="Phone" />
                    <DropDown elements={contact} description="Preferred Contact Method" />
                    <h2>Issue Description</h2>
                    <DropDown elements={location} description="Location" />
                    <DropDown elements={category} description="Category" />
                    <p>Description</p>
                    <input text="Description" className = "description-box"></input>
                    <div className="buttons">
                        <Button text = "test"/>
                        
                    </div>
                </div>
             
            </div>
        );
    }
}

export default TicketingResident;