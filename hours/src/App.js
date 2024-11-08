import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [timeSpent, setTimeSpent] = useState(0); // state for tracking time in seconds
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Create refs for each unique video
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  const formatElapsedTime = (milliseconds) => {
    let remainingMs = milliseconds;

    const ms = remainingMs % 1000;
    remainingMs = Math.floor(remainingMs / 1000);    
    const s = remainingMs % 60;
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

  const quotes = [
    "Whether it be to those prisoners whose physical debility, or the length of their respective sentences, forbids any reasonable hope of discharge from confinement, or of that number just entering upon life, whom a momentary temptation may have overpowered, not to mention instances in which, from the infirmity of human laws, innocent men have been convicted, there is clearly no mode of estimating the value of pure religious instruction.",
    "In the performance of his official duties, every inmate of the prison has, from time to time, been subject to the most rigid scrutiny…",
    "The inspectors have denied that the system, as here administered, any tendency to produce the disease.",
    "A large number of convicts are annually sentenced for long periods, who at the dates of their sentences, are known to the community and the court to be insane.",
    "It has been in vain to urge that the court had no right to convict a man guiltless of any moral wrong, and that in doing so, they inflicted injury on society.",
    "That evil has continued, and the present Report of the physician shows, that it yet continues, unabated.",
    "The Board do not desire to exclude, but expressly to include, the discussion of subjects.",
    "On reviewing the facts which have transpired in the Institution during the past year, the Inspectors find nothing to shake that confidence in the utility of the system, which has been expressed in their previous Reports…",
    "The bond of affection found to subsist between prisoner and keeper.",
    "The order and neatness at all times observable.",
    "To those interested in the success of the system, it has always afforded peculiar pleasure, to witness the effects produced on humane and enlightened minds, by actual inspection and examination of the prison.",
    "The almost entire absence of vindictive feelings on the part of the prisoners.",
    "The orderly conduct of the prisoners generally continues to be very satisfactory, and many by their correct deportment give reason to hope, that when their term of imprisonment shall end, they will return to the community better men, inspired with sincere desires to live virtuous lives and thus become good citizens.",
    "In maintaining the discipline of the prison, much depends on faithful and vigilant offers.",
    "The orderly conduct of the prisoners generally continues to be very satisfactory.",
    "When their term of imprisonment shall end, they will return to the community better men.",
    "Sincere desires to live virtuous lives and thus become good citizens.",
    "When their term of imprisonment shall end, they will become good citizens.",
    "For my part, though I am not prepared to say, that all the pardons granted since my official connection with the Eastern Penitentiary, have been entirely judicious, I am nevertheless confident, that the different executive officers have erred quite as much and having denied the pardon of many.",
    "As regards those who become insane during their imprisonment, some effort ought certainly to be made, to have them placed under more suitable influences for their restoration to health, than has been heretofore the case.",
    "So long as with us they are subjected to the same discipline as the sane prisoners, the use of medicine alone will avail but little for their recovery.",
    "It must be confessed that there are not a few who either die while under our care, or are not discharged until their maladies are beyond the reach of art.",
    "The practice of sending here, as criminals, persons notoriously insane or idiotic.",
    "It is bad enough, certainly, to detain those who become insane during their imprisonment, without subjecting to the same cruelty others, who for the offence which they have been committed, were neither legally nor morally responsible.",
    "If it be imperative on the counties to send here persons of this class, let it be understood, that they are not considered fit subjects for our discipline, but entitled, as far as our accommodations will admit of it, to the same treatment they would receive in a hospital for the insane.",
    "No. 1909 was not a prisoner at the time of his death, as a pardon had arrived for him, a few days previously.",
    "Strictly speaking, No. 1909 was not a prisoner at the time of his death, as a pardon had arrived for him.",
    "May both parties remember, that it is the lives and reason of fellow men, that may be saved or sacrificed by their prejudices or desires.",
    "Of the 121 prisoners received during the year, 30 have had insane relatives, bearing the following degree of consanguinity: parents 5; grandparents 1; mothers or sisters 4; uncles or aunts 10; cousins 10.",
    "It may almost be said, that discontent and ill-feeling have ceased to exist.",
    "Coercive measures are rarely needed, and I believe, are never resorted to, until moral influences have been fully tried, and prove ineffectual.",
    "There is a general and deep respect for the warden among the prisoners, a strong confidence in his rectitude, and a full conviction that he is sincerely desirous to do them good.",
    "All this is effected by a pervading influence, which while it is felt everywhere, is seen nowhere.",
    "Injudicious visitors, with their best intentions, may often mar the symptoms of promise; an inadvertent expression from one who cannot be acquainted with the peculiarities of a prisoner's position or disposition, may do much harm.",
    "These are but a small part of the many untoward influences.",
    "Any one competent to estimate the character of the corrupt mass of a prison population, who is fully acquainted with its chaotic elements of ignorance, brutality, debased profligacy, and lawless passion, would be astonished to observe the uniform good order, and apparently good disposition, which now reigns in this Institution.",
    "But as they were illiterate, possessed of small mental endowments, and much prostrated by disease, there was nothing in their closing history, sufficiently interesting to be the subject of report.",
    "May they, and all others, truly interested in the reclamation of the outcast prisoner, enjoy the blessedness of His approval whose favour is better than life.",
    "Respectfully submitted,"
  ];
  
  const [hoverQuote, setHoverQuote] = useState("");

  const handleMouseEnter = () => {
    // Set a random quote from the array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setHoverQuote(randomQuote);
  };

  const handleMouseLeave = () => {
    // Clear the quote on mouse leave
    setHoverQuote("");
  };

  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 100);
    }, 100);

    // Set the playback rate for each video
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.playbackRate = 0.4;
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
            {years} years, {months} months <br/> {days} days, {hr} hours, {min} minutes <br/> {s} seconds
          </div>
        </div>
        </header>
      <div className="App">
        {[...Array(30)].map((_, index) => {
          if (index === 0) { // top-left diagonal position
            return (
              <div key={index} className="square">
                <video ref={videoRefs[2]} className="video" autoPlay loop muted>
                  <source src={`${process.env.PUBLIC_URL}/room3clip1.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          } else if (index === 14) { // center diagonal position with YouTube embed
            return (
              <div key={index} className="square">
                <video ref={videoRefs[2]} className="video" autoPlay loop muted>
                  <source src={`${process.env.PUBLIC_URL}/room1clip2.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          } else if (index === 10) { // bottom-right diagonal position
            return (
              <div key={index} className="square">
                <video ref={videoRefs[1]} className="video" autoPlay loop muted>
                  <source src={`${process.env.PUBLIC_URL}/room2clip1.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          } else if (index === 22) { // another diagonal position
            return (
              <div key={index} className="square">
                <video ref={videoRefs[2]} className="video" autoPlay loop muted>
                  <source src={`${process.env.PUBLIC_URL}/room2clip2.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          } else if (index >= 1 && index <= 27) {
            return (
              <div
                key={index}
                className={`square hour-${index}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="time-text">
                  {hoverQuote}
                </span>
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
