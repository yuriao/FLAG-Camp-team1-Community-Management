import React,{Component,Fragment} from "react";

import {Radio, Row, Col,Form, Input, Button, Checkbox } from 'antd';

import {MailOutlined,UserOutlined, LockOutlined } from '@ant-design/icons';
import ResidentSignUp from './ResidentSignUp';
import ManagerSignUp from './ManagerSignUp';
import StaffSignUp from './StaffSignUp';

class RegisterForm extends Component{
    constructor(){
        super();
        this.state  = {
           
        };

    }
      onFinish = values => {

        console.log('Received values of form: ', values);
      };


   
      toggleForm = ()=>{
          alert("Sign Up: login button clicked")
        this.props.switchForm("login");
    }

    render(){

        const result = () =>{
            if(this.props.formType === "Resident"){
                return <ResidentSignUp/>;
            }
            else if(this.props.formType === "Manager"){
              
                return <ManagerSignUp/>;
            }
            else {
              
                return <StaffSignUp/>;
            }
        }
        return(
                 <Fragment>
                     <h4>Welcome to {this.props.formType} Portal!</h4>
                    <div className = "registerform-header">
                        <p className = "column">Create a new account</p>
                        
                    </div>
                     
                    <div className = "form-content">

                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={()=>this.onFinish}
                                >
                 
                                <Form.Item
                                    label ="First Name: " 
                                     name="FirstName"
                                    rules={[{ required: true, message: 'Please input your First Name!' }]}
                                >
                                   
                                <Input prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="First Name" />
                                </Form.Item>

                                <Form.Item
                                    label ="Last Name: "
                                     name="LastName"
                                    rules={[{ required: true, message: 'Please input your Last Name!' }]}
                                >
                                   
                                <Input prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="Last Name" />
                                </Form.Item>

                                <Form.Item
                                   label ="Email:"
                                      name="Email"
                                    rules={[{ required: true, message: 'Please input your Email address!' }]}
                                >
                                    
                                <Input type = "email" prefix={<MailOutlined className="site-form-item-icon" />}  placeholder="Email Address" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type = "password" prefix={<LockOutlined className="site-form-item-icon" />}  placeholder="Paasowrd"   />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                        },
                                    }),
                                    ]}
                                >
                                    <Input type = "password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm your paasowrd" />
                                </Form.Item>

                               

                                <Form.Item>     
                               
                                {result()}
                               
                                </Form.Item>
                                
                                <Form.Item>
                                   
                              
                                   
                                    <a className="login-form-forgot" href="">
                                    Forgot password
                                    </a>
                                </Form.Item>

                                <Form.Item>
                                    
                                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                                        Register
                                    </Button>
                                    
                                </Form.Item>
                            </Form>
                    </div>
                </Fragment>              
           
        )
    }
}
export default RegisterForm;
