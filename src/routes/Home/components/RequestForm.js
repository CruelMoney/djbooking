import React, { PropTypes } from 'react'
import Button from '../../../components/common/Button-v2'
import TextField, {TexfieldDisconnected} from '../../../components/common/Textfield'
import RiderOptions from '../../../components/common/RiderOptions'
import LocationSelector from '../../../components/common/LocationSelectorSimple'
import ToggleButton from '../../../components/common/ToggleButton'
import ToggleButtonHandler from '../../../components/common/ToggleButtonHandler'
import Form from '../../../components/common/Form-v2'
import Slider from '../../../components/common/Slider'
import TimeSlider from '../../../components/common/TimeSlider'
import Progress from './ProgressSubmit'
import TextBox from '../../../components/common/TextBox'
import Popup from '../../../components/common/Popup'
import Login from '../../../components/common/Login'
import DatePicker from '../../../components/common/Datepicker'
import moment from 'moment'
import SubmitButton from '../../../components/common/SubmitButton'
import ErrorMessage from '../../../components/common/ErrorMessage'

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
      activeStep: 1,
      date: moment()
    }
  },

  formToEvent(form){
    return {...form, guestsCount: form.guests[0]}
  },

  formValidCheckers: [], 

  submitEvent(event, callback) {
    try {
        var formValid = this.formValidCheckers.reduce((memo, isValidFunc) =>{
                            return (isValidFunc(true) && memo)}, true)
        if(formValid){
            this.props.onSubmit(event, (err,res)=>{
                if (!err) {
                  this.setState({msg: "Thank you for using our service. We will send you an email with confirmation of the event."})
                }
                callback(err,res)
          })
        }
          
      } catch (error) {
        callback("Something went wrong")
      }
  },

  onSubmit(form, callback){
    let event = this.formToEvent(this.props.form)
    let self = this
  
    if (this.props.isLoggedIn){
      self.submitEvent(event, callback)
    }else{
      
      self.props.checkEmail(event.contactEmail, (err, res)=>{
        if (err) {
          callback(err,res)
        }
        //IF email exists
        else if (res === true) {
          self.setState({
            showPopup: true
          })
          callback(" ",null)
        }else{
          self.submitEvent(event, callback)
        }
      })
      }
  },

  hidePopup(){
    this.setState({
      showPopup: false
    })
  },

  updateDate(date){
    this.setState({date:date})
  },

   setProgress(step){
     if(step+1<this.state.activeStep){
       this.setState({activeStep:step+1})
     }
   
  },

  render() {
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
          <div className="row center">
          {this.state.msg ? 
          
          <div className="col-md-8 thank-you-text">
            <p className="center" style={{fontSize:"32px", textAlign: "center", lineHeight: "45px"}}>{this.state.msg}</p>
          </div>
          :
          <div className="col-md-6">
            < Progress
              setProgress={this.setProgress}
              currentStep={this.state.activeStep-1}
             />
              <div className="card">
              <div className={" " + (this.state.activeStep!==1 ? "hidden" : "show")}>
                <Step1
                  form={this.props.form}
                  date={this.props.date}
                  updateDate={this.updateDate}
                  next={()=>this.setState({activeStep:2})}
                  formValidCheckers={this.formValidCheckers}
                  checkDjAvailability={this.props.checkDjAvailability}
                />
              </div>
              <div className={" " + (this.state.activeStep!==2 ? "hidden" : "show")}>
                  <Step2
                  form={this.props.form}
                  next={()=>this.setState({activeStep:3})}
                  back={()=>this.setState({activeStep:1})}
                  formValidCheckers={this.formValidCheckers}
                />
              </div>
              <div className={" " + (this.state.activeStep!==3 ? "hidden" : "show")}>
                  <Step3
                  form={this.props.form}
                  date={this.state.date}
                  next={()=>this.setState({activeStep:4})}
                  back={()=>this.setState({activeStep:2})}
                  formValidCheckers={this.formValidCheckers}
                />
              </div>
              <div className={" " + (this.state.activeStep!==4 ? "hidden" : "show")}>
                  <Step4
                  form={this.props.form}
                  isLoggedIn={this.props.isLoggedIn}
                  active={this.state.activeStep===2}
                  back={()=>this.setState({activeStep:3})}
                  submit={this.submit}
                  formValidCheckers={this.formValidCheckers}
                />
                <Form
                  noError
                  customIsFormValid={()=>{
                            var result = this.formValidCheckers.reduce((memo, isValidFunc) =>{
                              return (isValidFunc(true) && memo)}, true)
                            return result}}
                  name="requestForm">
                  <div
                  style={{position:"relative", marginTop: "20px",  marginBottom: "20px"}}
                  >
                      <span
                      className="back-button"
                      onClick={()=>this.setState({activeStep: 3})}
                      >
                        back
                      </span>
              
                    <SubmitButton
                      active
                      name="request_djs_button"
                      onClick={this.onSubmit}
                      glow
                    >
                      <div style={{width:"150px"}}>GET OFFERS</div>
                    </SubmitButton>
                        </div>
                      <ErrorMessage center />
                  <p 
                  style={{textAlign: "center"}} 
                  className="terms_link">
                    By clicking on get offers you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a>
                  </p>

              </Form>
              
              </div>
              
              </div>
              
          </div>
          }
        </div>
        


      {/*<div style={{position:"relative"}}>
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

      </Form>*/}
        </div>
      </div>

      )

  }
})



class Step1 extends React.Component{
state={showPopup:false, date: moment()}
validationChecker = null

DateChanged=(date)=>{
  this.setState({
    date: date,
    showPopup: false
  })
  this.props.updateDate(date)
}


next=()=>{
  if (this.validationChecker(true)){
    this.setState({loading:true})
    this.props.checkDjAvailability(this.props.form, (res, err)=>{
      this.setState({loading:false})
      if(err){
        console.log(err)
        this.setState({loading:false, err:"Something went wrong.", msg:""})
      }else{
        // DJs available
        if(res===true){
          this.setState({loading:false, msg:"", err:""})
          this.props.next()

        //not available
        }else{
          this.setState({loading:false, err:"", msg:"Sorry we don't have any DJs available."})
        }
      }
    })
    
  }
}



render(){
  const eventDateString = this.state.date.format("dddd Do, MMMM YYYY")
  return(
    <div> 
      <Popup width="380px" showing={this.state.showPopup}
          onClickOutside={()=>this.setState({showPopup:false})}>
            <DatePicker
              dark
              handleChange={this.DateChanged}
            />
        </Popup>
    <Form
      registerCheckForm={(checker)=>{
        this.validationChecker = checker
        this.props.formValidCheckers.push(checker)
        }}
      //formValidCallback={(name)=>this.props.updateProgress(name,true)}
      //formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
      name="requestForm-step-1">
      <h3 className="center">Check if we have DJs available</h3>
      <section>
        <label htmlFor="location">Event location</label>
        <LocationSelector
          name="location"
          validate={['required']}
          value={this.props.initialCity !== "" ? this.props.initialCity : undefined}                    
        />
        <p>In what city is the event?</p>
      </section>
       <section
          className="cursor-pointer"
          onClick={()=>{
            this.setState({showLogin:false, showPopup:true})}}
          >
          <label>Event date</label>
          <TexfieldDisconnected
            name="date"
            disabled
            value={eventDateString}
          />
          <p>Select date of event.</p>
        </section>
      
        <Button
        type="submit"
        isLoading={this.state.loading}
        onClick={this.next}
        >
          CONTINUE
        </Button>
    </Form>



    <p 
    style={{marginTop:"5px"}}
    className={this.state.err ? "error center" : "center"}>
      {
        this.state.err ? this.state.err :
        (this.state.msg ? this.state.msg : null)
      }
    </p>
    </div>
  )
}
}
class Step2 extends React.Component{
  validationChecker = null
  next=()=>{
  if (this.validationChecker(true)){
    this.props.next()
  }
}

 render(){
   return(
     <Form
     registerCheckForm={(checker)=>{
        this.validationChecker = checker
        this.props.formValidCheckers.push(checker)
        }}
    //  formValidCallback={(name)=>this.props.updateProgress(name,true)}
     // formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
      name="requestForm-step-2">
      <h3>
        Great we have DJs available.
        <span>We need a bit of information to make offers.</span>
      </h3>
      <section>
        <label htmlFor="name">Event name</label>
        <TextField
          name="name"
          validate={['required']}
        />
        <p>Please choose a descriptive name.</p>
      </section>
      <section>
      <label>Speakers & Light</label>
      <p style={{marginBottom:"10px"}}>Do you need speakers and lights for the event?</p>
        <RiderOptions 
          name="rider"/>
      </section>
      <section>
        <label>Genres</label>
        <p style={{marginBottom:"10px"}}>What kind of music do you need?</p>
        <ToggleButtonHandler
          validate={['required']}
          name="genres"
          potentialValues={c.GENRES}
          columns={4} />
      </section>
      <div style={{position:"relative"}}>
      <span
        className="back-button"
        onClick={this.props.back}
        >
          back
        </span>
        <Button
        type="submit"
        onClick={this.next}
        >
      NEXT
    </Button>
      </div>
        
    </Form>

   )
 } 
}

class Step3 extends React.Component{
state={guests:50}

  validationChecker = null

next=()=>{
  if (this.validationChecker(true)){
    this.props.next()
  }
}

 render(){
   return(
     <Form
        registerCheckForm={(checker)=>{
        this.validationChecker = checker
        this.props.formValidCheckers.push(checker)
        }}
       // formValidCallback={(name)=>this.props.updateProgress(name,true)}
       // formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
        name="requestForm-step-3">
        <h3>
          Thanks! 
          <span>Please tell us a bit more.</span>
        </h3>
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
        <div style={{position:"relative"}}>
            <span
            className="back-button"
          onClick={this.props.back}
          >
            back
          </span>
           <Button
           type="submit"
        onClick={this.next}
        >
          NEXT
        </Button>
        </div>
      </Form>
   )
 } 
}

class Step4 extends React.Component{
  state={showPopup:false}

   onSubmit(form, callback){
      if(this.context.isFormValid(true)){
        
        this.props.onSubmit(form, (err,res)=>{
                if (!err) {
                  this.setState({msg: "Thank you for using our service. We will send you an email with confirmation of the event."})
                }
                callback(err,res)
         })
      }else{
       callback("Please fill out all required fields") 
      }
    }

 render(){
   return(
     <div> 
       
     <Form
        registerCheckForm={(checker)=>this.props.formValidCheckers.push(checker)}
        //formValidCallback={(name)=>this.props.updateProgress(name,true)}
        //formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
        name="requestForm-step-4">
          <h3>
            Great! We're finding DJs now. 
            <span>How can we get back to you?</span>
          </h3>
        <section><label htmlFor="contactName">Contact name</label>
          <TextField
            name="contactName"
            validate={['required', 'lastName']}
          />
          <p >Your first and last name.</p>
        </section>
        
        <section>
           <label htmlFor="contactName">Phone number</label>
          <TextField
            placeholder="optional"
            name="contactPhone"
            validate={[]}
          />
          <p>Your phone number is only shared with qualified DJs.</p>
        </section>
        <section><label htmlFor="contactEmail">Contact email</label>
          <TextField
            name="contactEmail"
            validate={['required', 'email']}
          />
          <p>Your email is only shared with qualified DJs.</p>
        </section>
      </Form>
      </div> 
   )
 } 
}