import React, { PropTypes } from 'react'
import Button from '../../../../../components/common/Button-v2'
import Gig from './Gig'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import EmptyPage from '../../../../../components/common/EmptyPage'
import {requestFeatures} from '../../../../../actions/Common'
import OfferCard from '../../../../Event/routes/Offers/components/OfferCard'
import Popup from '../../../../../components/common/Popup'
import Login from '../../../../../components/common/Login'

import m from '../../../../../constants/Mocks'

var Gigs = React.createClass({
  propTypes: {
    gigs: PropTypes.arrayOf(PropTypes.object),
    fetchGigs: PropTypes.func,
    loading: PropTypes.bool
  },
  contextTypes:{
    registerActions: PropTypes.func,
  },

  getInitialState(){
    return{
      gigs: [],
      filter: "requested",
      showPopup:false,
      loginPopup:true
    }
  },

  componentWillMount() {
    this.props.fetchGigs()
    this.context.registerActions(this.getActionButtons)
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.gigs !== undefined) {
    this.setState({
      gigs: nextprops.gigs
    })
  }
  },

  componentWillUnmount() {
    this.setState({
      gigs: []
    })
  },


    hidePopup(){
      this.setState({
        showPopup: false
      })
    },

  getActionButtons(props = this.props){
    return (
    <div
      className="context-actions"
      key="profile_actions">
      {/* <Button
        name="requested"
        active={this.state.filter === "requested"}
        onClick={()=>{
        this.setState({
        filter: "requested"
        })
        }}
        >Requested</Button>
        </div>
        <div style={{marginBottom:"4px"}}>
        <Button
        name="upcoming"
        active={this.state.filter === "upcoming"}
        onClick={()=>{
        this.setState({
        filter: "upcoming"
        })
        }}
        >Upcoming</Button>
        </div>
        <div style={{marginBottom:"4px"}}>
        <Button
        name="lost"
        active={this.state.filter === "lost"}
        onClick={()=>{
        this.setState({
        filter: "lost"
        })
        }}
        >Lost</Button>
        </div>
        <div style={{marginBottom:"4px"}}>
        <Button
        name="finished"
        active={this.state.filter === "finished"}
        onClick={()=>{n bvcføæ
        this.setState({
        filter: "finished"
        })
        }}
        >Finished</Button>
        </div>
      */}

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
  },

  render() {

    var gigs = []

    this.state.gigs.forEach(function(gig, i) {
      switch (gig.status) {
        case 'Finished':
          gigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Accepted':
           //Only show if still relevant
          if((gig.startTime.getTime() - Date.now()) > 0){
              gigs.push(<Gig key={gig.name+i} gig={gig}/>)
          }
          break
        case 'Confirmed':
          gigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Requested':
          //Only show if still relevant
          if((gig.startTime.getTime() - Date.now()) > 0){
              gigs.push(<Gig key={gig.name+i} gig={gig}/>)
          }
          break
        case 'Lost':
          //Only show if still relevant
          if((gig.startTime.getTime() - Date.now()) > 0){
              gigs.push(<Gig key={gig.name+i} gig={gig}/>)
          }
          break
        case 'Cancelled':
          gigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Declined':
            //Do not show
          break
        default:
           //Only show if still relevant
          if((gig.startTime.getTime() - Date.now()) > 0){
              gigs.push(<Gig key={gig.name+i} gig={gig}/>)
          }
      }
    })

    const renderGigs = (gigs) => {
      if (gigs.length === 0) {
        return <EmptyPage
          message={
            <div> No gigs<br/>
            You will get a notification when new gigs are available</div>
          }/>
      }else {
        return gigs.reverse()
      }
    }

    function renderLoadingItem(){
      return [
        <LoadingPlaceholder/>,
          <LoadingPlaceholder/>,
            <LoadingPlaceholder/>,
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
        {this.props.loading ?
          renderLoadingItem()
          :
            <div>
              {renderGigs(gigs)}
            </div>
        }
          {  
            !this.props.profile.user_id && !this.props.loading ? 
             <Popup
                showing={this.state.loginPopup}
                onClickOutside={()=>this.setState({loginPopup:false})}>
                <p>Login to see your gigs</p>
                <Login/>
              </Popup>
              :null
            }
        }



      </div>)

  }
})
import { connect } from 'react-redux'
import * as actions from '../../../../../actions/GigActions'


function mapStateToProps(state, ownProps) {
  return {
    profile: state.login.profile,
    gigs:  state.gigs.values,
    loading: state.gigs.isWaiting
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchGigs: () => { dispatch(actions.fetchGigs()) },
    acceptGig: (gigID, price) => {dispatch(actions.acceptGig(gigID, price))},
    declineGig: (gigID) => {dispatch(actions.declineGig(gigID))},
}}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {...stateProps, ...dispatchProps}
}
const SmartPreferences = connect(mapStateToProps, mapDispatchToProps,  mergeProps,{ pure: false })(Gigs)

export default props => (
    <SmartPreferences {...props}/>
)
