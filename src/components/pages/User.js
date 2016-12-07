import React,  { PropTypes } from 'react'
import UserHeader from '../blocks/UserHeader'
import Footer from '../blocks/Footer'

import '../../css/transitions.css'

var user = React.createClass({
  themeColor: "#25F4D2",
  secondColor: "#31DAFF",

  propTypes: {
    profile: PropTypes.object,
  },

  childContextTypes: {
      hideUserCard: PropTypes.func,
      showUserCard: PropTypes.func,
      registerActions: PropTypes.func,
      color: PropTypes.string
  },

  getChildContext() {
   return {
     hideUserCard: this.hideUserCard,
     showUserCard: this.showUserCard,
     registerActions: (actions)=>{this.setState({actions})},
     color:        this.themeColor
    }
  },

  getInitialState() {
    return {
      showUserCard: true,
      actions: []
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
      <div >
        <UserHeader
          profile={this.props.profile}
          hideInfo={!this.state.showUserCard}
          actions={this.state.actions}
        />

      <div  className="user-container container">
          <div className="row">
            <div className={"col-xs-4"}></div>
            <div style={{paddingTop:"11px"}} className={"col-xs-8"}>
              {this.props.children}
            </div>
          </div>
        </div>

        <Footer
          color={this.secondColor}
          firstTo="/"
          secondTo="/howitworks"
          firstLabel="Arrange event"
          secondLabel="How it works"
          title="Organizing yourself?"
          subTitle="Arrange event, or see how it works."
        />
      </div>
    )

  }
})


export default user
