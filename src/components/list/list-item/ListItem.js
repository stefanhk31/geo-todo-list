import React from 'react'

export default function ListItem(props) {
  return (
    <li className={`list-item ${props.classes}`}>      
      <input
        type="checkbox"
        className="list__item--child__checkbox"
        onClick={() => props.onDeleteItem(props.item)}
      />
      <span className="list__item--child__value">{ props.item.text }</span>
    </li>
  )
}
