import React, { useState, useEffect } from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux, logoutRedux } from "../../../../app/authSlice";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { apiService } from "../../../../Service/ApiService";
import { changeRoomId, changeRoomName } from "../../../../app/roomSlice";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './RoomsSmallScreen.css'
import { setOverlay } from '../../../../app/overlaySlice';
import { Link } from "react-router-dom"
import SettingsModal from '../SettingsModal/SettingsModal';

export default function RoomsSmallScreen() {
    const [isOpen, setIsOpen] = useState();
    const dispatch = useDispatch();
    const [rooms, setRooms] = useState([]);
    const roomSlice = useSelector((state) => state.room);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const overlaySelector = useSelector((state) => state.overlay)
    const authSlice = useSelector((state) => state.auth)

    useEffect(() => {
        apiService.getRoomsByUserId().then(async (res) => {
            setRooms(res);
        });
    }, [roomSlice]);

    function handleCloseMenu() {
        setIsOpen(!isOpen);
        dispatch(setOverlay(!overlaySelector))
    }

    function logOut() {
        dispatch(setOverlay(false))
        dispatch(logoutRedux());
    }

    async function addRoom() {
        const newRoom = await apiService.addRoom();
        dispatch(changeRoomId(newRoom.insertId));
        setRooms((rooms) => [newRoom, ...rooms]);
        handleCloseMenu()
    }

    function handleRoomClick(roomId) {
        setSelectedRoomId(roomId);
        dispatch(changeRoomId(roomId));
        handleCloseMenu()
    }

    function handleDeleteRoom(roomId) {
        apiService.deleteRoom(roomId).then(() => {
            setRooms(rooms => rooms.filter(room => room.id !== roomId));
            dispatch(changeRoomId(0))
            dispatch(changeRoomName(''))
        });
        handleCloseMenu()
    }

    async function changeLanguage(language) {
        if (language === "") return;
        try {
            const results = await apiService.changeUserLanguage(language);
            dispatch(loginRedux(results));
            dispatch(changeRoomId(0))
            dispatch(changeRoomName(''));
            apiService.getRoomsByUserId().then(async (res) => {
                setRooms(res);
            });
            setSelectedRoomId(null);
            handleCloseMenu()
        } catch (e) {
            console.log(e);
        }
    }

    function openMenu() {
        setIsOpen(!isOpen)
        dispatch(setOverlay(!overlaySelector))
    }

    return (
        <div className='RoomsSmallScreen'>
            <div className='RoomsSmallScreenOpen'>
                <div className='openMenuButton' onClick={() => openMenu()}><MenuIcon fontSize='small' /></div>
            </div>
            {
                isOpen ?
                    <div className={`Rooms ${isOpen ? "open" : "closed"}`}>
                        <div onClick={addRoom} className="AddBtnDiv">
                            <AddCircleOutlineOutlinedIcon className="hover" />
                            <AddCircleOutlinedIcon className="not_hover" />
                        </div>

                        <div className="RoomsDivSmallScreen">
                            {rooms.map((room, index) => (
                                <div
                                    key={index}
                                    className={`room ${room.id === selectedRoomId ? "selected" : ""}`}
                                    onClick={() => handleRoomClick(room.id)}
                                >
                                    <div className="room_icons">
                                        <ChatBubbleOutlineIcon className="chat_bubble_outlike_icon" />
                                        <DeleteIcon className="delete_room_icon_sm_screen" onClick={() => handleDeleteRoom(room.id)} />
                                    </div>
                                    {room.name ?? "New Chat"}
                                </div>
                            ))}
                        </div>
                       
                        <div className="SettinsDiv">
                            <SettingsModal setSelectedRoomId={setSelectedRoomId} setRooms={setRooms} />
                        </div>
                        <div onClick={logOut} className="LogoutBtnDiv">
                            <LogoutOutlinedIcon className="hover" />
                            <LogoutIcon className="not_hover" />
                        </div>
                    </div>
                    : <></>
            }
        </div>
    )
}
