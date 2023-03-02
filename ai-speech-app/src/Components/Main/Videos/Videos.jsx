import "./Videos.css";
import VideoEnglish from "./VideoEnglish/VideoEnglish";
import VideoHebrew from "./VideoHebrew/VideoHebrew";
import { useState } from "react";

import { TypeAnimation } from "react-type-animation";


function Videos() {
const [video, setVideo] = useState("english")



    return (
        <div className="Videos">

                <div>
                <TypeAnimation
              sequence={["Speak naturally, We'll do the typing"]}
              wrapper="h3"
              cursor={true}
              speed={50}
              />
                </div>
            <div className="Videos_Conatiner">
                <div className="choose_language_container">
                    
                    <button onClick={() => setVideo("english")} className={video === "english" ? 'active choose_language' : 'choose_language'}>English</button>
                    <button onClick={() => setVideo("hebrew")} className={video === "hebrew" ? 'active choose_language' : 'choose_language'}>עברית</button>
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

        </div>
    );
}

export default Videos;
