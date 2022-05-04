import React, {Component, useState, useEffect, map, componentDidMount, useLayoutEffect} from 'react';
import { Col, Row, Button, Form, Card, FormGroup } from 'react-bootstrap'
import {useLocation, Navigate, Route} from 'react-router-dom'
import Notification from './Notification'
import NavBar from './NavBar'
import studyGroupService from '../services/studygroup';
import userService from '../services/users';
import {useNavigate, Link} from 'react-router-dom'


const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
document.body.style = 'background: #FFF1D7;'

//add navigation tag
const SingleStudyGroup = () => {


    const [AlertMessage, setAlertMessage] = useState(null)
    const [typeAlert, setTypeAlert] = useState(null)
    const [currentGroup, setCurrentGroup] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [currentSignedInUser, setCurrentSignedUser] = useState([]);
    let navigate = useNavigate();
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
        loginCheck();
        //getUserDetails();
        getAllUsers();
        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);
        
        try{
            studyGroupService.getGroupById(id).then((returnedGroup) => {
                setCurrentGroup(returnedGroup);
            })
        } catch (error) {
            throw(error);
        }
        return () => {
          
        }
      }, []);


    
    const addToStudyGroup = async (event) => {

        const isLoggedIn = window.localStorage.getItem('loggedInUser');
        
        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);

        let newMemberForm = document.getElementById('new-group-member-form');
        let newMember = newMemberForm.elements.newMemberUserName.value;

        let arr = newMember.split(" ");
        

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        }

        const str2 = arr.join(" ");

  
        try {
            await studyGroupService.addToGroup(id,str2).then((returnedUser) => {
                displayAlert(returnedUser);
            })

        } catch (error) {
            throw(error);
        }
    }


    const getUserDetails = () => {
        const isLoggedIn = window.localStorage.getItem('loggedInUser');
        try {
            userService.findUser(isLoggedIn).then((returnedUser)=> {
                console.log(returnedUser);
                setCurrentSignedUser(returnedUser);
            })
        } catch (error) {
            throw(error)
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


  //alert needs to work
  //wait needs to work
  const loginCheck = () => {
    const isLoggedIn = window.localStorage.getItem('loggedInUser');
    if(!isLoggedIn){
      
      setAlertMessage("You must be logged in to create a forum post.");
      setTypeAlert('error');

      delay(5000);
      navigate('/Login');
    }else{
      //do nothing
    }
  }
  
  
  const delay = (time) => {
    new Promise(res => setTimeout(res, time));
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
                        <Form id='new-group-member-form' onClick={addToStudyGroup}>
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
                        <br></br>
                        <Form.Control type="text" placeholder="full Name here" required/>
                        <br></br>
                        </Form.Group>
                        <br></br>
                        <Button type="submit">Join Group</Button>
                        </Form>
                     </Card.Body>
                    </Card>
            </div>  
        </div>
    )
}



export default SingleStudyGroup;


