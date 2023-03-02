import React from 'react'
import './LandingPage.css'
import Login from './Login/Login'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Register from './Register/Register'
import logo from './logo.png'
import Videos from '../Main/Videos/Videos'
import NotFound from '../NotFound/NotFound'
import { useState } from "react";

export default function LandingPage() {
  const [path, setPath] = useState("/")
  const navigate = useNavigate()

  return (
    <div className='LandingPage'>
      <div className='LandingPageHeader'>
        <div className='landing_page_logo' onClick={(() => {
          navigate("/")
          setPath("/")
         })}>
          <img src={logo} alt=""  />
        </div>
        {path === "/" ? 
        <Link to={"/videos"} onClick={(() => setPath("/videos"))} >About The Project</Link>
      :
        <Link to={"/"} onClick={(() => setPath("/"))}  >Back</Link>
      } 
      </div>

      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/videos' element={<Videos />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <div>


      <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
      </div>
    </div>
  )
}

