import React, { PropTypes } from 'react'
import Radium from 'radium'
import Button from '../common/Button'
import TextWrapper from '../common/TextElement'
import Gig from '../../containers/Gig'


import muiThemeable from 'material-ui/styles/muiThemeable'


var Gigs = React.createClass({
  propTypes: {
    gigs: PropTypes.arrayOf(PropTypes.object),
    fetchGigs: PropTypes.func,
  },

  contextTypes: {
    registerActions: PropTypes.func,
  },

  getInitialState(){
    return{
      gigs: []
    }
  },

  componentWillMount() {
    if (this.props.gigs !== undefined) {
      this.setState({
        gigs: this.props.gigs
      })
    }

    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons(this.props))
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.gigs !== undefined) {
    this.setState({
      gigs: nextprops.gigs
    })
  }
    this.removeActionsFromContext()
    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons(nextprops))
  },

  componentWillUnmount() {
    this.removeActionsFromContext()
  },

  getActionButtons(props = this.props){
    return (
    <div
      className="action-buttons"
      key="profile_actions">
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Requested gigs"

          onClick={this.props.fetchGigs}
        />
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Upcoming gigs"

          onClick={this.props.fetchGigs}
        />
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Lost gigs"

          onClick={this.props.fetchGigs}
        />
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Finished gigs"

          onClick={this.props.fetchGigs}
        />
      </div>


      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Request features"
          name="request_features"
        />
      </div>

    </div>

    )
  },

  render() {



    var finishedGigs = []
    var lostGigs = []
    var requestedGigs = []
    var upcomingGigs = []

    this.state.gigs.forEach(function(gig, i) {
      switch (gig.status) {

        case 'PLAYED':
          finishedGigs.push(<Gig gig={gig}/>)
          break
        case 'ACCEPTED':
          requestedGigs.push(<Gig gig={gig}/>)
          break
        case 'CONFIRMED':
          upcomingGigs.push(<Gig gig={gig}/>)
          break
        case 'REQUESTED':
          requestedGigs.push(<Gig gig={gig}/>)
          break
        case 'LOST':
          lostGigs.push(<Gig gig={gig}/>)
          break
        default:

      }
    })


    return(
      <div>
        {this.getActionButtons()}
        <TextWrapper
          center={true}
          label="Upcoming Gigs">
          {upcomingGigs}
        </TextWrapper>
        <TextWrapper
          center={true}
          label="Requested Gigs">
          {requestedGigs}
        </TextWrapper>
        <TextWrapper
          center={true}
          label="Lost Gigs">
          {lostGigs}
        </TextWrapper>
        <TextWrapper
          center={true}
          label="Finished Gigs">
          {finishedGigs}
        </TextWrapper>
      </div>)

  }
})

var styledGigs = Radium(Gigs)
export default muiThemeable()(styledGigs)
