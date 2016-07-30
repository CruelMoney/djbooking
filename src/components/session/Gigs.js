import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import TextField from '../common/Textfield'
import TextWrapper from '../common/TextElement'
import c from '../../constants/constants'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import muiThemeable from 'material-ui/styles/muiThemeable'


var Preferences = React.createClass({
  propTypes: {
    gigs: PropTypes.arrayOf(PropTypes.object),
    fetchGigs: PropTypes.func,
    declineGig: PropTypes.func,
    acceptGig: PropTypes.func,
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
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          fontSize: '14px',
          height: 'initial',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          fontSize: '14px',
          height: 'initial',
          fontWeight: '300',

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
    var requestedGigs = []
    var upcomingGigs = []

    this.state.gigs.forEach(function(gig, i) {
      switch (gig.status) {

        case 'FINISHED':
          finishedGigs.push(renderGig(gig))
          break
        case 'ACCEPTED':
          upcomingGigs.push(renderGig(gig))
          break
        case 'CONFIRMED':
          upcomingGigs.push(renderGig(gig))
          break
        case 'REQUESTED':
          requestedGigs.push(renderGig(gig))
          break
        default:
         null
      }
    })

      function renderGig(gig){
        var genres = []
        {gig.genres.forEach(function(genre, i) {
           genres.push(<td style={{paddingRight:"10px"}}>{genre}</td>)}
        )}
        return (  <Card>
          <CardHeader
            title= {gig.name }
            subtitle={gig.location}
            actAsExpander={true}
            showExpandableButton={true}
            children={
              <div style={{width:'30%', textAlign:'right', marginRight:'35px', float:'right'}}>
                <p style={{margin:'0px'}}>{gig.date}</p>
                <p style={{opacity:'0.6'}}>{gig.startTime + " to " + gig.endTime}</p>
              </div>}

          />
          <div style={{width:'100%'}}
            expandable={true}
          >
            <div className="col-sm-8">
              <p> {gig.description} </p>

              <tr>{genres}</tr>
            </div>
            <div className="col-sm-4" style={{ paddingRight:'51px'}}>
              <p style={{textAlign:'right'}} >Around {gig.guests} guests</p>
              <p style={{textAlign:'right'}} >Speakers necessary: {gig.speakers}</p>
              <div style={{border:"1px solid #eee", padding: "4px"}}>
                <p style={{textAlign:'right'}} >{gig.contact.name}</p>
                <p style={{textAlign:'right'}} type="tel">{gig.contact.phone}</p>
                <p style={{textAlign:'right'}} type="email">{gig.contact.email}</p>
              </div>
            </div>
            <div>
              <div className="col-xs-12">
                <TextField
                  hintStyle={styles.medium.hint}
                  style = {styles.medium.textarea}
                  inputStyle = {styles.medium.input}
                  disabled={gig.status !== "REQUESTED"}
                  type = "number"
                  fullWidth={true}
                  placeholder="2.000 DKK"
                  underlineDisabledStyle={styles.plainBorder}
                  underlineStyle={styles.dottedBorderStyle}
                />
              </div>

              { gig.status === "REQUESTED" ?
                <div className="row">
                  <div className="col-xs-6">
                    <Button
                      rounded= {true}
                      label="Decline"
                      onClick= { () => this.props.declineGig(gig.ID)}
                    />
                  </div>
                  <div className="col-xs-6">
                    <Button
                      rounded= {true}
                      label="Accept"
                      onClick= { () => this.props.acceptGig(gig.ID, 3000)}
                    />
                  </div>
                </div> : null}
            </div>

          </div>

        </Card>)
      }



    return(
      <div>
        <TextWrapper
          label ="Requested Gigs">
          {requestedGigs}
        </TextWrapper>
        <TextWrapper
          label ="Upcoming Gigs">
          {upcomingGigs}
        </TextWrapper>
        <TextWrapper
          label ="Finished Gigs">
          {finishedGigs}
        </TextWrapper>
      </div>)

  }
})

var styledPreferences = Radium(Preferences)
export default muiThemeable()(styledPreferences)
