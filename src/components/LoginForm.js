import React,{Component,Fragment} from "react";
 import {Radio, Row, Spin,Col,Form, Input, Button, Checkbox } from 'antd';
 import { UserOutlined, LockOutlined } from '@ant-design/icons';
 import {LoginRequest} from './AccountAxios';
import Password from "antd/lib/input/Password";
 import {setToken,setUserID} from './UserToken';
import {withRouter} from 'react-router-dom';
import {Route, Redirect} from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../pages/redux/Reducer';
import loginAction from '../pages/redux/Actions';
import store from '../pages/redux/Store';

//redux
console.log(store.getState());

 class Login extends Component{
     
     constructor(){
         super();
         this.state  = {
            username:"",
            password: "",
            loading: false,
            movingTo:-2
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
        sessionStorage.username=values.email;
        this.setState({movingTo:-1});
        LoginRequest(values).then(response =>{
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
                    // return(<Redirect to ="/DashboardResident"/>);
                    this.setState({movingTo:0});
                }
                else if (userTypeSession == "MANAGER"){
                    this.setState({movingTo:1});
                }
                else {
                    this.setState({movingTo:2});
                }

            }

            console.log(response);
            // console.log(response.data.firstName);
            //redux
            store.dispatch(loginAction(response.data.firstName));
            // console.log(store.getState());
           }).catch(error =>{    
                this.setState({
                    loading:false,
                    movingTo:-2
                })
                if(error.response.status==403){
                    alert("Your username or password is incorrect! Please try again!");
                }else{
                    alert("There's something wrong with the application, please contact resident office");
                }
                
                console.log(error);
           })
        
       };

     render(){
        const {loading} = this.state;

        if(this.state.movingTo==0){
            return (<Redirect to="/DashboardResident" />)
        }
        if(this.state.movingTo==1){
            return (<Redirect to="/DashboardManager" />)
        }        
        if(this.state.movingTo==2){
            return (<Redirect to="/DashboardStaff" />)
        }         
         return(
             <Fragment>
                <div className = "form-header">
                    <p className = "column">Login</p>
                </div>
                
                <div className = "form-content">

                {this.state.movingTo==-1 ? <Spin tip="Please wait" /> : 
                            
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialvalues={{ remember: true }}
                        onFinish={this.onFinish}>
                
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Email!' }]}>  
                            <Input onChange = {this.inputChangeUserName} type = "email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}>
                                
                            <Input onChange = {this.inputChangePassword}  
                                   prefix={<LockOutlined className="site-form-item-icon" />}
                                   type="password" 
                                   placeholder="Password"/>
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
                    </Form>}
                </div>
             </Fragment>              
            
         )
     }
 }
 export default withRouter(Login);
