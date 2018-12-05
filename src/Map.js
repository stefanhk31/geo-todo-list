import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import dotenv from 'dotenv';

const token = dotenv.config(process.env.REACT_APP_API_KEY);

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 35.9555072,
                longitude: -83.9901184,
                zoom: 12,
                width: 500,
                height: 500
            }
        };
    }



    render() {
        const { viewport } = this.state;

        const updateViewport = (viewport) => {
            this.setState({ viewport })
        };

        return (
            <ReactMapGL {...viewport} mapStyle='mapbox://styles/mapbox/streets-v9' mapboxApiAccessToken={token} onViewportChange={updateViewport}>
                <div className="nav">
                    <NavigationControl onViewportChange={updateViewport} />
                </div>
            </ReactMapGL>

        );

    }

}

export default Map;