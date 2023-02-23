import logo from './logo.svg';
import './App.css';
import Main from "../src/Components/Main/Main"
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  // let token = window.localStorage.getItem("VoiceChatToken") 
  const authSlice = useSelector((state) => state.auth)
  useEffect(() => {
    // token = window.localStorage.getItem('VoiceChatToken')
  }, [authSlice])
  return (
    <div className="App">
      <Header />
      <Routes>

        {
          authSlice ?
            <Route path='*' element={<Main />}></Route>
            :
            <Route path='*' element={<LandingPage />}></Route>
        }
      </Routes>
    </div>
  );
}

export default App;
