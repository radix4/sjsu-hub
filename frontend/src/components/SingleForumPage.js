import React, {Component, useState, useEffect, map} from 'react';
import { Card, Button, Form, Row} from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'
import NavBar from './NavBar'
import postService from '../services/posts'
import userService from '../services/users'


const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
  document.body.style = 'background: #FFF1D7;'


const SingleForumPage = () => {

    let newForum;
    let url;
    let id;

    const displayAlert = (message) => {
        console.log(
          '\n----\ndisplayAlert Message: ' +
            message 
        )
        setAlertMessage(message)
      }

    const [AlertMessage, setAlertMessage] = useState(null)
    const [currentForum, setCurrentForum] = useState([]);
    const [currentComments, setCurrentComments] = useState([]);

    useEffect(() => { 

        
        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);
        
        try{
            postService.getForumPostById(id).then((returnedForum) => {
                setCurrentForum(returnedForum);
                newForum = returnedForum;
                
                
                getAllComments();
               
            })
        } catch (error) {
            throw(error);
        }
        return () => {
          
        }
      }, []);



    const addComment = async (event) => {

        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);
        let newCommentForm = document.getElementById('new-post-comment-form');
        let newComment = newCommentForm.elements.newComment.value;
        try {
            await postService.addComment(id,newComment).then((returnedComment) => {
                displayAlert(returnedComment);
                
            })

        } catch (error) {
            throw(error);
        }
    }



    const getAllComments = async () => {

        url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);        

        try {
            await postService.getAllComments(id).then((returnedCommentArr) => {
                setCurrentComments(returnedCommentArr);
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
                        <Card.Title>{currentForum.postTitle}</Card.Title>
                        <Card.Text>{currentForum.postContent}</Card.Text>
                        <Card.Text>{currentForum.postCategory}</Card.Text>
                        <Card.Text></Card.Text>
                        <br></br>
                        <Form id='new-post-comment-form' onSubmit={addComment}>
                        <Form.Group
                        as={Row}
                        controlId='newComment'
                        >
                        {
                          currentComments.map((returnedComment, commentId) => {
                               return (
                                 <div>
                                    <Card.Text key={commentId}>{returnedComment}</Card.Text>
                                 </div>
                                 )
                             })
                        }
                        <Form.Control type="text" placeholder="Comment Here" required/>
                        </Form.Group> 
                        <Button type="submit">Add Comment</Button>
                        </Form>
                     </Card.Body>
                    </Card>
            </div>
        </div>
    )
}





export default SingleForumPage