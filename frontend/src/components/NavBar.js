import React, { useState, useEffect } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Container,
  Image,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import imgLogo from '../images/SJSU-Hub-logos.jpeg'

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      setLoggedIn(true)
    }
  }, [])

  const logoStyle = {
    borderRadius: '5px',
    width: '50px',
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setLoggedIn(false)
  }

  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Container fluid>
        <Link to='/'>
          <Navbar.Brand>
            <Image src={imgLogo} style={logoStyle}></Image>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <Nav.Link href='/'>Home</Nav.Link>

            <NavDropdown title='Navigation' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='/Login'>Login</NavDropdown.Item>
              <NavDropdown.Item href='/Registration'>
                Registration
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/GroupChatPage'>
                Group Chat
              </NavDropdown.Item>
              <NavDropdown.Item href='/JobPage'>
                Internships and Jobs
              </NavDropdown.Item>
              <NavDropdown.Item href='/ForumPage'>Forums</NavDropdown.Item>
              <NavDropdown.Item href='/TutoringSessionPage'>
                Tutoring Sessions
              </NavDropdown.Item>
              <NavDropdown.Item href='/FriendsPage'>
                Friends Page
              </NavDropdown.Item>
              <NavDropdown.Item href='/'>Events Page</NavDropdown.Item>
              <NavDropdown.Item href='/'>Study Groups</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className='d-flex'>
            {loggedIn && (
              <Link to='/AccountPage'>
                <Button variant='outline-success' style={{ margin: '5px' }}>
                  Account
                </Button>
              </Link>
            )}
            {loggedIn && (
              <Button
                variant='outline-success'
                style={{ margin: '5px' }}
                onClick={handleLogout}>
                Logout
              </Button>
            )}
            {!loggedIn && (
              <Link to='/Login'>
                <Button variant='outline-success' style={{ margin: '5px' }}>
                  Login
                </Button>
              </Link>
            )}
            {!loggedIn && (
              <Link to='/Registration'>
                <Button variant='outline-success' style={{ margin: '5px' }}>
                  Registration
                </Button>
              </Link>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
