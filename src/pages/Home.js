import React, { Component } from 'react';
import Login from './Login';
import Footer from '../components/Footer';
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';
import {back2} from '../asset/back2.jpeg';
class Home extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="vertical-center" >
                <h1 className="home-title" style={{fontFamily:'Zilla Slab',}}> Welcome to WeLive Portal! </h1>
                <Login />
                <div className ="home-content">
                    <p className="text-center" style={{fontSize:"30px"}}>New user? Register here:</p>
                    <p className="text-center" style={{fontSize:"30px"}}>I am a:</p>
                    <div className="avatar-registration-page" >
                        <a href="/communitymanagement/register?usertype=resident">
                            <Avatar size={140} style={{backgroundColor: '#72C2FA',color: "black", fontSize:"18px"}}>
                                Resident
                            </Avatar>
                        </a>
                        <a href="/communitymanagement/register?usertype=manager">
                            <Avatar size={140}  style={{backgroundColor: '#72C2FA',color: "black", fontSize:"18px"}}>
                                Manager
                            </Avatar>
                        </a>
                        <a href="/communitymanagement/register?usertype=staff">
                            <Avatar size={140}  style={{backgroundColor: '#72C2FA',color: "black", fontSize:"18px"}}>
                              Staff
                        </Avatar>
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;