import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {[...Array(16)].map((_, index) => {
        if (index === 0) { // top-left diagonal position
          return (
            <div key={index} className="square">
              <video className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/video1.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index === 5) { // center diagonal position
          return (
            <div key={index} className="square">
              <video className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/video2.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (index === 10) { // bottom-right diagonal position
          return (
            <div key={index} className="square">
              <video className="video" autoPlay loop muted>
                <source src={`${process.env.PUBLIC_URL}/video3.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else {
          return <div key={index} className="square"></div>;
        }
      })}
    </div>
  );
}

export default App;
