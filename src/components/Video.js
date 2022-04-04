import React from 'react';

const Video = ({ videoLink }) => {

  return (
    <>
      <iframe width="200"
        title="YouTube video player"
        height="130" src={videoLink}
        sandbox="allow-scripts allow-same-origin allow-presentation">
      </iframe>
    </>

  );
}

export default Video;
