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

    const initTasks = {
      bearden: [
        {
          key: 1547216683236,
          address: "37919",
          location: "bearden",
          text: "eat",
          coordinates: {
            latitude: 35.94268,
            longitude: -83.98353,
          }
        }
      ],
      utk: [
        {
          key: 1547219983236,
          address: "37996",
          location: "utk",
          text: "go to school",
          coordinates: {
            latitude: 35.9526,
            longitude: -83.92647,
          }
        }
      ],
    };

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

  //Add items to state when user inputs: NNEED TO FIX--NOT ACCEPTING MULTIPLE TASKS FOR ONE LOCATION
  handleAddItem = item => {
    const items = this.state.items;
    const isLocationInState = items.hasOwnProperty(item.location)

    if (isLocationInState) {
      items[item.location].push(item)
    } else {
      items[item.location] = [item];
    }
    console.log(items[item.location].length) //ONLY ALLOWS MAX OF TWO

    const currentItem = { ...item };
    const taskCoordinates = [
      currentItem.coordinates.longitude,
      currentItem.coordinates.latitude
    ]
    const userCoordinates = [
      this.state.user.longitude,
      this.state.user.latitude
    ]

    Object.defineProperty(items, currentItem.location, {
      value: [currentItem],
      writable: true
    })

    //fetch distance between user and task coordinates
    apiServices.getMatrixDistances(userCoordinates, taskCoordinates)
      .then(distance => {
        currentItem.distance = distance
        // update state with new item
        this.setState({
          items,
          currentItem
        });
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
    let coordinates = [];
    const mapTasks = task => ({
      latitude: task.coordinates.latitude,
      longitude: task.coordinates.longitude,
    });

    if (location === 'All') {
      const itemValues = Object.values(this.state.items); // convert items object to array of values
      coordinates = itemValues.map(loc => loc.map(mapTasks))
        .reduce((acc, curr) => acc.concat(curr), []); // flatten nested arrays
    } else {
      const tasks = this.state.items[location];
      coordinates = tasks.map(mapTasks);
    }
    return coordinates;
  }

  render() {
    let items = Object.values(this.state.items).flat();
    let filteredItems;
    let coordinates;
    let filterDist = this.state.filterDist
    let filterKey = this.state.filterKey
  
    //NEED TO RE-WRITE FILTERING FUNCTIONALITY
    //1. Filter all by filterDist
    //2. Filter by location if filterKey !== All

    /*Filter out tasks based on filter dropdown
    filteredItems = items.filter(item => item.distance < filterDist)
    let isFilteredItem = filteredItems.forEach(function(item) {
      this.getCoordinates(item)
    }); */

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
