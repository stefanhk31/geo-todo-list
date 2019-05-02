import React, { Component } from 'react';

// Import components
import ItemInput from './containers/item-input/ItemInput';
import Map from './containers/map/Map';
import List from './components/list/List';
import apiServices from './api-services/apiServices';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      items: {},
      filterKey: 'All',
      filterDist: '99999',
      user: {
        latitude: null,
        longitude: null
      }
    }
  }

  // Store geolocation API in a Promise, update them in state
  getUserCoordinates() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true });
    })
  }

  setUserCoordinatesToState(position) {
    const userLatitude = position.coords.latitude
    const userLongitude = position.coords.longitude
    this.setState({
      user: {
        latitude: userLatitude,
        longitude: userLongitude,
      }
    })
  }

  // Set user location into state on load
  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted && navigator.geolocation) {
      this.getUserCoordinates()
        .then(data => this.setUserCoordinatesToState(data))
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Add items to state when user inputs
  handleAddItem = item => {
    const currentItem = { ...item };

    const items = this.state.items;
    const isLocationInState = items.hasOwnProperty(item.location)

    if (isLocationInState) {
      items[item.location].push(item)
    } else {
      items[item.location] = [item];
    }

    // update state with new item
    this.setState({
      items,
      currentItem
    });
  };

  handleDeleteItem = item => {
    let allItems = { ...this.state.items };
    const key = item.key
    const listItems = this.state.items[item.location]
      .filter(item => item.key !== key)

    // If no more list items, delete location from allItems
    if (listItems.length === 0) {
      delete allItems[item.location];
    } else {
      // else update allItems with new listItems locations
      allItems[item.location] = listItems;
    }

    // update state with item deleted
    this.setState({
      items: allItems
    });
  }

  handleFilterTaskLocations = (e) => {
    this.setState({
      filterKey: e.target.value,
    });
  };

  handleFilterDistLocations = (e) => {
    this.setState({
      filterDist: e.target.value
    })
  }

  //Get coordinates of address entered for new location: re-write to render filteredItems and not this.state.items
  getCoordinates = (location) => {
    let items = Object.values(this.state.items).flat();
    let coordinates = [];
    let filterDist = this.state.filterDist
    const itemsWithinDistance = items.filter(item => item.distance <= filterDist);

    const mapTasks = task => ({
      latitude: task.coordinates.latitude,
      longitude: task.coordinates.longitude,
    });

    if (location === 'All') {
      const itemValues = [itemsWithinDistance]; 

      // convert items object to array of values
      coordinates = itemValues.map(loc => loc.map(mapTasks))
        .reduce((acc, curr) => acc.concat(curr), []); // flatten nested arrays
    } else {
      //make tasks filter out all of [itemsWithinDistance] where location !== filterKey
      const tasks = itemsWithinDistance.filter(item => item.location === location) 
      coordinates = tasks.map(mapTasks) 
    }
    return coordinates;
  }

  render() {
    let filteredItems;
    let coordinates;
    let filterKey = this.state.filterKey

    // Get filteredItems and coordinates
    if (filterKey === 'All') {
      filteredItems = Object.assign({}, this.state.items); //put filtered items here?
      coordinates = this.getCoordinates('All');
    } else {
      const obj = {};
      obj[filterKey] = [...this.state.items[filterKey]];
      filteredItems = obj;
      coordinates = this.getCoordinates(filterKey);
    } 

    return (
      <div className="App">
        <div className="todo-container">
          <ItemInput
            user={this.state.user}
            coordinates={coordinates}
            onAddItem={this.handleAddItem}
            locationKeys={Object.keys(this.state.items)}
            onFilterTaskLocations={this.handleFilterTaskLocations}
            onFilterDistLocations={this.handleFilterDistLocations}
            filterKey={this.state.filterKey}
            filterDist={this.state.filterDist}
          />

          <List
            items={filteredItems}
            onDeleteItem={this.handleDeleteItem}
          />
        </div>
        <div className="map-container">
          <Map
            coordinates={coordinates}
            getUserCoordinates={this.getUserCoordinates}
          />
        </div>
      </div>
    );
  }
};

export default App;
