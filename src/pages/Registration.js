import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RegistrationForm from "../components/RegistrationForm";


class RegisterPage extends Component {
    
    constructor(){
        super();
        this.state ={
            user_type: "resident"
        };
    }
   

    render() {
        
        return (
            
            <div className="registerLogin">
                <Navigation />
                <div className="main">
                
                  <div className = "registerPart">

                  <RegistrationForm user_type = {this.state.user_type}/>
                    
                  </div>
                </div>
            
               <Footer/>
               
            </div>
            
        );
    }
}

export default RegisterPage;