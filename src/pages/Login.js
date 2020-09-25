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
                <Navigation />
                <div className="main">
                  <div className = "leftPart">
                  <LoginForm/>
                  </div>
                  <div className = "rightPart">

                  <RegistrationForm formType = {this.state.formType}/>
                    
                  </div>
                </div>
            
               <Footer/>
               
            </div>
            
        );
    }
}

export default LoginPage;