import React, { Component } from 'react';
import List from './List';
import Items from './Items';
import Map from './Map';
import './App.scss';

//How to convert "location" field in List.js to geocoded coordinates?

const initItem = {
  text: '',
  location: '',
  key: ''
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: initItem
    }
  }

  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = {
      text: itemText,
      key: Date.now()
    }
    this.setState({
      currentItem: currentItem
    });
  }

  setLocation = e => {
    const location = e.target.value;
      this.setState({
        currentItem: {
          location: location
        }
      })
    }

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: initItem
      })
    }
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems
    })
  }

  render() {
    return (
      <div className="App">
        <List addItem={this.addItem} inputTextElement={this.inputTextElement} inputLocElement={this.inputLocElement} handleInput={this.handleInput} currentItem={this.state.currentItem} location={this.state.location}/>
        <Items items={this.state.items} deleteItem={this.deleteItem} />
        <Map />
      </div>
    );
  }
};

export default App;
