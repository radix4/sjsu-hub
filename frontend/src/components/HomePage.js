import React from 'react';
import {Container, Col, Form, Row, Button} from 'react-bootstrap';

const HomePage = () => {

    {/* working on flexbox, currently not working so I styled each seperately*/ }


    return (

        <Container fluid>

            <Row className="">
                <Col style= {{marginLeft: '1000px', paddingTop: '10px'}}>
                <Button variant="primary">Login</Button>
                </Col>
            </Row>


            <Row style={{marginTop: '200px', paddingLeft: '150px'}}className = "" >
                <Col>
                    <h1>SJSU HUB</h1>
                </Col>
                <Col xs={6}>
                    <img
                        src='https://blogs.sjsu.edu/newsroom/files/2021/02/strategic-plan-jduarte-031319-19.jpg'
                        className='img-fluid rounded'
                        alt='example'
                        style={{ maxWidth: '24rem' }}
                    />
                </Col>
            </Row>

            <Row style={{marginLeft: '100px'}}>
                <Col>
                    <p> A meeting space for all Spartans</p>
                </Col>
            </Row>

            <Row style={{marginTop: "100px"}}>
                <Col sm={3}>
                    <Button variant="primary">Group Chat</Button> 
                </Col>
                <Col sm={3}>
                    <Button variant="primary">Internships and Jobs</Button>
                </Col>

            </Row> 

        </Container>
    )
}

export default HomePage

