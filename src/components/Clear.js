import React from "react";

class Clear extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.props.handleClear} className="clear">
        Clear
      </button>
    );
  }
}

export default Clear;
