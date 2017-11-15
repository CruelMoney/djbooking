import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubmitButton from './SubmitButton'
import Textfield from './Textfield'
import Form from './Form-v2'
import CueupService from '../../utils/CueupService'
import { connect } from 'react-redux'
import * as actions from '../../actions/LoginActions'
import { withRouter } from 'react-router-dom'
import LoadHandler from './LoadingScreen'
import Loadable from 'react-loadable';

const AsyncUser = Loadable({
  loader: () => import('../../routes/User'),
  loading: LoadHandler
});

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
        cueup.requestPasswordChange(email,function(err,resp){
          if (err) {
            callback(err.message || "Something went wrong.")
          }else{
            self.setState({message: "We've just sent you an email to reset your password."})
            callback(null)
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

    redirectAfterLogin = (user) =>{
      if(user && user.user_metadata && user.user_metadata.permaLink){
        this.props.history.push(`/user/${user.user_metadata.permaLink}/profile`)
      }
    }

    login = (form, cb) => {
      AsyncUser.preload();
      this.props.login( this.state.email, this.state.password, (err,res)=>{
        if(!err && this.props.closeLogin){
          this.props.closeLogin();
        }
        cb(err,res);
      })
    }
    loginFacebook = (form) =>{
      AsyncUser.preload();
      this.props.loginFacebook(form)
    } 
    loginSoundcloud = (form) =>{
      AsyncUser.preload();
      this.props.loginSoundcloud(form)
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
        onClick={this.loginFacebook}
      >Facebook</SubmitButton>
      <SubmitButton
        glow
        active
        color="#ff7700"
        name="soundcloud_login"
        onClick={this.loginSoundcloud}
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
    )}}

    


  Login.childContextTypes = {
    color: PropTypes.string
  }


    function mapDispatchToProps(dispatch, ownprops) {
      return {
        login: (email, password, callback) => dispatch(actions.login({type:"EMAIL", email, password, redirect:true}, callback)),
        loginFacebook: (form, callback)        => dispatch(actions.login({type:"FACEBOOK"}, callback)),
        loginSoundcloud: (form, callback)      => dispatch(actions.login({type:"SOUNDCLOUD"}, callback)),
      }
    }

    const SmartLogin = withRouter(
      connect(state=>state, mapDispatchToProps)(Login)
    )

    export default props => (
        <SmartLogin {...props}/>
    )
