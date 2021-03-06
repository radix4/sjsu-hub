import React, {Component, useState, useEffect, map} from 'react';
import { Card, Button, Form } from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'
import NavBar from './NavBar'
import postService from '../services/posts'
import userService from '../services/users'
import Notification from './Notification'


//alerts?

const containerStyle = {
  margin: '5% 20% 5% 20%',
}

document.body.style = 'background: #FFF1D7;'

const ForumPage = () => {
  
  const [currentPosts, setCurrentPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [typeAlert, setTypeAlert] = useState(null);
  let navigate = useNavigate();
  
  const displayAlert = (message, type) => {
    console.log('\n----\ndisplayAlert Message: ' + message + '\nType: ' + type + '\n------\n' )
    setErrorMessage(message)
    setTypeAlert(type)
  }

  useEffect(() => {
    loginCheck();
    return () => {
      
    }
  }, []);


  const handleForumPost = async (event) => {
  

  //event.preventDefault();
  var postForm = document.getElementById('create-post-form');

  console.log("postForm" + postForm);
  const postTitle = postForm.elements.title.value;
  const postContent = postForm.elements.content.value;
  const postCategory = postForm.elements.category.value;


  const forumPost2 = {
    postTitle: postTitle,
    postContent: postContent,
    userName: "testUserName",
    postCategory: postCategory
  }


  try {
    await postService.postForum(forumPost2).then((returnedPost) => {
      window.location = '/AllForums';
    })
  } catch (exception) {
    throw(exception);
  }
}


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


const delay = (time) => {
  new Promise(res => setTimeout(res, time));
}

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
      <Notification message={errorMessage} type={typeAlert} />
        {/* ============= CREATE POST FORM ============= */}
        <Form id='create-post-form' onSubmit={handleForumPost} className='border p-3 border-info '>
          {/* ===== TITLE ===== */}
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the title of your post'
              required
            />
          </Form.Group>

          {/* ===== CONTENT ===== */}
          <Form.Group controlId='content'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter the content of your post'
              required
            />
          </Form.Group>

          {/* ===== CATEGORY ===== */}
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control as='select' defaultValue='Other' required>
              <option value='Cooking'>Cooking</option>
              <option value='Space'>Space</option>
              <option value='Art'>Art</option>
              <option value='Educational'>Educational</option>
              <option value='Programming'>Programming</option>
              <option value='Science'>Science</option>
              <option value='Boutonniere'>Boutonniere</option>
              <option value='Fashion'>Fashion</option>
              <option value='Business'>Business</option>
              <option value='Technology'>Technology</option>
              <option value='Health'>Health</option>
              <option value='Music'>Music</option>
              <option value='Gaming'>Gaming</option>
              <option value='Other'>Other</option>
            </Form.Control>
          </Form.Group>

          {/* ===== BUTTON ===== */}
          
          <Button type='submit' style={{ marginTop: '1%' }} variant='info'>
            Post
          </Button>
          
        </Form>
      
          <br></br>
          <br></br>
          <br></br>    
      </div>
    </div>
  )
}

export default ForumPage
