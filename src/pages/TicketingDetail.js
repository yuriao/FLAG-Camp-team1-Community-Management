import React, {Component} from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Ajax from '../components/AJAX'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

class TicketingDetail extends Component {
    constructor(){
        super();
        this.state = {
            ticketDetail: { "ticket_id": "1423124315",
                "user_name": "daloias",
                "assignee": ["Umisc co."],
                "subject": "bear sleeping on sofa",
                "description": "I can see from the window that the bear is sleeping on my sofa and eat all the snacks around it! I'm so afraid to go inside now...",
                "category": "misc",
                "issue": "",
                "ticket_status":"in progress",
                "created":"09-19-2020T20:30:23",
                "fix_date":"09-19-2020T21:30:23",
                "priority": "high"}
,
            ticketComments:[
                {
                    "user_name": "Manager",
                    "created": ["09-19-2020T20:40:23"],
                    "body": ["Umisc co. will fix this issue"],
                },
                {
                "user_name": "Umisc co.",
                "created": ["09-19-2020T21:20:23"],
                "body": ["We will be there after preperation"],
            }],
            listData:[]
        }
    }
    
    componentDidMount(){
        this.loadTicketContent();
        this.reloadTicketDetail();
    }
    // if need props, use this.props to access
    loadTicketContent = ()=>{
        let tid=sessionStorage.getItem("inquiredTicketID");
        Ajax('GET', "/tickets/"+tid.toString(), [],
        // successful callback
            function(res) {
                let item=JSON.parse(res);
                this.setState({
                    ticketDetail:item.ticket_detail,
                    ticketComments:item.comments
                })
                console.log("good");
            },
            // failed callback
            function() {
                console.log('fail');
            }
        ); 
    }

    reloadTicketDetail = () =>{
        let listDataTemp=[];
        listDataTemp.push({
            title: <h2>{this.state.ticketDetail.subject}</h2>,
            avatar:<Avatar style={{backgroundColor: '#87d068',}}>{this.state.ticketDetail.user_name[0].toUpperCase()}</Avatar>,
            description:<div><Space direction='vertical'><p>{this.state.ticketDetail.description}</p><p>Assigned:{this.state.ticketDetail.assignee}</p><p>{this.state.ticketDetail.ticket_status},fix date:{this.state.ticketDetail.fix_date}</p></Space></div>
        });
        
        this.state.ticketComments.map((cdiv, i) => {
            listDataTemp.push({
                title:<h4 className="commentTitle">{cdiv.user_name} created at {cdiv.created}</h4>,
                avatar:<Avatar style={{backgroundColor: '#87d068',}}>{cdiv.user_name[0].toUpperCase()}</Avatar>,
                description:<p>{cdiv.body}</p>
            });
        });
        this.setState({listData:listDataTemp});
    }

    render() {
        return(
            <div>
                <Navigation/>
                <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={this.state.listData}
                renderItem={item => (
                <List.Item key={item.title}>
                <List.Item.Meta avatar={item.avatar} title={item.title} description={item.description}/>
                </List.Item>
                )}
                />
                <Footer/>
            </div>
           
        );
    }
}

export default TicketingDetail;