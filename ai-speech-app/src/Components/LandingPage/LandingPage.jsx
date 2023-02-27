import React from 'react'
import './LandingPage.css'
import Login from './Login/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './Register/Register'

export default function LandingPage() {
  return (
    <div className='LandingPage'>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
    </div>
  )
}

