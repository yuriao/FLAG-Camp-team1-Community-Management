import React, { Component } from 'react';
import Login from './Login';
import Footer from '../components/Footer';
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="vertical-center">
                <h1 className="home-title"> Welcome to WeLive Portal! </h1>
                <Login />
                <div>
                    <p className="text-center">New user? Register here:</p>
                    <p className="text-center">I am a:</p>
                    <div className="avatar-registration-page" >
                        <a href="/register?usertype=resident">
                            <Avatar size={80}>
                                Resident
                        </Avatar>
                        </a>
                        <a href="/register?usertype=manager">
                            <Avatar size={80}>
                                Manager
                        </Avatar>
                        </a>
                        <a href="/register?usertype=technician">
                            <Avatar size={80}>
                                Technician
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