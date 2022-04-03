import React from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const backgroundColor = {
    backgroundColor: '#FFF1D7',
  }

  const title = {
    marginLeft: '400px',
    marginTop: '300px',
  }

  const slogan = {
    marginLeft: '410px',
    paddingTop: '50px',
  }

  const firstRow = {
    paddingTop: '50px',
    paddingLeft: '400px',
  }

  const secondRow = {
    paddingTop: '50px',
    paddingLeft: '300px',
    paddingBottom: '50px',
  }

  const img = {
    paddingRight: '50px',
    borderRadius: '50px',
  }

  return (
    <Container fluid style={backgroundColor}>
      <Row className='d-flex align-items-center'>
        <Col sm={7}>
          <Col style={title}>
            <h1> SJSU HUB </h1>
          </Col>
          <Col style={slogan}>
            <p>A space for all spartans</p>
          </Col>
          <Col style={firstRow}>
            <Link to='/Registration'>
              <Button
                style={{ margin: '5px' }}
                variant='outline-primary'
                size='lg'>
                Register
              </Button>
            </Link>
            <Link to='/Login'>
              <Button variant='outline-primary' size='lg'>
                Login
              </Button>
            </Link>
          </Col>
          <Col style={secondRow}>
            <Button style={{ margin: '5px' }} variant='outline-primary'>
              Group Chat
            </Button>
            <Link to='/JobPage'>
              <Button style={{ margin: '5px' }} variant='outline-primary'>
                Internships and Jobs
              </Button>
            </Link>

            <Link to='/ForumPage'>
              <Button style={{ margin: '5px' }} variant='outline-primary'>
                Forums
              </Button>
            </Link>
            <Link to='/TutoringSessionPage'>
              <Button style={{ margin: '5px' }} variant='outline-primary'>
                Tutoring Sessions
              </Button>
            </Link>
          </Col>
        </Col>

        <Col sm={5}>
          <img
            src='https://c1.wallpaperflare.com/preview/500/75/689/san-jose-state-university-california-buildings-campus.jpg'
            className='img-fluid rounded'
            alt='example'
            style={img}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
