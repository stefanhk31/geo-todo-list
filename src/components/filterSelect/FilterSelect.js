import React from 'react'

export default function FilterSelect(props) {
  const options = props.locationKeys.map((location, index) => (
    <option key={index} value={location}>{ location.toUpperCase() }</option>
  ));

  return (
    <div className="list__filter">
      <label className="filter__label" htmlFor="filter">Filter by location:</label>
      <select
        className="filter__select"
        name="filter"
        id="filter"
        value={props.filterKey}
        onChange={props.onFilterLocation}
      >
        <option value="All">ALL TASKS</option>
        { options }
      </select>
    </div>
  )
}
