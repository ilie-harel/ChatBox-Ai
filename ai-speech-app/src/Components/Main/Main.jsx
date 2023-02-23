import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { logoutRedux } from "../../app/authSlice";
import "./Main.css";
import SpeechFromText from "./SpeakToText/SpeachFromText";
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Main() {
    const dispatch = useDispatch()

    function logOut() {
        dispatch(logoutRedux())
    }

    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<SpeechFromText />}></Route>
            </Routes>

            <div onClick={logOut} className="LogoutBtnDiv">
            
                <LogoutOutlinedIcon className="hover" />
                <LogoutIcon className="not_hover" />
                {/* <span class="tooltip_logout">Logout</span> */}
            
            </div>

        </div>
    )
}

export default Main;


