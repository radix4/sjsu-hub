import  React from 'react';
import {Container, Form, Row, Button} from 'react-bootstrap';

const JobPage = () => {

    return (
        <Container>
            <Form>
                <Form id = 'job_search'>
                    <Form.Group controlID = 'search_bar'>
                        <Form.Control type = 'text' placeholder = 'Search...' / >
                    </Form.Group>
                    <Form.Group>
                        <Button type = 'submit'>
                            Search
                        </Button>
                    </Form.Group>
                </Form>
            </Form>
        </Container>
    )
}

export default JobPage