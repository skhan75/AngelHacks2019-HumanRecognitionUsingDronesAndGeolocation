import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import ReactDOM from 'react-dom';
import dummyTargetMarkers from '../data/dummyTargetMarkers';

function MapContainer(props) {
  const showAllMarkers = props.showAllMarkers;

  return (
    <GoogleMap
      defaultZoom={ props.initialConfig.zoom }
      defaultCenter={ props.initialConfig.center }
    >
      {
        showAllMarkers ?
          dummyTargetMarkers.targets.map((coords) => (
            <Marker
              key={coords.key}
              position={{lat: coords.lat, lng: coords.lng}}
            />
        )) :
        <Marker
          position={props.initialConfig.center }
        />
      }

    </GoogleMap>
  )
}


const GoogleMaps = withScriptjs(withGoogleMap(MapContainer));
export default GoogleMaps;
