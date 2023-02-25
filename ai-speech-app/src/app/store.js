import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import roomSlice from './roomSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        room: roomSlice
    }
})