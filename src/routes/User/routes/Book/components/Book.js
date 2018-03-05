import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField, {TexfieldDisconnected} from '../../../../../components/common/Textfield'
import moment from 'moment-timezone'
import LocationSelector from '../../../../../components/common/LocationSelectorSimple'
import SubmitButton from '../../../../../components/common/SubmitButton'
import DatePicker from '../../../../../components/common/Datepicker'
import ToggleButtonHandler from '../../../../../components/common/ToggleButtonHandler'
import Form from '../../../../../components/common/Form-v2'
import Slider from '../../../../../components/common/Slider'
import TimeSlider from '../../../../../components/common/TimeSlider'
import TextBox from '../../../../../components/common/TextBox'
import Popup from '../../../../../components/common/Popup'
import Login from '../../../../../components/common/Login'
import EmptyPage from '../../../../../components/common/EmptyPage'
import ButtonLink from '../../../../../components/common/ButtonLink'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import RiderOptions from '../../../../../components/common/RiderOptions'
import wNumb from 'wnumb'
import c from '../../../../../constants/constants'
import { connect } from 'react-redux'
import * as eventActions from '../../../../../actions/EventActions'
import * as userActions from '../../../../../actions/UserActions'
import debounce from 'lodash.debounce'
import { localize } from 'react-localize-redux';

class RequestForm extends Component{
  static proptypes = {
    form: PropTypes.object,
    date: PropTypes.object, //moment object
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    checkEmail: PropTypes.func,
  }


  static contextTypes={
    loadingUser: PropTypes.bool
  }

  static defaultProps = {
      form:{values:{}}
    }


  state={
      showPopup: false,
      guests: 50,
      step1Done: false,
      step2Done: false,
      step3Done: false,
      msg: null,
      date: moment()
    }

  formToEvent = (form) => {
    return {
      ...form, 
      guestsCount: form.guests[0],
      ReferredBy: this.props.user_id,
      timeZone: this.state.timeZoneId,
      location: this.state.location
    }
  }

  formValidCheckers= []

  submit = (event, callback) => this.props.onSubmit(event, (err, res)=>{
    const { translate } = this.props;

    if(!err){
      this.setState({
        msg: translate('succes-message')
      }) 
    }
    callback(err, res)
  })

  onSubmit = (form, callback) => {
    var valid = this.formValidCheckers.reduce((memo, isValidFunc) =>{
                    return (isValidFunc(true) && memo)}, true)
    if(!valid) return              

    let event = this.formToEvent(form.values)

    if (this.props.isLoggedIn){
      this.submit(event, callback)
    }else{
      this.props.checkEmail(event.contactEmail, (err, res)=>{
        if (err) {
          callback(err,res)
        }
        else if (res === true) {
          this.setState({
            showPopup: true,
            showLogin: true
          })
          callback(" ",null)
        }else{
          this.submit(event, callback)
        }
      })
      }
  }

  hidePopup = () => {
    this.setState({
      showPopup: false
    })
  }

  DateChanged = (date) => {
    this.setState({
      date: date,
      showPopup: false
    })
  }

  updateTimezone = (timezoneID) => {
    const newMoment = moment.tz(
      this.state.date.format('YYYY-MM-DDTHH:mm:ss'), 
      'YYYY-MM-DDTHH:mm:ss', 
      timezoneID
    );
    this.DateChanged(newMoment);
  }

  handleLocationUpdate = debounce(
    (location) => {
      if(!!location){
        eventActions.getLocation(location)
        .then(res=>{
          this.updateTimezone(res.timeZoneId);
          this.setState({
            locationErrors: [],
            location: {
              ...res.position,
              name:location
            },
            timeZoneId: res.timeZoneId
          })
        })
        .catch(err=>{
          console.log(err)
          this.setState({
            locationErrors: typeof err === 'string' ? [err] : ['The location could not be found, try another city']
          })
        })
      }
    }, 500)

  render() {
    const { translate } = this.props;
    const eventDateString = this.state.date.format("dddd Do, MMMM YYYY")
    
    return(
      this.context.loadingUser ?
      <LoadingPlaceholder/>
      :
      this.props.standby ? 
      <EmptyPage
          message={
            <div> 
              <p>{translate('user.standby-public')}</p>
              <ButtonLink className="button elevated" to={"/"}>
                {translate('user.Book other DJs')}
              </ButtonLink>
            </div>
          }/>
      :  
      <div className="request-form">
        <Popup width="380px" showing={this.state.showPopup}
          onClickOutside={this.hidePopup}>
          
            {this.state.showLogin ? 
            <div>
            <p style={{marginBottom:"20px"}}>
              {translate('request-form.email-exists-message')} </p>
             <Login
              redirect={false}
             />
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
                  <label htmlFor="name">
                  {translate("request-form.step-2.event-name")}
                  </label>

                  <TextField
                    name="name"
                    validate={['required']}
                  />
                  <p>
                  {translate("request-form.step-2.event-name-description")}
                  </p>
                </section>
                <section
                className="cursor-pointer"
                onClick={()=>{
                  this.setState({showLogin:false, showPopup:true})}}
                >
                  <label>{translate("request-form.step-1.event-date")}</label>
                  <TexfieldDisconnected
                    name="date"
                    disabled
                    value={eventDateString}
                  />
                  <p>{translate("request-form.step-1.event-date-description")}</p>
                </section>
                <section>
                  <label htmlFor="location">{translate("request-form.step-1.event-location")}</label>
                  <LocationSelector
                    name="location"
                    onChange={this.handleLocationUpdate}
                    errors={this.state.locationErrors}
                    validate={['required']}
                  />
                  <p>{translate("request-form.step-1.event-location-description")}</p>
                </section>

                <div>
                  <section><label htmlFor="contactName">  {translate('request-form.step-4.contact-name')}</label>

                    <TextField
                      name="contactName"
                      validate={['required', 'lastName']}
                    />
                    <p >  {translate('request-form.step-4.contact-name-description')}</p>
                  </section>

                  <section><label htmlFor="contactEmail"> {translate('request-form.step-4.contact-email')}</label>
                    <TextField
                      name="contactEmail"
                      validate={['required', 'email']}
                    />
                    <p> {translate('request-form.step-4.contact-email-description')}</p>
                  </section>

                </div>


                <section>
                  <label> {translate("request-form.step-2.event-genres")}</label>
                  <p style={{marginBottom:"10px"}}> {translate("request-form.step-2.event-genres-description")}</p>
                  <ToggleButtonHandler
                    validate={['required']}
                    name="genres"
                    potentialValues={c.GENRES}
                    columns={3} />
                </section>
                <section>
                  <label>{translate("request-form.step-2.event-rider")}</label>
                  <p style={{marginBottom:"10px"}}> {translate("request-form.step-2.event-rider-description")}</p>
                    <RiderOptions 
                      speakersLabel={translate("speakers")}
                      lightsLabel={translate("lights")}
                      name="rider"/>
                </section>
              
                
                <section>
                  <label>{translate('request-form.step-3.music-duration')}</label>
                  <TimeSlider
                    hoursLabel={translate('hours')}
                    startLabel={translate("start")}
                    endLabel={translate("end")}
                    date={this.state.date}
                  />
                </section>


                <section>
                  <label>{translate('request-form.step-3.guests')}</label>
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
                  {translate(
                    "request-form.step-3.guests-description",
                    { 
                      prefix: this.state.guests === 1000 ? translate('over') : translate('around'),
                      amount: this.state.guests
                    })
                    }                    
                  </p>
                </section>
                <section>
                  <label htmlFor="description">{translate("request-form.step-3.event-description")}</label>
                  <TextBox
                    height="110px"
                    placeholder={translate('request-form.step-3.event-description-description')}
                    name="description"
                    validate={['required']}
                  />
                </section>
            </div>

          <SubmitButton
            active
            onClick={this.onSubmit}
          >
          {translate('book-dj')}
          </SubmitButton>

          </Form>
          
            <div className="row">
              <div className="col-xs-12">
                {this.state.msg ? 
                  <div style={{textAlign:"center", margin: "10px 0"}}>
                    <p style={{fontSize:"20px"}}>{this.state.msg}</p>
                  </div> 
                : null}
                <p 
                style={{textAlign: "center", marginTop: "10px"}} 
                className="terms_link">
                   {translate("terms-message")}
                </p>
              </div>
            </div>

           </div>
        </div>
      </div>
      </div>     
      )
  }
}



//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    user_id: state.user.profile.user_id,
    standby: state.user.profile.settings ? state.user.profile.settings.standby : false,
    isLoggedIn: state.login.status.signedIn
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: (form, callback)    => {dispatch(eventActions.postEvent(form, callback))},
    checkEmail: (email, callback) => {dispatch(userActions.checkEmail(email, callback))}
}}


const SmartForm = connect(mapStateToProps, mapDispatchToProps)(RequestForm)

export default localize(SmartForm, 'locale');
