import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SettingsIcon from "@mui/icons-material/Settings";
import { apiService } from "../../../../Service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../../../../app/authSlice";
import { changeRoomId, changeRoomName } from "../../../../app/roomSlice";
import { useState } from "react";
import "./SettingsModal.css";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import israelFlag from "./israel.png";
import israelFlag from "../../../../assests/flags/israel.png";
import USAFlag from "../../../../assests/flags/united-states.png";
import spainFlag from "../../../../assests/flags/spain.png";
import franceFlag from "../../../../assests/flags/france.png";
import brazilFlag from "../../../../assests/flags/brazil.png";
import italyFlag from "../../../../assests/flags/italy.png";
import netherlandsFlag from "../../../../assests/flags/netherlands.png";
import chinaFlag from "../../../../assests/flags/china.png";



// import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';



const languages = [
  { label: "Hebrew", value: "he", img: israelFlag },
  { label: "English", value: "en", img: USAFlag },
  { label: "France", value: "fr", img: franceFlag },
  { label: "Espaniol", value: "es", img: spainFlag },
  { label: "Italian", value: "it", img: italyFlag },
  { label: "Português", value: "pt", img: brazilFlag },
  { label: "普通话", value: "cmn", img: chinaFlag },
  { label: "Dutch", value: "nl", img: netherlandsFlag },
];

export default function SettingsModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authSlice = useSelector((state) => state.auth);
  const [newLanguage, setNewLanguage] = useState(authSlice.language);
  const [gender, setGender] = useState(authSlice.voiceGender);
  const smallScreen = window.matchMedia("(max-width: 1000px)").matches;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: smallScreen ? 270 : 400,
    boxShadow: 24,
    bgcolor: "background.paper",
    borderRadius: "10px",
    p: 4,
  };
  async function Save() {
    if (newLanguage === "" && gender === "") return console.log(newLanguage, gender);;

    try {
      // if (!newLanguage) return;
      if (newLanguage !== authSlice.language || gender !== authSlice.voiceGender) {
        const results = await apiService.changeUserLanguage(newLanguage, gender);
        dispatch(loginRedux(results));
        dispatch(changeRoomId(0));
        dispatch(changeRoomName(""));
        apiService.getRoomsByUserId().then(async (res) => {
          props.setRooms(res);
        });
        props.setSelectedRoomId(null);
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  }


  React.useEffect(() => {
    console.log(gender);
  }, [gender])


  return (
    <div className="SettingsModal">
      {
        props.show ? <></> :
          <div onClick={handleOpen} className="SettinsBtnDiv">
            <SettingsIcon style={{ color: "white" }} />
          </div>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="SettingsModalDiv">
            <h2>Settings: </h2> <hr />
            <div className="changeLanguageDiv">
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={languages}
                autoHighlight
                getOptionLabel={(option) => option.label}
                defaultValue={languages.find((lang) =>
                  lang.value.includes(authSlice.language)
                )}
                onChange={(e, selectedOption) =>
                  setNewLanguage(selectedOption.value)
                }
                renderOption={(props, option) => (
                  <Box
                    value={option.value}
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={option.img}
                      // srcSet={option.img}
                      alt={option.label}
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a language"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {/* <select defaultValue={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Choose a gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select> */}
            </div>




            <RadioGroup
            className="radio_gender"
      aria-label="platform"
      defaultValue="Website"
      overlay
      name="platform"
      sx={{
        flexDirection: 'row',
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: '3px solid',
            borderColor: 'primary.500',
          },
        },
        [`& .${radioClasses.radio}`]: {
          display: 'contents',
          '& > svg': {
            zIndex: 2,
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            bgcolor: 'background.body',
            borderRadius: '50%',
          },
        },
      }}
    >
        <Sheet
          key="MALE"
          
          variant="outlined"
          sx={{
            borderRadius: 'md',
            bgcolor: 'background.body',
            boxShadow: 'sm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', 
            gap: 0.5,
            p: 2,
            minWidth: 40,
            width: 40,
            minHeight: 40,
            height: 40,
          }}
        >
          <Radio checked={gender === "MALE"} onClick={(e) => setGender(e.target.value)} id="MALE" value="MALE" checkedIcon={<CheckCircleRoundedIcon />} />
          <Avatar variant="soft" size="sm" />
          <FormLabel htmlFor="MALE">MALE</FormLabel>
        </Sheet>
        <Sheet
          key="FEMALE"
          variant="outlined"
          sx={{
            borderRadius: 'md',
            bgcolor: 'background.body',
            boxShadow: 'sm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', 
            gap: 0.5,
            p: 2,
            minWidth: 40,
            width: 40,
            minHeight: 40,
            height: 40,
          }}
        >
          <Radio checked={gender === "FEMALE"} onClick={(e) => setGender(e.target.value)} id="FEMALE" value="FEMALE" checkedIcon={<CheckCircleRoundedIcon />} />
          <Avatar variant="soft" size="sm" />
          <FormLabel htmlFor={"FEMALE"}>FEMALE</FormLabel>
        </Sheet>
    </RadioGroup>




            <div className="SettingsModalBtns">
              <button className="cancel_settings" onClick={() => handleClose()}>
                Cancel
              </button>
              <button
                disabled={authSlice.language === newLanguage && authSlice.voiceGender === gender}
                className={
                  authSlice.language === newLanguage && authSlice.voiceGender === gender
                    ? `disable_save`
                    : "save_settings"
                }
                onClick={() => Save()}
              >
                Save
              </button>
            </div>
          </div>
    
        </Box>

      </Modal>

    </div>
  );
}



