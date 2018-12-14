import React from 'react'

export default function ListItem(props) {
  return (
    <li>      
      <input
        type="checkbox"
        className="checkbox"
        onClick={() => props.onDeleteItem(props.item.key)}
      />

      { props.item.text } at {props.item.location}
    </li>
  )
}
