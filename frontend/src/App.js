import React from 'react'
import RegistrationPage from './components/RegistrationPage'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import ForumPage from './components/ForumPage'
import JobPage from './components/JobPage'
import FriendsPage from './components/FriendsPage'

import GroupChatPage from './components/GroupChatPage'
import TutoringSessionPage from './components/TutoringSessionPage'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './css/reset.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/Login'>
          <LoginPage />
        </Route>
        <Route path='/Registration'>
          <RegistrationPage />
        </Route>
        <Route path='/ForumPage'>
          <ForumPage />
        </Route>
        <Route path='/JobPage'>
          <JobPage />
        </Route>
        <Route path='/FriendsPage'>
          <FriendsPage />
        </Route>
        <Route path='/GroupChatPage'>
          <GroupChatPage />
        </Route>
        <Route path='/TutoringSessionPage'>
          <TutoringSessionPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
