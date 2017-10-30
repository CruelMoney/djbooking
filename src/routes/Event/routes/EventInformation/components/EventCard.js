import React, {Component} from 'react'
import Button from '../../../../../components/common/Button-v2'
import TextField from '../../../../../components/common/Textfield'
import TimeSlider from '../../../../../components/common/TimeSlider'
import TextBox from '../../../../../components/common/TextBox'
import wNumb from 'wnumb'
import Slider from '../../../../../components/common/Slider'
import Form from '../../../../../components/common/Form-v2'
import TextWrapper from '../../../../../components/common/TextElement'
import SubmitButton from '../../../../../components/common/SubmitButton'
import assign from 'lodash.assign'
import Map from '../../../../../components/common/Map'
import ToggleButtonHandler from '../../../../../components/common/ToggleButtonHandler'
import c from '../../../../../constants/constants'
import moment from 'moment'
import LocationSelector from '../../../../../components/common/LocationSelectorSimple'
import {connect} from 'react-redux';
import ErrorMessage from '../../../../../components/common/ErrorMessage'
import {requestFeatures} from '../../../../../actions/Common'
import RiderOptions from '../../../../../components/common/RiderOptions'
import * as actions from '../../../../../actions/EventActions'

class Event extends Component{

   state={startTime: 0, endTime: 0, editMode: false, formValid: false}

    componentWillMount() {
        document.title = this.props.event.name + " | Cueup"
        this.setState({guests: this.props.event.guestsCount})
    }

    mergeEventForm = (form, event) => {
        const updatedEvent = assign(event, form.values, {
            guestsCount: form.values.guests
                ? form.values.guests[0]
                : event.guestsCount
        })
        return updatedEvent;
    }

    updateEvent = (form, callback) => {
        this.props.updateEvent(this.mergeEventForm(form, this.props.event), callback)
    }

    submitReview = (form, callback) => {
        const review = assign(form.values, {eventId: this.props.event.id})
        this.props.reviewEvent(review, callback)
    }

    cancelEvent = (id, callback) => {
        this.props.cancelEvent(id, this.props.event.hashKey, callback)
    }

    render() {
        return (
          <div className="row event-information">
            <Form
              resetStatusOnSucces
              noError
              formInvalidCallback={()=>this.setState({formValid:false})}
              formValidCallback={()=>this.setState({formValid:true})}
              name="event-information-form">
              <div className="context-actions">
                <SubmitButton
                  active={this.state.formValid}

                  onClick={this.updateEvent}
                  name="update_event">
                Save changes</SubmitButton>
                <SubmitButton
                  dangerous={true}
                  warning="Are you sure you want to cancel the event?"
                  onClick={(form, callback)=>this.cancelEvent(this.props.event.id, callback)}
                  name="cancel_event">
                Cancel event</SubmitButton>
                <Button
                  onClick={()=>requestFeatures()}

                  name="request_features">
                Request features</Button>
                <ErrorMessage/>
              </div>
              <div className="event-card-wrapper">
                <div className="card col-md-7">
                  <TextWrapper
                    label="Event name"
                    text="Please choose a descriptive name.">
                    <TextField
                      name="name"
                      value={this.props.event.name}
                      validate={['required']}
                    />
                  </TextWrapper>
                  <TextWrapper
                    label="Event date"
                    text="If the date of the event has changed, either cancel this event and create a new, or consult the dj.">
                    <TextField
                      name="date"
                      disabled
                      value={moment(this.props.event.startTime).format("dddd Do, MMMM YYYY")}
                    />
                  </TextWrapper>

                  <TextWrapper
                    label="Event location"
                    text="In what city is the event?">
                    <LocationSelector
                      name="location"
                      disabled
                      value={this.props.event.location.name}
                      validate={['required']}
                    />
                    <Map
                      height="315px"
                      name="location"
                      value={this.props.event.location}
                      radius={0}
                      disabled
                      zoom={11}
                    />
                  </TextWrapper>

                  <TextWrapper
                    label="Genres"
                    text="What kind of music do you need?">
                    <ToggleButtonHandler
                      validate={['required']}
                      name="genres"
                      disabled
                      value={this.props.event.genres}
                      potentialValues={c.GENRES}
                      columns={3} />
                  </TextWrapper>
                  <TextWrapper
                    label="Speakers & Light"
                    text="Do you need speakers and lights for the event?">
                    <RiderOptions 
                      value={this.props.event.rider}
                      name="rider"/>
                  </TextWrapper>
                  <TextWrapper
                    label="Duration"
                    text="How much time should the dj play?">
                    <TimeSlider
                      disabled
                      date={moment(this.props.event.startTime)}
                      startTime={this.props.event.startTime}
                      endTime={this.props.event.endTime}
                    />
                  </TextWrapper>


                  <TextWrapper
                    label="People"
                    text="How many people do you expect at the event?">
                    <Slider
                      name="guests"
                      range={{
                        'min':   1 ,
                        '50%':   100 ,
                        '80%':   500 ,
                        'max':  1000 
                      }}
                      step={1}
                      connect="lower"
                      value={[this.props.event.guestsCount]}
                      onChange={(values) => this.setState({
                          guests: values[0]
                      })}
                      format={ wNumb({
                          decimals: 0,
                      })}
                    />
                    <p style={{marginTop:"15px"}}>
                    {this.state.guests === "1000" ? "Over " : "Around "} <span>{this.state.guests} people </span>attending the event.</p>

                  </TextWrapper>

                  <TextWrapper
                    label="Description"
                    text={"Please tell about your event. \n" +
                      "What kind of venue is it, what is the age of the guests? \n" +
                      "Do you have any special requirements? \n" +
                    "What is the budget?"}>
                    <TextBox
                      height="110px"
                      placeholder={"Please tell about your event. \n" +
                        "What kind of venue is it, what is the age of the guests? \n" +
                        "Do you have any special requirements? \n" +
                      "What is the budget?"}
                      name="description"
                      value={this.props.event.description}
                      validate={['required']}
                    />
                  </TextWrapper>

                </div>
              </div>
            </Form>

          </div>


        )
    }
  }


function mapStateToProps(state, ownProps) {
  return {
    event:  state.events.values[0],
    profile: state.login.profile
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateEvent: (event, callback) => dispatch(actions.updateEvent(event,callback)),
    cancelEvent: (id, hash, callback) => dispatch(actions.cancelEvent(id, hash, callback)),
}}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
