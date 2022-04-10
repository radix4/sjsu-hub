import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Button, Table, Row } from 'react-bootstrap'
import userService from '../services/users'
import NavBar from './NavBar'

const FriendsPage = () => {
  const [allUsers, setAllUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [sentFriendRequests, setSentFriendRequests] = useState([])

  const containerStyle = {
    margin: '5% 0% 5% 0%',
  }

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

  const renderTable = (list) => {
    let listArray = []

    if (list === 'allUsers') listArray = allUsers
    else if (list === 'friends') listArray = friends
    else if (list === 'friendRequests') listArray = friendRequests
    else if (list === 'sentFriendRequests') listArray = sentFriendRequests

    return (
      <Table striped bordered hover size='sm'>
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
          {listArray
            .filter((item, idx) => idx < 5) // limit to 5 items
            .map((user) => (
              <tr key={user.email}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>

                {list === 'allUsers' && (
                  <td>
                    <Button onClick={() => sendFriendRequest(user.email)}>
                      Friend
                    </Button>
                  </td>
                )}
                {list === 'friends' && (
                  <td>
                    <Button onClick={() => unfriend(user.email)}>
                      Unfriend
                    </Button>
                  </td>
                )}
                {list === 'friendRequests' && (
                  <td>
                    <Button onClick={() => acceptFriendRequest(user.email)}>
                      Accept
                    </Button>
                  </td>
                )}
                {list === 'friendRequests' && (
                  <td>
                    <Button onClick={() => declineFriendRequest(user.email)}>
                      Decline
                    </Button>
                  </td>
                )}
                {list === 'sentFriendRequests' && (
                  <td>
                    <Button onClick={() => cancelFriendRequest(user.email)}>
                      Cancel
                    </Button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
        {listArray.length > 5 && <Button> More</Button>}
      </Table>
    )
  }

  return (
    <div>
      <NavBar />
      <br></br>
      <br></br>
      <br></br>
      {/* Neglecting search function at the moment
      
      <Container>
        <h2>Search for a friend</h2>
        <Form id='friend_search'>
          <Form.Group controlId='search_box'>
            <Form.Control type='text' placeholder='Enter name...' />
          </Form.Group>
          <br />
          <Form.Group>
            <Button type='submit'>Search</Button>
          </Form.Group>
        </Form>
      </Container> */}
      <Container style={containerStyle} fluid>
        <Row>
          <Col className='border-right'>
            <h2>All Users</h2>
            {renderTable('allUsers')}
          </Col>
          <Col className='border-right'>
            <h2>My Friends</h2>
            {renderTable('friends')}
          </Col>
          <Col className='border-right'>
            <h2>Received Friend Requests</h2>
            {renderTable('friendRequests')}
          </Col>
          <Col className='border-right'>
            <h2>Sent Friend Requests</h2>
            {renderTable('sentFriendRequests')}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FriendsPage
