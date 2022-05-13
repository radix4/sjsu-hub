import React, { Component, useState, useEffect, map } from 'react'
import { Card, Button, Form, Row } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from './NavBar'
import postService from '../services/posts'
import userService from '../services/users'

const containerStyle = {
  margin: '5% 20% 5% 20%',
}

document.body.style = 'background: #FFF1D7;'

const SingleForumPage = () => {
  let newForum
  let url
  let id

  const displayAlert = (message) => {
    console.log('\n----\ndisplayAlert Message: ' + message)
    setAlertMessage(message)
  }

  const [AlertMessage, setAlertMessage] = useState(null)
  const [currentForum, setCurrentForum] = useState([])
  const [currentComments, setCurrentComments] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeAlert, setTypeAlert] = useState(null)
  let navigate = useNavigate()

  useEffect(() => {
    url = window.location.pathname
    id = url.substring(url.lastIndexOf('/') + 1)

    loginCheck()

    try {
      postService.getForumPostById(id).then((returnedForum) => {
        setCurrentForum(returnedForum)
        newForum = returnedForum
        getAllComments()
      })
    } catch (error) {
      throw error
    }
    return () => {}
  }, [])

  const addComment = async (event) => {
    url = window.location.pathname
    id = url.substring(url.lastIndexOf('/') + 1)
    const isLoggedIn = window.localStorage.getItem('loggedInUser')
    let newCommentForm = document.getElementById('new-post-comment-form')
    let newComment = newCommentForm.elements.newComment.value

    //grab the email from the logged in session and send it as a full comment.
    let newCommentObject = {
      comment: newComment,
      userEmail: isLoggedIn,
    }

    console.log(newCommentObject)

    try {
      await postService
        .addComment(id, newCommentObject)
        .then((returnedComment) => {
          displayAlert(returnedComment)
        })
    } catch (error) {
      throw error
    }
  }

  const getAllComments = async () => {
    url = window.location.pathname
    id = url.substring(url.lastIndexOf('/') + 1)

    try {
      await postService.getAllComments(id).then((returnedCommentArr) => {
        //console.log("returned comment arr:" + returnedCommentArr[0]['comment']); this returns the value viewable in dev tools.
        setCurrentComments(returnedCommentArr)
      })
    } catch (error) {
      throw error
    }
  }

  const loginCheck = () => {
    const isLoggedIn = window.localStorage.getItem('loggedInUser')
    if (!isLoggedIn) {
      //display an error message
      setErrorMessage('You must be logged in to create a forum post.')
      setTypeAlert('error')
      //redirect to login page
      delay(5000)
      navigate('/Login')
    } else {
      //do nothing
    }
  }

  //make sure this works...
  const delay = (time) => {
    new Promise((res) => setTimeout(res, time))
  }

  const commentRender = () => {
    console.log('inside of commentRender')
    //if(currentComments != null){
    currentComments.map((returnedComment, commentId) => {
      console.log('returned comment inside of map' + returnedComment)
      return (
        <div>
          <Card.Text key={commentId}>{returnedComment.comment}</Card.Text>
          <Card.Text key={commentId}>{returnedComment['userEmail']}</Card.Text>
        </div>
      )
    })
  }
  /*}else{
        return (
            <div>
               <Card.Text>There are no comments</Card.Text>
            </div>
            )
        }
      }*/

  return (
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
            {/* <Form id='new-post-comment-form' onSubmit={addComment}>
                        <Form.Group
                        as={Row}
                        controlId='newComment'
                        >
                        {
                            commentRender
                        }
                        <Form.Control type="text" placeholder="Comment Here" required/>
                            <Button type="submit">Add Comment</Button>
                        </Form.Group> 
                        </Form> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default SingleForumPage
