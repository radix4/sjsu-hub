import React from 'react'
import RegistrationPage from './components/RegistrationPage'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import ForumPage from './components/ForumPage'
import JobPage from './components/JobPage'
import FriendsPage from './components/FriendsPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Registration' element={<RegistrationPage />} />
        <Route path='/ForumPage' element={<ForumPage />} />
        <Route path='/JobPage' element={<JobPage />} />
        <Route path='/FriendsPage' element={<FriendsPage />} />
      </Routes>
    </Router>
  )
}

export default App
