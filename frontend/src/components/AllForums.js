import React, {Component, useState, useEffect, map} from 'react';
import { Col, Card, Button, Form } from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'
import NavBar from './NavBar'
import postService from '../services/posts'
import Notification from './Notification'

const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
document.body.style = 'background: #FFF1D7;'

//add navigation tag 
const AllForums = () => {


    const [currentPosts, setCurrentPosts] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);


    let navigate = useNavigate();
    const routeToGroup = (pathId) => {
        let path = `/SingleForumPage/${pathId}`;
        navigate(path);
    }

    //CHECK THIS
    const sendToCreate = () =>{
      loginCheck();
      let path = `/ForumPage`;
      navigate(path);
    }
    
    //this useEffect gets the data we need to display currentPosts from database and loads it for rendering
    useEffect(() => { //proxy error appearing. Not appearing anymore
        try {
            postService.getPosts().then(returnedPost =>{
            setCurrentPosts(returnedPost.data);   
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
            {
            currentPosts.map((returnedPost,postId) => {
              return(
                <div>
                <br></br>
                <Col md={{ span: 3, offset: 9 }}>
                <Button onClick={sendToCreate}>Create</Button>
                </Col>
                <Card bg='secondary' text='light' className='p-2' onClick={() => {
                      routeToGroup(returnedPost.id);
                    }}>
                  <Card.Body>
                    <Card.Header></Card.Header>
                    <br></br> 
              
                  <Card.Title key={postId}>{returnedPost.postTitle}</Card.Title>
                    <Card.Text > {/*theres a warning here that it wants another key */}
                      {returnedPost.postContent}
                    </Card.Text>
                    <br></br>
                   </Card.Body>
                  </Card>
                <br></br>
                 </div>
              )
            })
          }
            </div>
        </div>
    )
}



export default AllForums;




