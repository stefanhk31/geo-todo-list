import React from 'react'
import ListItem from './list-item/ListItem';

export default function List(props) {
  const list = Object.entries(props.items)
    .map(item => {
      return (
        <li className="list__item" key={item[0]}>
          { item[0] }
          <ul className="list">
            { item[1].map((task) => (
              <ListItem
                key={task.key}
                item={task}
                onDeleteItem={props.onDeleteItem}
              />
            ))}
          </ul>
        </li>
      )
    });

  // const list = props.items.length === 0 ? (
  //     <li className="list-items">No tasks</li>
  //   ) : props.items.map(item => (
  //     <ListItem
  //       key={item.key}
  //       item={item}
  //       onDeleteItem={props.onDeleteItem}
  //     />
  //   ));

  return (
    <ul className="list">
      { list }
    </ul>
  )
}
