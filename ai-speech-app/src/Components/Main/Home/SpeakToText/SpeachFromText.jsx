import { useEffect, useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { apiService } from "../../../../Service/ApiService";
import MicIcon from '@mui/icons-material/Mic';
import EqGif from "./EqAnimation.gif";
import CancelIcon from '@mui/icons-material/Cancel';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useDispatch, useSelector } from "react-redux";
import { TypeAnimation } from 'react-type-animation';
import { changeRoomId, changeRoomName } from "../../../../app/roomSlice";
import WelcomeComponent from "./WelcomeComponent/WelcomeComponent";
import LinearProgress from '@mui/material/LinearProgress';
import { toastsFunctions } from "../../../../helpers/toastsFunctions";
import speakTextGoogle from "../../../../helpers/speakGoogle";
import './SpeachFromText.css';

function SpeechFromText() {
    const { transcript, listening, resetTranscript, finalTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [messages, setMessages] = useState([]);
    const authSlice = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const roomSlice = useSelector((state) => state.room)
    const bottomRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [isChangedRoom, setIsChangedRoom] = useState(false);
    const [audioSource, setAudioSource] = useState(null);
    const dispatch = useDispatch();
  

    useEffect(() => {

        if (!browserSupportsSpeechRecognition) {
            return <span>Your Browser doesnt support speech to text</span>
        }
        if (transcript && !listening) {
            stopListening();
        }

    }, [finalTranscript, listening]);

    useEffect(() => {
        chatBoxRef.current.scroll({
            top: chatBoxRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [messages])

    useEffect(() => {
        setIsChangedRoom(true)
        if (roomSlice.id !== 0) {
            setMessages([])

            setLoadingData(true)
            apiService.getMessagesByUserIdAndRoomId(roomSlice.id).then(res => setMessages(res)).then(() => {
                setLoadingData(false)
                setTimeout(() => {
                    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 1);
            });
        }
        stopAudio()
    }, [roomSlice.id])

    async function startListening() {
        if (roomSlice.id === 0) {
            const addRoom = await apiService.addRoom();
            dispatch(changeRoomId(addRoom.insertId))
        }
        await SpeechRecognition.startListening({ language: authSlice.language });
    }

    async function stopListening() {
        setIsChangedRoom(false)
        setLoading(false)
        setMessages(messages => [...messages, { role: 1, message: finalTranscript }])
        SpeechRecognition.stopListening()
        if (roomSlice.id) {
            const res = await apiService.sendMessageToChatGPT({ message: transcript, room: roomSlice.id });
            if (res.status !== 200) {
                toastsFunctions.toastError('Error occured')
            } else {
                const reply = await res.json();
                speakTextGoogle(reply, setAudioSource)
                resetTranscript();
                try {
                    const mes = await apiService.getMessagesByUserIdAndRoomId(roomSlice.id);
                    console.log(mes);
                    setMessages(messages => [...messages, mes[mes.length - 1]])
                    apiService.updateRoomName(mes[0].message, roomSlice.id);
                    dispatch(changeRoomName(mes[0].message));
                    setLoading(false)
                } catch (e) {
                    alert(e)
                }
            }
        } else {
            setIsChangedRoom(false)
            console.log('No roomId');
        }
    }

    function stopAudio() {
        if (audioSource !== null) {
            audioSource.stop();
        }
        console.log(audioSource);
    }

    function onSentanceClick(e) {
        stopAudio();
        speakTextGoogle(e.target.innerText, setAudioSource)
    }

    return (
        <div className={authSlice.language === 'he' || authSlice.language === 'ar' ? "SpeachFromText directionRtl" : "SpeachFromText directionLtr"}>
            <div className="chatDiv">
                <div ref={chatBoxRef} className="chat">
                    {roomSlice.id == 0 ?
                        <div className="welcomeDiv">
                            <WelcomeComponent />
                        </div>
                        :
                        loadingData ?
                            <div className="loadingDivData">
                                <LinearProgress color="inherit" style={{ width: '60%' }} />
                            </div>
                            :
                            messages.length === 0 ?
                                <div className="emptyMessagesDiv">
                                    <p>Start Talking</p>
                                </div>
                                :
                                messages.map((m, index) => {
                                    const isLast = index === messages.length - 1;
                                    const className = isLast ? 'textChat lastMessage' : 'textChat';
                                    return (
                                        <div key={index} className="chatMessage">
                                            {m.role === 0 ?
                                                <div key={m.id} className={className}>
                                                    <CodeIcon fontSize="large" />
                                                    {isLast && !isChangedRoom ?
                                                        <TypeAnimation
                                                            sequence={[m.message]}
                                                            wrapper="p"
                                                            cursor={true}
                                                            speed={50}
                                                        />
                                                        :
                                                        <p onClick={(e) => onSentanceClick(e)}>{m.message}</p>
                                                    }
                                                    <div ref={bottomRef} />
                                                </div>
                                                :
                                                <div key={m.id} className={className}>
                                                    <DataObjectIcon fontSize="large" />
                                                    {isLast && !isChangedRoom ?
                                                        <TypeAnimation
                                                            sequence={[m.message]}
                                                            wrapper="p"
                                                            cursor={true}
                                                            speed={50}
                                                        />
                                                        :
                                                        <p onClick={(e) => onSentanceClick(e)}>{m.message}</p>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    );
                                })}
                    {
                        loading ?
                            <div className="loadingDiv">
                                <CodeIcon fontSize="large" />
                                <p className="loadingText">...</p>
                            </div>
                            :
                            <></>
                    }
                </div>
                <div className="SpeachFromTextButtons">
                    <div className="Start_Record" onClick={() => startListening()}>
                        {listening ?
                            <img src={EqGif} />
                            :
                            <MicIcon fontSize="large" sx={{ color: "white" }} />
                        }
                    </div>
                    <div className="cancel_record" onClick={() => stopAudio()}><CancelIcon fontSize="large" /></div>
                </div>
            </div>
        </div >
    );
}

export default SpeechFromText;