import React from 'react'
import { BrowserRouter,  Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Quizzes from './pages/Quizzes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/quizzes' element={<Quizzes/>}></Route>
        <Route path='/*' element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
