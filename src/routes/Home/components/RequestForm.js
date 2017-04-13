import React, { PropTypes } from 'react'
import Button from '../../../components/common/Button-v2'
import TextField, {TexfieldDisconnected} from '../../../components/common/Textfield'

import LocationSelector from '../../../components/common/LocationSelectorSimple'
import ToggleOptions from '../../../components/common/ToggleOptions'
import ToggleButtonHandler from '../../../components/common/ToggleButtonHandler'
import Form from '../../../components/common/Form-v2'
import Slider from '../../../components/common/Slider'
import TimeSlider from '../../../components/common/TimeSlider'
import Progress from './ProgressSubmit'
import TextBox from '../../../components/common/TextBox'
import Popup from '../../../components/common/Popup'
import Login from '../../../components/common/Login'

import wNumb from 'wnumb'
import c from '../../../constants/constants'

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

  formToEvent(form){
    return {...form, guestsCount: form.guests[0]}
  },

  formValidCheckers: [], 

  onSubmit(form, callback){
    let event = this.formToEvent(this.props.form)
    let self = this

    if (this.props.isLoggedIn){
      self.props.onSubmit(event, callback)
    }else{
      self.props.checkEmail(event.contactEmail, (err, res)=>{
        if (err) {
          callback(err,res)
        }
        else if (res === true) {
          self.setState({
            showPopup: true
          })
          callback(" ",null)
        }else{
        try {
           self.props.onSubmit(event, callback)
        } catch (error) {
          callback("Something went wrong")
        }
        }
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
        <Popup width="380px" showing={this.state.showPopup && !this.props.isLoggedIn}
          onClickOutside={this.hidePopup}>
          <div>
            <p style={{marginBottom:"20px"}}>
              It looks like there's already an account using that email. Please login to continue.<br/>
              If you don't have a login yet, press the forgot button to create a password. <br/>
              Then come back here to login and create the event.
            </p>
            <Login
             redirect={false}
            />
          </div>
        </Popup>


        <div className="request-columns">
          <div className="row">
          <div className="col-md-4">
            <div className="card">
              <Form
                registerCheckForm={(checker)=>this.formValidCheckers.push(checker)}
                formValidCallback={(name)=>this.updateProgress(name,true)}
                formInvalidCallback={(name)=>this.updateProgress(name,false)}
                name="requestForm-step-1">
                <section>
                  <label htmlFor="location">Event location</label>
                  <LocationSelector
                    name="location"
                    validate={['required']}
                    value={this.props.initialCity !== "" ? this.props.initialCity : undefined}                    
                  />
                  <p>In what city is the event?</p>
                </section>

                <section>
                  <label htmlFor="name">Event name</label>

                  <TextField
                    name="name"
                    validate={['required']}
                  />
                  <p>Please choose a descriptive name.</p>
                </section>

                <div>
                  <section><label htmlFor="contactName">Contact name</label>

                    <TextField
                      name="contactName"
                      validate={['required', 'lastName']}
                    />
                    <p >Your first and last name.</p>
                  </section>

                  <section><label htmlFor="contactEmail">Contact email</label>
                    <TextField
                      name="contactEmail"
                      validate={['required', 'email']}
                    />
                    <p>Your email is only shared with qualified DJs.</p>
                  </section>

                </div>


              </Form>
            </div>
          </div>
          <div
            className="col-md-4">
            <div className="card">
              <Form
                registerCheckForm={(checker)=>this.formValidCheckers.push(checker)}
                formValidCallback={(name)=>this.updateProgress(name,true)}
                formInvalidCallback={(name)=>this.updateProgress(name,false)}
                name="requestForm-step-2">
                <section>
                  <label>Genres</label>
                  <p style={{marginBottom:"10px"}}>What kind of music do you need?</p>
                  <ToggleButtonHandler
                    validate={['required']}
                    name="genres"
                    potentialValues={c.GENRES}
                    columns={3} />
                </section>
                <section>
                  <label>Speakers & Light</label>
                  <p style={{marginBottom:"10px"}}>Do you need speakers for the event?</p>
                  <ToggleOptions
                    name="rider"
                    validate={['required']}
                  >
                    <Button
                      name="DJ"
                    >Only DJ</Button>

                    <Button
                      name="DJ_AND_SPEAKERS"
                    >DJ & Speakers</Button>

                    <Button
                      name="DJ_SPEAKERS_AND_LIGHT"
                    >DJ, Speakers & Light</Button>
                  </ToggleOptions>
                </section>
              </Form>

            </div>
          </div>
          <div
            className="col-md-4">
            <div className="card">
              <Form
                registerCheckForm={(checker)=>this.formValidCheckers.push(checker)}
                formValidCallback={(name)=>this.updateProgress(name,true)}
                formInvalidCallback={(name)=>this.updateProgress(name,false)}
                name="requestForm-step-3">
                <section>
                  <label>Event date</label>
                  <TexfieldDisconnected
                    name="date"
                    disabled
                    value={eventDateString}
                  />
                  <p>Select a new date in the calendar above to change it.</p>
                </section>
                <section>
                  <label>Music Duration</label>
                  <TimeSlider
                    date={this.props.date}
                  />
                </section>


                <section>
                  <label>People</label>
                  <div>
                    <Slider
                      name="guests"
                      range={{
                        'min':   1 ,
                        '50%':   100 ,
                        '80%':  500 ,
                        'max':  1000 
                      }}
                      step={1}
                      connect="lower"
                      value={[50]}
                      onChange={(values) => {this.setState({
                          guests: values[0]
                      })}}
                      format={ wNumb({
                          decimals: 0,
                      })}
                    />
                  </div>
                  <p style={{marginTop:"15px"}}>
                    {this.state.guests === 1000 ? "Over " : "Around "} <span>{this.state.guests} people </span>attending the event.</p>
                </section>
                <section>
                  <label htmlFor="description">Description</label>
                  <TextBox
                    height="110px"
                    placeholder={
                      "Please tell about your event. \n" +
                      "What is the budget? \n" +
                      "What is the age of the guests? \n" +
                      "What kind of venue is it? \n" +
                      "Do you have any special requirements? \n" 
                    }
                    name="description"
                    validate={['required']}
                  />
                </section>
              </Form>

            </div>
            </div>
          </div>




        </div>



      <div style={{position:"relative"}}>
        <Form
          noError
          customIsFormValid={()=>{
                    var result = this.formValidCheckers.reduce((memo, isValidFunc) =>{
                    return (isValidFunc(true) && memo)}, true)
                    return result}}
          name="requestForm">
         
          <Progress
            step1Done={this.state.step1Done}
            step2Done={this.state.step2Done}
            step3Done={this.state.step3Done}
            onSubmit={this.onSubmit}
          />
            <div className="row">
            <div className="col-xs-12">
              <p 
              style={{textAlign: "center"}} 
              className="terms_link">
                By clicking send event you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a>
              </p>
            </div>
          </div>

      </Form>
    </div>

     


      </div>

      )

  }
})
