import React , { useState, useEffect } from 'react'
import {Container, Col, Form, Button, Table, Row} from 'react-bootstrap'
import userService from '../services/users'
import Notification from './Notification'

const FriendsPage = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentFriendRequests, setSentFriendRequests] = useState([]);

    useEffect(() => {

        userService.getAllUsers().then((users) => {
            setAllUsers(users);
            // console.log(users)
            // setAllUsers(users);
            // console.log('allUsers = ' + allUsers)
            // displayAlert(users.map(user => <div>{user.firstName} {user.lastName} </div>), '')
        })

        const user = {
            "email": "2",
        }

        try {
            userService.getFriends(user).then((friends) => {
                setFriends(friends);
            })

            userService.getFriendRequests(user).then((requests) => {
                setFriendRequests(requests);
            })

            userService.getSentFriendRequests(user).then((sentRequests) => {
                setSentFriendRequests(sentRequests);
            })
        } catch (exception) {
            console.log('Error = ' + exception)
        }
       

    
        

      }, [])

    // const sendFriendRequest = (event) => {

    // }
   


    return (
        <Container>
            <Col  className='text-center mt-5 p-3'>

                <h2>Received Friend Requests</h2>

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {friendRequests.map(request => (
                        <tr key={request.email} ><
                            td>{request.id}</td>
                            <td>{request.firstName}</td>
                            <td>{request.lastName}</td>
                            <td>{request.email}</td>
                            <td><Button>Accept Request</Button></td>
                            <td><Button>Delete Request</Button></td>
                            </tr>))}
                    </tbody>
                </Table>

                <h2>Sent Friend Requests</h2>

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {sentFriendRequests.map(sentRequest => (
                        <tr key={sentRequest.email} ><
                            td>{sentRequest.id}</td>
                            <td>{sentRequest.firstName}</td>
                            <td>{sentRequest.lastName}</td>
                            <td>{sentRequest.email}</td>
                            <td><Button>Cancel</Button></td>
                            </tr>))}
                    </tbody>
                </Table>

                <h2>My Friends</h2>

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.map(friend => (
                        <tr key={friend.email} ><
                            td>{friend.id}</td>
                            <td>{friend.firstName}</td>
                            <td>{friend.lastName}</td>
                            <td>{friend.email}</td>
                            <td><Button>Unfriend</Button></td>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map(user => (
                        <tr key={user.email} ><
                            td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td><Button>Friend</Button></td>
                            </tr>))}
                    </tbody>
                </Table>
            
                <Form id = 'friend_search' >
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
               
            </Col>
        </Container>

    )

}

export default FriendsPage