import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Button, Table, Row } from 'react-bootstrap'
import userService from '../services/users'
import NavBar from './NavBar'

const FriendsPage = () => {
  const [allUsers, setAllUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [sentFriendRequests, setSentFriendRequests] = useState([])

  useEffect(() => {
    userService.getAllUsers().then((users) => {
      setAllUsers(users)
      // console.log(users)
      // setAllUsers(users);
      // console.log('allUsers = ' + allUsers)
      // displayAlert(users.map(user => <div>{user.firstName} {user.lastName} </div>), '')
    })

    const user = {
      email: '2',
    }

    try {
      userService.getFriends(user).then((friends) => {
        setFriends(friends)
      })

      userService.getFriendRequests(user).then((requests) => {
        setFriendRequests(requests)
      })

      userService.getSentFriendRequests(user).then((sentRequests) => {
        setSentFriendRequests(sentRequests)
      })
    } catch (exception) {
      console.log('Error = ' + exception)
    }
  }, [])

  const sendFriendRequest = (friendEmail) => {
    console.log('2 is sending friend request ' + friendEmail)
    const user = {
      email: '2',
      friendRequests: [friendEmail],
    }
    userService.sendFriendRequest(user).then((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  const cancelFriendRequest = (friendEmail) => {
    console.log('2 is canceling request sent to ' + friendEmail)
    const user = {
      email: '2',
      sentFriendRequests: [friendEmail],
    }
    userService.cancelFriendRequest(user).then((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  const acceptFriendRequest = (friendEmail) => {
    console.log('2 is accepting request sent to ' + friendEmail)
    const user = {
      email: '2',
      friendRequests: [friendEmail],
    }
    userService.acceptFriendRequest(user).then((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  const declineFriendRequest = (friendEmail) => {
    console.log('2 is declining request sent to ' + friendEmail)
    const user = {
      email: '2',
      friendRequests: [friendEmail],
    }
    userService.declineFriendRequest(user).then((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  const unfriend = (friendEmail) => {
    console.log('2 is unfriending ' + friendEmail)
    const user = {
      email: '2',
      friends: [friendEmail],
    }
    userService.unfriend(user).then((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Col className='text-center mt-5 p-3'>
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
              {friendRequests.map((request) => (
                <tr key={request.email}>
                  <td>{request.id}</td>
                  <td>{request.firstName}</td>
                  <td>{request.lastName}</td>
                  <td>{request.email}</td>
                  <td>
                    <Button onClick={() => acceptFriendRequest(request.email)}>
                      Accept Request
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => declineFriendRequest(request.email)}>
                      Delete Request
                    </Button>
                  </td>
                </tr>
              ))}
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
              {sentFriendRequests.map((sentRequest) => (
                <tr key={sentRequest.email}>
                  <td>{sentRequest.id}</td>
                  <td>{sentRequest.firstName}</td>
                  <td>{sentRequest.lastName}</td>
                  <td>{sentRequest.email}</td>
                  <td>
                    <Button
                      onClick={() => cancelFriendRequest(sentRequest.email)}>
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
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
              {friends.map((friend) => (
                <tr key={friend.email}>
                  <td>{friend.id}</td>
                  <td>{friend.firstName}</td>
                  <td>{friend.lastName}</td>
                  <td>{friend.email}</td>
                  <td>
                    <Button onClick={() => unfriend(friend.email)}>
                      Unfriend
                    </Button>
                  </td>
                </tr>
              ))}
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
              {allUsers.map((user) => (
                <tr key={user.email}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button onClick={() => sendFriendRequest(user.email)}>
                      {' '}
                      Friend
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Form id='friend_search'>
            <Form.Group controlId='search_box'>
              <Form.Control type='text' placeholder='Enter name...' />
            </Form.Group>
            <br />
            <Form.Group>
              <Button type='submit'>Search</Button>
            </Form.Group>
          </Form>
          <br />
        </Col>
      </Container>
    </div>
  )
}

export default FriendsPage
