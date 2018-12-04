import React, { Component } from 'react';
import List from './List';
import Items from './Items';
import Map from './Map';
import './App.scss';

//lists: (1) set up multiple lists; (2) make only one list visible based on location
//geolocation: (1) get user loc; (2) allow user to set loc--store spec locs in variables? (3) make spec locs conn to diff lists (4) make list render depending on which loc is obtained 

const initItem = {
  text: '',
  key: ''
};

const initList = {
  items: [],
  currentItem: initItem
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: initList
    }
    this.inputElement = React.createRef();
  }

  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = {
      text: itemText,
      key: Date.now()
    }
    this.setState({
      list: {
        currentItem: currentItem
      }
    });
  }

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.list.currentItem;
    console.log(newItem)
    if (newItem.text !== '') {
      const items = [...this.state.list.items, newItem]
      this.setState({
        list: {
          items: items,
          currentItem: initItem
        }
      })
    }
  }

  deleteItem = key => {
    const filteredItems = this.state.list.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      list: {
        items: filteredItems
      }
    })
  }

  render() {
    return (
      <div className="App">
        <List addItem={this.addItem} inputElement={this.inputElement} handleInput={this.handleInput} list={this.state.list} />
        <Items list={this.state.list} deleteItem={this.deleteItem} />
        <Map />
      </div>
    );
  }
};

export default App;
