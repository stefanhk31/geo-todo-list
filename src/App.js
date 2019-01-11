import React, { Component } from 'react';

// Import components
import ItemInput from './containers/item-input/ItemInput';
import Map from './containers/map/Map';
import List from './components/list/List';

class App extends Component {
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
          },
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
          },
        }
      ],
    };

    this.state = {
      items: initTasks,
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

  handleDeleteItem = item => {
    let allItems = {...this.state.items};
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

  getCoordinates = (location) => {
    let coordinates = [];
    const mapTasks = task => ({
      latitude: task.coordinates.latitude,
      longitude: task.coordinates.longitude,
      text: task.text,
      location: task.location,
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
    let filteredItems;
    let coordinates;

    // Get filteredItems and coordinates
    if (this.state.filterKey === 'All') {
      filteredItems = Object.assign({}, this.state.items);
      coordinates = this.getCoordinates('All');
    } else {
      const obj = {};
      obj[this.state.filterKey] = [...this.state.items[this.state.filterKey]];
      filteredItems = obj;
      coordinates = this.getCoordinates(this.state.filterKey);
    }

    return (
      <div className="App">
        <div className="todo-container">
          <ItemInput
            onAddItem={this.handleAddItem}
            locationKeys={Object.keys(this.state.items)}
            onFilterTaskLocations={this.handleFilterTaskLocations}
            filterKey={this.state.filterKey}
          />

          <List
            items={filteredItems}
            onDeleteItem={this.handleDeleteItem}
          />
        </div>
        <Map coordinates={coordinates} />
      </div>
    );
  }
};

export default App;
