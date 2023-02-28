import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import './Register.css';
import { apiService } from '../../../Service/ApiService';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../../../app/authSlice';
import { toastsFunctions } from '../../../helpers/toastsFunctions';
// import img from "../../LandingPage/ai8.jpg"
import img from "../../LandingPage/ai10.jpg"
import { TypeAnimation } from 'react-type-animation';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const Navigate = useNavigate();

    async function userRegister(user) {
        try {
            const res = await apiService.register(user);
            if (res.status === 200) {
                dispatch(loginRedux(res.data))
                toastsFunctions.toastSuccess('Registered Succesfuly')
                Navigate('/')
            }
        } catch (e) {
            toastsFunctions.toastError(e.response.data)
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
                        {/* <p className="signUp_text_form typewriter">Sign up for FREE</p> */}
                        <TypeAnimation
                            sequence={['Sign up for FREE']}
                            wrapper="h3"
                            cursor={true}
                            speed={50}
                        />
                        <input placeholder="First name" type="text"  {...register("firstName", { required: true })} />
                        <input placeholder="Last name" type="text" {...register("lastName", { required: true })} />
                        <input placeholder='Username' type="text" {...register('username')} />
                        <input placeholder="Email address" type="email" {...register("email", { required: true, maxLength: 30 })} />
                        <input placeholder="Password" type="password" {...register("password", { required: true, minLength: 4 })} />
                        <select required name="" id="" {...register('language')}>
                            <option value="">Choose a Language</option>
                            <option value="he">Hebrew</option>
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="es">español</option>
                        </select>
                        <button type="submit" >REGISTER</button>
                        <Link className="link_to_login_in_register_form" to={"/"}>Already a member? login</Link>
                        <p className="terms_register_form">Terms of use. Privacy policy</p>

                    </form>
                </div>
            </div>
        </div>
    )
}
