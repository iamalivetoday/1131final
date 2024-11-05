import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [timeSpent, setTimeSpent] = useState(0); // state for tracking time in seconds
  const videoRefs = [useRef(null), useRef(null), useRef(null)]; // create refs for each video

  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    // set the playback rate for each video
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.playbackRate = 0.3;
      }
    });

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update the color of each square every second
    const updateColors = () => {
      // Retrieve the current colors of all squares before modifying them
      const colors = Array.from(document.querySelectorAll('.square')).map((square) => 
        window.getComputedStyle(square).backgroundColor
      );
  
      // Loop through each square and update its color based on the next/previous squares
      document.querySelectorAll('.square').forEach((square, index) => {
        if ([10, 14, 22].includes(index)) {
          return; // Skip specified indexes
        }
  
        // Calculate the indexes for the next and past squares in the grid
        const pastIndex = (index - 1 + 28) % 28;
  
        // Apply the color from the previous square to the current one
        if (![10, 14, 22].includes(index)) {
          square.style.backgroundColor = colors[pastIndex];
        }
      });
    };
  
    // Set interval to update colors every second
    const intervalId = setInterval(updateColors, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="App">
      {[...Array(30)].map((_, index) => {
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
        } else if (index === 22) { // another diagonal position
          return (
            <div key={index} className="square">
              <video ref={videoRefs[2]} className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/exerciseroom.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index < 28) { // the first 24 squares get hour colors
          return (
            <div key={index} className={`square hour-${index}`} />
          );
        }  else if (index === 28) { // bottom right square for the "time tracker" and about section
          return (
            <div key={index} className="text">
              <div>about</div>
              <br/> <br/>
              <hr  style= {{color:'gray'}}/>
              <br/>
              <div>time: {timeSpent} seconds</div>
            </div>
          );
        } else if (index === 29) {
          return (
            <div key={index} className="text"><p> the Annual report of the inspectors of the Eastern State Penitentiary of Pennsylvania (1848) </p></div>
          );
        } else {
          return <div key={index} className="square neutral" />;
        }
      })}
    </div>
  );
}

export default App;
