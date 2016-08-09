import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import TextField from '../common/Textfield'
import TextWrapper from '../common/TextElement'
import c from '../../constants/constants'
import Gig from '../../containers/Gig'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import muiThemeable from 'material-ui/styles/muiThemeable'


var Preferences = React.createClass({
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
    <div key="profile_actions">

      <div style={{marginBottom:"4px"}}>
        <Button
          rounded= {true}
          label="Load more gigs"
          active={true}
          onClick= {this.props.fetchGigs}
        />
      </div>



      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          rounded= {true}
          label="Request features"
          name="request_features"
        />
      </div>

    </div>

    )
  },

  render() {

    const styles ={
      medium:{
        textarea: {
          height: '40px',
          textAlign: 'center',
        },

        paragraph: {
          fontSize: '30px',
          textAlign: 'center',
        },

        input:{
          fontSize: '30px',
          height: 'initial',
          textAlign: 'center',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          fontSize: '30px',
          height: 'initial',
          fontWeight: '300',
          textAlign: 'center',
          width: '100%'
        },

      },
       dottedBorderStyle: {
          borderTop: 'none rgba(0, 0, 0, 1)',
          borderRight: 'none rgba(0, 0, 0, 1)',
          borderBottom: '2px dotted rgba(0, 0, 0, 1) ',
          borderLeft: 'none rgba(0, 0, 0, 1)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          borderColor: 'rgba(0,0,0, 0.5)'
        },
        plainBorder:{
          borderTop: 'none rgb(224, 224, 224)',
          borderRight: 'none rgb(224, 224, 224)',
          borderBottom: '1px solid rgb(224, 224, 224)',
          borderLeft: 'none rgb(224, 224, 224)',
          borderImage: 'initial',
          bottom: '8px',
          boxSizing: 'content-box',
          margin: '0px',
          position: 'absolute',
          width: '100%',
          display: 'none',
        }
    }

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
         null
      }
    })


    return(
      <div>
        <TextWrapper
          center={true}
          label ="Upcoming Gigs">
          {upcomingGigs}
        </TextWrapper>
        <TextWrapper
          center={true}
          label ="Requested Gigs">
          {requestedGigs}
        </TextWrapper>
        <TextWrapper
          center={true}
          label ="Lost Gigs">
          {lostGigs}
        </TextWrapper>
        <TextWrapper
          center={true}
          label ="Finished Gigs">
          {finishedGigs}
        </TextWrapper>
      </div>)

  }
})

var styledPreferences = Radium(Preferences)
export default muiThemeable()(styledPreferences)
