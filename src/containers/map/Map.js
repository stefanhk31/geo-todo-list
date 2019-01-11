import React, { Component } from 'react';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';

const token = process.env.REACT_APP_API_KEY;

//set initial viewport parameters
const initViewport = {
  latitude: 0,
  longitude: 0,
  zoom: 12,
  width: window.innerWidth,
  height: window.innerHeight
}

//set navigation controls
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: initViewport,
      coordinates: [],
      popupInfo: null
    };
  }

  // Set map to user's location on load
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude
          const userLongitude = position.coords.longitude
          this.setState({
            viewport: {
              ...initViewport,
              latitude: userLatitude,
              longitude: userLongitude,
            }
          })
        }
      )
    }
  }

  //Update state if an address has been entered
  static getDerivedStateFromProps(props, state) {
    if (props.coordinates !== state.coordinates) {
      return {
        coordinates: props.coordinates,
      };
    }

    return null;
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport })
  };

  //Create marker for every location on list *NEED TO DEBUG: why aren't Markers showing up?
  _renderMarkers = (point, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        latitude={point.latitude}
        longitude={point.longitude}>
        <div>{point.location}</div>
      </Marker>
    )
  }

  //create pop-up with List (still to be done)


  render() {
    const { viewport, coordinates } = this.state;

    return (
      <div className="map-container" id="map">
        <MapGL
          {...viewport}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxApiAccessToken={token}
          onViewportChange={this._updateViewport}
        >

          { coordinates.map(this._renderMarkers) }

          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>

        </MapGL>
      </div>
    );
  }
}

export default Map;