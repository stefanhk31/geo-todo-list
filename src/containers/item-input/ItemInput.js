import React, { Component } from 'react'

export default class ItemInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        text: '',
        location: '',
      },
      isValid: true,
    }
  }

  isValidItem = () => {
    return this.state.item.text !== '' && this.state.item.location !== '';
  }

  handleSubmit = (e) => {
    // Prevent form submission
    e.preventDefault();

    // make sure both fields are not empty
    if (this.isValidItem()) {
      // Add new item
      const item = {
        key: Date.now(),
        ...this.state.item
      };

      this.props.onAddItem(item);

      // reset state variables
      this.setState({
        item: {
          text: '',
          location: '',
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
    const options = this.props.locationKeys.map((location, index) => (
      <option key={index} value={location}>{ location }</option>
    ));

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

            <button type="submit">Add Task</button>
          </form>
          {
            !this.state.isValid && (
              <p className="error-message"><small>*Invalid entry. No empty fields.</small></p>
            )
          }
        </div>
        {/* Filter functionality
        <div className="list__filter">
          <label htmlFor="filter">Filter by location:</label>
          <select
            className="filter__select"
            name="filter"
            id="filter"
            value={this.props.filterKey}
            onChange={this.props.onFilterLocation}
          >
            <option value="All">Select a All</option>
            { options }
          </select>
        </div> */}
    </div>
    )
  }
}
