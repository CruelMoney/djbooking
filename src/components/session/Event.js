import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import TextField from '../common/Textfield'
import TextWrapper from '../common/TextElement'
import ToggleOptions from '../common/ToggleOptions'
import ToggleButtonHandler from '../common/ToggleButtonHandler'
import LocationSelector from '../common/LocationSelectorSimple'
import c from '../../constants/constants'
import TimeSlider from '../common/TimeSlider'
import {CollapsibleContainer, Collapsible} from '../common/Collapsible'
import TextBox from '../common/TextBox'
import wNumb from 'wnumb'
import moment from 'moment'
import Slider from '../common/Slider'
import * as m from '../../constants/Mocks'
import Form from '../../containers/Form'
import without from 'lodash.without'
import OfferCard from './OfferCard'
import Paper from 'material-ui/Paper'

import muiThemeable from 'material-ui/styles/muiThemeable'


var Event = React.createClass({
  propTypes: {
    event: PropTypes.object,
    payEvent: PropTypes.func,
    updateEvent: PropTypes.func,
    cancelEvent: PropTypes.func,
    updateEventValue: PropTypes.func
  },

  getDefaultProps(){
    return{
    
    }
  },

  getInitialState(){
    return{
      startTime: 0,
      endTime: 0,
      editMode: false
    }
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
        {this.props.event.genres.forEach(function(genre, i) {
           genres.push(<td style={{paddingRight:"10px"}}>{genre}</td>)}
        )}
        return (
        <Paper zDepth={1} style={{padding:'50px'}}>
          <div className="row">

          <div className="col-sm-7">
          <CollapsibleContainer>

          <Collapsible
            name="EventInfo"
            label="Event Info"
            >
            <div>
            <Form
              onSubmit={()=>console.log("not implemented")}
              buttonText="Save"
              name={this.props.event.id + "EventInfo"}
              >
            <TextField
              name="date"
              disabled
              value={this.props.event.date}
              underlineDisabledStyle={styles.plainBorder}
              floatingLabelText="Event date"
              style={{marginTop:'-20px', height:'70px'}}
            />

            <TextField
              name="eventName"
              value={this.props.event.name}
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Event name"
              disabled={true}
              validate={['required']}
            />


            <LocationSelector
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Event location"
              value={this.props.event.location}
              name="location"
              validate={['required']}
            />
            <p style={{marginBottom:'30px'}}>Select the city in which your event will happen.</p>

            <TextField
              name="eventAddress"
              value={this.props.event.address}
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Event address"
              validate={['required']}
            />
            <p style={{marginBottom:'30px'}}>The full address for the this.props.event.</p>





            <h4 style={{textAlign:'center'}}>Guests</h4>
            <div style={{
              marginTop:'20px',
              marginBottom:'20px'
            }}>
              <Slider
                name="guests"
                range={{min:0, max:100}}
                step={1}
                connect= "lower"
                initialValues={[this.props.event.guests]}
                handleChange={(values) => this.setState({
                  guests: values[0]
                })}
                format={ wNumb({
                  decimals: 0,
                  thousand: ".",
                })}
              />
            </div>
            <p>{"Around " + (this.state.guests || this.props.event.guests) + " people attending the event."}</p>
            <h4 style={{textAlign:'center'}}>Description</h4>
            <p>{"Please write any additional information."}</p>

            <TextBox
              width="100%"
              height="120px"
              name="description"
              validate={['required']}
              value={this.props.event.description}
            />
            </Form>
            </div>

            </Collapsible>
            <Collapsible
              name="DJRequirements"
              label="DJ Requirements"
              >
              <Form
                onSubmit={()=>console.log("not implemented")}
                buttonText="Save"
                name={this.props.event.id + "DJRequirements"}
                >
              <h4 style={{textAlign:'center'}}>Select Genres</h4>
              <ToggleButtonHandler
                name="genres"
                potentialValues={c.GENRES}
                columns = {3}
                preToggled = {this.props.event.genres}
                />

              <h4 style={{textAlign:'center'}}>Do you need speakers?</h4>
              <ToggleOptions
                name="speakers"
                glued={true}
                validate={['required']}
                value={this.props.event.speakers}
              >
                <Button
                  name = "SPEAKERS_YES"
                  label =  "Yes"
                />

                <Button
                  name = "SPEAKERS_UNCERTAIN"
                  label =  "Uncertain"
                />

                <Button
                  name = "SPEAKERS_NO"
                  label =  "No"
                />
              </ToggleOptions>
              <h4 style={{textAlign:'center'}}>Time</h4>
              <div style={{
                marginTop:'20px',
                marginBottom:'20px'
              }}>
                <TimeSlider
                  minDate ={this.props.event.minDate}
                  maxDate ={this.props.event.maxDate}
                  onChange = {(values) => {
                    this.setState({
                      startTime: values[0],
                      endTime: values[1]
                    })}}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                <p>{"Start: " + moment(Number(this.state.startTime)).format("HH:mm")}</p>
                <p>{"Hours: " + moment(Number(this.state.endTime)).diff(moment(Number(this.state.startTime)))/60/60/1000 }</p>
                <p>{"End: " + moment(Number(this.state.endTime)).format("HH:mm")}</p>
              </div>
              </Form>
              </Collapsible>
          <Collapsible
            name="ContactInfo"
            label="Contact Info"
            >
            <Form
              onSubmit={()=>console.log("not implemented")}
              buttonText="Save"
              name={this.props.event.id + "ContactInfo"}
              >
            <TextField
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Your name"
              value={this.props.event.contact.name}
              name="name"
              validate={['required', 'lastName']}
            />
            <p style={{marginBottom:'30px'}}>Your full name.</p>

            <TextField
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Your email"
              value={this.props.event.contact.email}
              name="email"
              validate={['required', 'email']}
            />
            <p style={{marginBottom:'30px'}}>We only share your email with DJ's suitable to play at your event.</p>

            <TextField
              style={{marginTop:'-20px', height:'70px'}}
              floatingLabelText="Your phone number"
              value={this.props.event.contact.phone}
              name="phone"
              type="number"
              validate={['required']}
            />
            <p style={{marginBottom:'30px'}}>We only share your phone number with DJ's candidates.</p>
            </Form>
          </Collapsible>

          <Collapsible
            name="EventPayment"
            label="Payment"
            >
            <Form
              onSubmit={()=>console.log("not implemented")}
              buttonText="Pay"
              name={this.props.event.id + "Payment"}
              >
            <p style={{marginBottom:'30px'}}>Card number</p>
            <TextField
              style={{marginTop:'-20px', height:'70px'}}
              name="cardNumber"
              type="number"
              validate={['required']}
            />
            <div className="row">
            <div className="col-xs-4">
            <p style={{marginBottom:'30px'}}>Expires on</p>
            <TextField
              style={{marginTop:'-20px', height:'70px'}}
              name="expMonth"
              type="number"
              placeholder="MM"
              validate={['required']}
            />
            </div>
            <div className="col-xs-4">
            <p style={{marginBottom:'50px'}}></p>
            <TextField
              style={{marginTop:'-20px', height:'70px'}}
              name="expYear"
              type="number"
              placeholder="YYYY"
              validate={['required']}
            />
            </div>
            <div className="col-xs-4">
            <p style={{marginBottom:'30px'}}>Security code</p>
            <TextField
              style={{marginTop:'-20px', height:'70px'}}
              name="securityCode"
              type="number"
              validate={['required']}
            />
            </div>
            </div>
            </Form>
            </Collapsible>
          </CollapsibleContainer>
          </div>
          <div className="col-sm-5"  style={{right:'-70px'}}>
            {
              this.props.event.offers.map(function(offer){
              return <div
                        style={{marginTop:"40px", marginBottom:"40px", marginLeft:"40px"}}>
                        <OfferCard
                          dj={offer}
                          price={offer.price}/>
                      </div>
            })
            }

          </div>
          </div>
          </Paper>


 )
      }




})

export default muiThemeable()(Event)
