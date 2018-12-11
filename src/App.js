import React, { Component } from 'react';
import List from './List';
import Items from './Items';
import Map from './Map';
import './App.scss';

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

  setItem = e => {
    const itemText = e.target.value;
    const currentItem = {
      text: itemText,
      location: '',
      key: Date.now()
    }
    this.setState({
      currentItem: currentItem
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
        <List addItem={this.addItem} setItem={this.setItem} setLocation={this.setLocation} currentItem={this.state.currentItem}/>
        <Items items={this.state.items} deleteItem={this.deleteItem} />
        <Map />
      </div>
    );
  }
};

export default App;
