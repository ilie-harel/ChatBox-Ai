import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SettingsIcon from '@mui/icons-material/Settings';
import { apiService } from '../../../../Service/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../../../../app/authSlice';
import { changeRoomId, changeRoomName } from '../../../../app/roomSlice';
import './SettingsModal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4
};

export default function SettingsModal(props) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const authSlice = useSelector((state)=> state.auth)

    async function changeLanguage(language) {
        if (language === "") return;
        try {
            const results = await apiService.changeUserLanguage(language);
            dispatch(loginRedux(results));
            dispatch(changeRoomId(0))
            dispatch(changeRoomName(''));
            apiService.getRoomsByUserId().then(async (res) => {
                props.setRooms(res);
            });
            props.setSelectedRoomId(null)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='SettingsModal'>
            <div onClick={handleOpen} className="SettinsBtnDiv">
                <SettingsIcon style={{ color: "white" }} />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="changeLanguageDiv">
                        <p>Change Language: </p>
                        <select defaultValue={authSlice.language} onChange={(e) => changeLanguage(e.target.value)}>
                            <option value="he">Hebrew</option>
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="es">español</option>
                        </select>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}