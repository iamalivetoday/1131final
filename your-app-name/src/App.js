import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRefs = [useRef(null), useRef(null), useRef(null)]; // create refs for each video

  useEffect(() => {
    // set the playback rate for each video
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.playbackRate = 0.5;
      }
    });
  }, []);

  return (
    <div className="App">
      {[...Array(24)].map((_, index) => {
        if (index === 0) { // top-left diagonal position
          return (
            <div key={index} className="square">
              <video ref={videoRefs[0]} className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/video1.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index === 14) { // center diagonal position
          return (
            <div key={index} className="square">
              <video ref={videoRefs[1]} className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/video2.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index === 10) { // bottom-right diagonal position
          return (
            <div key={index} className="square">
              <video ref={videoRefs[2]} className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/video3.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index === 22) { // bottom-right diagonal position
          return (
            <div key={index} className="square">
              <video ref={videoRefs[2]} className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/exerciseroom.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index < 24) { // the first 24 squares get hour colors
          return (
            <div key={index} className={`square hour-${index + 1}`} />
          );
        } else {
          return <div key={index} className="square neutral" />;
        }
      })}
    </div>
  );
}

export default App;
