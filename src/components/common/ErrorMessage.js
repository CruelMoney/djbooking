import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ErrorMessage extends Component {
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

ErrorMessage.contextTypes = {
  errorMessage: PropTypes.string,
}


export default ErrorMessage
