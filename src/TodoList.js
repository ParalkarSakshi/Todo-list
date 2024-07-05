import React, { Component } from 'react';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      value: '',
      edit: false,
      currentTodo: null,
    };
  }

  Changes = (e) => {
    this.setState({ value: e.target.value });
  };

  AddTask = (e) => {
    e.preventDefault();
    const { value, todos } = this.state;
    if (value.trim()) {
      const newTodo = { id: Date.now(), text: value };
      const updatedTodos = todos.concat(newTodo);
      this.setState({
        todos: updatedTodos,
        value: '',
      });
    }
  };

  UpdateTask = (e) => {
    e.preventDefault();
    const { value, todos, currentTodo } = this.state;
    if (value.trim()) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === currentTodo.id) {
          return { id: todo.id, text: value };
        }
        return todo;
      });
      this.setState({
        todos: updatedTodos,
        value: '',
        edit: false,
        currentTodo: null,
      });
    }
  };

  Edit = (todo) => {
    this.setState({ value: todo.text, edit: true, currentTodo: todo });
  };

  Delete = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedTodos });
  };

  render() {
    const { todos, value, edit } = this.state;
    return (
      <div className="todo-container">
        <h1>Todo List</h1>

        <form className="todo-form" onSubmit={edit ? this.UpdateTask : this.AddTask}>
          <input type="text" value={value} onChange={this.Changes} placeholder={edit ? 'Update task' : 'Add a new task'}/>
          <button type="submit">{edit ? 'Update task' : 'Add task'}</button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <div>
                <button className="edit-button" onClick={() => this.Edit(todo)}>Edit</button>
                <button className="delete-button" onClick={() => this.Delete(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default TodoList;