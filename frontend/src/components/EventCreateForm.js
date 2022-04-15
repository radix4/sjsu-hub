import React, { useState } from 'react'
import { Col, Row, Button, Form, Card } from 'react-bootstrap'
import eventService from '../services/events'

const EventCreateForm = ({ visible }) => {
  const [creator, setCreator] = useState('Rhea@gmail.com')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [latdegrees, setLatdegrees] = useState()
  const [latdir, setLatdir] = useState('')
  const [longdegrees, setLongdegrees] = useState()
  const [longdir, setLongdir] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const onChangeTitle = (event) => setTitle(event.target.value)
  const onChangeDescription = (event) => setDescription(event.target.value)
  const onChangeLatdegrees = (event) => setLatdegrees(event.target.value)
  const onChangeLatdir = (event) => setLatdir(event.target.value)
  const onChangeLongDegrees = (event) => setLongdegrees(event.target.value)
  const onChangeLongDir = (event) => setLongdir(event.target.value)
  const onChangeStart = (event) => setStart(event.target.value)
  const onChangeFinish = (event) => setEnd(event.target.value)

  const cardStyle = {
    margin: '2% 20% 5% 20%',
    display: visible ? '' : 'none',
  }

  const saveSession = async (event) => {
    event.preventDefault() // avoid form submit to refresh the page

    const newEvent = {
      creator: creator,
      title: title,
      description: description,
      latdegrees: latdegrees,
      latdir: latdir,
      longdegrees: longdegrees,
      longdir: longdir,
      start: start,
      end: end,
    }

    try {
      await eventService.create(newEvent).then((returnedEvent) => {
        console.log('create new session success!')
      })

      setCreator('')
      setTitle('')
      setLatdegrees('')
      setLatdir('')
      setLongdegrees('')
      setLongdir('')
      setStart('')
      setEnd('')

      document.getElementById('create-event-form').reset()
      window.location.reload(false)
    } catch {
      console.log('Create event failed.')
    }
  }

  return (
    <Card style={cardStyle}>
      <Form id='create-event-form' onSubmit={saveSession}>
        <br></br>

        <div style={{ textAlign: 'center' }}>
          <h5>
            <b>Description</b>
          </h5>
        </div>

        <Form.Group as={Row} onChange={onChangeTitle}>
          <Form.Label column md={2}>
            Title
          </Form.Label>
          <Col md={9}>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='e.g. Graduation Party'
            />
          </Col>
        </Form.Group>
        <br></br>

        <Form.Group as={Row} onChange={onChangeDescription}>
          <Form.Label column md={2}>
            Description
          </Form.Label>
          <Col md={9}>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='e.g. A party for all graduating seniors.'
            />
          </Col>
        </Form.Group>
        <br></br>

        <div style={{ textAlign: 'center' }}>
          <h5>
            <b>Location</b>
          </h5>
        </div>

        <Form.Group as={Row} onChange={onChangeLatdegrees}>
          <Form.Label column md={2}>
            Latitude Degrees
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. 30.123' />
          </Col>
        </Form.Group>
        <br></br>

        <Form.Group as={Row} onChange={onChangeLatdir}>
          <Form.Label column md={2}>
            Latitude Direction
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. N' />
          </Col>
        </Form.Group>
        <br></br>

        <Form.Group as={Row} onChange={onChangeLongDegrees}>
          <Form.Label column md={2}>
            Longitude Degrees
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. 121.313' />
          </Col>
        </Form.Group>
        <br></br>

        <Form.Group as={Row} onChange={onChangeLongDir}>
          <Form.Label column md={2}>
            Longitude Direction
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. W' />
          </Col>
        </Form.Group>
        <br></br>

        <div style={{ textAlign: 'center' }}>
          <h5>
            <b>Time</b>
          </h5>
        </div>

        <Form.Group as={Row} onChange={onChangeStart}>
          <Form.Label column md={2}>
            Start Time
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. 02-1-2022 06:00:00' />
          </Col>
        </Form.Group>
        <br></br>

        <Form.Group as={Row} onChange={onChangeFinish}>
          <Form.Label column md={2}>
            End Time
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. 02-1-2022 07:30:00' />
          </Col>
        </Form.Group>
        <br></br>

        <Form.Group as={Row}>
          <Col md={{ span: 3, offset: 9 }}>
            <Button type='submit'>Submit</Button>
          </Col>
        </Form.Group>
        <br></br>
      </Form>
    </Card>
  )
}

export default EventCreateForm
