import React, {PropTypes} from 'react'

class ErrorMessage extends React.Component {
  static contextTypes = {
    errorMessage: PropTypes.string,
  }

  render() {
    const msg = 
      this.context.errorMessage && this.context.errorMessage.message ? 
      this.context.errorMessage.message : 
      this.context.errorMessage;

    return (
    <div className={"errors" + (this.props.center ? " center " : "" )}>
      <p>{msg ? msg : ""}</p>
    </div>)
  }
}

export default ErrorMessage
