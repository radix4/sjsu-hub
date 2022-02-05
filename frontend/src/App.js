import React from 'react'
import HomePage from './components/HomePage'
import RegistrationPage from './components/RegistrationPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* On Boot */}
          <Route path='/' exact element ={HomePage}/>
          <Route path='/RegistrationPage' element ={RegistrationPage}/>
          
          {/* Error Case */}
          {/* <Route component={NoMatch} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App