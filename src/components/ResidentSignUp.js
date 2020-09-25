
import React, { Component } from 'react';
import { Input, DatePicker,Tooltip,Form } from 'antd';
import {InfoCircleOutlined,FieldNumberOutlined,UserOutlined} from '@ant-design/icons';
class ResidentSignUp extends Component {
    onChange = (param)=>{
        alert(param);
    }
    render() {
        return (
            <div className="additionalInfo">
                    {/* <h1>This is RESIDENT additional components</h1> */}
                   <Form.Item
                         label ="Unit Number " 
                         name="UnitNumber"
                         rules={[{ required: true, message: 'Please input your Unit Number!' }]}
                    >
                                   
                                <Input prefix={<FieldNumberOutlined className="site-form-item-icon" />}  placeholder="Unit Number" />
                    </Form.Item>
                    
                    <Form.Item
                         label ="Birth Date " 
                         name="BirthDate"
                         rules={[{ required: true, message: 'Please select your birth date!' }]}
                    >
                         <DatePicker placeholder = "birth date" onChange={this.onChange} style={{ width: '100%' }} />      
    
                    </Form.Item>
               
            
            </div>
        );
    }
}

export default ResidentSignUp;