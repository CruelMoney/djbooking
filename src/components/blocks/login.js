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
      this.props.login(this.form.values.email,this.form.values.password, callback)
    },


  render() {

    return (
<div className="login">
  <Form
    name="login-form"
  >
    <div>
      <SubmitButton
        name="facebook_login"
        onClick={this.props.loginFacebook}
      >Facebook</SubmitButton>

      <SubmitButton
        name="soundcloud_login"
        onClick={this.props.loginSoundcloud}
      >SoundCloud</SubmitButton>
    </div>
    <p style={{textAlign:"center"}}>OR</p>

    <div style={{marginBottom:'20px'}}>
      <Textfield
        name="email"
        type="email"
        floatingLabelText="Email"
        onChange={this.onChangeEmail}
      />
    </div>
    <div style={{marginBottom:'20px'}}>
      <Textfield
        name="password"
        type="password"
        floatingLabelText="Password"
        onChange={this.onChangePassword}
      />
    </div>
    <div style={{marginBottom:'20px'}}>
      <SubmitButton
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
