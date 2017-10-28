import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubmitButton from './SubmitButton'
import Textfield from './Textfield'
import Form from './Form-v2'
import CueupService from '../../utils/CueupService'
import AuthService from '../../utils/AuthService'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions/LoginActions'
let auth = new AuthService()
let cueup = new CueupService()

class Login extends Component{
    displayName = 'Login'
    color = "#31DAFF"

    static proptypes = {
      login: PropTypes.func.isRequired,
      loginFacebook: PropTypes.func,
      loginSoundcloud: PropTypes.func,
      isLoading: PropTypes.bool,
      error: PropTypes.string,
    }

    getChildContext(){
      return{
        color: this.color
      }
    }

    static defaultProps = {
        redirect:true
      }

    state={
        email: "",
        password: "",
        isValid: false,
      }

    componentWillMount(){
      this.setState({
        error: this.props.error,
        message: ""
      })
    }

    onRequestChangePassword = (form, callback) => {
      var email = this.state.email;
      let self = this
      if (!email) {
        return callback("Please enter email.")
      }
          cueup.checkEmailExists(email, function(err,resp){
            if (err) {
              callback("Something went wrong.")
              return
            }else{
              if (resp === false) {
                callback("The email does not exist.")
                return
            }else{
              cueup.requestPasswordChange(email,function(err,resp){
                if (err) {
                  callback("Something went wrong.")
                }else{
                  self.setState({message: "We've just sent you an email to reset your password."})
                  callback(null)
                }
              })
            }
            }
          })
    }

    onChangeEmail = (email) => {
      this.setState({
        email
      })
    }

    onChangePassword = (password) => {
      this.setState({
        password
      })
    }

    login = (form, callback) => {
      this.props.login( this.state.email, this.state.password, this.props.redirect, callback)
    }


  render() {

    return (
<div className="login">

  <div className="social-login">
    <Form
      name="social-login">
      <SubmitButton
        glow
        active
        color="#3b5998"
        name="facebook_login"
        onClick={(form, callback)=>this.props.loginFacebook(form, this.props.redirect, callback)}
      >Facebook</SubmitButton>

      <SubmitButton
        glow
        active
        color="#ff7700"
        name="soundcloud_login"
        onClick={(form, callback)=>this.props.loginSoundcloud(form, this.props.redirect, callback)}
      >SoundCloud</SubmitButton>
    </Form>
  </div>
  <p style={{textAlign:"center"}}>OR</p>
  <Form
    name="email-login"
  >
    <div>
      <Textfield
        name="email"
        type="email"
        validate={['required', 'email']}
        floatingLabelText="Email"
        onChange={this.onChangeEmail}
      />
    </div>
    <div >
      <Textfield
        name="password"
        validate={['required']}
        type="password"
        floatingLabelText="Password"
        onChange={this.onChangePassword}
      />
    </div>
    <div >
      <SubmitButton
        glow
        active
        name="email_login"
        onClick={this.login}
      >Login</SubmitButton>
    </div>
  </Form>
  <Form name="forgot_password">
    <SubmitButton
      name="forgot_password"
      onClick={this.onRequestChangePassword}>
      Forgot?
    </SubmitButton>
    {this.state.message ?
      <p >
        {this.state.message}
      </p>
    :null}
  </Form>


</div>
    )
    }
    }

    


  Login.childContextTypes = {
    color: PropTypes.string
  }

    function mapDispatchToProps(dispatch, ownprops) {
      return {
        login: (email, password, redirect, callback) => dispatch(actions.login({type:"EMAIL", email, password}, redirect,callback)),
        loginFacebook: (form,redirect,callback)        => dispatch(actions.login({type:"FACEBOOK"},redirect,callback)),
        loginSoundcloud: (form,redirect,callback)      => dispatch(actions.login({type:"SOUNDCLOUD"},redirect,callback)),
      }
    }

    const SmartLogin = connect(state=>state, mapDispatchToProps)(Login)


    export default props => (
        <SmartLogin {...props}/>
    )
