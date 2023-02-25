import { createSlice } from '@reduxjs/toolkit'

const roomSlice = createSlice({
    name: 'roomId',
    initialState: 0,
    reducers: {
        changeRoomId: (state, action) => {
            state = action.payload;
            return state
        }
    }
});

export const { changeRoomId } = roomSlice.actions

export default roomSlice.reducer