import React, { useState } from 'react'
import { Container, Col, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import Notification from './Notification'
import login from '../images/login.png'
import user from '../images/user.png'

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeAlert, setTypeAlert] = useState(null)

  const controlMargin = {
    padding: '10px',
    'padding-right': '15%',
    'padding-left': '15%',
  }

  const roundedCorners = {
    'border-radius': '50px',
  }

  const submitButton = {
    'background-color': '#514A7D',
    'padding-right': '10%',
    'padding-left': '10%',
  }

  const backgroundColor = {
    'background-color': '#FFF1D7',
  }

  const iconimg = {
    width: '80px',
    height: '80px',
    'margin-top': '1rem',
    'margin-bottom': '2rem',
  }

  const displayAlert = (message, type) => {
    console.log(
      '\n----\ndisplayAlert Message: ' +
        message +
        '\nType: ' +
        type +
        '\n-------\n'
    )
    setErrorMessage(message)
    setTypeAlert(type)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    let form = document.getElementById(`login`)

    const email = form.elements.email.value
    const password = form.elements.password.value

    if (!email || !password) {
      console.log('Please enter email/password!')
      displayAlert('Please enter email/password!', 'error')
      return
    }

    const loginUser = {
      email: email,
      password: password,
    }

    try {
      // returnedUser is the String returned from the backend API
      await userService.login(loginUser).then((returnedUser) => {
        console.log('returned user: ' + returnedUser)
        if (returnedUser === '') {
          console.log('LoginPage: login fail, wrong credentials')
          displayAlert('Wrong credentials! Please try again.', 'error')
        } else {
          window.location = '/'
        }
      })
    } catch (exception) {
      console.log('Something is wrong.')
    }
  }

  return (
    <Container style={backgroundColor} fluid className='mt-5'>
      <Row>
        {/* ================ LEFT COLUMN =================== */}
        <Col lg={4} md={5} sm={12} className='text-center mt-4 p-3'>
          <h3>Welcome Back :)</h3>
          <img style={iconimg} src={user} alt='icon' />
          <br />
          <Form id='login' onSubmit={handleLogin}>
            <Form.Group style={controlMargin} controlId='email'>
              <Form.Control
                type='text'
                style={roundedCorners}
                placeholder='SJSU Email'
              />
            </Form.Group>

            <Form.Group style={controlMargin} controlId='password'>
              <Form.Control
                type='password'
                style={roundedCorners}
                placeholder='Password'
              />
            </Form.Group>

            <Notification message={errorMessage} type={typeAlert} />
            <Form.Group style={controlMargin}>
              <Button type='submit' style={submitButton}>
                <b>Login</b>
              </Button>
            </Form.Group>
          </Form>
        </Col>

        {/* ================ RIGHT COLUMN =================== */}
        <Col lg={6} md={3} sm={12} className='text-center'>
          <img className='w-100' src={login} alt='' />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
