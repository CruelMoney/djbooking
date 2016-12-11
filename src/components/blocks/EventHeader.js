import React, {PropTypes} from 'react'
import Navlink from '../common/Navlink'
import EventNavigation from './EventNavigation'
import Notification from '../common/Notification'

var eventHeader = React.createClass({

  propTypes: {
    profile: PropTypes.object,
    event: PropTypes.object,
    notification: PropTypes.string,
    loggedIn: PropTypes.bool
  },

   componentWillMount() {
     window.addEventListener('scroll', this.handleScroll)
   },

   componentWillUnmount(){
     window.removeEventListener('scroll', this.handleScroll)
   },

  handleScroll(event){
   let scrollTop = event.srcElement.body.scrollTop
   if (scrollTop > 260) {
     this.eventHeader.className =  "user-header fixed"
   }else{
     this.eventHeader.className = "user-header"
   }
  },

  render() {


    return (

        <header ref={ref=>this.eventHeader=ref}
          className="user-header">
          <div id="stripes" className="v2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Notification message={this.props.notification}/>


          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center"
              }}
              className="row">


              {this.props.loggedIn ?
                <div className="back-button userNavigation">
                  <Navlink to={"/events"} label="< Events"/>
                </div>
              :null}
              <div className="event-header-content col-xs-7">
                <div className="header-info">
                  <div className="user-name">
                    <h1>{"Welcome " + this.props.profile.firstName}</h1>
                  </div>
                  <div className="user-location">
                    <h2>

                      {"Event: " + (this.props.event ? this.props.event.name : "...")}
                    </h2>
                  </div>
                </div>

                <div className="header-divider"/>

                <EventNavigation
                  isFinished={this.props.event.status === "Finished"}
                  id={this.props.event.id}
                  auth0Id={this.props.profile.auth0Id}
                />

              </div>
            </div>
          </div>

        </header>



      )



  }
})

export default eventHeader
