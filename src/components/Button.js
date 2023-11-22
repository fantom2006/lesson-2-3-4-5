import React from "react";

class Button extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
      return (
        <div className="todo-input-item">
          <buton onClick={this.props.onCLick} className="primary-btn" type="button">
            
            Add
          </buton>
        </div>
      );
    
  }
}



export default Button;
