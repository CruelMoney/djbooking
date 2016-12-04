import React, { PropTypes } from 'react'
import Button from '../common/Button-v2'
import TextField from '../common/Textfield'
import LocationSelector from '../common/LocationSelectorSimple'
import ToggleOptions from '../common/ToggleOptions'
import ToggleButtonHandler from '../common/ToggleButtonHandler'
import Form from '../../containers/Form-v2'
import Slider from '../common/Slider'
import TimeSlider from '../common/TimeSlider'
import SubmitButton from '../common/SubmitButton'
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
    }
  },

  componentWillMount() {

  },

  componentWillReceiveProps(nextprops){


  },

  componentWillUnmount() {
  },


  onSubmit(form, callback){
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
              </div>
          </div>
          <div
            className="col-md-4">
            <div className="card">
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
                <p style={{marginTop:"15px"}}>{"Around " + this.state.guests + " people attending the event."}</p>
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

              </div>
            </div>

              <div className="col-md-4">
              <div className="card">
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
                      <p>We only share your email with DJ's suitable to play at your event.</p>
                      </section>
                      <section><h4>Your phone</h4>

                      <TextField
                        name="phone"
                        type="number"
                        validate={['required']}
                      />
                      <p >We only share your phone number with DJ's candidates.</p>
                      </section>

                    </div>



                </div>
              </div>


          </div>
          <SubmitButton
            noCheckMark={true}
            rounded={true}
            label="Request DJ's"
            name="request_djs_button"
            onClick={this.onSubmit}
          />

        </Form>
      </div>

      )

  }
})
