import { createSlice } from '@reduxjs/toolkit'

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        id: 0,
        name: ''
    },
    reducers: {
        changeRoomId: (state, action) => {
            state.id = action.payload;
            return state
        },

        changeRoomName: (state, action) => {
            state.name = action.payload;
            return state;
        }
    }
});

export const { changeRoomId, changeRoomName } = roomSlice.actions

export default roomSlice.reducer