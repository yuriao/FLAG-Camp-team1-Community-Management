
import React, { Component } from 'react';
import {Form,Select } from 'antd';


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
                        <Option value="152">Appliances Repair</Option>
                        <Option value="167">Cable</Option>
                        <Option value="165">Water</Option>
                        <Option value="154">Electricity</Option>
                        <Option value="163">Floor</Option>
                        <Option value="147">Plumbing</Option>
                        <Option value="157">Handyman</Option>
                    </Select>
                    </Form.Item>

                    
               
            
            </div>
        );
    }
}

export default StaffSignUp;
