import React, {PropTypes} from 'react';
import Panda from '../../assets/SadPanda.svg'

class EmptyPage extends React.Component {
  render() {
    return(
    <div className="empty-page-message">
      <h2>{this.props.title ? this.props.title : "Looks like there's nothing here"}</h2>
      <img src={Panda} alt="sad panda"></img>
      <p>
        {this.props.message}
      </p>
    </div>)
  }
}

export default EmptyPage;
