
import React, { Component } from 'react';
import { Spin,Form,Select } from 'antd';
import axios from 'axios'

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

    // loadIssueCategory=()=>{
    //     axios.get('/communitymanagement/ticket-issue-categories')
    //     .then((response) => {
    //       let items =response.data;
    //       this.setState({possible_issue_categories:Object.keys(items["Others"])});
    //       console.log("good");
    //       console.log(this.state.possible_issue_categories);
    //       this.setState({loading:false});
    //     })
    //     .catch((error)=> {
    //       console.log(error);
    //     });
    // }

    componentDidMount(){
        this.loadIssueCategory();
    }

    render() {
        const { Option } = Select;
       
        // let all_options=[];
        // this.state.possible_issue_categories.map((item,i)=>{
        //     all_options.push(<Option ket={i}>{item}</Option>)
        // });
        // console.log(all_options);

        return (
            <div className="additionalInfo">
                  
                   <Form.Item
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
                    }
                    </Form.Item>

                    
               
            
            </div>
        );
    }
}

export default StaffSignUp;
