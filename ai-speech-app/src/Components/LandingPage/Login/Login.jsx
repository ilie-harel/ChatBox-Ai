import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useForm } from 'react-hook-form';
import { apiService } from '../../../Service/ApiService';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../../../app/authSlice';
import { toastsFunctions } from '../../../helpers/toastsFunctions';
import img from "../../LandingPage/ai12.jpg"
import { TypeAnimation } from 'react-type-animation';
import GoogleSignInButton from '../GoogleSignIn/GoogleSignIn';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const Navigate = useNavigate();

    async function loginUser(user) {
        try {
            const res = await apiService.login(user);
            if (res.status === 200) {
                dispatch(loginRedux(res.data))
                toastsFunctions.toastSuccess('Logged in')
                Navigate('/')
            }
        } catch (error) {
            toastsFunctions.toastError(error.response.data)
        }
    }

    return (
        <div className="Login_Container">

            <div className="Login">
                <div className="vacation_image_login">
                    <img src={img} alt="" />
                </div>
                <div className="form_container">
                        <TypeAnimation
                            sequence={['Sign into your account']}
                            wrapper="h3"
                            cursor={true}
                            speed={50}
                            className={'signInAnimation'}
                        />
                    <form onSubmit={handleSubmit(loginUser)}>
                        {/* <div className='Login_ContainerLogo'>
                            <img src={logo} alt="" />
                        </div> */}
                        <input placeholder="Email" type="email" {...register("email", { required: true })} />
                        <input placeholder="Password" type="password" {...register("password", { required: true, minLength: 4 })} />
                        <button type="submit">LOGIN</button>
                        <GoogleSignInButton />
                        <Link className="link_to_register_in_login_form" to={"/register"}>Don't have an account? Register here</Link>
                        <p className="terms_login_form">Terms of use. Privacy policy</p>
                    </form>
                </div>
            </div>
        </div>
    );
}



