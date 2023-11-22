import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { IoMdRefresh } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";


class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editedTitle: props.todoTitle,
      editedDescription: props.todoDescription,
    };
  }

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleSaveClick = () => {
    const { id, handleCommit } = this.props;
    const { editedTitle, editedDescription } = this.state;

    // Save the edited values
    handleCommit(id, editedTitle, editedDescription);

    // Exit edit mode
    this.setState({ isEditing: false });
  };

  render() {
    const { todoTitle, todoDescription, handleDeleteTodo, id, isCompletedScreen } = this.props;
    const { isEditing, editedTitle, editedDescription } = this.state;

    return (
      <div className="todo-list-item">
        <div>
          {isEditing ? (
            <div className="int">
              <input
              id="pen"
                type="text"
                value={editedTitle}
                onChange={(e) => this.setState({ editedTitle: e.target.value })}
              />
              <textarea
              id="pen"
                value={editedDescription}
                onChange={(e) => this.setState({ editedDescription: e.target.value })}
              />
            </div>
          ) : (
            <div>
              <FaPen onClick={this.handleEditClick} title="Edit" className="icon" />
              <h3>{todoTitle}</h3>
              <p>{todoDescription}</p>
            </div>
          )}
        </div>
        <div>
          <AiOutlineDelete id="dele" onClick={() => handleDeleteTodo(id)} title="Delete?" className="icon" />

          {isCompletedScreen ? (
            <IoMdRefresh className="icon" onClick={this.handleSaveClick} />
          ) : (
            <div>
              {isEditing && (
              
                <MdSaveAlt id="save" onClick={this.handleSaveClick} className="save-button" />

              )}
              <BsCheckLg onClick={this.handleSaveClick} title="Completed?" className="check-icon" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TodoItem;
