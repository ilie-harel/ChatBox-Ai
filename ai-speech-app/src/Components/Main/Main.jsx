import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { logoutRedux } from "../../app/authSlice";
import "./Main.css";
import Home from "./Home/Home";

function Main() {

    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    )
}

export default Main;


