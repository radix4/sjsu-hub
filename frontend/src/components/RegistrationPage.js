import React from 'react';
import {Container, Col, Form, Row} from 'react-bootstrap';

const RegistrationPage = () => {

    return (
        <Container>
            {/* ================ LEFT COLUMN =================== */ }
            <Col md={6}>
                <Form id = 'registration'>
                    <Form.Group as={Row} controlId='firstName'>
                        <Form.Label>
                            First Name
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='text' placeholder='First Name' />
                        </Col>
                    </Form.Group>
                </Form>

                <Form id = 'registration'>
                    <Form.Group as={Row} controlId='lastName'>
                        <Form.Label>
                            Last Name
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control type='text' placeholder='Last Name' />
                        </Col>
                    </Form.Group>
                </Form>

                <Form id = 'registration'>
                    <Form.Group as={Row} controlId='sjsuEmail'>
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
        </Container>

    )
}

export default RegistrationPage()

