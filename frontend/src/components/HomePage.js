import React from 'react'
import { Container, Col, Row, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import imgLogo from '../images/SJSU-Hub-logos.jpeg'

const HomePage = () => {
  const containerStyle = {
    backgroundColor: '#FFF1D7',
    marginTop: '5%',
  }

  const leftColStyle = {
    textAlign: 'center',
  }

  const logoStyle = {
    textAlign: 'center',
    borderRadius: '10px',
    width: '40%',
  }

  const rightColStyle = {
    textAlign: 'center',
  }

  const schoolImgStyle = {
    width: '90%',
    borderRadius: '10px',
  }

  return (
    <div>
      <NavBar />
      <Container fluid style={containerStyle}>
        <Row>
          <Col sm={6} style={leftColStyle}>
            <h1>A Space for All Spartans!</h1>
            <Image src={imgLogo} style={logoStyle}></Image>
            <br></br>
            <br></br>
            {/* I don't think this is necessary when we have the navbar
            
            <Row>
              <Col>
                <Link to='/Registration'>
                  <Button style={{ margin: '5px' }} variant='primary' size='lg'>
                    Register
                  </Button>
                </Link>
                <Link to='/Login'>
                  <Button variant='primary' size='lg' style={{ margin: '5px' }}>
                    Login
                  </Button>
                </Link>
              </Col>
            </Row>
            <br></br> */}
            <Row>
              <Col>
                <Button variant='outline-primary' style={{ margin: '5px' }}>
                  Group Chat
                </Button>
                <Link to='/JobPage'>
                  <Button variant='outline-primary' style={{ margin: '5px' }}>
                    Internships and Jobs
                  </Button>
                </Link>

                <Link to='/ForumPage'>
                  <Button variant='outline-primary' style={{ margin: '5px' }}>
                    Forums
                  </Button>
                </Link>
                <Link to='/TutoringSessionPage'>
                  <Button variant='outline-primary' style={{ margin: '5px' }}>
                    Tutoring Sessions
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to='/FriendsPage'>
                  <Button variant='outline-primary' style={{ margin: '5px' }}>
                    Friends Page
                  </Button>
                </Link>
                <Link to='/EventsPage'>
                  <Button variant='outline-primary' style={{ margin: '5px' }}>
                    Events Page
                  </Button>
                </Link>
                <Link to='/GroupStudyPage'>
                  <Button variant='outline-primary' style={{ margin: '5px' }}>
                    Study Groups
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>

          <Col sm={6} style={rightColStyle}>
            <Image
              src='https://c1.wallpaperflare.com/preview/500/75/689/san-jose-state-university-california-buildings-campus.jpg'
              style={schoolImgStyle}></Image>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
