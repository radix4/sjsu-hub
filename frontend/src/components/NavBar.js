import React from 'react'
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
  const logoStyle = {
    borderRadius: '5px',
    width: '50px',
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
            <Nav.Link>Home</Nav.Link>
            <Nav.Link href='#action2'>Link</Nav.Link>
            <NavDropdown title='Link' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#' disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className='d-flex'>
            <Button variant='outline-success'>Account</Button>
            <Button variant='outline-success'>Login</Button>
            <Button variant='outline-success'>Registration</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
