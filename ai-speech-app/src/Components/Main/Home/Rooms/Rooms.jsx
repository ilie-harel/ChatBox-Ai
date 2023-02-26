import React from "react";
import "./Rooms.css";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../../../../app/authSlice";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useState, useEffect } from "react";
import { apiService } from "../../../../Service/ApiService";
import { changeRoomId } from "../../../../app/roomSlice";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Rooms() {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const roomSlice = useSelector((state) => state.room);
  const [selectedRoomId, setSelectedRoomId] = useState(null);



  useEffect(() => {
    apiService.getRoomsByUserId().then(async (res) => {
      setRooms(res);
    });
    console.log(roomSlice);
  }, [roomSlice]);

  function logOut() {
    dispatch(logoutRedux());
  }

  async function addRoom() {
    const newRoom = await apiService.addRoom();
    dispatch(changeRoomId(newRoom.insertId));
    setRooms((rooms) => [newRoom, ...rooms]);
  }

  function handleRoomClick(roomId) {
    setSelectedRoomId(roomId);
    dispatch(changeRoomId(roomId));
  }

  return (
    <div className="Rooms">
      <div onClick={addRoom} className="AddBtnDiv">
        <AddCircleOutlineOutlinedIcon className="hover" />
        <AddCircleOutlinedIcon className="not_hover" />
      </div>

      <div className="RoomsDiv">
        {rooms.map((room, index) => (
            <div
            key={index}
            className={`room ${room.id === selectedRoomId ? "selected" : ""}`}
            onClick={() => handleRoomClick(room.id)}
            >
                <div className="room_icons">
                <ChatBubbleOutlineIcon className="chat_bubble_outlike_icon" />
                <DeleteIcon className="delete_room_icon" onClick={() => apiService.deleteRoom(room.id)}/>
                {/* <DeleteOutlineIcon  className="delete_room_icon_outlined"/> */}
                </div>
              {room.name ?? "New Chat"}
            </div>
        ))}
      </div>

      <div onClick={logOut} className="LogoutBtnDiv">
        <LogoutOutlinedIcon className="hover" />
        <LogoutIcon className="not_hover" />
      </div>
    </div>
  );
}
