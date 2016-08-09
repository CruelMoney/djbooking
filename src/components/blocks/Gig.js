import React, { PropTypes } from 'react'
import Radium from 'radium'
import Button from '../common/Button'
import TextField from 'material-ui/TextField'
import {Card, CardHeader} from 'material-ui/Card'

import muiThemeable from 'material-ui/styles/muiThemeable'


var Gig = React.createClass({
  propTypes: {
    gig: PropTypes.object,
    declineGig: PropTypes.func,
    acceptGig: PropTypes.func,
    updateGig: PropTypes.func
  },

  getInitialState(){
    return{
      price: 0
    }
  },


  componentWillMount() {
    if (this.props.gig.price !== undefined) {
      this.setState({
        price: this.props.gig.price
      })
    }
  },

  onChangePrice(event){
    this.setState({
      price: event.target.value
    })
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


      var genres = []
      {this.props.gig.genres.forEach(function(genre, i) {
         genres.push(<td style={{paddingRight:"10px"}}>{genre}</td>)}
      )}

    return (

      <Card
        initiallyExpanded={this.props.gig.status === "REQUESTED"}
        style={{marginBottom: '20px',}}>
        <CardHeader
          style={{paddingLeft:'50px'}}
          title= {this.props.gig.name }
          subtitle={this.props.gig.location}
          actAsExpander={true}
          showExpandableButton={true}
          children={
            <div style={{width:'30%', textAlign:'right', paddingRight:'37px', float:'right'}}>
              <p style={{margin:'0px'}}>{this.props.gig.date}</p>
              <p style={{opacity:'0.6'}}>{this.props.gig.startTime + " to " + this.props.gig.endTime}</p>
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

              <p style={{ marginTop: '20px'}}> {this.props.gig.description} </p>

            </div>
            <div className="col-sm-4" >
              <div style={{border:"1px solid #eee", padding: "4px", marginTop:'38px'}}>
                <p style={{textAlign:'right'}} >Around {this.props.gig.guests} guests</p>
                <p style={{textAlign:'right'}} >Speakers necessary: {this.props.gig.speakers}</p>
                <p style={{textAlign:'right'}} >{this.props.gig.contact.name}</p>
                <p style={{textAlign:'right'}} type="tel">{this.props.gig.contact.phone}</p>
                <p style={{textAlign:'right'}} type="email">{this.props.gig.contact.email}</p>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-xs-4 col-xs-offset-4"
              style={{marginBottom: '20px',marginTop: '20px'}}>
              <TextField
                onChange={this.onChangePrice}
                hintStyle={styles.medium.hint}
                style = {styles.medium.textarea}
                inputStyle = {styles.medium.input}
                disabled={this.props.gig.status === "LOST" || this.props.gig.status === "CONFIRMED" || this.props.gig.status === "PLAYED" }
                type = "number"
                fullWidth={true}
                defaultValue={this.props.gig.price}
              />
            </div>
          </div>

          { (this.props.gig.status === "REQUESTED" ||
            this.props.gig.status  === "ACCEPTED" ||
            this.props.gig.status  === "CONFIRMED")
            ?
              <div className="row">
                <div className="col-xs-6">
                  <Button
                    rounded= {true}
                    label="Decline"
                    onClick= { () => this.props.declineGig(this.props.gig.ID)}
                  />
                </div>
                {this.props.gig.status === "REQUESTED" ?
                  <div className="col-xs-6">
                    <Button
                      rounded= {true}
                      label="Offer gig"
                      onClick= { () => this.props.acceptGig(this.props.gig.ID, this.state.price)}
                    />
                  </div>
                  :
                  this.props.gig.status === "ACCEPTED" ?
                    <div className="col-xs-6">
                      <Button
                        rounded= {true}
                        label="Update price offer"
                        onClick= { () => this.props.updateGig(this.props.gig.ID, this.state.price)}
                      />
                    </div>
                  :
                  this.props.gig.status === "CONFIRMED" ?
                    <div className="col-xs-6">
                      Great! You have been chosen to play this gig.
                    </div>
                  :
                null}

              </div>
            :
            this.props.gig.status === "LOST" ?
              <div className="col-xs-12">
                Sorry you have lost this gig to another DJ. <br/>
                Next time try to set another price or be faster at responding. <br/>
                Adding info to your profile also helps the customer being comfortable in choosing you.
              </div>
            :

          null}
        </div>

      </Card>)

  }
})

var StyledGig = Radium(Gig)
export default muiThemeable()(StyledGig)
