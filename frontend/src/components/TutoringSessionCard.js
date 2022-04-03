import { React } from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'

const TutoringSessionCard = ({ session }) => {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Header as='h5'>{session.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {/* Tutor/Tutee info */}
          <div style={{ textAlign: 'center' }}>
            <h5>
              <b>{session.tutor ? <>Tutor</> : <>Tutee</>} Information</b>
            </h5>
          </div>
          <div>Name: {session.name}</div>
          <div>Biography: {session.biography}</div>
          <div>Contact Information: {session.contactInformation}</div>

          <br></br>

          {/* Session info */}
          <div style={{ textAlign: 'center' }}>
            <h5>
              <b>Session Information</b>
            </h5>
          </div>
          <div>Course: {session.course}</div>
          <div>Available Time: {session.availableTime}</div>
          <div>Location: {session.location}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TutoringSessionCard
