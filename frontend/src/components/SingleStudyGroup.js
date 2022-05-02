import React, {Component, useState, useEffect, map, componentDidMount, useLayoutEffect} from 'react';
import { Col, Row, Button, Form, Card, FormGroup } from 'react-bootstrap'
import {useLocation, Navigate, Route} from 'react-router-dom'
import Notification from './Notification'
import NavBar from './NavBar'
import studyGroupService from '../services/studygroup';


const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
document.body.style = 'background: #FFF1D7;'

const SingleStudyGroup = () => {


    const [AlertMessage, setAlertMessage] = useState(null)
    //const [typeAlert, setTypeAlert] = useState(null)
    const [currentGroup, setCurrentGroup] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
    let newGroup;
    let url;
    let id;


    const displayAlert = (message) => {
        console.log(
          '\n----\ndisplayAlert Message: ' +
            message 
        )
        setAlertMessage(message)
      }


    useEffect(() => { //proxy error appearing. Not appearing anymore
        getAllUsers();
        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);
        
        try{
            studyGroupService.getGroupById(id).then((returnedGroup) => {
                setCurrentGroup(returnedGroup);
                newGroup = returnedGroup;
            })
        } catch (error) {
            throw(error);
        }
        return () => {
          
        }
      }, []);


    
    const addToStudyGroup = async (event) => {
        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);

        let newMemberForm = document.getElementById('new-group-member-form');
        let newMember = newMemberForm.elements.newMemberUserName.value;

        try {
            await studyGroupService.addToGroup(id,newMember).then((returnedUser) => {
                displayAlert(returnedUser);
            })

        } catch (error) {
            throw(error);
        }
    }


    const getAllUsers = async () => {

        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);        

        try {
            await studyGroupService.getAllUsers(id).then((returnedUserArr) => {
                setCurrentUsers(returnedUserArr);
            })
        } catch (error) {
            throw(error);
        }
    }

 
    
    
    return(
        <div>
            <NavBar></NavBar>
            <div style={containerStyle}>
                  <br></br>
                    <Card bg='secondary' text='light' className='p-2'>
                    <Card.Body>
                     <Card.Header></Card.Header>
                        <br></br>     
                     <Card.Title>{currentGroup.subject}</Card.Title>
                        <Card.Text>{currentGroup.description}</Card.Text>
                        <Card.Text>{currentGroup.meetingDay}</Card.Text>
                        <Card.Text>{currentGroup.meetingTime} {currentGroup.meridiem}</Card.Text>
                        <br></br>
                        <Form id='new-group-member-form' onSubmit={addToStudyGroup}>
                        <Form.Group
                        as={Row}
                        controlId='newMemberUserName'
                        >
                        {
                            currentUsers.map((returnedUser, userId) => {
                                return (
                                    <div>
                                    <Card.Text key={userId}>{returnedUser}</Card.Text>
                                    </div>
                                )
                            })
                        }
                        <Form.Control type="text" placeholder="Name Here" required/>
                        </Form.Group>
                        
                        <Button type="submit">Join Button</Button>
                        </Form>
                     </Card.Body>
                    </Card>
            </div>  
        </div>
    )
}



export default SingleStudyGroup;


