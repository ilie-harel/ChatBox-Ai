import React from 'react'
import Rooms from './Rooms/Rooms'
import './Home.css'
import SpeechFromText from './SpeakToText/SpeachFromText'
import RoomsSmallScreen from './RoomsSmallScreen/RoomsSmallScreen';

export default function Home() {
  const smallScreen = window.matchMedia("(max-width: 1000px)").matches;

  return (
    <div className='Home'>
      {
        smallScreen ? 
        <RoomsSmallScreen />
          :
          <Rooms />
      }
      <SpeechFromText />
    </div>
  )
}
