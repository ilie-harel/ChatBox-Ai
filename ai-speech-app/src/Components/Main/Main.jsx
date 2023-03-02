import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { logoutRedux } from "../../app/authSlice";
import "./Main.css";
import Home from "./Home/Home";
import Videos from "./Videos/Videos";
import NotFound from "../NotFound/NotFound";

function Main() {

    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/videos" element={<Videos />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}

export default Main;


