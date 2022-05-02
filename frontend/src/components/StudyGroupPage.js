import React, {Component, useState, useEffect, map} from 'react';
import { Col, Row, Button, Form, Card, } from 'react-bootstrap'
import Notification from './Notification'
import NavBar from './NavBar'
import studyGroupService from '../services/studygroup';

//Study Group Create Page

const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
document.body.style = 'background: #FFF1D7;'




//clean up pages ui


        
  
//this creates the study group form
const StudyGroupPage = () => {


  const [errorMessage, setErrorMessage] = useState(null)
  const [typeAlert, setTypeAlert] = useState(null)

  const cardStyle = {
    margin: '2% 20% 5% 20%',
    //display: visible ? '' : 'none',
  }

  const displayAlert = (message, type) => {
    console.log(
      '\n----\ndisplayAlert Message: ' +
        message +
        '\nType: ' +
        type +
        '\n-------\n'
    )
    setErrorMessage(message)
    setTypeAlert(type)
  }


  const createStudyGroup = async (event) =>{

    event.preventDefault();

    console.log("in study group function after on submit")

    let studyGroupForm = document.getElementById('create-study-group-form');
    

    const newStudyGroup = {
      subject: studyGroupForm.elements.studyGroupName.value,
      description: studyGroupForm.elements.studyGroupDesc.value,
      meetingDay: studyGroupForm.elements.daySelector.value,
      meetingTime: studyGroupForm.elements.timeSelector.value,
      meridiem: studyGroupForm.elements.meridiemSelector.value
      
      //members: studyGroupForm.elements.members.value
    }

  

    

    try {
      await studyGroupService.createStudyGroup(newStudyGroup).then((returnedStudyGroup) =>{
        window.location = '/StudyGroupPage';
      })
    } catch (exception) {
      throw(exception);
    }

  }
    return(   
    <Card style={cardStyle}>
    <Form id='create-study-group-form' onSubmit={createStudyGroup}>
      <br></br>
      <div style={{ textAlign: 'center' }}>
        <h5>
          <b>Study Group</b>
        </h5>
      </div>
      {/* ============= Name ============= */}

      <Form.Group
        as={Row}
        controlId='studyGroupName'
        >
        <Form.Label column md={2}>
          Title
        </Form.Label>
        <Col md={9}>
          <Form.Control type='text' placeholder='e.g. "CMPE 195A"' required/>
        </Col>
      </Form.Group>
      <br></br>

      {/* =============Bio============= */}

      <Form.Group
        as={Row}
        controlId='studyGroupDesc'
        >
        <Form.Label column md={2}>
          Description
        </Form.Label>
        <Col md={9}>
          <Form.Control
            as='textarea'
            rows={4}
            placeholder='e.g. Study Group for CMPE 195A'
            required/>
        </Col>
      </Form.Group>
      <br></br>

      <div style={{ textAlign: 'center' }}>
        <h5>
          <b>Session Information</b>
        </h5>
      </div>

      {/* =============Avail Time============= */}
      <Form.Group
        as={Row}
        controlId='studyGroupDay'
        >
        <Form.Label column md={2}>
          Available Day
        </Form.Label>
        <Col md={9}>
          <Form.Select id="daySelector"
            type='text'
            placeholder='e.g. Mon 2-3pm, Wed 10-12am'
            required>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </Form.Select>
        </Col>
      </Form.Group>
      <br></br>

      {/* =============Avail Time============= */}
      <Form.Group
        as={Row}
        controlId='studyGroupTime'
        >
        <Form.Label column md={2}>
          Available Time
        </Form.Label>
        <Col md={9}>
          <Form.Select id="timeSelector"
            type='text'
            placeholder='e.g. 2-3pm, 10-12am'
            required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select id="meridiemSelector" 
            placeholder='e.g. 2-3pm, 10-12am'
            required>
              <option>AM</option>
              <option>PM</option>              
          </Form.Select>      
        </Col>
      </Form.Group>
      <br></br>
      <Notification message={errorMessage} type={typeAlert} />
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


//window.location.reload(false) check what this does later... 
//event.preventDefault() // avoid form submit to refresh the page
export default StudyGroupPage;