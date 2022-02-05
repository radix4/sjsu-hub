import React from 'react';
import {Container, Col, Form, Row} from 'react-bootstrap';

const RegistrationPage = () => {

    const leftColStyle = {
        padding: '0px',
      }
    
      const rightColStyle = {
        padding: '20%',
      }

    return (

        <Container fluid>
            <Row className='align-items-center d-flex flex-wrap-reverse'>
            {/* ================ LEFT COLUMN =================== */ }
            <Col style={leftColStyle} md={6}>
                <Form id = 'registration'>
                    <Form.Group  controlId='firstName'>
                        <Form.Label>
                            First Name
                        </Form.Label>
                        <Col md={6}>
                            <Form.Control type='text' placeholder='First Name' />
                        </Col>
                    </Form.Group>
                </Form>

                <Form id = 'registration'>
                    <Form.Group controlId='lastName'>
                        <Form.Label>
                            Last Name
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='text' placeholder='Last Name' />
                        </Col>
                    </Form.Group>
                </Form>

                <Form id = 'registration'>
                    <Form.Group  controlId='sjsuEmail'>
                        <Form.Label>
                            SJSU email address
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='text' placeholder='email' />
                        </Col>
                    </Form.Group>
                </Form>
            </Col>

            {/* ================ RIGHT COLUMN =================== */ }
            <Col md={6}>
                <p>placeholder</p>
            </Col>
            </Row>
        </Container>

    )
}

export default RegistrationPage