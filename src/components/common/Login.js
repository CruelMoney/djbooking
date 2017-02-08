import React, { PropTypes } from 'react'
import SubmitButton from './SubmitButton'
import Textfield from './Textfield'
import Form from './Form-v2'
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
    },

    onChangeEmail(email){
      this.setState({
        email
      })
    },

    onChangePassword(password){
      this.setState({
        password
      })
    },


    login(form, callback){
      this.props.login( this.state.email, this.state.password, callback)
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
    })

    import { connect } from 'react-redux'
    import * as actions from '../../actions/LoginActions'



    function mapDispatchToProps(dispatch, ownprops) {
      return {
        login: (email, password, callback) => dispatch(actions.login({type:"EMAIL", email, password}, callback)),
        loginFacebook: (form,callback)        => dispatch(actions.login({type:"FACEBOOK"},callback)),
        loginSoundcloud: (form,callback)      => dispatch(actions.login({type:"SOUNDCLOUD"},callback)),
      }
    }

    const SmartLogin = connect(state=>state, mapDispatchToProps)(login)


    export default props => (
        <SmartLogin {...props}/>
    )
