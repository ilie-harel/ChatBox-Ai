import "./VideoEnglish.css";

function VideoEnglish() {
    return (
        <div className="VideoEnglish">
            {/* <iframe className="video" width="728" height="409.5" src="https://www.youtube.com/embed/B3BqcxYW-TI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            <div ><iframe style={{ borderRadius: "20px"}} width="728" height="409.5" src="https://streamable.com/e/mle4ta" frameborder="0"  allowFullScreen={true}  autallow="autoplay"oplay></iframe></div>
        </div>
    );
}

export default VideoEnglish;
