import React, {PropTypes} from 'react'
import c from '../../../constants/constants'
import {datePipe} from '../../../utils/TextPipes'
import NumberedList from '../../../components/common/NumberedList'
import Button from '../../../components/common/Button-v2'
import SubmitButton from '../../../components/common/SubmitButton'

import Form from '../../../components/common/Form-v2'
import  {     TextBox,
              Textfield,
              RegistrationElement,
              ToggleButtonHandler,
              LocationSelectorSimple,
              ToggleOptions} from '../../../components/common/Form-v2'




var signupForm = React.createClass({
  propTypes:{
    isLoggedIn: PropTypes.bool,
    handleSubmit: PropTypes.func,
    form: PropTypes.object,
    isloading: PropTypes.bool
  },

  childContextTypes: {
    color: PropTypes.string
  },
  getChildContext() {
    return {
      color: "#31DAFF"
    }
  },

  getInitialState(){
      return{
        msg: null
      }
    },

  signup(form, callback) {
        this.props.handleSubmit(form, (err,res)=>{
           if (!err) {
          this.setState({msg: "Great! You can now login 😁"})
            }
            callback(err,res)
          })
        
  },

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
            text="Do you want to sign up using soundcloud, facebook or your email"
            hideOn={['SIGNED_IN']}
          >
           
            <ToggleOptions
              name="signup"
              glued={false}
              value={this.props.isLoggedIn ? 'SIGNED_IN' : "FACEBOOK"}
            >
              <Button
                name="FACEBOOK"
              >Facebook</Button>

              <Button
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
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
          hideOn={['FACEBOOK', 'SIGNED_IN']}
        >
          <Textfield
            big
            name="email"
            validate={['required', 'email']}
            label="Your Email"/>

        </RegistrationElement>
        <RegistrationElement
          name="phone"
          label="Phone"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        >
          <Textfield
            big
            name="phone"
            type="number"
            validate={['required']}
            label="Your phone number"/>

        </RegistrationElement>
        <RegistrationElement
          name="password"
          label="Password"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
          hideOn={['FACEBOOK','SOUNDCLOUD', 'SIGNED_IN']}
        >
          <Textfield
            big
            type="password"
            name="password"
            validate={['required', 'minLength']}
            label="Your password"/>
        </RegistrationElement>


        <RegistrationElement
          name="name"
          label="Name"
          active={true}
          text="Please enter your first and last name. It is important that the given information is correct. Otherwise you can't receive your payment."
          hideOn={['FACEBOOK']}
        >
          <Textfield
            big
            name="name"
            placeholder="First Last"
            validate={['required', 'lastName']}
            label="Your name"/>
        </RegistrationElement>


        <RegistrationElement
          name="bday"
          label="Birthday"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
          hideOn={['FACEBOOK']}

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

        </RegistrationElement>

        <RegistrationElement
          name="location"
          label="Location"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        >

          <LocationSelectorSimple
            big
            autocomplete="off"
            name="location"
            validate={['required']}
            label="Location"/>

        </RegistrationElement>


        <RegistrationElement
          name="genres"
          label="Genres"
          active={true}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia tempore perspiciatis excepturi rem magnam! Iste explicabo, quod eligendi tenetur vero non atque sit architecto earum ad error reiciendis et."
        >

          <ToggleButtonHandler
            name="genres"
            potentialValues={c.GENRES}
            columns={4} />

        </RegistrationElement>

    <RegistrationElement
          name="bio"
          label="About you"
          active={true}
          text="Please tell us a bit about yourself. What kind of DJ are you? What is your level of experience? What kind of events do you usually play at?"
          
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
          active={true}
          name="signup"
          onClick={this.signup}
        >
        <div style={{width:"100px"}}>JOIN</div>
        </SubmitButton>
        {this.state.msg ? <div style={{textAlign:"center"}}><p style={{fontSize:"20px"}}>{this.state.msg}</p></div> : null}
    </Form>
    )
  }
})

import { connect } from 'react-redux'
import * as actions from '../../../actions/SignupActions'


function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.user.status.signedIn,
  }
}


function mapDispatchToProps(dispatch, ownprops) {
  return {
    handleSubmit: (form,callback) => dispatch(actions.signup(form.values, true, callback)),
    locationExists: (location, callback) => actions.locationExists(location, callback)
  }
}

const SmartSignupForm = connect(mapStateToProps, mapDispatchToProps)(signupForm)


export default props => (
    <SmartSignupForm {...props}/>
)
