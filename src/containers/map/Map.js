import React, { Component } from 'react';

const BASE_MAP_URL = 'https://image.maps.api.here.com/mia/1.6/mapview?';

class Map extends Component {

  // For conciseness simply include all parameters in the querystring directly

  constructor(props) {
    super(props);
    this.state = {
      url: `${BASE_MAP_URL}w=600&h=300&z=12&t=5&poitxs=16&poitxc=black&poifc=yellow`,
      points: [],
    }
  }

// Set map to user's location on load

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            url: `${BASE_MAP_URL}c=${position.coords.latitude}%2C${position.coords.longitude}&w=600&h=300&z=12&t=5&poitxs=16&poitxc=black&poifc=yellow`
          });
        },
      );
    }
  }

  // Helper function to format list of points

  getPOIList = () => {
    if (this.state.points.length > 0) {
      let param = '&poi=';
      for (var poi in this.state.points) {
        param += poi.latitude + ',' + poi.longitude;
      }
      return param;
    }

    return '';
  } 

  // Render method builds the URL dynamically to fetch the image from the
  // HERE Map Image API

  render() {
    const imageSrc = `${this.state.url}&app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`; //${this.props.getPOIList()}

    return (
      <img
        src={imageSrc}
        alt="Todo Map"/>
    );
  }
}

export default Map;