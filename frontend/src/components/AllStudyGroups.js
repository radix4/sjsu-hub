import React, {Component, useState, useEffect, map, createContext} from 'react';
import { Col, Row, Button, Form, Card } from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'
import NavBar from './NavBar'
import studyGroupService from '../services/studygroup';
import Notification from './Notification'

const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
document.body.style = 'background: #FFF1D7;'

//needs a notification tag
const AllStudyGroups = () =>{


  const [errorMessage, setErrorMessage] = useState(null);
  const [typeAlert, setTypeAlert] = useState(null);

    let navigate = useNavigate();
    const routeToGroup = (pathId) => {
        let path = `/SingleStudyGroup/${pathId}`;
        navigate(path,{
          iD: pathId
        });
    }

    //CHECK THIS
    const sendToCreate = () =>{
      loginCheck()
      let path = `/StudyGroupPage/`;
      navigate(path);
    }

    const [currentGroups, setCurrentGroups] = useState([]);
    
    useEffect(() => { 
        try {
            studyGroupService.getStudyGroups().then(returnedPost =>{
            setCurrentGroups(returnedPost.data);   
          });
        } catch (error) {
          throw(error);
        }
        return () => {
          
        }
      }, []);



  //alert needs to work
  //wait needs to work
const loginCheck = () => {
  const isLoggedIn = window.localStorage.getItem('loggedInUser');
  if(!isLoggedIn){
    //display an error message
    setErrorMessage("You must be logged in to create a forum post.");
    setTypeAlert('error');
    //redirect to login page
    delay(5000);
    navigate('/Login');
  }else{
    //do nothing
  }
}

//make sure this works...
const delay = (time) => {
  new Promise(res => setTimeout(res, time));
}
    
    return (
        <div>
            <NavBar></NavBar>
            <div style={containerStyle}>
            <br></br>
            <Col md={{ span: 4, offset: 8 }}>
            <Button onClick={sendToCreate}>Create</Button>
            </Col>
          
             {
              currentGroups.map((returnedGroup,groupId) => {
                return(
                    <div>
                      <br></br>
                    <Card bg='secondary' text='light' className='p-2' onClick={() => {
                      routeToGroup(returnedGroup.id);
                    }}>
                   <Card.Body>
                     <Card.Header></Card.Header>
                        <br></br>     
                      <Card.Title key={groupId}>{returnedGroup.subject}</Card.Title>
                     <Card.Text > {/*theres a warning here that it wants another key */}
                          {returnedGroup.description}
                     </Card.Text>
                        <br></br>
                     </Card.Body>
                    </Card>
                     </div>  
              )
            })
          }
          <br></br>    
        </div>
    </div>
    )
}


export default AllStudyGroups;



