import React,  { PropTypes } from 'react'
import EventHeader from './blocks/EventHeader'
import Footer from '../../../components/common/Footer'
import LoadingPlaceholder from '../../../components/common/LoadingPlaceholder'


import '../../../css/transitions.css'

var event = React.createClass({
  themeColor: "#25F4D2",
  secondColor: "#31DAFF",

  propTypes: {
    fetchEvent: PropTypes.func,
    event: PropTypes.object,
    params: PropTypes.object,
    loading: PropTypes.bool
  },

  childContextTypes: {
      color: PropTypes.string
  },

  getInitialState(){
    return {notification: "You have no new notifications"}
  },

  componentWillMount(){
    this.props.fetchEvent(this.props.params.id, this.props.params.hash, null)
  },

  componentWillReceiveProps(nextProps){
    if (nextProps.event && !nextProps.event.emailVerified) {
      this.setState({notification:"You won't receive any offers before you confirm your email-address 🙄"})
    }else if(nextProps.event){
      this.setState({notification:
      nextProps.event.status === "Cancelled" ?
      "The event is cancelled ☹️"
      :nextProps.event.status === "Initial" ?
      "The event has been confirmed 😊"
      :nextProps.event.status === "Offering" ?
        nextProps.event.referredBy > 0 ?
        "Waiting on offer from the DJ 😊"
        : "Waiting on offers from DJs 😊"
      :nextProps.event.status === "NoMatches" ?
      "No DJs could be found 😮"
      :nextProps.event.status === "Accepted" ?
           nextProps.event.referredBy > 0 ?
          "The DJ has made an offer 😊"
          : "A DJ has made an offer 😊"
      :nextProps.event.status === "Confirmed" ?
      "The event has been paid & confirmed, get ready to rock 😁"
      :nextProps.event.status === "Finished" && nextProps.event.chosenOfferId === 0 ?
      "The event is finished ☺️"
      :nextProps.event.status === "Finished" ?
      "The event is finished, please leave a review ☺️"
    :"You have no new notifications"})
  }else{
    this.setState({notification
        :"You have no new notifications"})
  }
  },



  getChildContext() {
   return {
     color:        this.themeColor
    }
  },


  render() {

      function renderLoadingItem(){
        return [
          <LoadingPlaceholder/>,
            <LoadingPlaceholder/>,
              <LoadingPlaceholder/>,
                <LoadingPlaceholder/>,
                  <LoadingPlaceholder/>]
      }

    return (
      <div >
        <EventHeader
          event={this.props.event}
          notification={this.state.notification}
          loggedIn={this.props.loggedIn}
          permaLink={this.props.loggedIn ? this.props.profile.user_metadata.permaLink : ""}
          loading={this.props.loading}
          hash={this.props.params.hash}
        />

        <div  className="user-container container">
          <div className="row">
            <div style={{paddingTop:"11px"}} className={"col-xs-12"}>
              {this.props.loading || !this.props.event ?
                <div className="row">
                  <div className="col-xs-push-3 col-xs-7">
                    {renderLoadingItem()}
                  </div>
                </div>
              : this.props.children}
            </div>
          </div>
        </div>

        <Footer
          color={this.secondColor}
          firstTo="/"
          secondTo="/howitworks"
          firstLabel="Arrange event"
          secondLabel="How it works"
          title="Organizing a new event?"
          subTitle="Arrange event, or see how it works."
        />
      </div>
    )

  }
})


import { connect } from 'react-redux'
import * as actions from '../../../actions/EventActions'
import * as commonActions from '../../../actions/Common'

function mapStateToProps(state, ownProps) {
  return {
    event:  state.events.values[0],
    profile: state.login.profile,
    loading: state.events.isWaiting,
    loggedIn: state.login.status.signedIn
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchEvent: (id, hash, authId) => dispatch(actions.fetchEvent(id, hash, authId)),
    updateEvent: (event, callback) => dispatch(actions.updateEvent(event,callback)),
    payEvent: () => {console.log("not implemented")},
    reviewEvent: (review, callback) => dispatch(actions.reviewEvent(review,callback)),
    cancelEvent: (id, callback) => dispatch(actions.cancelEvent(id,callback)),
    registerMenuItem: (name, route) => dispatch(commonActions.registerMenuItem(name,route)),
    removeMenuItem: (name) => dispatch(commonActions.registerMenuItem(name))
}}

const SmartEvent = connect(mapStateToProps, mapDispatchToProps)(event)

export default props => (
    <SmartEvent {...props}/>
)
