
import React, { Component } from 'react';
import { Input, DatePicker,Tooltip,Form } from 'antd';
import {InfoCircleOutlined,FieldNumberOutlined,UserOutlined} from '@ant-design/icons';


class ResidentSignUp extends Component {

    constructor(){
        super();
        this.state = {
            // birthday: "",
            // unit_number: "",
        }
       
    }

    // inputChangeUnitNumber=(e)=>{
         
    //     let value = e.target.value;
    //     this.setState({
    //        unit_number: value,
    //     })
    
    //  }

    onChange = (param)=>{

        return param;
        
        // console.log(moment(param).format("YYYY/MM/DD"));
        // alert(moment(param).format("YYYY-MM-DD"));
        
        // this.setState({
        //    birthday: param,
        // })
    
        // return this.props.add2(this.state.birthday);
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