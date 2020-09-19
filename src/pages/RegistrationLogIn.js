import React,{Component,Fragment} from "react";

import {Radio, Row, Col,Form, Input, Button, Checkbox } from 'antd';

import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

class RegisterPage extends Component{
    constructor(){
        super();
        this.state ={
            formType: "login"
        };
    }

    switchForm = (values)=>{
        this.setState({
            formType:values
        })
    }
     render(){
         return(
             <div className = "form-wrap">
              <div>

                  {this.state.formType === "login"?
                  <LoginForm switchForm = {this.switchForm}> </LoginForm>
                  :<RegistrationForm switchForm = {this.switchForm}></RegistrationForm>
                  }
                </div>     
            </div>
         )
     }

}
export default RegisterPage;
