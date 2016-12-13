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

  componentWillReceiveProps(nextProps){

    if (!nextProps.profile.email_verified) {
      this.setState({notification:"You won't receive any gigs before you confirm your email-address."})
      return
    }
    if (nextProps.profile.picture && nextProps.profile.picture.indexOf("default-profile-pic.png") !== -1) {
      this.setState({notification:"You should change your profile picture."})
      return
    }
    this.setState({notification:"You don't have any new notifications."})

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
          notification={this.state.notification}
          loading={this.props.loading}
        />

        <div  className="user-container container">
          <div className="row">
            <div className={"col-xs-4"}></div>
            <div style={{paddingTop:"11px", minHeight: "640px"}} className={"col-xs-8"}>
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
