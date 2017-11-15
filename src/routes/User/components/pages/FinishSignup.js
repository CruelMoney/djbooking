import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Footer from '../../../../components/common/Footer'
import c from '../../../../constants/constants'
import NumberedList from '../../../../components/common/NumberedList'
import Button from '../../../../components/common/Button-v2'
import SubmitButton from '../../../../components/common/SubmitButton'
import UserHeader from '../blocks/UserHeader'
import GeoCoder from '../../../../utils/GeoCoder'
import debounce from 'lodash.debounce';
import connectToForm from '../../../../components/higher-order/connectToForm'
import {default as SimpleMap} from "../../../../components/common/Map"
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../../../actions/SignupActions'

import Form from '../../../../components/common/Form-v2'
import {
  TextBox,
  Textfield,
  RegistrationElement,
  ToggleButtonHandler,
  LocationSelectorSimple,
  ToggleOptions
} from '../../../../components/common/Form-v2'

const Map = connectToForm(SimpleMap)


class SignupForm extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    handleSubmit: PropTypes.func,
    form: PropTypes.object,
    isloading: PropTypes.bool
  }

  static childContextTypes = {
    color: PropTypes.string
  }
  getChildContext() {
    return {color: "#31DAFF"}
  }

  state = {
    msg: null
  }

  signup = (form, callback) => {
    const values = {
      auth0Profile:{
        ...this.props.profile
      },
      form:{
        ...form.values,
      reference: this.props.reference
    }
    }    
    this.props.handleSubmit(values, (err, res) => {
        if (!err) {
          console.log(res)
          this.props.history.push(`/user/${res.user_metadata.permaLink}/profile`)
        }
        callback(err, res)
      })
  }

  updateMap = debounce((location) => {
      //Getting the coordinates of the playing location
      GeoCoder.codeAddress(location, (geoResult) => {
        if(geoResult.error){
          this.setState({
            locationErr: 'City not found',
            location: null
          });
        }else{
          this.setState({
            locationName: location,
            location: geoResult.position
          });
        }
      })
  }, 500)

  render() {
    let {name, email} = this.props.profile;
    name = name && name.indexOf('@') !== -1
      ? ''
      : name;
    return (
      <div>
        <header className="user-header">
          <div id="stripes" className="v2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="container">
            <div className="row center">
              <div className="user-header-content col-sm-8">
                <div className="header-info">
                  <div className="user-name text-center">
                    <h1>{`Welcome ${name || ''}`}</h1>
                    <p>
                      Please complete your application to start receiving gigs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className="container"
          style={{
          marginTop: "80px",
          marginBottom: "80px"
        }}>
          <div className="signup">
            <Form name={"signup-form"}>
              <NumberedList>
                { name ? null :
                <RegistrationElement
                  name="name"
                  label="Name"
                  active={true}
                  text="Please enter your first and last name. It is important that the given information is correct. Otherwise you can't receive payments.">
                  <Textfield
                    big
                    name="name"
                    placeholder="First Last"
                    validate={['required', 'lastName']}
                    label="Your name"/>
                </RegistrationElement>
              }
              { email ? null :
                <RegistrationElement
                  name="email"
                  label="E-mail"
                  active={true}
                  text="Your email is used to notify you whenever you get a gig or if we have some other important news. It is only shared with organizers and only when you make them an offer.">
                  <Textfield
                    big
                    name="email"
                    validate={['required', 'email']}
                    placeholder="mail@gmail.com"
                    label="Your Email"/>
                </RegistrationElement>
                }

                <RegistrationElement
                  name="phone"
                  label="Phone"
                  active={true}
                  text="Your phone number is used to help organizers get in contact with you. It is only shared with organizers after you have made them an offer.">
                  <Textfield
                    big
                    name="phone"
                    type="tel"
                    placeholder="12345678"
                    validate={['required']}
                    label="Your phone number"/>
                </RegistrationElement>

                <RegistrationElement
                  name="location"
                  label="Location"
                  active={true}
                  text="Tell us what city you want to play in. You will be offered gigs in a radius of 25 km around the city, but you can always change both this and the city in your preferences.">

                  <LocationSelectorSimple
                    big
                    autocomplete="off"
                    name="location"
                    onChange={this.updateMap}
                    validate={['required']}
                    value={this.props.geoCity !== ""
                    ? this.props.geoCity
                    : undefined}
                    label="Location"/>

                  {this.state.location ?
                      <Map
                          key={this.state.locationName}
                          radius={25000}
                          name={'playingLocation'}
                          value={this.state.location}
                          editable={true}
                          themeColor={this.context.color}
                          radiusName="playingRadius"
                          locationName="playingLocation"/>
                  : null}

                </RegistrationElement>

                <RegistrationElement
                  name="genres"
                  label="Genres"
                  active={true}
                  text="What genres do you want to play? You can always change this in your preferences.">

                  <ToggleButtonHandler
                    name="genres"
                    potentialValues={c.GENRES}
                    validate={['required']}
                    columns={4}/>

                </RegistrationElement>

                <RegistrationElement
                  name="bio"
                  label="About you"
                  active={true}
                  text={`Please tell us a bit about yourself. This description is going to be public. What kind of DJ are you? What is your level of experience? What kind of events do you usually play at?`}>
                  <TextBox validate={['required']} width="100%" height="150px" name="bio"/>
                </RegistrationElement>

              </NumberedList>

              <SubmitButton
                glow
                type="submit"
                active={true}
                name="signup"
                onClick={(values, cb) => this.signup(values,cb)}>
                <div style={{
                  width: "100px"
                }}>JOIN</div>
              </SubmitButton>
              {this.state.msg
                ? <div style={{
                    textAlign: "center"
                  }}>
                    <p style={{
                      fontSize: "20px"
                    }}>{this.state.msg}</p>
                  </div>
                : null}
              <div className="row">
                <div className="col-xs-12">
                  <p
                    style={{
                    textAlign: "center",
                    marginTop: "10px"
                  }}
                    className="terms_link">
                    By clicking join you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a>
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <Footer
          noSkew
          color={this.secondColor}
          firstTo="/"
          secondTo="/howitworks"
          firstLabel="Arrange event"
          secondLabel="How it works"
          title="Organizing yourself?"
          subTitle="Arrange event, or see how it works."/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {isLoggedIn: state.login.status.signedIn, geoCity: state.session.city, profile: state.login.profile}
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    handleSubmit: (values, callback) => dispatch(actions.finishSignup(values, true, callback)),
  }
}

const SmartSignupForm = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(SignupForm)
)

export default props => (<SmartSignupForm {...props}/>)
