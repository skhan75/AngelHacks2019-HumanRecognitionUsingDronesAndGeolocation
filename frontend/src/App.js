import React, { useState, useCallback } from 'react';
import logo from './logo.svg';

// import { Provider } from 'react-redux';
// import store from './state/store';
import './App.css';
import GMap from './Maps/GoogleMaps/index';
import { Link } from 'react-router-dom';


// const store = () => {
//   const [count, setCount] = useState(0);
//
//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);
//   const reset = () => setCount(0);
//
//   return {count, increment, decrement, reset};
// };

function App() {

  const [deployClicked, setDeployClicked] = useState(false);
  const deployDrones = () => {
    setDeployClicked(!deployClicked);
  }

  // const callbackFunction = useCallback(
  //     () => {
  //       return deployClicked;
  //     },
  //     [deployClicked], // Tells React to memoize regardless of arguments.
  //   );
  //


  return (


      <div className="flex-container">

        <div className="map-box">
          <GMap action={deployClicked}/>
        </div>

        <div className="display-box">

          <div className="top-bar">
            <h1>
              Human
            </h1>
          </div>

          <ul className="nav-bar-box">
            <li>About</li>
            <li>Contact</li>
            <li>Signup / Login</li>
          </ul>

          <div className="menu-box">

            <button type="button" onClick={deployDrones}>
              Deploy Drones and Scan
            </button>
            &nbsp;
            <button type="button">
              Send Rescue
            </button>
            &nbsp;
            <button type="button">
              Click Me!
            </button>

          </div>

        </div>

      </div>



  )
}

function deployDrones() {

}

export default App;
