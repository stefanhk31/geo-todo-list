import React, { Component } from 'react';

// Import components
import ItemInput from './containers/item-input/ItemInput';
import Map from './containers/map/Map';
import List from './components/list/List';

import MapboxClient from "mapbox/lib/services/geocoding";

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

    const itemLoc = item.location;
    mapboxClient.geocodeForward(itemLoc, function() {
      console.log(itemLoc)
    });
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
        <ItemInput onAddItem={this.handleAddItem} />

        <List
          items={this.state.items}
          onDeleteItem={this.handleDeleteItem}
        />

        <Map />
      </div>
    );
  }
};

export default App;
