import React, { PropTypes } from 'react'
import Button from '../../../../../components/common/Button-v2'
import TextField, {TexfieldDisconnected} from '../../../../../components/common/Textfield'
import moment from 'moment'
import LocationSelector from '../../../../../components/common/LocationSelectorSimple'
import SubmitButton from '../../../../../components/common/SubmitButton'
import DatePicker from '../../../../../components/common/Datepicker'
import ToggleOptions from '../../../../../components/common/ToggleOptions'
import ToggleButtonHandler from '../../../../../components/common/ToggleButtonHandler'
import Form from '../../../../../components/common/Form-v2'
import Slider from '../../../../../components/common/Slider'
import TimeSlider from '../../../../../components/common/TimeSlider'
import Progress from './ProgressSubmit'
import TextBox from '../../../../../components/common/TextBox'
import Popup from '../../../../../components/common/Popup'
import Login from '../../../../../components/common/Login'

import wNumb from 'wnumb'
import c from '../../../../../constants/constants'

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
      step3Done: false,
      date: moment()
    }
  },

  formToEvent(form){
    return {...form, guestsCount: form.guests[0]}
  },

  formValidCheckers: [], 

  onSubmit(form, callback){

    var valid = this.formValidCheckers.reduce((memo, isValidFunc) =>{
                    return (isValidFunc(true) && memo)}, true)

    if(!valid) return              

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
            showPopup: true,
            showLogin: true
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

 

  DateChanged(date){
    this.setState({
      date: date,
      showPopup: false
    })
  },

  render() {
    const eventDateString = this.state.date.format("dddd Do, MMMM YYYY")
    return(
      <div className="request-form">
        <Popup width="380px" showing={this.state.showPopup && !this.props.isLoggedIn}
          onClickOutside={this.hidePopup}>
          
            {this.state.showLogin ? 
            <div>
            <p style={{marginBottom:"20px"}}>
              It looks like there's already an account using that email. Please login to continue.<br/>
              If you don't have a login yet, press the forgot button to create a password. <br/>
              Then come back here to login and create the event.
            </p>
             <Login/>
             </div>

            :
            <DatePicker
              dark
              handleChange={this.DateChanged}
            />
           
             }
        </Popup>


        <div className="request-columns">
          <div className="row">
          <div className="col-md-12">
              <Form
                name="requestForm-DJ-book">
                <div className="card">
                
                <section>
                  <label htmlFor="name">Event name</label>

                  <TextField
                    name="name"
                    validate={['required']}
                  />
                  <p>Please choose a descriptive name.</p>
                </section>
                <section
                className="cursor-pointer"
                onClick={()=>this.setState({showLogin:false, showPopup:true})}
                >
                  <label>Event date</label>
                  <TexfieldDisconnected
                    name="date"
                    disabled
                    value={eventDateString}
                  />
                  <p>Choose date.</p>
                </section>
                <section>
                  <label htmlFor="location">Event location</label>
                  <LocationSelector
                    name="location"
                    validate={['required']}
                  />
                  <p>In what city is the event?</p>
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
                  <label>Speakers</label>
                  <p style={{marginBottom:"10px"}}>Do you need speakers for the event?</p>
                  <ToggleOptions
                    name="needSpeakers"
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
              
                
                <section>
                  <label>Music Duration</label>
                  <TimeSlider
                    date={this.state.date}
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
            </div>

          <SubmitButton
            active
            onSubmit={this.onSubmit}
          >
          BOOK DJ
          </SubmitButton>

          </Form>
          
            <div className="row">
              <div className="col-xs-12">
                <p 
                style={{textAlign: "center", marginTop: "10px"}} 
                className="terms_link">
                  By clicking book DJ you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a>
                </p>
              </div>
            </div>

           </div>
        </div>
      </div>
      </div>     
      )
  }
})
