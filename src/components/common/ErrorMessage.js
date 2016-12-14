import React, {PropTypes} from 'react'

class ErrorMessage extends React.Component {
  static contextTypes = {
    errorMessage: PropTypes.string,
  }

  render() {
    console.log(this);
    return <div className="errors">
      <p>{this.context.errorMessage ? this.context.errorMessage : ""}</p>
    </div>
  }
}

export default ErrorMessage
