import React from 'react';
import {Container, Col, Form, Row, Button} from 'react-bootstrap';
import login from '../images/login.png';
import user from '../images/user.png';



const LoginPage = () => {

    const leftColStyle = {
        'padding-left': '10%',
        'padding-top': '5%'
      }

        const rightColStyle = {
        'padding-right': '10%',
        'padding-top': '2%'
    }
    const controlMargin = {
        padding: '10px',
        'padding-right': '15%',
        'padding-left': '15%',   
    }

    const roundedCorners = {
        'border-radius': '50px'
    }

    const submitButton = {
        'background-color': '#514A7D',
        'padding-right': '10%',
        'padding-left': '10%',
    }

    const centering = {
        'text-align': 'center'
    }

    const backgroundColor = {
        'background-color': '#FFF1D7',
    }

    const iconimg = {
        'width' : '80px',
        'height': '80px',
        'margin-top' : '1rem',
        'margin-bottom' : '2rem'
    }



    return (

        <Container style = {backgroundColor} fluid className="mt-5">
            <Row >
            {/* ================ LEFT COLUMN =================== */ }
            <Col lg={4} md={5} sm={12} className="text-center mt-4 p-3">
                <h3>Welcome Back :)</h3>
                <img style={iconimg} src={user} alt="icon"/>
                <br/>
                <Form id = 'login'>
                    <Form.Group style = {controlMargin} controlId='sjsuEmail'>
                        <Form.Control type='text' style = {roundedCorners } placeholder='SJSU Email' />  
                    </Form.Group>
                   
                    <Form.Group style = {controlMargin} controlId='password'>
                         <Form.Control type='password' style = {roundedCorners } placeholder='Password' /> 
                    </Form.Group>


                    <Form.Group style = {controlMargin}>
                        <Button style = {submitButton} ><b>Login</b></Button> 
                    </Form.Group>

                </Form>
            </Col>


             {/* ================ RIGHT COLUMN =================== */ }
            <Col lg={6} md={3} sm={12} className="text-center">
                <img className="w-100" src={login} alt=""/>
            </Col>
            </Row>
        </Container>

    )
}


export default LoginPage