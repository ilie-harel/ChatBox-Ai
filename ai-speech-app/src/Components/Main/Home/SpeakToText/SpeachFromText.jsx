import { useEffect, useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { apiService } from "../../../../Service/ApiService";
import speakText from '../../../../helpers/speak'
import MicIcon from '@mui/icons-material/Mic';
import EqGif from "./EqAnimation.gif";
import CancelIcon from '@mui/icons-material/Cancel';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useDispatch, useSelector } from "react-redux";
import { TypeAnimation } from 'react-type-animation';
import './SpeachFromText.css'
import { changeRoomId, changeRoomName } from "../../../../app/roomSlice";

function SpeechFromText() {
    const { transcript, listening, resetTranscript, finalTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [messages, setMessages] = useState([]);
    const authSlice = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const roomSlice = useSelector((state) => state.room)
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            return <span>Your Browser doesnt support speech to text</span>
        }



        if (transcript && !listening) {
            stopListening();
        }

    }, [finalTranscript, listening]);

    useEffect(() => {
        
        
        if (roomSlice.id !== 0) {
            setMessages([])
            apiService.getMessagesByUserIdAndRoomId(roomSlice.id).then(res => setMessages(res)).then(() => {
                setTimeout(() => {
                    
                    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
                }, 1);
            });
        }
        
        console.log(roomSlice.id);
    }, [roomSlice])
    


        async function startListening() {
        if (roomSlice.id === 0) {
            const addRoom = await apiService.addRoom();
            dispatch(changeRoomId(addRoom.insertId))
        }
        await SpeechRecognition.startListening({ language: authSlice.language });
    }


    async function stopListening() {
        setLoading(true)
        setMessages(messages => [...messages, { role: 1, message: finalTranscript }])
        SpeechRecognition.stopListening()

        if (roomSlice.id) {
            const res = await apiService.sendMessageToChatGPT({ message: transcript, room: roomSlice.id });
            if (res.status !== 200) {
                alert('error')
            } else {
                const reply = await res.json();
                speakText(reply)
                resetTranscript();
                try {
                    const mes = await apiService.getMessagesByUserIdAndRoomId(roomSlice.id);
                    console.log(mes);
                    setMessages(messages => [...messages, mes[0 + 1]])
                    
                    apiService.updateRoomName(mes[0].message, roomSlice.id);
                    dispatch(changeRoomName(mes[0].message))
                } catch (e) {
                    alert(e)
                }
            }
        } else {
            console.log('No roomId');
        }
        setLoading(false)
    }


    return (
        <div className={authSlice.language === 'he' ? "SpeachFromText directionHe" : "SpeachFromText directionEn"}>
            <div className="chatDiv">
                <div className="chat">
                    {roomSlice.id == 0 ? 'Choose a room or start talking to create new one' :
                        messages.map((m, index) => {
                            const isLast = index === messages.length - 1;
                            const className = isLast ? 'textChat lastMessage' : 'textChat';
                            return (
                                <div key={index} className="chatMessage">
                                    {m.role === 0 ?
                                        <div key={index} className={className}>
                                            <CodeIcon fontSize="large" />
                                            {isLast ?
                                                <TypeAnimation
                                                    sequence={[m.message]}
                                                    wrapper="p"
                                                    cursor={true}
                                                    speed={50}
                                                />
                                                :
                                                <p onClick={(e) => speakText(e.target.innerText)}>{m.message}</p>
                                            }
                                        <div ref={bottomRef} />
                                        </div>
                                        :
                                        <div key={index} className={className}>
                                            <DataObjectIcon fontSize="large" />
                                            {isLast ?
                                                <TypeAnimation
                                                    sequence={[m.message]}
                                                    wrapper="p"
                                                    cursor={true}
                                                    speed={50}
                                                />
                                                :
                                                <p onClick={(e) => speakText(e.target.innerText)}>{m.message}</p>
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

                    <div className="cancel_record" onClick={() => window.speechSynthesis.cancel()}><CancelIcon fontSize="large" /></div>
                </div>
            </div>
        </div >
    );
}

export default SpeechFromText;