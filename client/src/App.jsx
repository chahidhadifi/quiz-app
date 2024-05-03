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
        // TODO
        <Route path='/create-group'></Route>
        <Route path='/add-member'></Route>
        <Route path='/manage-groups'></Route>
        
        <Route path='/*' element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
