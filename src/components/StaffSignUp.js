
import React, { Component } from 'react';
import { Input, DatePicker,Tooltip,Form,Select } from 'antd';
import {InfoCircleOutlined,FieldNumberOutlined,UserOutlined} from '@ant-design/icons';


class StaffSignUp extends Component {
    
    handleChange = (param)=>{
       return param.key;
    }

    render() {
        const { Option } = Select;
       

        return (
            <div className="additionalInfo">
                  
                   <Form.Item
                         label ="Category " 
                         name="category"
                         rules={[{ required: true, message: 'Please select your category!' }]}
                    >
                    
                    <Select
                        labelInValue
                        defaultValue={{ value: 'Maintenance Category' }}
                        style={{ width: '100%' }}
                        onChange={this.handleChange}
                    >
                        <Option value="001">Appliances</Option>
                        <Option value="002">Cable</Option>
                        <Option value="003">Water</Option>
                        <Option value="004">Electricity</Option>
                        <Option value="005">Floor</Option>
                        <Option value="006">Door</Option>
                        
                    </Select>
                    </Form.Item>

                    
               
            
            </div>
        );
    }
}

export default StaffSignUp;
