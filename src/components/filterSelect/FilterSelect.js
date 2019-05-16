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
        onChange={props.onFilterTaskLocations}
      >
        <option value="All">ALL TASKS</option>
        { options }
      </select>

      <label className="filter__label" htmlFor="distance">Only show markers within&nbsp; 
      <select
        className="filter__select"
        name="distance"
        id="distance"
        value={props.filterDist}
        onChange={props.onFilterDistLocations}
      >
        <option value="99999"></option>       
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      &nbsp;miles</label>

    </div>
  )
}
