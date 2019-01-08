import React, { Component } from 'react';

const BASE_MAP_URL = 'https://image.maps.api.here.com/mia/1.6/mapview';
const DEFAULT_COORDS = 'c=35.9641%2C-83.9202'
const DEFAULT_MAP_SETTINGS = 'w=600&h=300&z=12&t=5&poitxs=16&poitxc=white&poifc=blue';

class Map extends Component {

  // For conciseness simply include all parameters in the querystring directly

  constructor(props) {
    super(props);
    this.state = {
      url: `${BASE_MAP_URL}?${DEFAULT_COORDS}&${DEFAULT_MAP_SETTINGS}`,
      points: [],
    }
  }

  // Set map to user's location on load
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            url: `${BASE_MAP_URL}?c=${position.coords.latitude}%2C${position.coords.longitude}&${DEFAULT_MAP_SETTINGS}`
          });
        },
      );
    }
  }

  //Update state if an address has been entered
  static getDerivedStateFromProps(props, state) {
    if (props.coords !== state.points) {
      return {
        points: props.coords
      };
    }
  }

  // Helper function to format list of points

  getPOIList = () => {
    var param = '&poi=';
       for (let i in this.state.points) {
         param += this.state.points[i].Latitude + ',' + this.state.points[i].Longitude + ',';
       }
       return param;
   } 
  
  // Render method builds the URL dynamically to fetch the image from the
  // HERE Map Image API

  render() {
    const imageSrc = `${this.state.url}&app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}${this.getPOIList()}`

    return (
      <img
        src={imageSrc}
        alt="Todo Map"/>
    );
  }
}

export default Map;