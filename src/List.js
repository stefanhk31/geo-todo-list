import React, { Component } from 'react';

class List extends Component {

    render() {
        return (
            <div className="list-main">
                <div className="list-header">
                    <form onSubmit={this.props.addItem}>
                        <input placeholder="Task" name="Task" value={this.props.currentItem.text} onChange={this.props.handleInput} />
                        <input placeholder="Location" name="Location" value={this.props.currentItem.location} onChange={this.props.setLocation}/>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default List;