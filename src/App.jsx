// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {

  const [solstice, setSolstice] = useState(false);
//   const [summer, setSummer] = useState(false);
//   const [winter, setWinter] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

      const target = new Date("June 21, 2025 03:42:59");

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
  }, []);



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
    </div>
  );
}

export default App;
