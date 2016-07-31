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
        return (  <Card
          style={{marginBottom: '20px',}}>
          <CardHeader
            style={{paddingLeft:'50px'}}
            title= {gig.name }
            subtitle={gig.location}
            actAsExpander={true}
            showExpandableButton={true}
            children={
              <div style={{width:'30%', textAlign:'right', paddingRight:'37px', float:'right'}}>
                <p style={{margin:'0px'}}>{gig.date}</p>
                <p style={{opacity:'0.6'}}>{gig.startTime + " to " + gig.endTime}</p>
              </div>}
          />
          <div
            style={{
              width:'100%',
              padding: '50px',
              paddingTop: '0px',
              paddingBottom: '20px',

            }}
            expandable={true}
          >
            <div className="row">
              <div className="col-sm-8">
                <tr style={{fontStyle:'italic'}}>{genres}</tr>

                <p style={{ marginTop: '20px'}}> {gig.description} </p>

              </div>
              <div className="col-sm-4" >
                <div style={{border:"1px solid #eee", padding: "4px"}}>
                  <p style={{textAlign:'right'}} >Around {gig.guests} guests</p>
                  <p style={{textAlign:'right'}} >Speakers necessary: {gig.speakers}</p>
                  <p style={{textAlign:'right'}} >{gig.contact.name}</p>
                  <p style={{textAlign:'right'}} type="tel">{gig.contact.phone}</p>
                  <p style={{textAlign:'right'}} type="email">{gig.contact.email}</p>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-xs-4 col-xs-offset-4"
                style={{marginBottom: '20px',marginTop: '20px'}}>
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


        </Card>)
      }



    return(
      <div>
        <TextWrapper
          center={true}
          label ="Requested Gigs">
          {requestedGigs}
        </TextWrapper>
        <TextWrapper
          center={true}
          label ="Upcoming Gigs">
          {upcomingGigs}
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
