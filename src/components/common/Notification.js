import React from 'react'
import PropTypes from 'prop-types'


class Notification extends React.Component {
  //defining types
  props = {
    message: PropTypes.string,
  };
  // state: {
  //   display: 'static' | 'hover' | 'active';
  // };
  // onMouseEnter: () => void;
  // onMouseLeave: () => void;
  // onMouseDown: () => void;

  //defining defaults
  static defaultProps = { message: "You have no new notifications" };

  // state = {
  //   display: 'static',
  // }
  //
  //   setDisplay = (display) =>  {this.setState({display})}
  //
  //   onMouseEnter = () => this.setDisplay('hover');
  //   onMouseLeave = () => this.setDisplay('static');
  //   onMouseDown = () => this.setDisplay('active');


  render() {
    return (
      <div className="center">
        <div className="notification">
          <div>
            <p>{this.props.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Notification
