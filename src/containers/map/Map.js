import React, { Component } from 'react';

class Map extends Component {

  // For conciseness simply include all parameters in the querystring directly

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://image.maps.api.here.com/mia/1.6/mapview?w=600&h=300&z=12&t=5&poitxs=16&poitxc=black&poifc=yellow',
      points: [],
    }
  }

// Set map to user's location on load

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            url: 'https://image.maps.api.here.com/mia/1.6/mapview?c=' + position.coords.latitude + '%2C' + position.coords.longitude + '&w=600&h=300&z=12&t=5&poitxs=16&poitxc=black&poifc=yellow'
          });
        },
      );
    }
  }


  // Helper function to format list of points

  getPOIList() {
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
    const imageSrc = `${this.state.url}&app_id=${this.props.app_id}&app_code=${this.props.app_code}${this.getPOIList()}`;

    return (
      <img
        src={imageSrc}
        alt="Todo Map"/>
    );
  }
}

export default Map;