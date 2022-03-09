import React , { useState } from 'react'
import {Container, Col, Form, Button, Row} from 'react-bootstrap'
import userService from '../services/users'
import Notification from './Notification'

const FriendsPage = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

   
    const getUsers = async(event) => {
        event.preventDefault()

        try {
            await userService.getAllUsers().then((users) => {
                console.log(users)
                setAllUsers(users);
                console.log('allUsers = ' + allUsers)
                displayAlert(users.map(user => <div>{user.firstName} {user.lastName} </div>), '')
            })
        } catch {
            displayAlert('Failed to get users', 'error')
            console.log('Friends: failed to display list of all users')
        }
        
    }

   
    const displayAlert = (message, type) => {
        console.log('\n----\ndisplayAlert Message: ' + message + '\nType: ' + type + '\n------\n' )
        setErrorMessage(message)
        setTypeAlert(type)
      }

    
    return (
        <Container>
            <Col  className='text-center mt-5 p-3'>
                <Form id = 'friend_search' onSubmit = {getUsers}>
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
                <Notification message={errorMessage} type={typeAlert} /> 
                {/* <ol>
                    {allUsers.map((user) => (
                        <li>{user}</li>
                    ))}
                </ol> */}
                </div>
            </Col>
        </Container>

    )

}

export default FriendsPage