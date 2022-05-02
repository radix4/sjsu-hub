import React from 'react'
import RegistrationPage from './components/RegistrationPage'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import ForumPage from './components/ForumPage'
import JobPage from './components/JobPage'
import FriendsPage from './components/FriendsPage'
import StudyGroupPage from './components/StudyGroupPage'
import AllStudyGroups from './components/AllStudyGroups'
import SingleStudyGroup from './components/SingleStudyGroup'
import AllForums from './components/AllForums'
import SingleForumPage from './components/SingleForumPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GroupChatPage from './components/GroupChatPage'
import TutoringSessionPage from './components/TutoringSessionPage'
import EventPage from './components/EventsPage'

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
        <Route path='/EventsPage'>
          <EventPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
        <Route path='/StudyGroupPage'> 
          <StudyGroupPage/> 
        </Route>
        <Route path='/AllStudyGroups'> 
          <AllStudyGroups/> 
        </Route>
        <Route path='/SingleStudyGroup/:id'>  
          <SingleStudyGroup/>
        </Route>
        <Route path='/AllForums'> 
          <AllForums/>
        </Route>
        <Route path='/SingleForumPage/:id'>
           <SingleForumPage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
