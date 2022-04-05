import React , { useState, useEffect } from 'react'
import {Container, Col, Form, Button, Table, Row} from 'react-bootstrap'
import userService from '../services/users'
import Notification from './Notification'

const FriendsPage = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {

        userService.getAllUsers().then((users) => {
            setAllUsers(users);
            // console.log(users)
            // setAllUsers(users);
            // console.log('allUsers = ' + allUsers)
            // displayAlert(users.map(user => <div>{user.firstName} {user.lastName} </div>), '')
        })

        userService.getFriends("2").then((friends) => {
            setFriends(friends);
        })

      }, [])
   
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

                <h2>Friend Requests</h2>

                <h2>My Friends</h2>

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.map(friend => (
                        <tr key={friend.id} ><
                            td>{friend.id}</td>
                            <td>{friend.firstName}</td>
                            <td>{friend.lastName}</td>
                            <td>{friend.email}</td>
                            </tr>))}
                    </tbody>
                </Table>

                <h2>All Users</h2>

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map(user => (
                        <tr key={user.id} ><
                            td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            </tr>))}
                    </tbody>
                </Table>
            
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
                <div id="friend_list" className="container">
                <Notification message={errorMessage} type={typeAlert} /> 
               
                </div>
            </Col>
        </Container>

    )

}

export default FriendsPage