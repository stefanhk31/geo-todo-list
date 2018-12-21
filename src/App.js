import React, { Component } from 'react';

// Import components
import ItemInput from './containers/item-input/ItemInput';
import Map from './containers/map/Map';
import List from './components/list/List';
import Locations from './components/locationFilter/Locations';
//import MapboxClient from "mapbox/lib/services/geocoding";
//import mapboxgl from "mapbox-gl/dist/mapbox-gl-unminified";

const token = process.env.REACT_APP_API_KEY;

const initItem = {
  text: '',
  location: '',
  key: ''
};

//const mapboxClient = new MapboxClient(token);

class App extends Component {
  constructor(props) {
    super(props);
    const initTasks = {
      home: Array(2).fill(null).map((item, index) => ({key: index + Math.random() * Math.random(), text: `Task ${index + 1}`, location: 'home'})),
      work: Array(2).fill(null).map((item, index) => ({key: index + Math.random() * Math.random(), text: `Task ${index + 1}`, location: 'work'})),
    };

    this.state = {
      items: initTasks,
      currentItem: initItem,
      filterKey: 'All',
    }
  }

  handleAddItem = item => {
    const items = {...this.state.items};

    if (this.state.items.hasOwnProperty(item.location)) {
      items[item.location].push(item);
    } else {
      items[item.location] = [item];
    }

    const currentItem = { ...item };

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

  //Attempt to geocode string in "location" field--currently not working when un-commented
  /* addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: initItem
      })
    }

    this.geocodeLocation();
       var map = document.getElementById("map"); 

     new mapboxgl.Marker(Map)
        .setLngLat(itemCoords)
        .addTo(map);

    }); 
  } 

  geocodeLocation() {
    const itemLoc = this.state.currentItem.location;
    const itemCoords = new mapboxClient.geocodeForward(itemLoc, function (_err, res) {
      return res.features[0].geometry.coordinates;
    })
    console.log(itemCoords)
  }
  */


  handleDeleteItem = item => {
    console.log('delete item', item);    
    // const items = this.state.items.filter(item => item.key !== key);

    // this.setState({
    //   items,
    // });
  }

  handleFilterLocation = (e) => {
    this.setState({
      filterKey: e.target.value,
    });
  };

  render() {
    let filteredItems;

    if (this.state.filterKey === 'All') {
      filteredItems = Object.assign({}, this.state.items);
    } else {
      const obj = {};
      obj[this.state.filterKey] = [...this.state.items[this.state.filterKey]];
      filteredItems = obj;
    }

    return (
      <div className="App">
        <div className="todo-container">
          <ItemInput
            onAddItem={this.handleAddItem}
            locationKeys={Object.keys(this.state.items)}
            onFilterLocation={this.handleFilterLocation}
            filterKey={this.state.filterKey}
          />

          <List
            items={filteredItems}
            onDeleteItem={this.handleDeleteItem}
          />
        </div>

        <Map />
      </div>
    );
  }
};

export default App;
