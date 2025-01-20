// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {

  const summer2025 = "June 21, 2025 03:42:59";  

  const [solstice, setSolstice] = useState(false);
  const [nextSolstice, setNextSolstice] = useState(summer2025);
  const [futureSolstice, setFutureSolstice] = useState(summer2025);
  const [label, setLabel] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  async function getFutureSolstice(id) {
    try {
        let response = await fetch("/dates.json")
        if (response) {
            let data = await response.json();
            let selectedData = data.filter(s => s.id === id);
            for (let i = 0; i < selectedData; i++) {
                setFutureSolstice(selectedData[i].date)
                setLabel(selectedData[i].text)
            }
        }
    }
    catch (e) {
        console.log(`Error: ${e.status} ${e.statusText}`)
    };
  };


  useEffect(() => {

      const target = new Date(futureSolstice);

      const interval = setInterval(() => {
          const now = new Date();
          const difference = target.getTime() - now.getTime();
          const d = Math.floor(difference / (1000 * 60 * 60 * 24));
              setDays(d);
          const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              setHours(h);
          const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
              setMinutes(m);
          const s = Math.floor((difference % (1000 * 60)) / 1000);
              setSeconds(s);
          if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
              setSolstice(true);
          };
      }, 1000);
      return () => clearInterval(interval);
  }, [nextSolstice]);

//   function handleClick(e) {
//     e.preventDefault();
//     setNextSolstice(summer2025);
//     console.log("Click!");
//   };


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className="title">
          Countdown to the Solstice
        </p>
      </header>
      <div className="box">
        { solstice ? ("Happy Solstice!") : 
        (<div className="outer">
            <div >
                <span className="time">{days}</span>     
                <div className="text">Days</div>
            </div>
                <span className="time"> : </span>
            <div >
                <span className="time">  {hours} </span>
                <div className="text">Hours</div>
            </div>
                <span className="time"> : </span>
            <div> 
                <span  className="time"> {minutes} </span>
                <div className="text">Minutes</div>
            </div>
                <span className="time"> : </span>
            <div >
                <span  className="time"> {seconds} </span>
                <div className="text">Seconds</div>
            </div>
        </div>)
        }
    </div>
    <br></br>
        <div>
            {/* <button className="reset" onClick={handleClick}> Winter 2025 </button> */}
            <select>
                <option value="winter2025" id="0" onChange={getFutureSolstice(0)}>Summer 2025</option>
                <option value="winter2025" id="1" onChange={getFutureSolstice(1)}>Winter 2025</option>
                <option value="winter2026" id="2">Summer 2026</option>

            </select>
        </div>
    </div>
  );
}

export default App;
