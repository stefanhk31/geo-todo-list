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
        points: []
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

    // make sure fields are not empty
    if (this.isValidItem()) {
      // Add new item
      const item = {
        key: Date.now(),
        text: this.state.item.text.trim().toLowerCase(),
        location: this.state.item.location.trim().toLowerCase(),
        address: this.state.item.address.trim().toLowerCase(),
        points: this.state.item.points
      };

      this.props.onAddItem(item);

      //geocode address using HERE Geocoder API
      apiServices.getGeocode(this.state.item.address)
        .then(geocode => {
          // get address coordinates from resulting JSON object
          const coords = geocode.Response.View[0].Result[0].Location.DisplayPosition;

          // attach task name and location to coords object
          Object.defineProperty(coords, 'Text', {
            value: item.text,
            writable: true,
            enumerable: true,
            configurable: true
          })
          
          Object.defineProperty(coords, 'Location', {
            value: item.location,
            writable: true,
            enumerable: true,
            configurable: true
          })

          //add coords to points array
          let points = this.state.item.points;
          points.push(coords)

          //filter out duplicate coordinates
          points = points.filter((el, index, self) =>
            index === self.findIndex((x) => (
              x.Latitiude === el.Latitiude && x.Longitude === el.Longitude
            ))
          )

          //update state with new points, send points to parent App
          this.setState({
            points: points
          })
          this.props.coordsCallback(points)
        })
        .catch(error => {
          console.log('error', error);
        });

      // reset state variables of text, location, address
      this.setState({
        item: {
          text: '',
          location: '',
          address: '',
          points: this.state.item.points
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
