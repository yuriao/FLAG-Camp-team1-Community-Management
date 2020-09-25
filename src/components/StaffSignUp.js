
import React, { Component } from 'react';
import { Input, DatePicker,Tooltip,Form,Select } from 'antd';
import {InfoCircleOutlined,FieldNumberOutlined,UserOutlined} from '@ant-design/icons';


class StaffSignUp extends Component {
    
    handleChange = (param)=>{
        alert(param.value);
    }

    render() {
        const { Option } = Select;

        // function handleChange(value) { 
        // console.log(value); 
        // }

        

        return (
            <div className="additionalInfo">
                    {/* <h1>This is STAFF additional components</h1> */}
                   <Form.Item
                         label ="Category " 
                         name="UnitNumber"
                         rules={[{ required: true, message: 'Please input your Unit Number!' }]}
                    >
                    
                    <Select
                        labelInValue
                        defaultValue={{ value: 'Maintenance Category' }}
                        style={{ width: '100%' }}
                        onChange={this.handleChange}
                    >
                        <Option value="appliances">Appliances</Option>
                        <Option value="cable">Cable</Option>
                        <Option value="water">Water</Option>
                        <Option value="electricity">Electricity</Option>
                    </Select>
                    </Form.Item>

                    
               
            
            </div>
        );
    }
}

export default StaffSignUp;
