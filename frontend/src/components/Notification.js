import React from 'react'
import {Alert} from 'react-bootstrap'

const Notification = ({message, type}) => {

    console.log('Notification; Message: ' + message + '\n Type: ' + type)
    if (message == null){
        return null
    }

    else if (type === 'error') {
        return <Alert variant='danger'>{message} </Alert>
    }

    else if (type === 'success') {
        return <Alert variant='success'>{message}</Alert>
    }
    
    else {
        return <Alert>{message}</Alert>
    }

}

export default Notification