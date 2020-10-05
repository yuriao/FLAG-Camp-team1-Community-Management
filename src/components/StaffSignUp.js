
import React, { Component } from 'react';
import {Form,Select } from 'antd';


class StaffSignUp extends Component {
    
    constructor(){
        super();
        this.state = {
          allTicketsTag: [],    // set initial state with one div
          allTicketsContent: [],
          possible_issue_categories:[],
          loading:true
       }
    }

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
                   {this.state.loading ? <Spin tip="Loading Options..." /> : 
                    <Select
                        labelInValue
                        defaultValue={{ value: 'Maintenance Category' }}
                        style={{ width: '100%' }}
                        onChange={this.handleChange}
                    >
                        <Option value="147">Appliances Repair</Option>
                        <Option value="1">Appliances</Option>
                        <Option value="2">Cable</Option>
                        <Option value="3">Water</Option>
                        <Option value="4">Electricity</Option>
                        <Option value="5">Floor</Option>
                        <Option value="6">Door</Option>
                        <Option value="144">Plumbing</Option>
                        <Option value="149">Handyman</Option>
                    </Select>
                    }
                    </Form.Item>

                    
               
            
            </div>
        );
    }
}

export default StaffSignUp;