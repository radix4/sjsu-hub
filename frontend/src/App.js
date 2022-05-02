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
        <Route path='/StudyGroupPage' element={<StudyGroupPage/>}/>
        <Route path='/AllStudyGroups' element={<AllStudyGroups/>}/>
        <Route path='/SingleStudyGroup/:id' element={<SingleStudyGroup/>}/>
        <Route path='/AllForums' element={<AllForums/>}/>
        <Route path='/SingleForumPage/:id' element={<SingleForumPage/>}/>
     </Routes>
    </Router>
  )
}

export default App
