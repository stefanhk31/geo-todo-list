import React from 'react'
import ListItem from './list-item/ListItem';

export default function List(props) {
  const list = [];



  for (let key in props.items) {    
   const distance = props.items[key][0]["distance"];
   
    list.push((
      <li className={`list__item ${(distance > props.filterDist)? "hidden" : "" }`} key={key}>
        <h5 className="list-item__heading">{ key.toUpperCase() }</h5>
        <ul className="list">
          {
            props.items[key].map(item => (
              <ListItem
                classes="list__item--child"
                key={item.key}
                item={item}
                onDeleteItem={props.onDeleteItem}
              />
            ))
          }
        </ul>
      </li>
    ));
  }

  return (
    <ul className="list list--parent">
      { list }
    </ul>
  )
}
