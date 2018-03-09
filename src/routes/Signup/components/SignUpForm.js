import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NumberedList from '../../../components/common/NumberedList'
import Button from '../../../components/common/Button-v2'
import SubmitButton from '../../../components/common/SubmitButton'

import {connect} from 'react-redux'
import * as actions from '../../../actions/SignupActions'

import Form from '../../../components/common/Form-v2'
import {
  Textfield,
  RegistrationElement
} from '../../../components/common/Form-v2'

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
    msg: null,
    emailSignup: false
  }

  signup = (form, type, cb) => {
    const values = {
      ...form.values,
      signup: type,
      reference: this.props.reference
    }
    this.props.handleSubmit(values, (err, res) => {
        cb(err,res)
    })
  }

  render() {
    const {children, translate} = this.props;

    return (
      <div>
        <div className="social-signup">
          <RegistrationElement
            isFilter={true}
            name='signup'
            label={!children &&  translate("Sign up")}
            active={true}
            text={!children && translate("signup.form.description")}
            hideOn={['SIGNED_IN']}>
            {children}
            <div className="buttons">
              <Button 
              onClick={()=>{this.signup({}, 'FACEBOOK')}}
              name="FACEBOOK" color="#3b5998">Facebook</Button>
              <Button 
              onClick={()=>{this.signup({}, 'SOUNDCLOUD')}}
              color="#ff7700" name="SOUNDCLOUD">Soundcloud</Button>
              <Button 
              onClick={()=>{
                this.setState({emailSignup:true})
              }}
              active={this.state.emailSignup}
              name="EMAIL">Email & Password</Button>
            </div>

          </RegistrationElement>
        </div>
      {this.state.emailSignup ?
      <Form name={"signup-form"}>
        <NumberedList>
          

          <RegistrationElement
            name="email"
            label="Email"
            active={true}
            text={translate("signup.form.email")}
            hideOn={['FACEBOOK', 'SIGNED_IN']}>
            <Textfield
              big
              name="email"
              validate={['required', 'email']}
              placeholder="mail@gmail.com"
              label={translate("Your Email")}/>
          </RegistrationElement>

          <RegistrationElement
            name="password"
            label="Password"
            active={true}
            text={translate("signup.form.password")}
            hideOn={['FACEBOOK', 'SOUNDCLOUD', 'SIGNED_IN']}>
            <Textfield
              big
              type="password"
              name="password"
              validate={['required', 'minLength']}
              placeholder="••••••"
              label={translate("Your password")}/>
          </RegistrationElement>

        </NumberedList>

        <SubmitButton
          glow
          type="submit"
          active={true}
          name="signup"
          onClick={(form, cb)=>{
            this.signup(form, 'EMAIL', cb)
          }}
          >
          <div style={{
            width: "100px"
          }}>{translate("continue")}</div>
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
        </Form>
      : null }
    </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {isLoggedIn: state.login.status.signedIn, geoCity: state.session.city}
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    handleSubmit: (values, callback) => dispatch(actions.signup(values, true, callback)),
  }
}

const SmartSignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm)

export default props => (<SmartSignupForm {...props}/>)
