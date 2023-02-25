import { useEffect, useState } from "react";
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
import { changeRoomId } from "../../../../app/roomSlice";

function SpeechFromText() {
    const { transcript, listening, resetTranscript, finalTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [messages, setMessages] = useState([]);
    const authSlice = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const activeRoomId = useSelector((state) => state.room)

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            return <span>Your Browser doesnt support speech to text</span>
        }



        if (transcript && !listening) {
            stopListening();
        }

    }, [finalTranscript, listening]);

    useEffect(() => {
        console.log(activeRoomId);
        if (activeRoomId !== 0) {
            const roomMessages = apiService.getMessagesByUserIdAndRoomId(activeRoomId).then(res => setMessages(res));
            console.log(roomMessages);
        }
        console.log(1231231233123);
        console.log(messages);
    }, [activeRoomId])

    async function startListening() {
        if (activeRoomId === 0) {
            const addRoom = await apiService.addRoom();
            dispatch(changeRoomId(addRoom.insertId))
            console.log(activeRoomId);
        }
        await SpeechRecognition.startListening({ language: authSlice.language });
    }


    async function stopListening() {
        setLoading(true)
        setMessages(messages => [...messages, { role: 1, message: finalTranscript }])
        SpeechRecognition.stopListening()

        if (activeRoomId) {
            const res = await apiService.sendMessageToChatGPT({ message: transcript, room: activeRoomId });
            if (res.status !== 200) {
                alert('error')
            } else {
                const reply = await res.json();
                speakText(reply)
                resetTranscript();
                const mes = await apiService.getMessagesByUser().then((res) => res.json());
                console.log(mes);
                setMessages(messages => [...messages, mes[0]])
            }
        } else {
            console.log('NO ROOMiD');
        }

        setLoading(false)
    }


    return (
        <div className={authSlice.language === 'he' ? "SpeachFromText directionHe" : "SpeachFromText directionEn"}>

            <div className="SpeachFromTextMicrophone">
                {/* <p className="Label">Speak naturally, we'll do the typing</p> */}
            </div>

            <div className="chatDiv">
                <div className="chat">
                    {messages.length === 0 ? 'no messages' :
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