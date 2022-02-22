import React , { useState } from 'react'
import {Container, Col, Form, Button, Row} from 'react-bootstrap'

const FriendsPage = () => {

    return (
        <Container>
            <Col  className='text-center mt-5 p-3'>
                <Form id = 'friend_search'>
                    <Form.Group controlId = 'search_box' >
                        <Form.Control type = 'text' placeholder = 'Enter name...' / >
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Button type = 'submit'>
                            Search
                        </Button>
                    </Form.Group>
                </Form>
                <br/>
                <h2> Potential Friends </h2>
                {/* Later this page will include a function similar to search/writeToHTML from JobPage to populate the friends list. */}
                <div id="friend_list" class="container">
                    
                </div>
            </Col>
        </Container>

    )

}

export default FriendsPage