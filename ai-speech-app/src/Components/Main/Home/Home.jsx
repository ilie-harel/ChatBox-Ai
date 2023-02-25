import React from 'react'
import Rooms from './Rooms/Rooms'
import './Home.css'
import SpeechFromText from './SpeakToText/SpeachFromText'

export default function Home() {
  return (
    <div className='Home'>
        <Rooms />
        <SpeechFromText />
    </div>
  )
}
