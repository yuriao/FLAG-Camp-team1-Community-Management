import React,{Component,Fragment} from "react";
 import {Radio, Row, Col,Form, Input, Button, Checkbox } from 'antd';
 import { UserOutlined, LockOutlined } from '@ant-design/icons';
 import {LoginRequest} from './AccountAxios';
import Password from "antd/lib/input/Password";
 import {setToken,setUserID} from './UserToken';
import {withRouter} from 'react-router-dom';

 class Login extends Component{
     constructor(){
         super();
         this.state  = {
            username:"",
            password: "",
            loading: false,
         };
 
     }

     inputChangeUserName=(e)=>{
         
        let value = e.target.value;
        this.setState({
            username: value,
        })

     }

     inputChangePassword=(e)=>{
         
        let value = e.target.value;
        this.setState({
           password: value,
        })

     }
       onFinish = (values) => {

        const requestData = {
            username: this.state.username,
            password: this.state.password,

        }
        this.setState({
            loading:true,
        })

        LoginRequest(requestData).then(response =>{
               
                    this.setState({
                        loading:false,
                    })
                    const status = response.status;
                    if(status == 200){
                     
                        const userTypeSession = response.data.userType;
                        const userID = response.data.userId;

                        console.log("user type is: ", userTypeSession, "and user id is: ", userID);
                        setToken(userTypeSession);
                        setUserID(userID);

                        if (userTypeSession == "RESIDENT"){
                            this.props.history.push('/DashboardResident');
                        }
                        else if (userTypeSession == "MANAGER"){
                            this.props.history.push('/DashboardManager');
                        }
                        else {
                            this.props.history.push('/DashboardStaff');
                        }

                    }
                    // console.log("status is: ", status);
                    // setToken(status);
                    //在此处做判断看是转到哪里去
                    // this.props.history.push('/DashboardResident');
                             
                    console.log(response);

           }).catch(error =>{
                      
                        this.setState({
                            loading:false,
                        })
                      console.log(error);
           })
        
       };
 

 
 
     render(){
        const {loading} = this.state;
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
                                      name="username"
                                     rules={[{ required: true, message: 'Please input your Email!' }]}
                                 >
                                      
                                 <Input onChange = {this.inputChangeUserName} type = "email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                 </Form.Item>
 
                                 <Form.Item
                                     name="password"
                                     rules={[{ required: true, message: 'Please input your Password!' }]}
                                 >
                                 <Input  onChange = {this.inputChangePassword}  
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
                                     
                                     <Button loading= {this.loading} type="primary" htmlType="submit" className="login-form-button" block>
                                     Log in
                                     </Button>
                                     
                                 </Form.Item>
                             </Form>
                     </div>
                 </Fragment>              
            
         )
     }
 }
 export default withRouter(Login);
