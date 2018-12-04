import React, { Component } from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';

const token = 'pk.eyJ1Ijoic3RlZmFuaGsiLCJhIjoiY2psOGdxc3R0M2lycjN4cXA5NTV2YThtbCJ9.xg_1D6ILRexNe7jHQ503mw';

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

        return (
            <ReactMapGL {...viewport} mapStyle='mapbox://styles/mapbox/streets-v9' mapboxApiAccessToken={token} onViewportChange={(viewport) => this.setState({viewport})}>
                <div className="nav">
                    <NavigationControl />
                </div>
            </ReactMapGL>

        );

    }

}

export default Map;