import { React } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import NavBar from './NavBar'
import TutoringSession from './TutoringSession'

const containerStyle = {
  margin: '5% 0% 5% 0%',
}

const TutoringSessionPage = () => {
  return (
    <div>
      <NavBar />

      <div style={{ textAlign: 'center', marginTop: '5%' }}>
        <h1>Tutoring Sessions</h1>
        <Button variant='info'>
          Go To Student Requesting Tutoring Sessions
        </Button>
      </div>

      <Container style={containerStyle} fluid>
        <Row xs={1} md={4} className='g-4'>
          {Array.from({ length: 12 }).map((_, idx) => (
            <Col>
              <TutoringSession />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default TutoringSessionPage
