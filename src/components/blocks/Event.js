import React, {PropTypes} from 'react'
import Button from '../common/Button-v2'
import TextField from '../common/Textfield'
import ToggleOptions from '../common/ToggleOptions'
import TimeSlider from '../common/TimeSlider'
import TextBox from '../common/TextBox'
import wNumb from 'wnumb'
import Slider from '../common/Slider'
import Form from '../../containers/Form-v2'
import TextWrapper from '../common/TextElement'
import SubmitButton from '../common/SubmitButton'
import ResetButton from '../common/ResetButton'
import assign from 'lodash.assign'
import Map from '../common/Map'
import ToggleButtonHandler from '../common/ToggleButtonHandler'
import c from '../../constants/constants'
import moment from 'moment'
import LocationSelector from '../common/LocationSelectorSimple'
import {connect} from 'react-redux';


var Event = React.createClass({
    propTypes: {
        updateEvent: PropTypes.func,
        event: PropTypes.object,
        cancelEvent: PropTypes.func,
    },

    getDefaultProps() {
        return {}
    },

    getInitialState() {
        return {startTime: 0, endTime: 0, editMode: false}
    },

    componentWillMount() {
        this.setState({guests: this.props.event.guestsCount})
    },

    mergeEventForm(form, event) {
        const updatedEvent = assign(event, form.values, {
            guestsCount: form.values.guests
                ? form.values.guests[0]
                : event.guestsCount
        })
        return updatedEvent;
    },

    updateEvent(form, callback) {
        this.props.updateEvent(this.mergeEventForm(form, this.props.event), callback)
    },

    submitReview(form, callback) {
        const review = assign(form.values, {eventId: this.props.event.id})
        this.props.reviewEvent(review, callback)
    },

    cancelEvent(id, callback) {
        this.props.cancelEvent(id, callback)
    },

    render() {


        return (
          <div className="row event-information">
            <Form
              name="event-information-form">
              <div className="context-actions">
                <SubmitButton
                  onClick={this.updateEvent}
                  name="update_event">
                Save changes</SubmitButton>
                <SubmitButton
                  dangerous={true}
                  onClick={(form, callback)=>this.cancelEvent(this.props.event.id, callback)}
                  name="cancel_event">
                Cancel event</SubmitButton>
                <Button
                  onClick={()=>console.log("not implemented")}
                  name="cancel_event">
                Request features</Button>
              </div>
              <div className="event-card-wrapper">
                <div className="card col-md-7">



                  <TextWrapper
                    label="Event name"
                    text="Please choose a descriptive name.">

                    <TextField
                      name="eventName"
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
                      value={this.props.event.genres}
                      potentialValues={c.GENRES}
                      columns={3} />
                  </TextWrapper>
                  <TextWrapper
                    label="Speakers"
                    text="Do you need speakers for the event?">

                    <ToggleOptions
                      name="speakers"
                      value={this.props.event.needSpeakers}
                      validate={['required']}
                    >
                      <Button
                        name="YES"
                      >Yes</Button>

                      <Button
                        name="UNCERTAIN"
                      >Uncertain</Button>

                      <Button
                        name="NO"
                      >No</Button>
                    </ToggleOptions>
                  </TextWrapper>




                  <TextWrapper
                    label="Duration"
                    text="How much time should the dj play?">
                    <TimeSlider
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
                      range={{min:0, max:100}}
                      step={1}
                      connect="lower"
                      value={[this.props.event.guestsCount]}
                      onChange={(values) => this.setState({
                              guests: values[0]
                      })}
                      format={ wNumb({
                              decimals: 0,
                              thousand: ".",
                      })}
                    />
                    <p style={{marginTop:"15px"}}>
                      Around <span>{this.state.guests} people </span>attending the event.</p>
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

})

import * as actions from '../../actions/EventActions'

function mapStateToProps(state, ownProps) {
  return {
    event:  state.events.values[0],
    profile: state.login.profile
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateEvent: (event, callback) => dispatch(actions.updateEvent(event,callback)),
    cancelEvent: (id, callback) => dispatch(actions.cancelEvent(id,callback)),
}}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
