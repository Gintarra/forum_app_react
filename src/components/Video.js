import React from 'react';
import { useRef } from 'react';

const Video = ({ videoLink }) => {
    console.log(videoLink)

    
    const slider = useRef();
    const videoslider = (links) => {
        slider.current.src = links;
    };
    return (
        <>
         <iframe width="200"  title="YouTube video player" height="130" src={videoLink} sandbox="allow-scripts allow-same-origin allow-presentation">
        </iframe>
        </>
       
    );
}

export default Video;

{/* <div id="showreal" className="video-title">
<div
  className="video-slider-container mt-4 mb-4"
  style={{ maxWidth: "100%" }}
>
  <iframe
    auto
    ref={slider}
    src={videoLink}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
</div> */}