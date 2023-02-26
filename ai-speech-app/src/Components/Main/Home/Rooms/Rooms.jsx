import React from 'react'
import "./Rooms.css";
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from '../../../../app/authSlice';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useState, useEffect } from 'react';
import { apiService } from '../../../../Service/ApiService';
import { changeRoomId } from "../../../../app/roomSlice";


export default function Rooms() {
    const dispatch = useDispatch()
    const [rooms, setRooms] = useState([])
    const activeRoomId = useSelector((state)=> state.room);

    useEffect(() => {
        apiService.getRoomsByUserId().then(async (res) => {
            setRooms(res)
        })
        console.log(activeRoomId);
    }, [activeRoomId])

    function logOut() {
        dispatch(loginRedux())
    }

    async function addRoom() {
        await apiService.addRoom();
        apiService.getRoomsByUserId().then((res) => {
            setRooms((rooms) => [res, ...rooms])
        })

    }

    return (
        <div className='Rooms'>
            <div onClick={addRoom} className="AddBtnDiv">
                <AddCircleOutlineOutlinedIcon className='hover' />
                <AddCircleOutlinedIcon className='not_hover' />
            </div>

            <div className='RoomsDiv'>



                {/* map.roomes => 
                p = room.name
                
            */}

                {rooms ?
                    rooms.map((room, index) => (
                        <p onClick={() => dispatch(changeRoomId(room.id))} 
                        className='room' key={index}>{room.name ?? "New Chat"}
                        </p>
                    ))
                    : <></>}

            </div>

            <div onClick={logOut} className="LogoutBtnDiv">

                <LogoutOutlinedIcon className="hover" />
                <LogoutIcon className="not_hover" />

            </div>
        </div>
    )
}
