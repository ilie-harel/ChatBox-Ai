import logo from './logo.svg';
import './App.css';
import Main from "../src/Components/Main/Main"
import LandingPage from './Components/LandingPage/LandingPage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const authSlice = useSelector((state) => state.auth);
  const overlaySelector = useSelector((state) => state.overlay)

  return (
    <div className="App">
       {overlaySelector?
                <div id="overlay"></div>
            :<></>}
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
