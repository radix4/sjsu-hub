import React, {Component, useState, useEffect, map, createContext} from 'react';
import { Col, Row, Button, Form, Card } from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'
import NavBar from './NavBar'
import studyGroupService from '../services/studygroup';


const containerStyle = {
    margin: '5% 20% 5% 20%',
  }
  
document.body.style = 'background: #FFF1D7;'


const AllStudyGroups = () =>{

    let navigate = useNavigate();
    const routeToGroup = (pathId) => {
        let path = `/SingleStudyGroup/${pathId}`;
        navigate(path,{
          iD: pathId
        });
    }

    const [currentGroups, setCurrentGroups] = useState([]);
    
    useEffect(() => { 
        try {
            studyGroupService.getStudyGroups().then(returnedPost =>{
            setCurrentGroups(returnedPost.data);   
          });
        } catch (error) {
          throw(error);
        }
        return () => {
          
        }
      }, []);
    
    return (
        <div>
            <NavBar></NavBar>
            <div style={containerStyle}>
            <br></br>
          
             {
              currentGroups.map((returnedGroup,groupId) => {
                return(
                    <div>
                      <br></br>
                    <Card bg='secondary' text='light' className='p-2' onClick={() => {
                      routeToGroup(returnedGroup.id);
                    }}>
                   <Card.Body>
                     <Card.Header></Card.Header>
                        <br></br>     
                      <Card.Title key={groupId}>{returnedGroup.subject}</Card.Title>
                     <Card.Text > {/*theres a warning here that it wants another key */}
                          {returnedGroup.description}
                     </Card.Text>
                        <br></br>
                     </Card.Body>
                    </Card>
                     </div>  
              )
            })
          }
          <br></br>    
        </div>
    </div>
    )
}


export default AllStudyGroups;



