import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [timeSpent, setTimeSpent] = useState(0); // state for tracking time in seconds

  // Create refs for each unique video
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    // Set the playback rate for each video
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.playbackRate = 0.3;
      }
    });

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateColors = () => {
      document.querySelectorAll('.square').forEach((square, index) => {
        if (![0, 10, 14, 22].includes(index)) {
          // Get the current hour class of the square (e.g., "hour-3")
          let currentClass = Array.from(square.classList).find(cls => cls.startsWith('hour-'));
    
          // If no hour class is found, initialize with hour-1
          if (!currentClass) {
            currentClass = 'hour-1';
            square.classList.add(currentClass);
          }
    
          // Extract the current hour number
          const currentHour = parseInt(currentClass.replace('hour-', ''), 10);
    
          // Calculate the next hour, cycling back to 1 if we reach 27
          const nextHour = (currentHour % 27) + 1;
    
          // Remove the current hour class and add the next hour class
          square.classList.remove(currentClass);
          square.classList.add(`hour-${nextHour}`);        }
    

      });
    };
  
    // Set interval to update the colors every second
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
              <video ref={videoRefs[3]} className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/exerciseroom.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index < 28) { // the first 24 squares get hour colors
          return (
            <div key={index} className={`square hour-${index}`} />
          );
        } else if (index === 28) { // bottom right square for the "time tracker" and about section
          return (
            <div key={index} className="text">
              <div>about</div>
              <br/><br/>
              <hr style={{ color: 'gray' }} />
              <br/>
              <div>time: {timeSpent} seconds</div>
            </div>
          );
        } else if (index === 29) {
          return (
            <div key={index} className="text">
              <p>The Annual report of the inspectors of the Eastern State Penitentiary of Pennsylvania (1848)</p>
            </div>
          );
        } else {
          return <div key={index} className="square neutral" />;
        }
      })}
    </div>
  );
}

export default App;
