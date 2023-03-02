import React from 'react'
import './LandingPage.css'
import Login from './Login/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './Register/Register'
import logo from './logo.png'
import Videos from '../Main/Videos/Videos'
import NotFound from '../NotFound/NotFound'

export default function LandingPage() {
  return (
    <div className='LandingPage'>
      <div className='LandingPageHeader'>
        <img src={logo} alt="" />
        <Link to={"/videos"}>
          About The Project
        </Link>
      </div>

      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/videos' element={<Videos />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

