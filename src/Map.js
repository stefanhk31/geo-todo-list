import React, { Component } from 'react';
import MapGL, { NavigationControl, Marker } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

const token = process.env.REACT_APP_API_KEY;

const initViewport = {
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: 500,
        height: 500
}

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: initViewport,
            searchResultLayer: null
        };
    }

    mapRef = React.createRef()

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

    handleOnResult = e => {
        this.setState({
            searchResultLayer: new GeoJsonLayer({
                id: "search-result",
                data: e.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10
            })
        });
    };

    render() {
        const { viewport, searchResultLayer } = this.state;

        const updateViewport = (viewport) => {
            this.setState({ viewport })
        };

        return (
            <div className="map-container">
                <MapGL {...viewport} ref={this.mapRef} mapStyle='mapbox://styles/mapbox/streets-v9' mapboxApiAccessToken={token} onViewportChange={updateViewport}>
                    <div className="nav">
                        <NavigationControl onViewportChange={updateViewport} />
                    </div>
                    <div className="geocoder">
                        <Geocoder mapRef={this.mapRef} onResult={this.handleOnResult} onViewportChange={updateViewport} mapboxApiAccessToken={token} position="top-right" />
                    </div>
                    <Marker latitude={35.95} longitude={-83.99} offsetLeft={-20} offsetTop={-10}>
                        <div><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                    </Marker>
                    <DeckGL {...viewport} layers={[searchResultLayer]} />
                </MapGL>
            </div>
        );

    }

}

export default Map;