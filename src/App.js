import React, { Component } from 'react';
import Todo from './Todo';
import Store from './Store';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    Store.init();
    this.state = {
      todos: Store.getTodos()
    }
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }
  componentDidUpdate() {
    document.getElementsByClassName('App-type')[0].focus();
  }
  remove(id) {
    var todos = this.state.todos.filter(el=>el.id != id);
    Store.remove(id);
    this.setState({todos: todos})
  }
  add() {
    var todos = this.state.todos;
    var obj = {
      id: new Date().getTime(),
      name: this.refs.newTodo.value,
      complete: false
    };
    todos.push(obj);
    Store.add(obj);
    this.refs.newTodo.value = '';
    this.setState({todos: todos});
  }
  toggleComplete(id) {
    var todos = this.state.todos;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos[i]['complete'] = !todos[i]['complete'];
        break;
      }
    }
    Store.toggleComplete(id);
    this.setState({todos: todos});
  }
  clearCompleted() {
    var todos = this.state.todos.filter(el=>!el.complete);
    Store.removeComplete();
    this.setState({todos: todos});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo List</h1>
          <input autoFocus className="App-type" ref="newTodo" defaultValue={''}></input>
          <button className="App-button" onClick={this.add}>+</button>
          <button className="App-clear" onClick={this.clearCompleted}>Clear Completed</button>
        </header>

         { this.state.todos.map(el=>{
            return (<Todo key={el.id} id={el.id} complete={el.complete} onRemove={this.remove} onMarkComplete={this.toggleComplete}>{el.name}</Todo>);
          })}
      </div>
    );
  }
}

export default App;
