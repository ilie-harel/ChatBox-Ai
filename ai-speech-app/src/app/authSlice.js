import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = window.localStorage.getItem('ChatBoxToken');
let initialState = null;

if (token) {
    const { firstName, lastName, sub, language } = jwtDecode(token);
    initialState = { firstName, lastName, sub, language };
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            window.localStorage.setItem('ChatBoxToken', action.payload);
            const { firstName, lastName, sub, language } = jwtDecode(action.payload);
            state = { firstName, lastName, sub, language };
            return state;
        },

        logoutRedux: (state) => {
            window.localStorage.removeItem(`ChatBoxToken`);
            return null;
        },
    }
})

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
