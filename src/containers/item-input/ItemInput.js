import React, { Component } from 'react'

import apiServices from '../../api-services/apiServices';
import FilterSelect from '../../components/filterSelect/FilterSelect';

export default class ItemInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        text: '',
        location: '',
        address: '',
      },
      isValid: true,
    }
  }

  isValidItem = () => {
    return this.state.item.text.trim() !== '' && this.state.item.location.trim() !== '' && this.state.item.address.trim() !== '';
  }

  handleSubmit = (e) => {
    // Prevent form submission
    e.preventDefault();

    //geocode address using HERE Geocoder API
    apiServices.getGeocode(this.state.item.address)
      .then(geocode => {
        console.log('geocode', geocode);
      }).catch(error => {
        console.log('error', error);
      });

    // make sure both fields are not empty
    if (this.isValidItem()) {
      // Add new item
      const item = {
        key: Date.now(),
        text: this.state.item.text.trim().toLowerCase(),
        location: this.state.item.location.trim().toLowerCase(),
        address: this.state.item.address.trim().toLowerCase()
      };

      this.props.onAddItem(item);      

      // reset state variables
      this.setState({
        item: {
          text: '',
          location: '',
          address: ''
        },
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  }

  handleInput = (e) => {
    const item = { ...this.state.item };

    // update item property from input
    item[e.target.name] = e.target.value;

    this.setState({
      item,
    });
  }

  render() {
    return (
      <div className="list-main">
        <div className="list-header">
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Task"
              name="text"
              value={this.state.item.text}
              onChange={this.handleInput}
            />

            <input
              placeholder="Location"
              name="location"
              value={this.state.item.location}
              onChange={this.handleInput}
            />

            <input
              placeholder="Address"
              name="address"
              value={this.state.item.address}
              onChange={this.handleInput}
            />

            <button type="submit">Add Task</button>
          </form>
          {
            !this.state.isValid && (
              <p className="error-message"><small>*Invalid entry. No empty fields.</small></p>
            )
          }
        </div>

        <FilterSelect
          locationKeys={this.props.locationKeys}
          filterKey={this.props.filterKey}
          onFilterLocation={this.props.onFilterLocation}
        />
    </div>
    )
  }
}
