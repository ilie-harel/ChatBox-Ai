import React from 'react';
import './WelcomeComponent.css';
import logo from './logo_slogan.png'
import BackgroundCover from '../../../../LandingPage/BackgroundCover/BackgroundCover';
export default function WelcomeComponent() {
  return (
    <div className='WelcomeComponent'>
      <div className='WelcomeComponentLogo'>
        <img src={logo} alt="" />
        <BackgroundCover />
      </div>
    </div>
  );
}
