import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import NavBar from './NavBar'
import TutoringSessionCard from './TutoringSessionCard'
import TutoringSessionCreateForm from './TutoringSessionCreateForm'
import tutoringSessionService from '../services/tutoring-sessions'

const TutoringSessionPage = () => {
  const [sessions, setSessions] = useState([])
  const [tutoringSessions, setTutoringSessions] = useState([])
  const [studentRequestingSessions, setStudentRequestingSessions] = useState([])
  const [isTutor, setIsTutor] = useState(true)
  const [visible, setVisible] = useState(false)

  const containerStyle = {
    margin: '5% 0% 5% 0%',
  }

  useEffect(() => {
    tutoringSessionService.getAll().then((sessions) => {
      setSessions(sessions)
      setTutoringSessions(sessions.filter((session) => session.tutor))
      setStudentRequestingSessions(sessions.filter((session) => !session.tutor))
    })
  }, [])

  const handlePageSwitching = () => {
    isTutor ? setIsTutor(false) : setIsTutor(true)
  }

  const handleShowSessionCreateForm = () => {
    visible ? setVisible(false) : setVisible(true)
  }

  const renderConditionalTutoringSessions = () => {
    if (isTutor) {
      return tutoringSessions.map((session, i) => (
        <Col>
          <TutoringSessionCard session={session} />
        </Col>
      ))
    } else {
      return studentRequestingSessions.map((session, i) => (
        <Col>
          <TutoringSessionCard session={session} />
        </Col>
      ))
    }
  }

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center', marginTop: '5%' }}>
        <h1>
          {isTutor ? (
            <>Tutoring Session</>
          ) : (
            <>Student Requesting Tutoring Sessions</>
          )}
        </h1>
        <Button variant='info' onClick={handlePageSwitching}>
          Go To Student Requesting Tutoring Sessions Page
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <Button variant='primary' onClick={handleShowSessionCreateForm}>
          Show Session Create Form
        </Button>
        <TutoringSessionCreateForm visible={visible} isTutor={isTutor} />
      </div>

      {/* Render all sessions */}
      <Container style={containerStyle} fluid>
        <Row xs={1} md={4} className='g-4'>
          {renderConditionalTutoringSessions()}
        </Row>
      </Container>
    </div>
  )
}

export default TutoringSessionPage
