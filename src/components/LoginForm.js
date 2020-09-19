import React,{Component,Fragment} from "react";
 import {Radio, Row, Col,Form, Input, Button, Checkbox } from 'antd';
 import { UserOutlined, LockOutlined } from '@ant-design/icons';
 
 
 class Login extends Component{
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
           alert("login: sign up button clicked")
          this.props.switchForm("register")
       }
 
     render(){
         return(
                  <Fragment>
                     <div className = "form-header">
                         <h5 className = "column">Login</h5>
                         <span onClick={this.toggleForm}>Sign Up</span> 
                     </div>
                      
                     <div className = "form-content">
 
                             <Form
                                 name="normal_login"
                                 className="login-form"
                                 initialvalues={{ remember: true }}
                                 onFinish={()=>this.onFinish}
                                 >
                                 <div className= "inputbox">
                                 <Form.Item
                                      name="username"
                                     rules={[{ required: true, message: 'Please input your Username!' }]}
                                 >
                                     
                                 <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                 </Form.Item>
 
                                 <Form.Item
                                     name="password"
                                     rules={[{ required: true, message: 'Please input your Password!' }]}
                                 >
                                 <Input  
                                 prefix={<LockOutlined className="site-form-item-icon" />}
                                     type="password" 
                                     placeholder="Password"
                                 />
                                 </Form.Item>
 
                                 </div>
                                
 
                                 <Form.Item>
                                    
                                     <Radio.Group onChange={this.onChange} value={this.state.value}>
                                         <Radio value={1}>Resident</Radio>
                                         <Radio value={2}>Manager</Radio>
                                         <Radio value={3}>Maintanence</Radio>
                                      
                                     </Radio.Group>
              
                                 </Form.Item>
                                 
                                 <Form.Item>
                            
                                     <a className="login-form-forgot" href="">
                                     Forgot password
                                     </a>
                                 </Form.Item>
 
                                 <Form.Item>
                                     
                                     <Button type="primary" htmlType="submit" className="login-form-button" block>
                                     Log in
                                     </Button>
                                     
                                 </Form.Item>
                             </Form>
                     </div>
                 </Fragment>              
            
         )
     }
 }
 export default Login;
