import React, {Component, useState, useEffect, map} from 'react';
import { Card, Button, Form } from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'
import NavBar from './NavBar'
import postService from '../services/posts'




const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
document.body.style = 'background: #FFF1D7;'

const AllForums = () => {


    const [currentPosts, setCurrentPosts] = useState([]);


    let navigate = useNavigate();
    const routeToGroup = (pathId) => {
        let path = `/SingleForumPage/${pathId}`;
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
    
    
    return (
        <div>
            <NavBar></NavBar>
            <div style={containerStyle}>
            {
            currentPosts.map((returnedPost,postId) => {
              return(
                <div>
                <br></br>
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




