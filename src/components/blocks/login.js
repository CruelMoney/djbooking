import React, { PropTypes } from 'react'
import SubmitButton from '../common/SubmitButton'
import Textfield from '../common/Textfield'
import Form from '../../containers/Form-v2'
import CueupService from '../../utils/CueupService'
import AuthService from '../../utils/AuthService'
let auth = new AuthService()
let cueup = new CueupService()

const login = React.createClass({
    displayName: 'Login',
    color: "#31DAFF",

    propTypes: {
      login: PropTypes.func.isRequired,
      loginFacebook: PropTypes.func,
      loginSoundcloud: PropTypes.func,
      isLoading: PropTypes.bool,
      error: PropTypes.string,
    },

    childContextTypes:{
      color: PropTypes.string
    },

    getChildContext(){
      return{
        color: this.color
      }
    },

    getInitialState() {
      return{
        email: "",
        password: "",
        isValid: false,
      }
    },

    componentWillMount(){
      this.setState({
        error: this.props.error,
        message: ""
      })
    },

    componentWillReceiveProps(nextProps){

    },

    onRequestChangePassword(form, callback){
      var email = form.values.email;
      let self = this
      console.log(form)
      if (!email) {
        console.log("no email")
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
              auth.requestPasswordChange(email,function(err,resp){
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
    },


    login(form, callback){
      this.props.login( form.values.email, form.values.password, callback)
    },


  render() {

    return (
<div className="login">

  <div className="social-login">
    <Form
      name="social-login">
      <SubmitButton
        glow
        active
        name="facebook_login"
        onClick={this.props.loginFacebook}
      >Facebook</SubmitButton>

      <SubmitButton
        glow
        active
        name="soundcloud_login"
        onClick={this.props.loginSoundcloud}
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
    })

export default login
