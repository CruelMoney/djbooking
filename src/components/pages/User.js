import React,  { PropTypes } from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import UserHeader from '../blocks/UserHeader'
import without from 'lodash.without'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../../css/transitions.css'

var user = React.createClass({


  propTypes: {
    profile: PropTypes.object,
  },

  childContextTypes: {
      hideUserCard: PropTypes.func,
      showUserCard: PropTypes.func,
  },

  getChildContext() {
   return {
     hideUserCard: this.hideUserCard,
     showUserCard: this.showUserCard
    }
  },

  getInitialState() {
    return {
      showUserCard: true
    }
  },


  hideUserCard(){
    this.setState({
      showUserCard: false
    })
  },
  showUserCard(){
    this.setState({
      showUserCard: true
    })
  },

  render() {
    return (
      <div>
        <UserHeader
          profile={this.props.profile}
          hideInfo={!this.state.showUserCard}
        />

        <div  className="container">
        <div className="row">
          <div className={this.state.showUserCard ? "col-xs-4" : ""}></div>
          <div style={{paddingTop:"11px"}} className={this.state.showUserCard ? "col-xs-8" : ""}>
            {this.props.children}
          </div>
        </div>
        </div>
      </div>)

  }
})


var styledUser = Radium(user)
export default muiThemeable()(styledUser)
