import React, { useState } from 'react'
import { Container, Col, Form, Row, Button } from 'react-bootstrap'
import userService from '../services/users'
import Notification from './Notification'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
//import sanitizeHtml from "sanitize-html";

const RegistrationPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeAlert, setTypeAlert] = useState(null)

  const leftColStyle = {
    paddingLeft: '10%',
    paddingTop: '2%',
  }

  const rightColStyle = {
    paddingRight: '10%',
    paddingTop: '2%',
  }

  const controlMargin = {
    padding: '5px',
  }

  const roundedCorners = {
    borderRadius: '50px',
  }

  const submitButton = {
    backgroundColor: '#00008b',
    float: 'right',
  }

  const centering = {
    textAlign: 'center',
  }

  const backgroundColor = {
    backgroundColor: '#FFF1D7',
  }

  const displayAlert = (message, type) => {
    console.log(
        '\n----\ndisplayAlert Message: ' +
        message +
        '\nType: ' +
        type +
        '\n------\n'
    )
    setErrorMessage(message)
    setTypeAlert(type)
  }

  const addUser = async (event) => {
    event.preventDefault()

    var form = document.getElementById('registration')

    /* const sanitizeHtml = require('sanitize-html')

     const firstName = sanitizeHtml(form.elements.firstName.value)
     const lastName = sanitizeHtml(form.elements.lastName.value)
     const email = sanitizeHtml(form.elements.sjsuEmail.value)
     const password = sanitizeHtml(form.elements.password.value)
     const confirm = sanitizeHtml(form.elements.confirm.value)
 */

    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const email = form.elements.sjsuEmail.value
    const password = form.elements.password.value
    const confirm = form.elements.confirm.value

    if (firstName == ""){
      console.log('Error: First Name is empty')
      displayAlert('First Name must be filled out.', 'error')
      return
    }

    if (lastName == ""){
      console.log('Error: Last Name is empty')
      displayAlert('Last Name must be filled out.', 'error')
      return
    }

    if (email == ""){
      console.log('Error: Email is empty')
      displayAlert('Email must be filled out.', 'error')
      return
    }

    if (password == ""){
      console.log('Error: Password is empty')
      displayAlert('Password must be filled out.', 'error')
      return
    }
    if (confirm == ""){
      console.log('Error: Confirmation password is empty')
      displayAlert('Confirmation password must be filled out.', 'error')
      return
    }


    if (!email.includes('@sjsu.edu')) {
      displayAlert('Email must be SJSU student email.', 'error')
      return
    }

    if (password !== confirm) {
      console.log('Error: Passwords do not match')
      displayAlert('Passwords do not match. Please try again.', 'error')
      return
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }

    try {
      await userService.register(newUser).then((returnedUser) => {
        console.log(returnedUser)
        displayAlert(returnedUser, 'success')
        console.log(returnedUser)
      })

      document.getElementById('registration').reset()
    } catch (exception) {
      displayAlert('Failed to register user', 'error')
      console.log('Registration: failed to register user')
    }
  }

  return (
      <div>
        <NavBar />
        <Container style={backgroundColor} fluid>
          <Row className='align-items-center d-flex flex-wrap-reverse'>
            {/* ================ LEFT COLUMN =================== */}
            <Col style={leftColStyle} md={6}>
              <h2>Sign up</h2>
              <br />
              <Form id='registration' onSubmit={addUser}>
                <Form.Group style={controlMargin} controlId='firstName'>
                  <Form.Label>First Name</Form.Label>
                  <Col md={8}>
                    <Form.Control
                        type='text'
                        style={roundedCorners}
                        placeholder='First Name'
                        required
                        maxlength= "100"
                    />
                  </Col>
                </Form.Group>

                <Form.Group style={controlMargin} controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Col md={8}>
                    <Form.Control
                        type='text'
                        style={roundedCorners}
                        placeholder='Last Name'
                        required
                        maxlength = "100"
                    />
                  </Col>
                </Form.Group>

                <Form.Group style={controlMargin} controlId='sjsuEmail'>
                  <Form.Label>SJSU email address</Form.Label>
                  <Col md={8}>
                    <Form.Control
                        type='text'
                        style={roundedCorners}
                        placeholder='Email'
                        title = "Enter a valid SJSU email address: xxx@sjsu.edu"
                        pattern ="[a-zA-Z0-9]+@sjsu.edu"
                        required
                    />
                  </Col>
                </Form.Group>

                <Form.Group style={controlMargin} controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Col md={8}>
                    <Form.Control
                        type='password'
                        style={roundedCorners}
                        placeholder='Password'
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Password must contain a lowercase letter, an uppercase letter, a number, and a minimum of 8 characters"
                        required
                        maxlength="20"
                        minlength="8"
                    />
                  </Col>
                </Form.Group>

                <Form.Group style={controlMargin} controlId='confirm'>
                  <Form.Label>Confirm password</Form.Label>
                  <Col md={8}>
                    <Form.Control
                        type='password'
                        style={roundedCorners}
                        placeholder='Confirm Password'
                        required
                    />
                  </Col>
                </Form.Group>
                <Notification message={errorMessage} type={typeAlert} />
                <Form.Group as={Row}>
                  <Col md={{ span: 10, offset: 4 }}>
                    <Button type='submit' style={submitButton}>
                      <b>Create Account</b>
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>

            {/* ================ RIGHT COLUMN =================== */}
            <Col style={rightColStyle} md={6}>
              <Row style={centering}>
                <h2>
                  <b>Already have an account?</b>
                </h2>
                <hr class='rounded'></hr>
                <hr class='rounded'></hr>
                <hr class='rounded'></hr>

                <Form.Group as={Row}>
                  <Col>
                    <Link to='/Login'>
                      <Button style={submitButton}>
                        <b>Login</b>
                      </Button>
                    </Link>
                  </Col>
                </Form.Group>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default RegistrationPage