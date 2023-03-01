import "./VideoEnglish.css";
// import video from "./video_english.mp4"
import video from "../VideoEnglish/video_english.mp4"
// import img from "../../LandingPage/ai8-2.jpg"


function VideoEnglish() {
    return (
        <div className="VideoEnglish">
            {/* <video width="320" height="240" controls>
                <source src={video} type={video} />
                Your browser does not support the video tag.
            </video> */}
			<iframe className="video" width="728" height="409.5" src="https://www.youtube.com/embed/OgiOoejoXoc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        
        </div>
    );
}

export default VideoEnglish;
