import React,{Component,Fragment} from "react";
 import {Radio, Row, Col,Form, Input, Button, Checkbox } from 'antd';
 import { UserOutlined, LockOutlined } from '@ant-design/icons';
 import {LoginRequest} from './AccountAxios';
 
 class Login extends Component{
     constructor(){
         super();
         this.state  = {
            //  value:0
         };
 
     }
       onFinish = (values) => {
        LoginRequest(values).then(response =>{
               
               console.log(response);
           }).catch(error =>{
                console.log(error);
           })
     
       };
 
       onChange = e => {
         console.log('radio checked', e.target.value);
         this.setState({
           value: e.target.value,
         });
       };
 
 
 
     render(){
         return(
                  <Fragment>
                     <div className = "form-header">
                         <p className = "column">Login</p>
                     
                     </div>
                      
                     <div className = "form-content">
 
                             <Form
                                 name="normal_login"
                                 className="login-form"
                                 initialvalues={{ remember: true }}
                                 onFinish={this.onFinish}
                                 >
                               
                                 <Form.Item
                                      name="email"
                                     rules={[{ required: true, message: 'Please input your Email!' }]}
                                 >
                                      
                                 <Input type = "email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
