import React,{Component,Fragment} from "react";

import {Radio, Row, Col,Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class RegisterForm extends Component{
    constructor(){
        super();
        this.state  = {};

    }
      onFinish = values => {

        console.log('Received values of form: ', values);
      };

      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };

      toggleForm = ()=>{
          alert("Sign Up: login button clicked")
        this.props.switchForm("login");
    }

    render(){
        return(
                 <Fragment>
                    <div className = "form-header">
                        <h5 className = "column">Sign Up</h5>
                        <span onClick = {this.toggleForm}>Log In</span> 
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
                                    {/* prefix={<UserOutlined className="site-form-item-icon" />}  */}
                                <Input placeholder="First Name" />
                                </Form.Item>

                                <Form.Item
                                    label ="Last Name: "
                                     name="LastName"
                                    rules={[{ required: true, message: 'Please input your Last Name!' }]}
                                >
                                    {/* prefix={<UserOutlined className="site-form-item-icon" />}  */}
                                <Input placeholder="Last Name" />
                                </Form.Item>

                                <Form.Item
                                   label ="Email:"
                                      name="Email"
                                    rules={[{ required: true, message: 'Please input your Email address!' }]}
                                >
                                    {/* prefix={<UserOutlined className="site-form-item-icon" />}  */}
                                <Input placeholder="Email Address" />
                                </Form.Item>

                                <Form.Item
                                    label ="Password:"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                <Input  
                                // prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password" 
                                    placeholder="Password"
                                />
                                </Form.Item>

                                <Form.Item
                                    label = "Confirm Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please confirm your Password!' }]}
                                >
                                <Input  
                                // prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password" 
                                    
                                />
                                </Form.Item>

                               

                                <Form.Item>
                                   
                                    <Radio.Group onChange={this.onChange} value={this.state.value}>
                                        <Radio value={1}>Resident</Radio>
                                        <Radio value={2}>Manager</Radio>
                                        <Radio value={3}>Maintanence</Radio>
                                     
                                    </Radio.Group>
             
                                </Form.Item>
                                
                                <Form.Item>
                                    {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                    </Form.Item> */}

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
