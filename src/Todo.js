import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removed: false
        }
        this.toggleComplete = this.toggleComplete.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    toggleComplete(id) {
        this.props.onMarkComplete(this.props.id);
    }

    removeItem() {
        this.setState({removed: true});
        window.setTimeout(()=>this.props.onRemove(this.props.id), 500)
    }

    render() {
        let checkClass = this.props.complete ? 'completed' : 'complete';
        let todoClass = this.props.complete ? 'todo todo-complete' : 'todo';
        todoClass += this.state.removed ? ' removed' : '';
        return (
          <div className={todoClass}>
            <div className="text-container">
                <p className="todo-text">{this.props.children}</p>
            </div>
            <div className="buttons">
                <button onClick={this.toggleComplete} className={checkClass}><strong>√</strong></button>
                <button onClick={this.removeItem} className="remove"><strong>x</strong></button>
            </div>
          </div>
        );
    }
}
