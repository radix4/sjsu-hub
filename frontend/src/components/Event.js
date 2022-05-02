import { React } from 'react'
import { Accordion, Row, Col } from 'react-bootstrap'

const Event = ({ event, id }) => {
  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>{event.title}</Accordion.Header>
      <Accordion.Body>
        <Row className='g-4'>
          <Col>
            <h2>Information</h2>
            <p>
              <b>Creator</b>: {event.creator}
            </p>
            <p>
              <b>Description</b>: {event.description}
            </p>
          </Col>
          <Col>
            <h2>Location</h2>
            <p>
              <b>Latitude Degrees</b>: {event.latdegrees}
            </p>
            <p>
              <b>Latitude Direction</b>: {event.latdir}
            </p>
            <p>
              <b>Longitude Degrees</b>: {event.longdegrees}
            </p>
            <p>
              <b>Longitude Direction</b>: {event.longdir}
            </p>
          </Col>
          <Col>
            <h2>Time</h2>
            <p>
              <b>Start Time</b>: {event.start}
            </p>
            <p>
              <b>End Time</b>: {event.end}
            </p>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default Event
