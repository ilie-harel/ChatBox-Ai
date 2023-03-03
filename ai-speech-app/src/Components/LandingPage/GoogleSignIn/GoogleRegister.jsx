import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './GoogleRegister.css'
import { useDispatch } from 'react-redux';
import { loginRedux } from '../../../app/authSlice';
import jwtDecode from 'jwt-decode';
import { apiService } from '../../../Service/ApiService';
import { useNavigate } from 'react-router-dom';
import { toastsFunctions } from '../../../helpers/toastsFunctions';


const GoogleRegister = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate()

    async function userRegister(user) {
        try {
            const res = await apiService.googleAuth(user);
            if (res.status === 200) {
                console.log(res);
                dispatch(loginRedux(res.data))
                toastsFunctions.toastSuccess("Succesfuly");
                Navigate("/");
            }
        } catch (e) {
            toastsFunctions.toastError(e.response.data);
        }
    }

    return (
        <div className='GoogleRegister'>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    const details = jwtDecode(credentialResponse.credential);
                    const googleUser = {
                        firstName: details.given_name,
                        lastName: details.family_name,
                        email: details.email,
                        language: 'en',
                    }
                    userRegister(googleUser);
                }}

                onError={() => {
                    toastsFunctions.toastError('Register Failed');
                }}
            />
        </div>
    );
};

export default GoogleRegister;