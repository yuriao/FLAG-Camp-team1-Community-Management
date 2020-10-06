import React, {Component} from 'react';
import { Spin,Tag, List, Avatar, Space, Input, Button } from 'antd';
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
            currentComment:[],
            loading:true,
            tid:0
        }
    }
    
    componentDidMount(){
        console.log("here");
        this.loadTicketContent();
    }
    // if need props, use this.props to access
    loadTicketContent = ()=>{
        this.setState({loading:true});
        console.log(this.state.loading);
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        console.log(queryString);
        let tidt=urlParams.get('ticket');
        this.setState({tid:tidt});
        console.log("/communitymanagement/tickets/"+tidt.toString());
        axios.get("/communitymanagement/tickets/"+tidt.toString())
        .then((response) => {
        // successful callback
                console.log(response);
                let item=response.data;
                this.setState({
                    ticketDetail:item.ticket,
                    ticketComments:item.ticketComment
                })
                this.reloadTicketDetail(item.ticket,item.ticketComment);
        }).catch((error)=> {
                console.log(error);
                this.setState({loading:false});
        });
    }

    reloadTicketDetail = (details,comments) =>{
        let listDataTemp=[];
        
        let priority=details.priority;
        let color_priority = "";
            if (priority === 'LOW') {
                color_priority = 'green';
            } else if (priority === "HIGH") {
                color_priority = 'red';
            } else if (priority === "MEDIUM"){
                color_priority = 'blue';
            }

        listDataTemp.push({
            title: <h2>{details.subject}</h2>,
            avatar:<Avatar size="large" style={{backgroundColor: '#87d068',}}>{details.unitNumber.toUpperCase()}</Avatar>,
            description:<div><Space direction='vertical'> <div className="commentDescription"><Tag color={color_priority}>{priority}</Tag></div><p className="commentDescription">{details.description}</p><p className="commentDescription">I'm aviliable at {details.availability}</p></Space></div>
        });
        
        console.log(comments)
        if(comments){
            comments.map((cdiv, i) => {
                let usrtype=cdiv.userType;
                listDataTemp.push({
                    title:<p className="commentTitle">Re:{" "}{cdiv.user_name} created at {cdiv.created}</p>,
                    avatar:<div><Space><Avatar size="large" style={{backgroundColor: '#8793af',}}>{cdiv.fullName[0].toUpperCase()}</Avatar><Tag color={'geekblue'}>{usrtype}</Tag></Space></div>,
                    description:<p className="commentDescription">{cdiv.commendBody}</p>
                });
            });
        }
        this.setState({loading:false});
        this.setState({listData:listDataTemp});
    }

    postComment = () =>{
      
      // just practice axios a little bit...
      console.log(this.state.currentComment);
      axios.put('/communitymanagement/tickets/'+this.state.tid.toString()+'/update', {comment:this.state.currentComment})
        .then((response)=> {
          console.log(response);
          this.loadTicketContent();
        })
        .catch((error)=> {
          console.log(error);
        });
    }

    addComment = (event) =>{
        this.setState({currentComment:event.target.value});
    }
    render() {
        const { TextArea } = Input;

        return(
            <div>
                <Navigation/>
                {this.state.loading ? <div className="loadingSpin"><Spin tip="Loading Ticket Detail..." /></div>:
                <div>
                    <Container fluid>
                        <Row>
                        <Col xs={8}>
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
                            </Col>
                            <Col xs={4}>
                                <div className="ticketInfoArea">
                                <Space direction="vertical">
                                    <div>
                                        <p className="infoCol">UnitNumber</p>
                                        <p className="infoCol_content">{this.state.ticketDetail.unitNumber}</p>
                                    </div>
                                    <div>
                                        <p className="infoCol">Created</p>
                                        <p className="infoCol_content">{this.state.ticketDetail.created}</p>
                                    </div>
                                    <div>
                                        <p className="infoCol">Status</p>
                                        <p className="infoCol_content">{this.state.ticketDetail.status}</p>
                                    </div>
                                </Space>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
}
                
                <Footer/>
            </div>
           
        );
    }
}

export default TicketingDetail;