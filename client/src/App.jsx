import React from 'react'
import { BrowserRouter,  Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Quizzes from './pages/Quizzes'
import NewQuiz from './pages/NewQuiz'
import Members from './pages/Members'
import MemberInfo from './pages/MemberInfo'
import CreateGroup from './pages/CreateGroup'
import ManageGroups from './pages/ManageGroups'
import EditQuiz from './pages/EditQuiz'
import AddQuestions from './pages/AddQuestions'
import OpenQuiz from './pages/OpenQuiz'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/quizzes' element={<Quizzes/>}></Route>
        <Route path='/new-quiz' element={<NewQuiz/>}></Route>
        <Route path='/members' element={<Members/>}></Route>
        <Route path='/members/member-info/:id' element={<MemberInfo/>}></Route>
        <Route path='/create-group' element={<CreateGroup/>}></Route>
        <Route path='/manage-groups' element={<ManageGroups/>}></Route>
        <Route path='/quizzes/edit-quiz/:id' element={<EditQuiz/>}></Route>
        <Route path='/quizzes/add-questions/:id' element={<AddQuestions/>}></Route>
        <Route path='/quizzes/open-quiz/:id' element={<OpenQuiz/>}></Route>
        <Route path='/*' element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
