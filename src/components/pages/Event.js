import React,  { PropTypes } from 'react'
import EventHeader from '../blocks/EventHeader'
import Footer from '../blocks/Footer'
import LoadingPlaceholder from '../common/LoadingPlaceholder'


import '../../css/transitions.css'

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
      this.setState({notification:"You won't receive any offers before you confirm your email-address."})
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


export default event
