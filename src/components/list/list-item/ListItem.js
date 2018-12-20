import React from 'react'

export default function ListItem(props) {
  return (
    <li className="list-items">      
      <input
        type="checkbox"
        className="checkbox"
        onClick={() => props.onDeleteItem(props.item.key)}
      />
      { props.item.text }
    </li>
  )
}
