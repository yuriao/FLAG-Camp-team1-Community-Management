import React, {Component} from 'react';
import { List, Avatar, Space, Input, Button } from 'antd';
import Ajax from '../components/AJAX'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import axios from 'axios'

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
            listData:[],
            currentComment:[]
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
            avatar:<Avatar size="large" style={{backgroundColor: '#87d068',}}>{this.state.ticketDetail.user_name[0].toUpperCase()}</Avatar>,
            description:<div><Space direction='vertical'><p className="commentDescription">{this.state.ticketDetail.description}</p></Space></div>
        });
        
        this.state.ticketComments.map((cdiv, i) => {
            listDataTemp.push({
                title:<p className="commentTitle">Re:{" "}{cdiv.user_name} created at {cdiv.created}</p>,
                avatar:<Avatar size="large" style={{backgroundColor: '#87d068',}}>{cdiv.user_name[0].toUpperCase()}</Avatar>,
                description:<p className="commentDescription">{cdiv.body}</p>
            });
        });
        this.setState({listData:listDataTemp});
    }

    postComment = () =>{
      
      // just practice axios a little bit...
      axios.put('/ticket'+sessionStorage.getItem("inquiredTicketID")+'/update', {
          params: {
            comment: 12345
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        
        this.reloadTicketDetail();
    }

    addComment = (event) =>{
        this.setState({currentComment:event.target.value});
    }
    render() {
        const { TextArea } = Input;

        return(
            <div>
                <Navigation/>
                <div>
                    <Container fluid>
                        <Row>
                        <Col xs={10}>
                            <Space direction="vertical">
                                
                                    <List
                                        itemLayout="vertical"
                                        size="large"
                                        pagination={{
                                        onChange: page => {
                                            console.log(page);
                                        },
                                        pageSize: 4,
                                        }}
                                        dataSource={this.state.listData}
                                        renderItem={item => (
                                        <List.Item key={item.title}>
                                        <List.Item.Meta avatar={item.avatar} title={item.title}/>
                                            {item.description}
                                        </List.Item>
                                    )}
                                    />

                                    <div>
                                        <TextArea rows={6} onChange={(event)=>this.addComment(event)}/>
                                        <Button onClick={this.postComment}>Comment</Button>
                                    </div>                            
                                </Space>
                            </Col>
                            <Col xs={2}>
                                <div className="ticketInfoArea">
                                <Space direction="vertical">
                                    <div>
                                        <h3>Resident</h3>
                                        <p>{this.state.ticketDetail.user_name}</p>
                                    </div>
                                    <div>
                                        <h3>Created</h3>
                                        <p>{this.state.ticketDetail.created}</p>
                                    </div>
                                    <div>
                                        <h3>Assignee</h3>
                                        <p>{this.state.ticketDetail.assignee}</p>
                                    </div>
                                    <div>
                                        <h3>Fix date</h3>
                                        <p>{this.state.ticketDetail.fix_date}</p>
                                    </div>
                                    <div>
                                        <h3>Status</h3>
                                        <p>{this.state.ticketDetail.ticket_status}</p>
                                    </div>
                                </Space>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                
                <Footer/>
            </div>
           
        );
    }
}

export default TicketingDetail;