import React, { useRef } from "react";
import GoogleMaps from "../../hooks/map_hook.js"
import { useState, useEffect } from 'react';
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_KEYS;


let initialConfig = {
  zoom: 10,
  center: null
}


/**
  Helper Functions
**/
const __getCurrentLocation = async() => {
  const { coords } = await __getCoordinates();
  return { lat: coords.latitude, lng: coords.longitude }
}

const __getCoordinates = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

let __setConfig = async() => {
  initialConfig.zoom = 10
  initialConfig.center = await __getCurrentLocation()
}


/**
  Map Component function
**/
const GMap = (deployClicked) => {

  let showAllMarkers = deployClicked.action;

  let props = {
    initialConfig,
    showAllMarkers: showAllMarkers
  }


  // Getting the current location -- Not a very wise way
  // TODO: Use States to get manage current location. Get the Map displayed first, and then
  // populate the marker with the current location while its done fetching
  __setConfig();

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <GoogleMaps { ...props }
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}

export default GMap;
