import { React } from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'

const TutoringSession = () => {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Header as='h5'>Available for Tutoring</Card.Header>
      <Card.Body>
        <Card.Text>
          {/* TUTOR INFORMATION */}
          <div style={{ textAlign: 'center' }}>
            <h5>
              <b>Tutor Information</b>
            </h5>
          </div>
          <div>Name: Jon Snow</div>
          <div>Biography: Swim</div>
          <div>Contact Information:</div>

          <br></br>

          {/* SESSION INFORMATION */}
          <div style={{ textAlign: 'center' }}>
            <h5>
              <b>Session Information</b>
            </h5>
          </div>
          <div>Course: CS 666</div>
          <div>Available Time: 02/02/2022</div>
          <div>Location: SJSU Time Square</div>
        </Card.Text>
        <Button variant='primary'>Do I Need This</Button>
      </Card.Body>
    </Card>
  )
}

export default TutoringSession
