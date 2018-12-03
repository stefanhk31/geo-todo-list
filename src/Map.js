import React, { Component } from 'react';
import Mapbox, {NavigationControl} from 'react-map-gl';
import { LocalizationControl } from 'mapbox-gl-controls';

const token = 'pk.eyJ1Ijoic3RlZmFuaGsiLCJhIjoiY2psOGdxc3R0M2lycjN4cXA5NTV2YThtbCJ9.xg_1D6ILRexNe7jHQ503mw';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 35.9555072,
                longitude: -83.9901184,
                zoom: 10,
                width: 500,
                height: 500
            }
        };
    }

    

    render() {
        const { viewport } = this.state;

        return (
            <Mapbox {...viewport} mapStyle='mapbox://styles/mapbox/streets-v9' mapboxApiAccessToken={token}>
                <div className="nav">
                    <NavigationControl/>
                </div>
            </Mapbox>

        );

    }

}

export default Map;