import React from 'react'

export default function Locations(props) {
  const locs = Object.values(props.items).map(item => item.location)
  const uniqueLocs = locs.filter((v, i) => locs.indexOf(v) === i)

    return (
    <ul className="locs">
        { uniqueLocs.length === 0 ? "No locations" : uniqueLocs }
      </ul>
    )
  }

