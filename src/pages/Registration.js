import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RegistrationForm from "../components/RegistrationForm";


class RegisterPage extends Component {
    
    constructor(){
        super();
        this.state ={
            user_type: "maintanence"
        };
    }
   
    getUserType() {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('usertype');
        return myParam;
    }

    render() {
        
        return (
            
            <div className="registerLogin">
                <Navigation />
                <div className="main">
                
                  <div className = "registerPart">
                
                  <RegistrationForm  user_type = {this.getUserType()}/>
                    
                  </div>
                </div>
            
               <Footer/>
               
            </div>
            
        );
    }
}

export default RegisterPage;