import React from 'react'
import HomePage from './components/HomePage'
import RegistrationPage from './components/RegistrationPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' component={HomePage} />
          <Route path='/RegistrationPage' component={RegistrationPage} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
