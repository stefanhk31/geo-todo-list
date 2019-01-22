import React, { Component } from 'react'

import apiServices from '../../api-services/apiServices';
import FilterSelect from '../../components/filterSelect/FilterSelect';

export default class ItemInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        address: '', 
        location: '',
        text: '',
        coordinates: null,
      },
      isValid: true,
    }
  }

  isValidItem = () => {
    return this.state.item.text.trim() !== '' &&
           this.state.item.location.trim() !== '' &&
           this.state.item.address.trim() !== '';
  }

  handleSubmit = (e) => {
    // Prevent form submission
    e.preventDefault();

    // make sure fields are not empty
    if (this.isValidItem()) {
      // Add new item
      const item = {
        ...this.state.item,
        key: Date.now(),
        address: this.state.item.address.trim().toLowerCase(),
        location: this.state.item.location.trim().toLowerCase(),
        text: this.state.item.text.trim().toLowerCase(),
      };

      // get coordinate from address entered using HERE Geocoder API
      apiServices.getCoordinates(item.address)
        .then(coordinates => {
          // add coordinate to address get address coordinates from resulting JSON object
          item.coordinates = coordinates;

          // add item to list of tasks in parent
          this.props.onAddItem(item);
        })
        .catch(error => {
          console.log(error.message);
          // could not get coordinates so just add item with null coordinates
          this.props.onAddItem(item);
        });

      // reset state variables of text, location, address
      this.setState({
        item: {
          text: '',
          location: '',
          address: '',
          coordinates: [],
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
      <div className="list-input">
        <div className="list-header">
          <p><em>All fields required.</em></p>
          <form className="list-form" onSubmit={this.handleSubmit}>
            <input
              className="form-control mb-1"
              type="text"
              placeholder="Task (eg, Get Groceries)"
              name="text"
              value={this.state.item.text}
              onChange={this.handleInput}
            />

            <input
              className="form-control mb-1"
              type="text"
              placeholder="Location (eg, Supermarket)"
              name="location"
              value={this.state.item.location}
              onChange={this.handleInput}
            />

            <input
              className="form-control mb-1"
              type="text"
              placeholder="Address (eg 123 Fake Street, Knoxville, TN 37912)"
              name="address"
              value={this.state.item.address}
              onChange={this.handleInput}
            />

            <button type="submit" className="btn btn-secondary">Add Task</button>
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
          onFilterTaskLocations={this.props.onFilterTaskLocations}
        />
    </div>
    )
  }
}
