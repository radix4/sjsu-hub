import  React, {useState }from 'react';
import {Container, Form, Col, Row, Button, Card} from 'react-bootstrap';
import jobService from '../services/jobs'
import Notification from './Notification'

const JobPage = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [typeAlert, setTypeAlert] = useState(null);

    const currency = "&pound;";

    var results = [];

    

    const search = async(event) => {
        
        event.preventDefault();
        console.log('In JobPage.js/search method\n')
        let form = document.getElementById('job_search')

        const query = form.elements.search_box.value
        console.log('Query: ' + query)

        try {
            await jobService.search(query).then((response) => {
                results = response.results
                console.log(results)
                // displayAlert('Jobs: ' + results, '')
               
                writeToHTML()
            })
      
            document.getElementById('job_search').reset()
          } catch (exception) {
            displayAlert('Failed to search query', 'error')
            console.log('Jobs: failed to search')
          }

    }

    // function writeToHTML() {
    //     console.log('JobPage.js writeToHTML method beginning')
    //     var from = 0;
    //     //console.log("writing to HTML... page: " + page + "; results:" + from + "-->" + to); // shows the requested page and number of results being added to the html - for debuging and testing 
    //     var html = '<div class="row my-1 px-2">';
    //     var to = 6;
        
    //     console.log('before for loop')
    //     for (let index = from; index < to; index++) {
    //         console.log('for 1')
    //         const element = results[index];
    //         console.log('element = ' + element)
    //         let time = 0;
    //         console.log('for 2')
    //         console.log('element description = ' + element.description)
    //         let description = element.description;
    //         //let company = shorten(element.company.display_name, 20);
    //         // let salary = element.salary_min != element.salary_max ? `${currency} ${element.salary_min} - ${currency} ${element.salary_max}` : `${currency} ${element.salary_max}`;
    //         console.log('for 3')
    //         console.log('before html var incremented')
    //         html += 
    //         `<div id="${element.id}" class="col-12 col-md-6 col-lg-4 p-0">
    //             <div class="d-flex flex-column card shadow m-2">
    //                 <div class="job_box card-body pb-0">
    //                     <div class="job_title d-flex align-items-center justify-content-center">
    //                         <h3>${element.title}</h3>
    //                     </div>
    //                     <div class="details_container d-flex flex-sm-row flex-column justify-content-between">
    //                         <div class="details_group float-left d-inline-flex flex-column">
    //                             <div class="job_company details"><i class="fas fa-building" style="color:blue;"></i>&nbsp;<span title="${element.company.display_name}">${element.company.display_name}</span></div>
    //                             <div class="job_location details"><i class="fas fa-map-marked-alt" style="color:red;"></i>&nbsp;<span title="${element.location.display_name}">${element.location.display_name}</span></div>
    //                         </div>
    //                         <div class="details_group float-right d-inline-flex flex-column">
                                
    //                             <div class="job_date details"><i class="fas fa-business-time" style="color:orange;"></i>&nbsp;<span title="${time}">${time}</span></div>
    //                         </div>
    //                     </div>
    //                     <div class="job_description d-flex align-items-stretch justify-content-center">
    //                         <p class="m-0 p-0">${description}</p>
    //                     </div>
    //                 </div>
    //                 <div class="align-bottom d-flex px-1 align-items-end">
    //                     <a class="btn btn-success text-center btn_apply p-2" href="${element.redirect_url}" target="_blank">Apply</a>
    //                 </div>
    //             </div>
    //         </div>`;
    //         console.log('end of for loop')
    //     }
    //     console.log('out of for loop')
    //     html += `</div> 
    //             <button id="btn_more" class="btn btn-primary p-2 m-1 shadow float-right" type="submit" onclick="displayMore()">MORE!</button>`;
    //     console.log('HTML: ' + html)
    //     document.getElementById('job_list').innerHTML = html
    // }

    function writeToHTML() {
        console.log('JobPage.js writeToHTML method beginning')
        var from = 0;
        //console.log("writing to HTML... page: " + page + "; results:" + from + "-->" + to); // shows the requested page and number of results being added to the html - for debuging and testing 
        var html = '<div class="row my-1 px-2">';
        var to = 6;
        
        console.log('before for loop')
        for (let index = from; index < to; index++) {
            console.log('for 1')
            const element = results[index];
            console.log('element = ' + element)
            let time = 0;
            console.log('for 2')
            console.log('element description = ' + element.description)
            let description = element.description;
            //let company = shorten(element.company.display_name, 20);
            // let salary = element.salary_min != element.salary_max ? `${currency} ${element.salary_min} - ${currency} ${element.salary_max}` : `${currency} ${element.salary_max}`;
            console.log('for 3')
            console.log('before html var incremented')

            let card = {
                'box-shadow': '10px 5px 5px black'
            }
               
            html += 
            `<Card id={$element.id} border="dark" style = "box-shadow: 10px 10px 10px black; border: primary; background-color: white">
                <Card.Header>
                    <h3>Job: ${element.title}</h3>
                </Card.Header>
                <Card.Body>
                    <b>Company:</b> ${element.company.display_name} <br/>
                    <b>Location: </b> ${element.location.display_name}<br/>
                    <b>Posted:</b> ${time}<br/>
                    <hr class="rounded">
                    <p><b>Summary: </b>${description}</p>
                    <a href='${element.redirect_url}'>Apply</a>
                    <Link to='/Login'>
                        Apply
                        <Button href='${element.redirect_url}' target='_blank'>
                            Apply
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
            <hr class="rounded">`;
            console.log('end of for loop')
        }
        console.log('out of for loop')
        html += `</div> 
                <button id="btn_more" class="btn btn-primary p-2 m-1 shadow float-right" type="submit" onclick="displayMore()">MORE!</button>`;
        console.log('HTML: ' + html)
        document.getElementById('job_list').innerHTML = html
    }

    const displayAlert = (message, type) => {
        console.log('\n----\ndisplayAlert Message: ' + message + '\nType: ' + type + '\n------\n' )
        setErrorMessage(message)
        setTypeAlert(type)
      }


    return (
        <Container>
            <Col md = {5} className='text-center mt-4 p-3'>
                <h1>Jobs and Internships</h1>
                <Form id = 'job_search' onSubmit = {search}>
                    <Form.Group controlId = 'search_box' >
                        <Form.Control type = 'text' placeholder = 'Enter key words...' / >
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Button type = 'submit'>
                            Search
                        </Button>
                    </Form.Group>
                </Form>
                
                <Notification message={errorMessage} type={typeAlert} />
            </Col>  
            {/* <Card id={$element.id}>
                <Card.Header>
                    <h3>${element.title}</h3>
                </Card.Header>
                <Card.Body>
                    <b>${element.company.display_name}</b>
                    <b>${element.location.display_name}</b>
                    <h4>${time}</h4>
                    <p>${description}</p>
                    <Button href="${element.redirect_url}">

                    </Button>
                </Card.Body>
            </Card> */}

        <h2> Job list </h2>
            <div id="job_list" class="container">

                    
            </div>
        </Container>
    )
}

export default JobPage