import React, { useEffect } from 'react'
import Rooms from './Rooms/Rooms'
import './Home.css'
import SpeechFromText from './SpeakToText/SpeachFromText'
import RoomsSmallScreen from './RoomsSmallScreen/RoomsSmallScreen';
import { useSelector } from 'react-redux';

export default function Home() {
  const smallScreen = window.matchMedia("(max-width: 1000px)").matches;
  const authSlice = useSelector((state)=> state.auth)
  useEffect(()=>{
    console.log(authSlice);
  },[])
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
