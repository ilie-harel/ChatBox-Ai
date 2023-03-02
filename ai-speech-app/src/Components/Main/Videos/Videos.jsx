import "./Videos.css";
import VideoEnglish from "./VideoEnglish/VideoEnglish";
import VideoHebrew from "./VideoHebrew/VideoHebrew";
import { useState } from "react";
import { Link } from "react-router-dom";



function Videos() {
const [video, setVideo] = useState("english")



    return (
        <div className="Videos">
                <div className="choose_language_container">
                    
                    <button onClick={() => setVideo("english")} className={video === "english" ? 'active choose_language' : 'choose_language'}>English</button>
                    <button onClick={() => setVideo("hebrew")} className={video === "hebrew" ? 'active choose_language' : 'choose_language'}>Hebrew</button>
                </div>
                <div className="video_display">
                    <div className={video === "english" ? 'display_video' : 'dont_display_video'}>
                        <VideoEnglish />
                    </div>
                    
                    <div className={video === "hebrew" ? 'display_video' : 'dont_display_video'}>
                        <VideoHebrew />
                    </div>
                </div>
        </div>
    );
}

export default Videos;
