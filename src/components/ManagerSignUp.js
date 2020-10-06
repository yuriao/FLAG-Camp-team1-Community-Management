
import React, { Component } from 'react';
import { Input, DatePicker,Tooltip,Form } from 'antd';
import {InfoCircleOutlined,FieldNumberOutlined,UserOutlined} from '@ant-design/icons';
class ManagerSignUp extends Component {
   
    render() {
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
                    {/* <h1>This is Manager additional components</h1> */}
                   {/* <Form.Item
                         label ="Manager ID " 
                         name="ManagerId"
                         rules={[{ required: true, message: 'Please input your Unit Number!' }]}
                    >
                                   
                                <Input prefix={<FieldNumberOutlined className="site-form-item-icon" />}  placeholder="Unit Number" />
                    </Form.Item> */}
                    
                
               
            
            </div>
        );
    }
}

export default ManagerSignUp;
