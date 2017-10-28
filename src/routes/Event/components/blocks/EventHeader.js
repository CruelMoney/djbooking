import React, {PropTypes} from 'react'
import Navlink from '../../../../components/common/Navlink'
import EventNavigation from './EventNavigation'
import Notification from '../../../../components/common/Notification'

var eventHeader = React.createClass({

  propTypes: {
    event: PropTypes.object,
    notification: PropTypes.string,
    loggedIn: PropTypes.bool
  },

   componentWillMount() {
     window.addEventListener('scroll', this.handleScroll)
   },

   componentWillUnmount(){
     window.removeEventListener('scroll', this.handleScroll)
     clearInterval(this.intervalID);

   },

   getInitialState(){
     return{loadString:"..."}
   },

  handleScroll(event){
   let scrollTop = event.srcElement.body.scrollTop
   if (scrollTop > 280) {
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
                textAlign: "center",
                alignItems: "center"
              }}
              className="row">

              {this.props.loggedIn ?
                <div className="back-button userNavigation">
                  <Navlink to={"/user/"+this.props.permaLink+"/events"} label="< Events"/>
                </div>
              :null}
              <div className="event-header-content col-sm-7">
                <div className="header-info">
                  <div className="user-name">
                    <h1>{this.props.loading || !this.props.event ? '' : "Welcome " + this.props.event.contactName }</h1>
                  </div>
                  <div className="user-location">
                    <h2>

                      {this.props.loading || !this.props.event ? ''  : "Event: " + this.props.event.name }
                    </h2>
                  </div>
                </div>

                <div className="header-divider"/>
                {this.props.loading || !this.props.event ? null :
                  <EventNavigation
                    paid={this.props.event.chosenOfferId !== 0}
                    hash={this.props.hash}
                    isFinished={this.props.event.status === "Finished"}
                    id={this.props.event.id}
                  />
                }
              </div>
            </div>
          </div>

        </header>



      )



  }
})

export default eventHeader
