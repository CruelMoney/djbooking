import React, {Component} from 'react'


class Notification extends Component {

  //defining defaults
  static defaultProps = { message: "You have no new notifications" };

  
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
