import React from "react";
import "./App.css";

import Input from "./components/Input";
import Button from "./components/Button";
import Switcher from "./components/Switcher";
import TodoItem from "./components/TodoItem";
import Clear from "./components/Clear";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allTodos: [],
      completedTodos: [],
      newDescription: "",
      newTodoTitle: "",
      isCompletedScreen: false,
    };
  }

  fetchTodos = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  componentDidMount() {
    this.fetchTodos();
  }

  handleAddNewTodo = () => {
    if (this.state.newDescription && this.state.newTodoTitle) {
      const date = new Date();
      let newTodoObj = {
        id: date.getMilliseconds(),
        title: this.state.newTodoTitle,
        description: this.state.newDescription,
      };

      let updatedTodoArr = [...this.state.allTodos];
      updatedTodoArr.push(newTodoObj);

      this.setState({
        allTodos: updatedTodoArr,
      });
      this.setState({
        newDescription: "",
        newTodoTitle: "",
      });
    }
  };

  handleCommit = (index) => {
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let minutes = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = dd + "-" + mm + "-" + yyyy + "-" + " at" + hh + ":" + minutes + ":" + ss;

    let filteredTodo = {
      ...this.state.allTodos.find((item) => item.id === index),
      completed_at: finalDate,
    };

    let updatedList = [...this.state.completedTodos, filteredTodo];

    this.setState({
      completedTodos: updatedList,
    });
    this.handleDeleteTodo(index);
  };

  handleToDo = (index) => {
    let todo = {
      ...this.state.completedTodos.find((item) => item.id === index),
    };
    this.setState({
      allTodos: [...this.state.allTodos, todo],
    });

    this.handleDeleteCompletedTodo(index);
  };

  handleDeleteTodo = (id) => {
    console.log('ttt');
    this.setState({
      allTodos: this.state.allTodos.filter((item, index) => item.id !== id),
    });
  };
  handleDeleteCompletedTodo = (id) => {
    this.setState({
      completedTodos: this.state.completedTodos.filter((item, index) => item.id !== id),
    });
  };

  handleClear = () => {
    this.setState({
      allTodos: [],
    });
  };

  handleChangeNewTodoTitle = (value) => {
    this.setState({
      newTodoTitle: value,
    });
  };
  handleChangeNewDescription = (value) => {
    this.setState({
      newDescription: value,
    });
  };

  handleChangeCompleted = (value) => {
    this.setState({
      isCompletedScreen: value,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>My Todos</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <Input
              value={this.state.newTodoTitle}
              setValue={this.handleChangeNewTodoTitle}
              name={"Title"}
              description={"What's the title of your To Do?"}
            />
            <Input
              value={this.state.newDescription}
              setValue={this.handleChangeNewDescription}
              name={"Description"}
              description={"What's the description of your To Do?"}
            />
            <Button onCLick={this.handleAddNewTodo} />
          </div>
          <div className="clear-wrapper">
            <Clear handleClear={this.handleClear} />
            <Switcher
              isCompletedScreen={this.state.isCompletedScreen}
              setIsCompletedScreen={this.handleChangeCompleted}
            />
          </div>
          <div className="todo-list">
            {this.state.isCompletedScreen === true
              ? this.state.completedTodos?.map((item, index) => (
                  <TodoItem
                    handleCommit={this.handleToDo}
                    key={index}
                    index={index}
                    handleDeleteTodo={this.handleDeleteCompletedTodo}
                    id={item.id}
                    isCompletedScreen={this.state.isCompletedScreen}
                    todoTitle={item.title}
                    todoDescription={item.description}
                  />
                ))
              : this.state.allTodos.map((item, index) => (
                  <TodoItem
                    handleCommit={this.handleCommit}
                    key={index}
                    index={index}
                    handleDeleteTodo={this.handleDeleteTodo}
                    isCompletedScreen={this.state.isCompletedScreen}
                    id={item.id}
                    todoTitle={item.title}
                    todoDescription={item.description}
                  />
                ))}
        
          </div>
        </div>
      </div>
    );
  }
}

export default App;
