import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import overlaySlice from './overlaySlice'
import roomSlice from './roomSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        room: roomSlice,
        overlay:overlaySlice
    }
})