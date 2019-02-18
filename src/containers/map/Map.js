import React, { Component } from 'react';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

const token = process.env.REACT_APP_API_KEY;

//set initial viewport parameters
const initViewport = {
  latitude: 0,
  longitude: 0,
  zoom: 12,
  width: window.innerWidth,
  height: window.innerHeight - 1
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

  //Create marker for every location on list 
  _renderMarkers = (point, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        latitude={point.latitude}
        longitude={point.longitude}
        offsetLeft={-point.latitude * .25}
        offsetTop={-point.latitude * .75}
      >
       <i
        className="fas fa-map-pin fa-2x todo-map-marker"
      ></i>
      </Marker>
    )
  }

  render() {
    const { viewport, coordinates } = this.state;

    return (
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
    );
  }
}

export default Map;