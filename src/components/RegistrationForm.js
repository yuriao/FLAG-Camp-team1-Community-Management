import React,{Component,Fragment} from "react";

import {Radio, Row, Col,Form, Input, Button, Checkbox } from 'antd';

import {MailOutlined,UserOutlined, LockOutlined,PhoneOutlined} from '@ant-design/icons';
import ResidentSignUp from './ResidentSignUp';
import ManagerSignUp from './ManagerSignUp';
import StaffSignUp from './StaffSignUp';
import {Redirect} from "react-router-dom";
import {RegisterRequest} from './AccountAxios';
// import {withRouter} from 'react-router-dom';

class RegisterForm extends Component{
    constructor(){
        super();
        this.state  = {
        //    type: "",
        movingTo:-1
        };
       
    }

    inputChangePassword=(e)=>{
    }
     
    inputChangeFirstName=(e)=>{
    }

    inputChangeLastName=(e)=>{
    }

    inputChangeEmail=(e)=>{
    }

    inputChangePhoneNumber=(e)=>{
    }

    onFinish = (values) => {
        const personType = this.props.user_type;       
        RegisterRequest(values,personType).then(
            response =>{          
                const status = response.status;
                if(status == 200){
                    alert("You have successfully registered your profile!")
                }
                console.log(response);
            }
        ).catch(error =>{
            console.log("error info: ",error);
        })
        this.setState({movingTo:7});
        console.log('Received values of form: ', values);
    };

   
    render(){
        
        const {user_type} = this.props;
        const result = () =>{
            if(user_type == "resident"){
               
                return <ResidentSignUp/>;
            }
            else if(user_type == "manager"){
              
                return <ManagerSignUp/>;
            }
            else if (user_type == "staff") {
               
                return <StaffSignUp/>;
            }
        
        }

        if(this.state.movingTo==7){
            return (<Redirect to="/" />)
        }        

        return(
                 <Fragment>
                     <h4>Welcome to {this.props.user_type} portal!</h4>
                     <br/>
                     <br/>
                    <div className = "registerform-header">
                        {/* <p className = "column">Create a new account</p> */}
                        
                    </div>
                     
                    <div className = "form-content">

                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                            >
                 
                                <Form.Item
                                    label ="First Name: " 
                                     name="first_name"
                                    rules={[{ required: true, message: 'Please input your First Name!' }]}
                                >
                                   
                                <Input onChange = {this.inputChangeFirstName} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="First Name" />
                                </Form.Item>

                                <Form.Item
                                    label ="Last Name: "
                                     name="last_name"
                                    rules={[{ required: true, message: 'Please input your Last Name!' }]}
                                >
                                   
                                <Input onChange = {this.inputChangeLastName} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="Last Name" />
                                </Form.Item>

                                <Form.Item
                                   label ="Email:"
                                      name="username"
                                    rules={[{ required: true, message: 'Please input your Email address!' }]}
                                >
                                    
                                <Input onChange = {this.inputChangeEmail} type = "email" prefix={<MailOutlined className="site-form-item-icon" />}  placeholder="Email Address" />
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
                                    <Input onChange = {this.inputChangePassword} type = "password" prefix={<LockOutlined className="site-form-item-icon" />}  placeholder="Paasowrd"   />
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

                                <Form.Item
                                    name="phone_number"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input onChange = {this.inputChangePhoneNumber} prefix={<PhoneOutlined className="site-form-item-icon" />}  style={{ width: '100%' }} 
                                    placeholder = "Input your phone number"/>
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
