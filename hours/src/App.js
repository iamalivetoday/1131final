import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [timeSpent, setTimeSpent] = useState(0); // state for tracking time in seconds
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Create refs for each unique video
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const formatElapsedTime = (milliseconds) => {
    let remainingMs = milliseconds;

    const ms = remainingMs % 1000;
    remainingMs = Math.floor(remainingMs / 1000);    const s = remainingMs % 60;
    remainingMs = Math.floor(remainingMs / 60);
    const min = remainingMs % 60;
    remainingMs = Math.floor(remainingMs / 60);
    const hr = remainingMs % 24;
    remainingMs = Math.floor(remainingMs / 24);
    const days = remainingMs % 30;
    remainingMs = Math.floor(remainingMs / 30);
    const months = remainingMs % 12;
    const years = Math.floor(remainingMs / 12);

    return { s, min, hr, days, months, years };
  };

  const {ms, s, min, hr, days, months, years } = formatElapsedTime(timeSpent);

  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 100);
    }, 100);

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
          square.classList.add(`hour-${nextHour}`);
        }
      });
    };
  
    // Set interval to update the colors every second
    const intervalId = setInterval(updateColors, 2000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="left-text">An Alternate Perspective of the Eastern State Penitentiary, 1848</div>
        <div className="right-text">
          <div>
            {years} years, {months} months, {days} days <br/> {hr} hr, {min} min <br/> {s} seconds
          </div>
        </div>
        </header>
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
          } else if (index >= 1 && index <= 27) {
            return (<div key={index} className={`square hour-${index}`}>
              <span className="time-text">{Math.floor(timeSpent/1000)} seconds</span>
            </div>
            );
          } else if (index === 28) { // bottom right square for the "time tracker" and about section
            return (
              <div key={index} className="text" onClick={toggleModal} style={{ cursor: 'pointer' }}>
                <br/><br/>
                <div>about</div>
                <br/><br/>
              </div>
            );
          } else if (index === 29) {
            return (
              <div key={index} className="text">
                <a href="https://digitalarchives.powerlibrary.org/papd/islandora/object/papd%3Aslppadocs_26702?overlay_query=RELS_EXT_isMemberOfCollection_uri_ms%3A%22info%3Afedora/papd%3Aslppadocs%22#page/6/mode/2up">The Annual report of the inspectors of the Eastern State Penitentiary of Pennsylvania (1848)</a>
              </div>
            );
          } else {
            return <div key={index} className="square neutral" />;
          }
        })}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>&times;</span>
              <p>This website was made by Madeleine Song for ENGL 1131: Crime and Criminality. 
                <br/>The source code is <a>here</a>.</p>
              <br/>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default App;
