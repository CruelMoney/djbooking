import React, { PropTypes } from 'react'
import Button from '../common/Button-v2'
import TextField from '../common/Textfield'
import LocationSelector from '../common/LocationSelectorSimple'
import ToggleOptions from '../common/ToggleOptions'
import ToggleButtonHandler from '../common/ToggleButtonHandler'
import Form from '../../containers/Form-v2'
import Slider from '../common/Slider'
import TimeSlider from '../common/TimeSlider'
import Progress from '../blocks/ProgressSubmit'
import TextBox from '../common/TextBox'


import wNumb from 'wnumb'
import c from '../../constants/constants'

export default React.createClass({
  propTypes: {
    form: PropTypes.object,
    date: PropTypes.object, //moment object
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    checkEmail: PropTypes.func,
    emailExists: PropTypes.bool
  },

  getDefaultProps(){
    return{
      form:{values:{}}
    }
  },

  getInitialState(){
    return{
      showPopup: false,
      emailExists: false,
      guests: 50,
      step1Done: false,
      step2Done: false,
      step3Done: false
    }
  },


  onSubmit(form, callback){
    console.log(form);
    if (this.props.isLoggedIn){
      this.props.onSubmit(this.props.form.values, callback)
    }else{
      this.props.checkEmail(this.props.form.values.email, callback)
      this.setState({
        showPopup: true
      })
      }
  },

  hidePopup(){
    this.setState({
      showPopup: false
    })
  },

  updateProgress(name, finished){
    switch (name) {
      case "requestForm-step-1":
        this.setState({
          step1Done: finished
        })
      break;
      case "requestForm-step-2":
      this.setState({
        step2Done: finished
      })
        break;
      case "requestForm-step-3":
      this.setState({
        step3Done: finished
      })
        break;
      default:

    }
  },

  render() {
    const eventDateString = this.props.date.format("dddd Do, MMMM YYYY")

    return(
      <div className="request-form">
        <Form
          name="requestForm">

          <div className="request-columns">
          <div
            className="col-md-4">
            <div className="card">
              <Form
                formValidCallback={(name)=>this.updateProgress(name,true)}
                formInvalidCallback={(name)=>this.updateProgress(name,false)}
                name="requestForm-step-1">
              <section>
                <h4>Genres</h4>
                <ToggleButtonHandler
                  name="genres"
                  potentialValues={c.GENRES}
                  columns={3} />
              </section>
              <section>
                <h4>Speakers</h4>
                <ToggleOptions
                  name="speakers"
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
              </section>
            </Form>

              </div>
          </div>
          <div
            className="col-md-4">
            <div className="card">
              <Form
                formValidCallback={(name)=>this.updateProgress(name,true)}
                formInvalidCallback={(name)=>this.updateProgress(name,false)}
                name="requestForm-step-2">
                <section>
                  <h4>Event date</h4>
                  <TextField
                    name="date"
                    disabled
                    controlledValue={eventDateString}
                  />
                  <p>Select a new date in the calendar to change it.</p>
                  </section>
              <section>
                <h4>Duration</h4>

                  <TimeSlider
                    date={this.props.date}
                  />
                </section>


              <section>
                <h4>People</h4>
                <div>
                  <Slider
                    name="guests"
                    range={{min:0, max:100}}
                    step={1}
                    connect="lower"
                    initialValues={[50]}
                    handleChange={(values) => this.setState({
                      guests: values[0]
                    })}
                    format={ wNumb({
                      decimals: 0,
                      thousand: ".",
                    })}
                  />
                </div>
                <p style={{marginTop:"15px"}}>
                  Around <span>{this.state.guests} people </span>attending the event.</p>
          </section>
          <section>
              <h4>Description</h4>
                <TextBox
                  height="110px"
                  placeholder={"Please tell about your event. \n" +
                                "What kind of venue is it, what is the age of the guests? \n" +
                                "Do you have any special requirements? \n" +
                                "What is the budget?"}
                  name="description"
                  validate={['required']}
                />
            </section>
            </Form>
              </div>
            </div>

              <div className="col-md-4">
              <div className="card">
                <Form
                  formValidCallback={(name)=>this.updateProgress(name,true)}
                  formInvalidCallback={(name)=>this.updateProgress(name,false)}
                  name="requestForm-step-3">
                <section>
                <h4>Event location</h4>
                <LocationSelector
                  name="location"
                  validate={['required']}
                />
                <p>Select the city in which your event will happen.</p>
              </section>

              <section>
                <h4>Event name</h4>

                  <TextField
                    name="eventName"
                    validate={['required']}
                  />
                  <p>Write a name reflecting the purpose of your event.</p>
                </section>

                    <div>
                      <section><h4>Your name</h4>

                      <TextField
                          name="name"
                        validate={['required', 'lastName']}
                      />
                      <p >Your full name.</p>
                      </section>

                      <section><h4>Your email</h4>
                      <TextField
                          name="email"
                        validate={['required', 'email']}
                      />
                    <p>We only share your email with DJs qualified to play at your event.</p>
                      </section>

                    </div>


                  </Form>
                </div>
              </div>


          </div>


          <Progress
            step1Done={this.state.step1Done}
            step2Done={this.state.step2Done}
            step3Done={this.state.step3Done}
            onSubmit={this.onSubmit}
          />

      </Form>

      </div>

      )

  }
})
