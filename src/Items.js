import React, { Component } from 'react';

class Items extends Component {
    createTasks = item => {
        return (
        <li key={item.key}>      
            <input type="checkbox" className="checkbox" onClick={() => this.props.deleteItem(item.key)}/>
            {item.text}
        </li> 
        )
    }
    
    render() {
        const todoEntries = this.props.list.items; //why is this undefined????
        console.log(todoEntries)
        const listItems = todoEntries.map(this.createTasks)
        return (
        <ul className="list">
            {listItems}
        </ul>
        )
    }
}

export default Items;