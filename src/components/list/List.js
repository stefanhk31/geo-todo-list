import React from 'react'

import ListItem from './list-item/ListItem';

export default function List(props) {
  const list = props.items.length === 0 ? (
      <li>No tasks</li>
    ) : props.items.map(item => (
      <ListItem
        key={item.key}
        item={item}
        onDeleteItem={props.onDeleteItem}
      />
    ));

  return (
    <ul className="list">
      { list }
    </ul>
  )
}
