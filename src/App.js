import React, { Component } from 'react';

// Import components
import ItemInput from './containers/item-input/ItemInput';
import Map from './containers/map/Map';
import List from './components/list/List';
import Location from './components/location/Location'

const app_id = '25rKT2MgLyrJ93e8JHFe' 
const app_code = 'J8nLFDmQ2O7pg7GCv3fsKw' 

class App extends Component {
  constructor(props) {
    super(props);

    const initTasks = {
      home: Array(2).fill(null).map((item, index) => ({key: index + Math.random() * Math.random(), text: `Task ${index + 1}`, location: 'home'})),
      work: Array(2).fill(null).map((item, index) => ({key: index + Math.random() * Math.random(), text: `Task ${index + 1}`, location: 'work'})),
    };

    const initItem = {
      text: '',
      location: '',
      key: ''
    };

    this.state = {
      items: initTasks,
      currentItem: initItem,
      filterKey: 'All',
      coords: '0,0'
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

  handleDeleteItem = item => {
    const key = item.key
    const listItems = this.state.items[item.location].filter(item => item.key !== key)
    var allItems = this.state.items

    //set array of item.location to array that has filtered out the deleted item
    if (this.state.items.hasOwnProperty(item.location)) {
      allItems[item.location] = listItems
    }

    //delete the list if there are no more items
    if (allItems[item.location].length === 0) {
      delete allItems[item.location]
    }

    //update state with item deleted
    this.setState({
      items: allItems
    })
  
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
        {/* <Location /> */}
        <Map app_id={app_id} app_code={app_code} />
      </div>
    );
  }
};

export default App;
