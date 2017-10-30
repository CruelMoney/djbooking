import React, {Component} from 'react'
import PropTypes from 'prop-types'
import c from '../../../constants/constants'
import NumberedList from '../../../components/common/NumberedList'
import Button from '../../../components/common/Button-v2'
import SubmitButton from '../../../components/common/SubmitButton'

import { connect } from 'react-redux'
import * as actions from '../../../actions/SignupActions'

import Form from '../../../components/common/Form-v2'
import  {     TextBox,
              Textfield,
              RegistrationElement,
              ToggleButtonHandler,
              LocationSelectorSimple,
              ToggleOptions} from '../../../components/common/Form-v2'




class SignupForm extends Component{
  static propTypes={
    isLoggedIn: PropTypes.bool,
    handleSubmit: PropTypes.func,
    form: PropTypes.object,
    isloading: PropTypes.bool
  }

  static childContextTypes = {
    color: PropTypes.string
  }
  getChildContext() {
    return {
      color: "#31DAFF"
    }
  }

  state={
        msg: null
      }

  signup = (form, callback) => {
      const values = {...form.values, reference: this.props.reference}
      this.props.handleSubmit(values, (err,res)=>{
          if (!err) {
            this.setState({msg: "Great! You can now login 😁"})
          }
          callback(err,res)
        })
        
  }

  render() {
  return (
    <Form
      name={"signup-form"}
    >
      <NumberedList>
        <div className="social-signup">
          <RegistrationElement

            isFilter={true}
            name='signup'
            label="Sign Up"
            active={true}
            text="Do you want to sign in using soundcloud, facebook or your email? The rest of the form still needs to be completed."
            hideOn={['SIGNED_IN']}
          >
           
            <ToggleOptions
              name="signup"
              glued={false}
              value={this.props.isLoggedIn ? 'SIGNED_IN' : "FACEBOOK"}
            >
              <Button
                name="FACEBOOK"
              color="#3b5998"
             >Facebook</Button>

              <Button
                color="#ff7700"  
                name="SOUNDCLOUD"
              >Soundcloud</Button>

              <Button name="EMAIL">Email & Password</Button>

            </ToggleOptions>

          </RegistrationElement>
        </div>
        <RegistrationElement
          name="email"
          label="E-mail"
          active={true}
          text="Your email is used to notify you whenever you get a gig or if we have some other important news. It is only shared with organizers and only when you make them an offer."
          hideOn={['FACEBOOK', 'SIGNED_IN']}
        >
          <Textfield
            big
            name="email"
            validate={['required', 'email']}
            placeholder="mail@gmail.com"
            label="Your Email"/>
        </RegistrationElement>

<RegistrationElement
          name="password"
          label="Password"
          active={true}
          text="Please specify a password with a minimum length of 6 characters."
          hideOn={['FACEBOOK','SOUNDCLOUD', 'SIGNED_IN']}
        >
          <Textfield
            big
            type="password"
            name="password"
            validate={['required', 'minLength']}
            placeholder="••••••"
            label="Your password"/>
        </RegistrationElement>

        <RegistrationElement
          name="phone"
          label="Phone"
          active={true}
          text="Your phone number is used to help organizers get in contact with you. It is only shared with organizers after you have made them an offer."
        >
          <Textfield
            big
            name="phone"
            type="tel"
            placeholder="12345678"
            validate={['required']}
            label="Your phone number"/>

        </RegistrationElement>
        


        <RegistrationElement
          name="name"
          label="Name"
          active={true}
          text="Please enter your first and last name. It is important that the given information is correct. Otherwise you can't receive payments."
          hideOn={['FACEBOOK']}
        >
          <Textfield
            big
            name="name"
            placeholder="First Last"
            validate={['required', 'lastName']}
            label="Your name"/>
        </RegistrationElement>

{/*
        <RegistrationElement
          name="bday"
          label="Birthday"
          active={true}
          text="Please specify your birthday."
          
        >

          <Textfield
            big
            onUpdatePipeFunc={datePipe}
            maxLength="10"
            type="text"
            name="birthday"
            validate={['required', 'date']}
            placeholder="dd/mm/yyyy"
            label="Birthday"/>

        </RegistrationElement>*/}

        <RegistrationElement
          name="location"
          label="Location"
          active={true}
          text="Tell us what city you want to play in. You will be offered gigs in a radius of 25 km around the city, but you can always change both this and the city in your preferences."
        >

          <LocationSelectorSimple
            big
            autocomplete="off"
            name="location"
            validate={['required']}
            value={this.props.geoCity !==  "" ? this.props.geoCity : undefined}
            label="Location"/>

        </RegistrationElement>


        <RegistrationElement
          name="genres"
          label="Genres"
          active={true}
          text="What genres do you want to play? You can always change this in your preferences."
        >

          <ToggleButtonHandler
            name="genres"
            potentialValues={c.GENRES}
            validate={['required']}
            columns={4} />

        </RegistrationElement>

    <RegistrationElement
          name="bio"
          label="About you"
          active={true}
          text="
          Please tell us a bit about yourself. 
          This description is going to be public. 
          What kind of DJ are you? What is your level of experience? What kind of events do you usually play at?"
          
        >
          <TextBox
            validate={['required']}
            width="100%"
            height="150px"
            name="bio"
            />
        </RegistrationElement>


      </NumberedList>

      <SubmitButton
          glow
          type="submit"
          active={true}
          name="signup"
          onClick={this.signup}
        >
        <div style={{width:"100px"}}>JOIN</div>
        </SubmitButton>
        {this.state.msg ? <div style={{textAlign:"center"}}><p style={{fontSize:"20px"}}>{this.state.msg}</p></div> : null}
    <div className="row">
            <div className="col-xs-12">
              <p 
              style={{textAlign: "center", marginTop: "10px"}} 
              className="terms_link">
                By clicking join you agree to our <a target="_blank" href="/terms/agreements">terms and conditions</a>
              </p>
            </div>
          </div>
    
    </Form>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.login.status.signedIn,
    geoCity: state.session.city,

  }
}


function mapDispatchToProps(dispatch, ownprops) {
  return {
    handleSubmit: (values,callback) => dispatch(actions.signup(values, true, callback)),
    locationExists: (location, callback) => actions.locationExists(location, callback)
  }
}

const SmartSignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm)


export default props => (
    <SmartSignupForm {...props}/>
)
