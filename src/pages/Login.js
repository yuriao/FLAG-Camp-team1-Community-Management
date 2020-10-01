import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RegistrationForm from "../components/RegistrationForm";
import LoginForm  from "../components/LoginForm";

class LoginPage extends Component {
    
    constructor(){
        super();
        this.state ={
            formType: "Maintanence"
        };
    }
   

    render() {
        
        return (
            
            <div className="registerLogin">
                <div className="main">
                  
                  <div className = "centerPart">
                  
                  <LoginForm/>
                  </div>

                </div>
               
            </div>
            
        );
    }
}

export default LoginPage;