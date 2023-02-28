import { createSlice } from '@reduxjs/toolkit'


const overlaySlice = createSlice({
    name: 'overlay',
    initialState: false,
    reducers: {
        setOverlay: (state,actions) => {
            return state = actions.payload
        }
    }
});

export const { setOverlay } = overlaySlice.actions

export default overlaySlice.reducer