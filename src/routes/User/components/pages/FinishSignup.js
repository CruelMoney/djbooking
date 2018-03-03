import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Footer from '../../../../components/common/Footer'
import c from '../../../../constants/constants'
import NumberedList from '../../../../components/common/NumberedList'
import SubmitButton from '../../../../components/common/SubmitButton'
import GeoCoder from '../../../../utils/GeoCoder'
import debounce from 'lodash.debounce';
import connectToForm from '../../../../components/higher-order/connectToForm'
import {default as SimpleMap} from "../../../../components/common/Map"
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { localize } from 'react-localize-redux';
import * as actions from '../../../../actions/SignupActions'

import Form from '../../../../components/common/Form-v2'
import {
  TextBox,
  Textfield,
  RegistrationElement,
  ToggleButtonHandler,
  LocationSelectorSimple
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
    const { translate } = this.props;

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
          this.props.history.push(
            translate(`routes./user/:username/profile`, {username: res.user_metadata.permaLink})
          )
        }
        callback(err, res)
      })
  }

  updateMap = debounce((location) => {
    const { translate } = this.props;

      //Getting the coordinates of the playing location
      GeoCoder.codeAddress(location, (geoResult) => {
        if(geoResult.error){
          this.setState({
            locationErr: translate('City not found'),
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
    const { profile, translate } = this.props;
    let {name, email} = profile;
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
                    <h1>{`${translate("Welcome")} ${name || ''}`}</h1>
                    <p>
                      {translate("user.finish-signup.please-complete")}
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
            <Form name={"finish-signup-form"}>
              <NumberedList>
                { name ? null :
                <RegistrationElement
                  name="name"
                  label={translate("Name")}
                  active={true}
                  text={translate("user.finish-signup.name")}>
                  <Textfield
                    big
                    name="name"
                    placeholder={translate("first-last")}
                    validate={['required', 'lastName']}
                    label={translate("Your name")}/>
                </RegistrationElement>
              }
              { email ? null :
                <RegistrationElement
                  name="email"
                  label="Email"
                  active={true}
                  text={translate("user.finish-signup.email")}>
                  <Textfield
                    big
                    name="email"
                    validate={['required', 'email']}
                    placeholder="mail@gmail.com"
                    label={translate("Your email")}/>
                </RegistrationElement>
                }

                <RegistrationElement
                  name="phone"
                  label={translate("Phone number")}
                  active={true}
                  text={translate("user.finish-signup.phone")}>
                  <Textfield
                    big
                    name="phone"
                    type="tel"
                    placeholder="12345678"
                    validate={['required']}
                    label={translate("Your phone number")}/>
                </RegistrationElement>

                <RegistrationElement
                  name="location"
                  label={translate("Location")}
                  active={true}
                  text={translate("user.finish-signup.location")}>

                  <LocationSelectorSimple
                    big
                    autocomplete="off"
                    name="location"
                    onChange={this.updateMap}
                    validate={['required']}
                    value={this.props.geoCity !== ""
                    ? this.props.geoCity
                    : undefined}
                    label={translate("Location")}/>

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
                  label={translate("Genres")}
                  active={true}
                  text={translate("user.finish-signup.genres")}>

                  <ToggleButtonHandler
                    name="genres"
                    potentialValues={c.GENRES}
                    validate={['required']}
                    columns={4}/>

                </RegistrationElement>

                <RegistrationElement
                  name="bio"
                  label={translate("About you")}
                  active={true}
                  text={translate("user.finish-signup.about")}>
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
                }}>
                {translate("Join")}
                </div>
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
                    {translate("terms-message")}
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <Footer
          noSkew
          color={this.secondColor}
          firstTo={translate("routes./how-it-works")}
          secondTo={translate("routes./")}
          firstLabel={translate("how-it-works")}
          secondLabel={translate("arrange-event")}
          title={translate("Wonder how it works?")}
          subTitle={translate("See how it works, or arrange an event.")}
        />
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

export default localize(SmartSignupForm, 'locale');
