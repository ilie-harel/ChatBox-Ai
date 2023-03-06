import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Register.css";
import { apiService } from "../../../Service/ApiService";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../../app/authSlice";
import { toastsFunctions } from "../../../helpers/toastsFunctions";
import img from "../../LandingPage/ai12.jpg";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
// import israelFlag from "./israel.png";
import israelFlag from "../../../assests/flags/israel.png";
import USAFlag from "../../../assests/flags/united-states.png";
import spainFlag from "../../../assests/flags/spain.png";
import franceFlag from "../../../assests/flags/france.png";
import brazilFlag from "../../../assests/flags/brazil.png";
import italyFlag from "../../../assests/flags/italy.png";
import netherlandsFlag from "../../../assests/flags/netherlands.png";
import chinaFlag from "../../../assests/flags/china.png";
import russiaFlag from "../../../assests/flags/russia.png";
import polandFlag from "../../../assests/flags/poland.png";
import koreaFlag from "../../../assests/flags/korea.png";
import vientamFlag from "../../../assests/flags/vietnam.png";
import saudi_arabiaFlag from "../../../assests/flags/saudi_arabia.png";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [newLanguage, setNewLanguage] = useState();
  const smallScreen = window.matchMedia("(max-width: 1000px)").matches;

 const languages = [
  { label: "English", value: "en", img: USAFlag },
  { label: "Hebrew", value: "he", img: israelFlag },
  { label: "France", value: "fr", img: franceFlag },
  { label: "Espaniol", value: "es", img: spainFlag },
  { label: "Italian", value: "it", img: italyFlag },
  { label: "Português", value: "pt", img: brazilFlag },
  { label: "Arabic", value: "ar", img: saudi_arabiaFlag },
  { label: "Russian", value: "ru", img: russiaFlag },
  { label: "普通话", value: "cmn", img: chinaFlag },
  { label: "Dutch", value: "nl", img: netherlandsFlag },
  { label: "Polish", value: "pl", img: polandFlag },
  { label: "Korean", value: "ko", img: koreaFlag },
  { label: "Vietnamese", value: "vi", img: vientamFlag },
];
  async function userRegister(user) {
    user.language = newLanguage;
    try {
      const res = await apiService.register(user);
      if (res.status === 200) {
        dispatch(loginRedux(res.data));
        toastsFunctions.toastSuccess("Registered Succesfuly");
        Navigate("/");
      }
    } catch (e) {
      toastsFunctions.toastError(`${e.response.data}, try logging with google`);
    }
  }

  return (
    <div className="Register_Container">
      <div className="Register">
        <div className="vacation_image_register">
          <img src={img} alt="" />
        </div>
        <div className="form_container">
          <form onSubmit={handleSubmit(userRegister)}>
            <TypeAnimation
              sequence={["Sign up for FREE"]}
              wrapper="h3"
              cursor={true}
              speed={50}
            />
            <input
              className="inp_register"
              placeholder="First name"
              type="text"
              {...register("firstName", { required: true })}
            />
            <input
              className="inp_register"
              placeholder="Last name"
              type="text"
              {...register("lastName", { required: true })}
            />
            <input
              className="inp_register"
              placeholder="Username"
              type="text"
              {...register("username")}
            />
            <input
              className="inp_register"
              placeholder="Email address"
              type="email"
              {...register("email", { required: true, maxLength: 30 })}
            />
            <input
              className="inp_register"
              placeholder="Password"
              type="password"
              {...register("password", { required: true, minLength: 4 })}
            />
            {errors.password ? <div style={{ display: "none" }}> {toastsFunctions.toastError('password min length 4')}</div> : <></>}
            <Autocomplete
              id="country-select-demo"
              sx={{ width: '85%', marginTop: '10px' }}
              options={languages}
              autoHighlight
              getOptionLabel={(option) => option.label}
              onChange={(e, selectedOption) =>
                setNewLanguage(selectedOption.value)
              }
              renderOption={(props, option) => (
                <Box
                  value={option.value}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={option.img}
                    // srcSet={option.img}
                    alt={option.label}
                  />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a language"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />

            <button className="submit_btn_register" type="submit">
              REGISTER
            </button>

            <Link className="link_to_login_in_register_form" to={"/"}>
              Already a member? login
            </Link>
            <p className="terms_register_form">Terms of use. Privacy policy</p>
          </form>
        </div>
      </div>
    </div>
  );
}
