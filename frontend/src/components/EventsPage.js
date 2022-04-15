import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Button, Accordion } from 'react-bootstrap'
import NavBar from './NavBar'
import Event from './Event'
import EventCreateForm from './EventCreateForm'
import eventsService from '../services/events'

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [visible, setVisible] = useState(false)

  const containerStyle = {
    margin: '5% 0% 5% 0%',
  }

  useEffect(() => {
    eventsService.getAll().then((events) => {
      setEvents(events)
    })

    console.log(events)
  }, [])

  const handleShowCreateForm = () => {
    visible ? setVisible(false) : setVisible(true)
  }

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center', marginTop: '5%' }}>
        <h1>Upcoming Events</h1>
        <br></br>
        <Button variant='primary' onClick={handleShowCreateForm}>
          Show Create Event Form
        </Button>
        <EventCreateForm visible={visible} />
      </div>

      <Container style={containerStyle} fluid>
        <Row className='g-4'>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            {events.map((event, id) => (
              <Col>
                <Event event={event} id={id} />
              </Col>
            ))}
          </Accordion>
        </Row>
      </Container>
    </div>
  )
}

export default EventsPage
