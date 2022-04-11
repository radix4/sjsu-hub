import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import join from '../images/chat.png'
import {Col} from "react-bootstrap"
import NavBar from './NavBar'


import login from "../images/login.png";

var stompClient =null;
const GroupChatPage = () => {
    const [privateChats, setPrivateChats] = useState(new Map()); //each key holds username and the value is list of messages sent by a specific user; when a user receives private messages need to destructe that and put it in particular key
    const [publicChats, setPublicChats] = useState([]);
    const [tab,setTab] =useState("CHATROOM"); //this is to differentiate whether it is chatroom or user
    //this holds connection details and server connection


    const [userData, setUserData] = useState({
        username: '',
        receiverName: '',
        connected: false,
        message: ''
    });
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true}); //set connected to true to get data from registry
        stompClient.subscribe('/chatroom/public', onMessageReceived); //subscribe to public messages
        stompClient.subscribe('/user/'+ userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
        var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
        };
        stompClient.send("/GroupChatPage/message", {}, JSON.stringify(chatMessage));
    }

    //callback function
    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        //check the type of messages; when the user joins in public and when the user sends messages
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){ //if no userName create a new map
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData); //push the chats to the array
                setPublicChats([...publicChats]); //new array to copy all the public messages-> considered as state change
                break;
        }
    }

    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        //check if map has the username as a key
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats)); //map -> key = sendername; value->array of messages by sender; need to create a new map to recognize as a new state
        }else{ //if sender name is not present
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);

    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{ //send public messages
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/GroupChatPage/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName:tab,
                message: userData.message,
                status:"MESSAGE"
            };

            if(userData.username !== tab){ //is sender and receiver name are same don't create same message sent to us
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/GroupChatPage/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
        <div>
        <NavBar />
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
            {/*if user is connected show chat*/}
            {userData.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateChats.keys()].map((name,index)=>(
                                <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab==="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat,index)=>( //if message send by us, sender name appears last
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="Enter message for everyone" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>
                    </div>}
                    {tab!=="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat,index)=>(
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder={`Enter private message for ${tab}`} value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">

                    <Col lg={4} md={5} sm={12} className='text-center mt-4 p-3'>
                        <h6>Enter preferred name you want to appear on the group-chat</h6>
                        <br />

                        <input
                        id="user-name"
                        placeholder="My preferred name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                        <br /><br />
                        <button type="button" onClick={registerUser}>
                        Let's Chat
                    </button>
                    </Col>

                    <Col lg={8} md={17} sm={15}>
                        <img className='mw-100' src={join} alt='' />
                    </Col>

                </div>}
        </div>
        </div>
    )
}

export default GroupChatPage



