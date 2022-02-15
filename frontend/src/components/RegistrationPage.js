import React , { useState } from 'react'
import { Container, Col, Form, Row, Button } from 'react-bootstrap'
import userService from '../services/users'
import Notification from './Notification'

const RegistrationPage = () => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [typeAlert, setTypeAlert] = useState(null);

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
    console.log('\n----\ndisplayAlert Message: ' + message + '\nType: ' + type + '\n------\n' )
    setErrorMessage(message)
    setTypeAlert(type)
  }

  const addUser = async (event) => {
    event.preventDefault()

    var form = document.getElementById('registration')

    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const email = form.elements.sjsuEmail.value
    const password = form.elements.password.value
    const confirm = form.elements.confirm.value

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
        console.log('User registered!')
      })

      document.getElementById('registration').reset()
    } catch (exception) {
      console.log('Registration: failed to register user')
    }
  }

  return (
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
                <Button style={submitButton}>
                  <b>Login</b>
                </Button>
              </Col>
            </Form.Group>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default RegistrationPage
