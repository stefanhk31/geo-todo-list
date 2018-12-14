import React, { Component } from 'react';

// Import components
import ItemInput from './containers/item-input/ItemInput';
import Map from './containers/map/Map';
import List from './components/list/List';
import MapboxClient from "mapbox/lib/services/geocoding";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-unminified";

const token = process.env.REACT_APP_API_KEY;

const initItem = {
  text: '',
  location: '',
  key: ''
};

const mapboxClient = new MapboxClient(token);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: initItem
    }
  }

  handleAddItem = item => {
    const items = [...this.state.items, item];
    const currentItem = {...item};

    // update state with new item
    this.setState({
      items,
      currentItem,
    });
  }

  setLocation = e => {
    const location = e.target.value;
    const currentItem = {
      text: this.state.currentItem.text,
      location: location,
      key: this.state.currentItem.key
    }
      this.setState({
        currentItem: currentItem
      })
    }

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    const itemLoc = this.state.currentItem.location;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: initItem
      })
    }
    /* mapboxClient.geocodeForward(itemLoc, function(err, res) {
      var itemCoords = res.features[0].geometry.coordinates;
      var map = document.getElementById("map");

      /*new mapboxgl.Marker(Map)
        .setLngLat(itemCoords)
        .addTo(map);

    }); */
  }

  handleDeleteItem = key => {
    const items = this.state.items.filter(item => item.key !== key);

    this.setState({
      items,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="todo-container">
          <ItemInput onAddItem={this.handleAddItem} />
          <List
            items={this.state.items}
            onDeleteItem={this.handleDeleteItem}
          />
        </div>
        <Map />
      </div>
    );
  }
};

export default App;
