import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RegistrationForm from "../components/RegistrationForm";
import LoginForm  from "../components/LoginForm";
import image1 from '../asset/back1.jpeg';

class LoginPage extends Component {
    
    constructor(){
        super();
        this.state ={
            // formType: "Maintanence"
        };
    }
   

    render() {
        // const bgGround = {
        //     height: '100%',
        //     width: "100%",
        //     backgroundImage: 'url(' +image1+ ')'//图片的路径
        //   };
        
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