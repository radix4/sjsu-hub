import React from 'react';
import {Container, Col, Form, Row, Button} from 'react-bootstrap';

const RegistrationPage = () => {

    const leftColStyle = {
        'padding-left': '10%',
        'padding-top': '2%'
      }
    
    const rightColStyle = {
        'padding-right': '10%',
        'padding-top': '2%'
    }

    const controlMargin = {
        padding: '5px'
    }

    const roundedCorners = {
        'border-radius': '50px',
    }

    const submitButton = {
        'background-color': '#00008b',
        float: 'right'
    }

    const centering = {
        'text-align': 'center'
    }

    const backgroundColor = {
        'background-color': '#FFF1D7',
    }

    return (

        <Container style = {backgroundColor} fluid>
            <Row className='align-items-center d-flex flex-wrap-reverse'>
            {/* ================ LEFT COLUMN =================== */ }
            <Col style={leftColStyle} md={6}>
                <h2>Sign up</h2>
                <br/>
                <Form id = 'registration'>
                    
                    <Form.Group style = {controlMargin} controlId='firstName'>
                        <Form.Label>
                            First Name
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='text' style = {roundedCorners }placeholder='First Name' />
                        </Col>
                    </Form.Group>
                  
                  
                    <Form.Group style = {controlMargin} controlId='lastName'>
                        <Form.Label>
                            Last Name
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='text' style = {roundedCorners } placeholder='Last Name' />
                        </Col>
                    </Form.Group>
               

               
                    <Form.Group style = {controlMargin} controlId='sjsuEmail'>
                        <Form.Label>
                            SJSU email address
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='text' style = {roundedCorners } placeholder='Email' />
                        </Col>
                    </Form.Group>
                   
              

               
                    <Form.Group style = {controlMargin} controlId='password'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='password' style = {roundedCorners } placeholder='Password' />
                        </Col>
                    </Form.Group>
                         
                    <Form.Group style = {controlMargin}  controlId='confirm'>
                        <Form.Label>
                            Confirm password
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='password' style = {roundedCorners } placeholder='Confirm Password' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col md={{ span: 10, offset: 4 }}>
                            <Button style = {submitButton} ><b>Create Account</b></Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>

            {/* ================ RIGHT COLUMN =================== */ }
            <Col style={rightColStyle} md={6}>
                <Row style = {centering}>
                    <h2><b>Already have an account?</b></h2>
                    <hr class="rounded"></hr><hr class="rounded"></hr>
                    <hr class="rounded"></hr>

                    <Form.Group as={Row}>
                        <Col >
                            <Button style = {submitButton} ><b>Login</b></Button>
                        </Col>
                    </Form.Group>
                </Row>
                
            </Col>
            </Row>
        </Container>

    )
}

export default RegistrationPage