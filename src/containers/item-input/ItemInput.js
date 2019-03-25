import React, { Component } from 'react'

import apiServices from '../../api-services/apiServices';
import FilterSelect from '../../components/filterSelect/FilterSelect';

export default class ItemInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp_item: {
        address: '',
        location: '',
        text: '',
        coordinates: [],
      },
      isValid: true
    }
  }

  isValidItem = () => {
    return this.state.temp_item.text.trim() !== '' &&
      this.state.temp_item.location.trim() !== '' &&
      this.state.temp_item.address.trim() !== '';
  }

  handleSubmit = (e) => {
    // Prevent form submission
    e.preventDefault();

    // make sure fields are not empty
    if (this.isValidItem()) {
      // Add new item
      const temp_item = {
        ...this.state.temp_item,
        key: Date.now(),
        address: this.state.temp_item.address.trim().toLowerCase(),
        location: this.state.temp_item.location.trim().toLowerCase(),
        text: this.state.temp_item.text.trim().toLowerCase(),
      };

      // get coordinates from address entered using HERE Geocoder API
      apiServices.getCoordinates(temp_item.address)
        .then(coordinates => {
          // add coordinate to address get address coordinates from resulting JSON object
          temp_item.coordinates = coordinates;
          // add temp_item to list of tasks in parent
          this.props.onAddItem(temp_item);
        })
        .catch(error => {
          console.log(error.message);
          // could not get coordinates so just add temp_item with null coordinates
          this.props.onAddItem(temp_item);
        });

      // reset state variables of text, location, address
      this.setState({
        temp_item: {
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
    const temp_item = { ...this.state.temp_item };

    // update temp_item property from input
    temp_item[e.target.name] = e.target.value;

    this.setState({
      temp_item,
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
              value={this.state.temp_item.text}
              onChange={this.handleInput}
            />

            <input
              className="form-control mb-1"
              type="text"
              placeholder="Location (eg, Supermarket)"
              name="location"
              value={this.state.temp_item.location}
              onChange={this.handleInput}
            />

            <input
              className="form-control mb-1"
              type="text"
              placeholder="Address (eg 123 Fake Street, Knoxville, TN 37912)"
              name="address"
              value={this.state.temp_item.address}
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
          filterDist={this.props.filterDist}
          onFilterTaskLocations={this.props.onFilterTaskLocations}
          onFilterDistLocations={this.props.onFilterDistLocations}
        />
      </div>
    )
  }
}
