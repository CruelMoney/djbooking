import React,  { Component } from 'react'
import PropTypes from 'prop-types'
import EventHeader from './blocks/EventHeader'
import Footer from '../../../components/common/Footer'
import LoadingPlaceholder from '../../../components/common/LoadingPlaceholder'
import {notificationService} from '../../../utils/NotificationService'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actions from '../../../actions/EventActions'
import * as commonActions from '../../../actions/Common'
import '../../../css/transitions.css'

class event extends Component{
  themeColor="#25F4D2"
  secondColor="#31DAFF"

  static childContextTypes = {
      color: PropTypes.string
  }

  state={
    notification: "You have no new notifications",
    redirected: false
  }

  componentWillMount(){
    const {event, fetchEvent, match} = this.props;
    !event && fetchEvent(match.params.id, match.params.hash, null);
  }

  goToOffers = () => {
    const {history} = this.props
    if(!this.state.redirected){
      let newPath = history.location.pathname.split('/');
      if(newPath.length > 4){
        newPath.pop()
      }
      newPath.push('offers');
      newPath = newPath.join('/');
      this.setState({
        redirected: true
      }, ()=>history.replace(newPath))
    } 
  }

  componentDidMount(){
    notificationService.init(this.props.customerId);
  }

  componentWillReceiveProps(nextProps){
    notificationService.init(nextProps.customerId);
    const { event, notifications } = nextProps
    if (event && !event.emailVerified) {
      this.setState({notification:"You won't receive any offers before you confirm your email-address 🙄"})
    }else if(event){
      
      if(event.offers && event.offers.some(offer => {
          return notifications.some(
            noti => {
              return String(noti.room) === String(offer.gigID)}
          )
        })){
        this.setState({
          notification: "You have unread messages in offers 📫"
        })
        this.goToOffers();
        return
      }

      this.setState({notification:
      event.status === "Cancelled" ?
      "The event is cancelled ☹️"
      :event.status === "Initial" ?
      "The event has been confirmed 😊"
      :event.status === "Offering" ?
        event.referredBy > 0 ?
        "Waiting on offer from the DJ 😊"
        : "Waiting on offers from DJs 😊"
      :event.status === "NoMatches" ?
      "No DJs could be found 😮"
      :event.status === "Accepted" ?
           event.referredBy > 0 ?
          "The DJ has made an offer 😊"
          : "A DJ has made an offer 😊"
      :event.status === "Confirmed" ?
      "The event has been paid & confirmed, get ready to rock 😁"
      :event.status === "Finished" && event.chosenOfferId === 0 ?
      "The event is finished ☺️"
      :event.status === "Finished" ?
      "The event is finished, please leave a review ☺️"
    :"You have no new notifications"})
  }else{
    this.setState({notification
        :"You have no new notifications"})
  }
  }

  getChildContext() {
   return {
     color:        this.themeColor
    }
  }


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
          hash={this.props.match.params.hash}
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
}




function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const theEvent = state.events.values.find(e => e.id === Number(id));
  return {
    event: theEvent,
    customerId: theEvent ? theEvent.auth0Id : null,
    profile: state.login.profile,
    loading: state.events.isWaiting,
    loggedIn: state.login.status.signedIn,
    notifications: state.notifications.data
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

const SmartEvent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(event)
)

export default props => (
    <SmartEvent {...props}/>
)
