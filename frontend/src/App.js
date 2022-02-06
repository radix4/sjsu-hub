import React from 'react'
//import LoginPage from './components/LoginPage'
import RegistrationPage from './components/RegistrationPage'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
// import IdeaPage from './components/IdeaPage'
// import IdeaEditor from './components/IdeaEditor'
// import Profile from './components/Profile'
// import ProfileEditor from './components/ProfileEditor'
// import SeniorTeam from './components/SeniorTeam'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* On Boot */}
          <Route path='/' exact element={<HomePage />} />
          {/* Other Site */}
          {/* <Route path='/Login' component={LoginPage} /> */}
          <Route path='/Registration' element={<RegistrationPage />} />
          {/* localhost:3000/Registration */}
          <Route path='/Login' element={<LoginPage />} />
          {/* <Route path='/IdeaPage/:ideaID' component={IdeaPage} />
          <Route path='/IdeaEditor/:ideaID' component={IdeaEditor} />
          <Route path='/Profile/:ideaID' component={Profile} />
          <Route path='/ProfileEditor' component={ProfileEditor} />
          <Route path='/SeniorTeam' component={SeniorTeam} /> */}
          {/* Error Case */}
          {/* <Route component={NoMatch} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
