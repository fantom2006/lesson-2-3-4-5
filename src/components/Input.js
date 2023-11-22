import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      value: props.value,
      description: props.description,
    };
  }
  render() {
    return (
      <div className="todo-input-item">
        <label>{this.state.name}:</label>
        <input
          value={this.props.value}
          onChange={(event) => {
            this.props.setValue(event.target.value);
          }}
          type="text"
          placeholder={this.state.description}
        />
      </div>
    );
  }
}

export default Input;

