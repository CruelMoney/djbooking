import React, { PropTypes } from 'react'
import Button from '../common/Button'
import TextField from '../common/Textfield'
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
import Form from '../../containers/Form-v2'
import OfferCard from './OfferCard'
import EventInfoCard from './EventInfoCard'
import Card from 'material-ui/Paper'
import TextWrapper from '../common/TextElement'
import ToggleButton from '../common/ToggleButton'
import SubmitButton from '../common/SubmitButton'
import ResetButton from '../common/ResetButton'
import assign from 'lodash.assign'
import ReviewForm from './ReviewForm'

import muiThemeable from 'material-ui/styles/muiThemeable'



var Event = React.createClass({
  propTypes: {
    updateEvent: PropTypes.func,
    reviewEvent: PropTypes.func,
    event: PropTypes.object,
    payEvent: PropTypes.func,
    cancelEvent: PropTypes.func,
    saveEventInfo: PropTypes.func
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

  componentWillMount(){
    this.setState({
      guests: this.props.event.guestsCount
    })
  },

  mergeEventForm(form, event){
    const updatedEvent = assign(event, form.values, {
             guestsCount: form.values.guests ? form.values.guests[0] : event.guestsCount
   })
   return updatedEvent;
  },

  updateEvent(form, callback) {
      this.props.updateEvent(this.mergeEventForm(form, this.props.event), callback)
  },

  submitReview(form, callback) {
      const review = assign(form.values, {eventId : this.props.event.id})
      this.props.reviewEvent(review, callback)
  },

  cancelEvent(form, callback) {
      this.props.cancelEvent(this.props.event.id, callback)
  },


  render() {
    const styles ={

      inline:{
        display: 'inline-block'
      },
      flex:{
        display: 'flex',
        alignItems: 'center'
      },
      large:{
        textarea: {
          height: '80px',
        },

        paragraph: {
          fontSize: '14px',
        },

        input:{
          fontSize: '24px',
          height: 'initial',
          color: this.props.muiTheme.palette.textColor,
          fontWeight: '300',
        },

        hint:{
          bottom: '20px',
          fontSize: '30px',
          fontWeight: '300',
        }
      },
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
          bottom: '20px',
          fontSize: '30px',
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
var offers = []
if (this.props.event.offers) {
  offers = this.props.event.offers.map(o=>
    <div className="col-sm-6">
    <OfferCard offer={o}/>
    </div>
  )
}

        return (
          <Card
            z-index={1}
            className="event">

            <div className="col-xs-4">
              <div className="event-info-card-wrapper">
                <EventInfoCard
                  cueupEvent={this.props.event}
                />
              </div>
            </div>
            <div className="col-xs-8">
              <div className="event-name">
                {this.props.event.name}
              </div>
              <div className="event-location">
                <svg
                  version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 466.583 466.582" style={{enableBackground: "new 0 0 466.583 466.582"}}>
                  <g>
                    <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
                  </g>
                </svg>
                {" " + this.props.event.location.name}
              </div>

              <CollapsibleContainer>










                <Collapsible
                  name="EventInfo"
                  label="Event Info"
                >
                  <Form
                    name={"event-info-" + this.props.event.id}
                  >
                    <TextWrapper
                      label="Event name"
                      text="Please choose a descriptive name.">
                      <TextField
                        defaultValue={this.props.event.name}
                        name="name"
                        disabled={!this.state.infoEditMode}
                        style={styles.medium.textarea}
                        inputStyle={styles.medium.input}
                        type="text"
                        validate={['required']}
                        fullWidth={false}
                        hintText="Event name"
                        underlineDisabledStyle={styles.plainBorder}
                        underlineStyle={styles.dottedBorderStyle}
                      />
                    </TextWrapper>
                    <TextWrapper
                      label="Description"
                      text="A good description results in more accurate offers.
                      What kind of event is this? What services do you need from the DJ?"
                    >
                      <TextBox
                        width="100%"
                        height="150px"
                        name="description"
                        disabled={!this.state.infoEditMode}
                        value={this.props.event.description}
                      />
                    </TextWrapper>
                    <TextWrapper
                      label="Guests"
                      text="How many guests do you expect to attend the event?"
                    >
                      <Slider
                        name="guests"
                        range={{min:0, max:100}}
                        step={1}
                        disabled={!this.state.infoEditMode}
                        connect="lower"
                        initialValues={[this.props.event.guestsCount]}
                        handleChange={(values) => this.setState({
                          guests: values[0]
                        })}
                        format={ wNumb({
                          decimals: 0,
                          thousand: ".",
                        })}
                      />
                      <p
                        style={{margin:"10px 0"}}
                      >{"Around " + this.state.guests + " people attending the event."}</p>
                    </TextWrapper>

                    <div
                      className="event-info-action-buttons"
                      key="event-info-actions">

                      {this.state.infoEditMode ?
                        <ResetButton
                          active={this.state.infoEditMode}
                          rounded={true}
                          label="Cancel changes"
                          onClick={()=>{this.setState({infoEditMode:false})}}
                          name="reset_event_info"/>
                        :
                      null}
                      {this.state.infoEditMode ?

                        <SubmitButton
                          active={this.state.infoEditMode}
                          rounded={true}
                          label="Save"
                          name="save_event_info"
                          onClick={this.updateEvent}
                        />
                        :
                        <Button
                          active={this.state.infoEditMode}
                          rounded={true}
                          label="Edit"
                          onClick={()=>{this.setState({infoEditMode:true})}}
                          name="edit_event_info"
                        />}


                      { this.state.infoEditMode ?
                        <SubmitButton
                          rounded={true}
                          onClick={this.cancelEvent}
                          label="Cancel event"
                          dangerous={true}
                          name="cancel_event"
                        />
                      : null }

                    </div>

                  </Form>
                </Collapsible>













                <Collapsible
                  name="DJRequirements"
                  label="DJ Requirements"
                >
                  <Form
                    name={"event-requirements-" + this.props.event.id}
                  >
                    <TextWrapper
                      label="Speakers"
                      text="Do you need the DJ to bring speakers for the event?"
                    >
                      <ToggleOptions
                        name="needSpeakers"
                        glued={true}
                        value={this.props.event.needSpeakers}
                        validate={['required']}
                        disabled={!this.state.requirementsEditMode}
                      >
                        <Button
                          name="YES"
                          label="Yes"
                        />

                        <Button
                          name="UNCERTAIN"
                          label="Uncertain"
                        />

                        <Button
                          name="NO"
                          label="No"
                        />
                      </ToggleOptions>
                    </TextWrapper>


                    <TextWrapper
                      label="Time"
                      text="When do you need the DJ to begin and stop playing?"
                    >
                      <TimeSlider
                        disabled={!this.state.requirementsEditMode}
                        date={moment(this.props.event.startTime)}
                        startTime={this.props.event.startTime}
                        endTime={this.props.event.endTime}

                      />
                    </TextWrapper>

                    <div className="event-info-action-buttons">


                      {this.state.requirementsEditMode ?
                        <ResetButton
                          active={this.state.requirementsEditMode}
                          rounded={true}
                          label="Cancel changes"
                          onClick={()=>{this.setState({requirementsEditMode:false})}}
                          name="reset_requirements"/>
                        :
                      null}
                      {this.state.requirementsEditMode ?

                        <SubmitButton
                          active={this.state.requirementsEditMode}
                          rounded={true}
                          label="Save"
                          name="save_requirements"
                          onClick={this.updateEvent}
                        />
                        :
                        <Button
                          active={this.state.requirementsEditMode}
                          rounded={true}
                          label="Edit"
                          onClick={()=>{this.setState({requirementsEditMode:true})}}
                          name="edit_requirements"
                        />}

                    </div>
                  </Form>


                </Collapsible>
















                {this.props.event.status === "Finished" ?
                  <Collapsible
                    name="EventReview"
                    label="Review"
                  >
                    <ReviewForm
                      name={"event-review-" + this.props.event.id}
                      dj={this.props.event.offers.find(e=>e.gigID === this.props.event.chosenOfferId).dj}
                      review={this.props.event.review}
                      submitReview={this.submitReview}
                    />
                  </Collapsible>
                  :
                  <Collapsible
                    name="EventOffers"
                    label="Offers"
                  >
                  <div>
                  <div className="row">
                      {offers}
                  </div>
                  </div>
                  </Collapsible>
                }

              </CollapsibleContainer>
            </div>

          </Card>

 )
      }




})

export default muiThemeable()(Event)
