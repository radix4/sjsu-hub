import React, { useState } from 'react'
import { Container, Form, Col, Row, Button, Card } from 'react-bootstrap'
import jobService from '../services/jobs'
import Notification from './Notification'
import NavBar from './NavBar'

const JobPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeAlert, setTypeAlert] = useState(null)

  var cur = 6

  var results = []

  const search = async (event) => {
    event.preventDefault()
    console.log('In JobPage.js/search method\n')
    let form = document.getElementById('job_search')

    const query = form.elements.search_box.value
    console.log('Query: ' + query)

    try {
      await jobService.search(query).then((response) => {
        results = response.results
        console.log(results)
        // displayAlert('Jobs: ' + results, '')
        cur = response.length
        writeToHTML()
      })

      document.getElementById('job_search').reset()
    } catch (exception) {
      displayAlert('Failed to search query', 'error')
      console.log('Jobs: failed to search')
    }
  }

  function writeToHTML() {
    console.log('JobPage.js writeToHTML method beginning')
    var from = 0
    cur = results.length;
    //console.log("writing to HTML... page: " + page + "; results:" + from + "-->" + to); // shows the requested page and number of results being added to the html - for debuging and testing
    var html = '<div class="row my-1 px-2">'

    console.log('before for loop')
    for (let index = from; index < cur; index++) {
      console.log('for 1')
      const element = results[index]
      console.log('element = ' + element)
      let time = new Date(element.created)
      console.log('for 2')
      console.log('element description = ' + element.description)
      let description = element.description
      //let company = shorten(element.company.display_name, 20);
      // let salary = element.salary_min != element.salary_max ? `${currency} ${element.salary_min} - ${currency} ${element.salary_max}` : `${currency} ${element.salary_max}`;
      console.log('for 3')
      console.log('before html var incremented')

      html += `<Card class="card p-3 text-right" id={$element.id} border="dark" style = "box-shadow: 10px 10px 10px black; border: primary; background-color: white">
                <Card.Header>
                    <h3>Job: ${element.title}</h3>
                </Card.Header>
                <Card.Body>
                    <b>Company:</b> ${element.company.display_name} <br/>
                    <b>Location: </b> ${element.location.display_name}<br/>
                    <b>Posted:</b> ${time}<br/>
                    <hr class="rounded">
                    <p><b>Summary: </b>${description}</p>
                    <a href='${element.redirect_url}' class="btn btn-success" >Apply</a>
                </Card.Body>
            </Card>
            <hr class="rounded">`
      console.log('end of for loop')
    }
    console.log('out of for loop')
    // html += `</div> 
    //             <button id="show_more" type="submit" onclick="showMore()"
                
    //             >Show more</button>`
    console.log('HTML: ' + html)
    document.getElementById('job_list').innerHTML = html
  }

  const displayAlert = (message, type) => {
    console.log(
      '\n----\ndisplayAlert Message: ' +
        message +
        '\nType: ' +
        type +
        '\n------\n'
    )
    setErrorMessage(message)
    setTypeAlert(type)
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Col md={5} className='text-center mt-4 p-3'>
          <h1>Jobs and Internships</h1>
          <Form id='job_search' onSubmit={search}>
            <Form.Group controlId='search_box'>
              <Form.Control type='text' placeholder='Enter key words...' />
            </Form.Group>
            <br />
            <Form.Group>
              <Button type='submit'>Search</Button>
            </Form.Group>
          </Form>

          <Notification message={errorMessage} type={typeAlert} />
        </Col>

        <h2> Job list </h2>
        <div id='job_list' class='container'></div>

        {/* <script type='text/javascript' src="scripts/jobScript.js"> */}

        {/* </script> */}
      </Container>
    </div>
  )
}

export default JobPage
