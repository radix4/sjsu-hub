import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Form, Card } from 'react-bootstrap'
import tutoringSessionService from '../services/tutoring-sessions'

const TutoringSessionCreateForm = ({ visible, isTutor }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('tmp@email.com')
  const [bio, setBio] = useState('')
  const [contactInfo, setContactInfo] = useState('')

  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [availTime, setAvailTime] = useState('')
  const [location, setLocation] = useState('')

  const sanitizeHtml = require('sanitize-html')
  const onChangeName = (event) => setName(sanitizeHtml(event.target.value))
  const onChangeBio = (event) => setBio(sanitizeHtml(event.target.value))
  const onChangeContactInfo = (event) => setContactInfo(sanitizeHtml(event.target.value))

  const onChangeTitle = (event) => setTitle(sanitizeHtml(event.target.value))
  const onChangeCourse = (event) => setCourse(sanitizeHtml(event.target.value))
  const onChangeAvailTime = (event) => setAvailTime(sanitizeHtml(event.target.value))
  const onChangeLocation = (event) => setLocation(sanitizeHtml(event.target.value))

  const cardStyle = {
    margin: '2% 20% 5% 20%',
    display: visible ? '' : 'none',
  }

  const saveSession = async (event) => {
    event.preventDefault() // avoid form submit to refresh the page

    const newSession = {
      name: name,
      email: email,
      biography: bio,
      contactInformation: contactInfo,

      title: title,
      course: course,
      availableTime: availTime,
      location: location,
      tutor: isTutor,
    }

    console.log(newSession)

    try {
      await tutoringSessionService
        .create(newSession)
        .then((returnedSession) => {
          console.log('create new session success!')
        })

      setName('')
      setBio('')
      setContactInfo('')

      setTitle('')
      setCourse('')
      setAvailTime('')
      setLocation('')

      document.getElementById('create-tutoring-session-form').reset()
      window.location.reload(false)
    } catch {
      console.log('Create session failed.')
    }
  }

  return (
    <Card style={cardStyle}>
      <Form id='create-tutoring-session-form' onSubmit={saveSession}>
        <br></br>
        <div style={{ textAlign: 'center' }}>
          <h5>
            <b>Tutor Information</b>
          </h5>
        </div>
        {/* ============= Name ============= */}

        <Form.Group
          as={Row}
          controlId='create-tutoring-session-form-name'
          onChange={onChangeName}>
          <Form.Label column md={2}>
            Name
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. "John Doe."' />
          </Col>
        </Form.Group>
        <br></br>

        {/* =============Bio============= */}

        <Form.Group
          as={Row}
          controlId='create-tutoring-session-form-bio'
          onChange={onChangeBio}>
          <Form.Label column md={2}>
            Biography
          </Form.Label>
          <Col md={9}>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='e.g. A senior and major in B.S. Software Engineering.'
            />
          </Col>
        </Form.Group>
        <br></br>

        {/* =============Contact Info============= */}
        <Form.Group
          as={Row}
          controlId='create-tutoring-session-form-contactInfo'
          onChange={onChangeContactInfo}>
          <Form.Label column md={2}>
            Contact Information
          </Form.Label>
          <Col md={9}>
            <Form.Control
              type='text'
              placeholder='e.g. contact-info@sjsu.edu'
              title = "Enter a valid SJSU email address: xxx@sjsu.edu"
              pattern ="[a-zA-Z0-9]+@sjsu.edu"
            />
          </Col>
        </Form.Group>
        <br></br>

        <div style={{ textAlign: 'center' }}>
          <h5>
            <b>Session Information</b>
          </h5>
        </div>

        {/* =============Post Title============= */}
        <Form.Group
          as={Row}
          controlId='create-tutoring-session-form-postTitle'
          onChange={onChangeTitle}>
          <Form.Label column md={2}>
            Post Title
          </Form.Label>
          <Col md={9}>
            <Form.Control
              type='text'
              placeholder='e.g. Tutoring Session Available for CS 146'
            />
          </Col>
        </Form.Group>
        <br></br>

        {/* =============Course============= */}
        <Form.Group
          as={Row}
          controlId='create-tutoring-session-form-course'
          onChange={onChangeCourse}>
          <Form.Label column md={2}>
            Course
          </Form.Label>
          <Col md={9}>
            <Form.Control type='text' placeholder='e.g. CS 146' />
          </Col>
        </Form.Group>
        <br></br>

        {/* =============Avail Time============= */}
        <Form.Group
          as={Row}
          controlId='create-tutoring-session-form-availTime'
          onChange={onChangeAvailTime}>
          <Form.Label column md={2}>
            Available Time
          </Form.Label>
          <Col md={9}>
            <Form.Control
              type='text'
              placeholder='e.g. Mon 2-3pm, Wed 10-12am'
            />
          </Col>
        </Form.Group>
        <br></br>

        {/* =============Location============= */}
        <Form.Group
          as={Row}
          controlId='create-tutoring-session-form-location'
          onChange={onChangeLocation}>
          <Form.Label column md={2}>
            Location
          </Form.Label>
          <Col md={9}>
            <Form.Control
              type='text'
              placeholder='e.g. Online via Zoom or In-person on Campus'
            />
          </Col>
        </Form.Group>
        <br></br>

        {/* =============Submit Button============= */}
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

export default TutoringSessionCreateForm
