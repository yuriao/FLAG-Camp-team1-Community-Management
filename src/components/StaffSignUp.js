
import React, { Component } from 'react';
import { Input, DatePicker,Tooltip,Form,Select } from 'antd';
import {InfoCircleOutlined,FieldNumberOutlined,UserOutlined} from '@ant-design/icons';


class StaffSignUp extends Component {
    
    handleChange = (param)=>{
        console.log(param.value);
        this.props.category(param.value);
      
    }

    render() {
        const { Option } = Select;
       
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        return (
            <div className="additionalInfo">
                  
                   <Form.Item
                   {...formItemLayout}
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
                        <Option value="147">Appliances Repair</Option>
                        <Option value="2">Cable</Option>
                        <Option value="3">Water</Option>
                        <Option value="4">Electricity</Option>
                        <Option value="5">Floor</Option>
                        <Option value="6">Door</Option>
                        <Option value="144">Plumbing</Option>
                        <Option value="149">Handyman</Option>
{/*                         
                        {"Plumbing":144,"Appliance Repair":147,
                        "Cable":2,"Water":3,"Floor":5,"Appliances":1,
                        
                        "Electricity":4,"Door":6,"Handyman":149} */}
                    </Select>
                    </Form.Item>

                    
               
            
            </div>
        );
    }
}

export default StaffSignUp;
