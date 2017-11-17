import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../../../components/common/Button-v2'
import Gig from './Gig'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import EmptyPage from '../../../../../components/common/EmptyPage'
import {requestFeatures} from '../../../../../actions/Common'
import OfferCard from '../../../../Event/routes/Offers/components/OfferCard'
import Popup from '../../../../../components/common/Popup'
import Login from '../../../../../components/common/Login'
import { connect } from 'react-redux'
import * as actions from '../../../../../actions/GigActions'


import m from '../../../../../constants/Mocks'

class Gigs extends Component{
  static propTypes = {
    gigs: PropTypes.arrayOf(PropTypes.object),
    fetchGigs: PropTypes.func,
    loading: PropTypes.bool
  }
  static contextTypes = {
    registerActions: PropTypes.func,
    isOwnProfile:   PropTypes.bool,
    loadingUser:    PropTypes.bool
  }

  state = {
      gigs: [],
      filter: "requested",
      showPopup:false,
      loginPopup:true
    }

  componentWillMount() {
    this.context.registerActions(this.getActionButtons)

    if(this.context.isOwnProfile && this.props.gigs && this.props.gigs.length === 0){
      this.props.fetchGigs(this.props.profile.user_id)
    }

  }

  componentWillReceiveProps(nextprops, nextContext){
    if(nextprops.gigs){
      this.setState({gigs:nextprops.gigs})
    }
    if(!this.context.isOwnProfile && nextContext.isOwnProfile){
      this.props.fetchGigs(nextprops.profile.user_id)
    }
  }

    hidePopup = () => {
      this.setState({
        showPopup: false
      })
    }

  getActionButtons = (props = this.props) => {
    return (
    <div
      className="context-actions"
      key="profile_actions">
      
      <Button
        name="request_features"
        onClick={()=>{
           requestFeatures()
        }}
      >Request features</Button>
          {this.props.profile.isDJ ?
              <Button
                onClick={()=>this.setState({showPopup:true})}
                name="public_profile"
              >See offer example
              </Button>
              : null}
    </div>

    )
  }

  render() {

    var gigs = []

    this.state.gigs.forEach((gig, i) => {
      let show = false;
      if((gig.startTime.valueOf() - Date.now()) > 0){
        show = true
      }

      switch (gig.status) {
        case 'Finished':
          show = true
          break
        case 'Confirmed':
          show = true
          break
        case 'Declined':
          //Do not show
          show = false
          break
        default:
          break
      }

      if(show){
        const notification = this.props.notifications.find(noti => {
          return String(noti.room) === String(gig.id);
        })
        gigs.push(<Gig 
          notification={notification}
          key={gig.name+i} 
          gig={gig}/>
          )
      }
    })

    const renderGigs = (gigs) => {
      if (gigs.length === 0 && !this.props.loading) {
        return <EmptyPage
          message={
            <div> No gigs<br/>
            You will get a notification when new gigs are available</div>
          }/>
      }else {
        return gigs
      }
    }

    function renderLoadingItem(){
      return [
        <LoadingPlaceholder/>,
        <LoadingPlaceholder/>]
    }

     var OfferMock = m.MockOffer
            if (this.props.profile.settings) {
              OfferMock.refundPercentage = this.props.profile.settings.refundPercentage
              OfferMock.cancelationDays = this.props.profile.settings.cancelationDays
              OfferMock.dj = this.props.profile
            }

    return(


      
      <div>
            {OfferMock.dj ?
              <Popup
                showing={this.state.showPopup}
                onClickOutside={this.hidePopup}>
                <div className="offer-example">
                  <OfferCard 
                  disabled
                  offer={OfferMock}/>
                </div>
              </Popup>
              : null}
              <div>
              {renderGigs(gigs)}
            </div>
        {this.props.loading ? 
          renderLoadingItem()
          :
            null
        }
          {  
            !this.props.profile.user_id && !this.context.loadingUser ? 
             <Popup
                showing={this.state.loginPopup}
                onClickOutside={()=>this.setState({loginPopup:false})}>
                <p>Login to see your gigs</p>
                <Login
                  redirect={false}
                />
              </Popup>
              :null
            }
        



      </div>)

  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.login.profile,
    gigs:  state.gigs.values,
    loading: state.gigs.isWaiting,
    notifications: state.notifications.data
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchGigs: (userID) => { dispatch(actions.fetchGigs(userID)) },
    //acceptGig: (gigID, price) => {dispatch(actions.//(gigID, price))},
    declineGig: (gigID) => {dispatch(actions.declineGig(gigID))},
}}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps, 
    ...dispatchProps,
}
}
const SmartPreferences = connect(mapStateToProps, mapDispatchToProps,  mergeProps,{ pure: false })(Gigs)

export default props => (
    <SmartPreferences {...props}/>
)
