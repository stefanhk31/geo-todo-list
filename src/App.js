import React, { Component } from 'react';
import List from './List';
import Items from './Items';
import Map from './Map';
import './App.scss';

//geolocation: (1) get user loc; (2) allow user to set loc--store spec locs in variables? (3) make spec locs conn to diff lists (4) make list render depending on which loc is obtained 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      }
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
      currentItem
    });
  }

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      console.log(newItem)
      const items = [...this.state.items, newItem]
      this.setState({   
        items: items,
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => 
      {
        return item.key !== key
      })
      this.setState({
        items: filteredItems
      })
  }

  render() {
    return (
      <div className="App">
        <List addItem={this.addItem} inputElement={this.inputElement} handleInput={this.handleInput} currentItem={this.state.currentItem}/>
        <Items items={this.state.items} deleteItem={this.deleteItem}/>
        <Map />
      </div>
    );
  }
};

export default App;
