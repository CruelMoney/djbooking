import React, { PropTypes } from 'react'
import Button from '../../../../../components/common/Button-v2'
import Gig from './Gig'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import EmptyPage from '../../../../../components/common/EmptyPage'

/*eslint no-undef: 0*/

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
          olark('api.box.expand');
        }}
      >Request features</Button>

    </div>

    )
  },

  render() {

    var finishedGigs = []
    var lostGigs = []
    var requestedGigs = []
    var upcomingGigs = []
    var gigs = []

    this.state.gigs.forEach(function(gig, i) {
      // switch (gig.status) {
      //   case 'Finished':
      //     finishedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
      //     break
      //   case 'Accepted':
      //     requestedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
      //     break
      //   case 'Confirmed':
      //     upcomingGigs.push(<Gig key={gig.name+i} gig={gig}/>)
      //     break
      //   case 'Requested':
      //     requestedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
      //     break
      //   case 'Lost':
      //     lostGigs.push(<Gig key={gig.name+i} gig={gig}/>)
      //     break
      //   case 'Cancelled':
      //     lostGigs.push(<Gig key={gig.name+i} gig={gig}/>)
      //     break
      //   default:
        gigs.push(<Gig key={gig.name+i} gig={gig}/>)

    })

    const renderGigs = (gigs) => {
      if (gigs.length === 0) {
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
          <LoadingPlaceholder/>,
            <LoadingPlaceholder/>,
              <LoadingPlaceholder/>,
                <LoadingPlaceholder/>]
    }


    return(
      <div>

        {this.props.loading ?
          renderLoadingItem()
          :
            <div>
              {renderGigs(gigs)}
            </div>
        }



      </div>)

  }
})
import { connect } from 'react-redux'
import * as actions from '../../../../../actions/GigActions'


function mapStateToProps(state, ownProps) {
  return {
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