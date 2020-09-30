
import React, { Component } from 'react';
import { Input, DatePicker,Tooltip,Form } from 'antd';
import {InfoCircleOutlined,FieldNumberOutlined,UserOutlined} from '@ant-design/icons';
import moment from 'moment';

class ResidentSignUp extends Component {
    onChange = (param)=>{
        // console.log(moment(param).format("YYYY/MM/DD"));
        // alert(moment(param).format("YYYY-MM-DD"));
       moment(param).format("YYYY-MM-DD");
     
    }
    
    render() {
        const dateFormat = 'YYYY-MM-DD';

        return (
            <div className="additionalInfo">
                    {/* <h1>This is RESIDENT additional components</h1> */}
                   <Form.Item
                         label ="Unit Number " 
                         name="unit_num"
                         rules={[{ required: true, message: 'Please input your Unit Number!' }]}
                    >
                                   
                       <Input prefix={<FieldNumberOutlined className="site-form-item-icon" />}  placeholder="Unit Number" />
                    </Form.Item>
                    
                    <Form.Item
                         label ="Birth Date " 
                         name="birthday"
                         rules={[{ required: true, message: 'Please select your birth date!' }]}
                    >
                         <DatePicker placeholder = "birth date" format = {dateFormat} onChange={this.onChange} style={{ width: '100%' }} />      
    
                    </Form.Item>
               
            
            </div>
        );
    }
}

export default ResidentSignUp;