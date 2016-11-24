import React, { PropTypes } from 'react'
import Button from '../common/Button'
import Textfield from 'material-ui/TextField'
import AuthService from '../../utils/AuthService'
const auth = new AuthService()
import CueupService from '../../utils/CueupService'
const cueup = new CueupService()

const login = React.createClass({
    displayName: 'Login',

    propTypes: {
      login: PropTypes.func.isRequired,
      loginFacebook: PropTypes.func,
      loginSoundcloud: PropTypes.func,
      isLoading: PropTypes.bool,
      error: PropTypes.string,
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

    setValidState(){
      if(this.state.email !== "" && this.state.password !== ""){
        this.setState({
          isValid: true
        })
      }else{
        this.setState({
          isValid: false
        })
      }
    },

    onChangeEmail(event){
          this.setState({
            email: event.target.value
          })

          this.setValidState()
    },

    onChangePassword(event){
          this.setState({
            password: event.target.value
          })

          this.setValidState()
    },

    onRequestChangePassword(){
      var self = this;
      if (!this.state.email) {
        this.setState({error: "Please enter email."})
        return
      }

          cueup.checkEmailExists(this.state.email, function(err,resp){
            if (err) {
              self.setState({error: "Something went wrong."})
              return
            }else{
              if (resp === false) {
                self.setState({error: "The email does not exist."})
                return
            }else{
              auth.requestPasswordChange(self.state.email,function(err,resp){
                if (err) {
                  self.setState({error: "Something went wrong."})
                }else{
                  self.setState({error: "", message: "We've just sent you an email to reset your password."})
                }
              })
            }
            }
          })


    },


    login(){
      this.props.login(this.state.email,this.state.password)
    },


  render() {

    return (
<div className="login">
  <div>
    <div style={{marginBottom:"10px"}} md={6}>
      <Button
        label="Facebook"
        rounded={true}
        onClick={this.props.loginFacebook}
      />
    </div>
    <div  style={{marginBottom:"20px"}} md={6}>
      <Button

        label="Soundcloud"
        rounded={true}
        onClick={this.props.loginSoundcloud}
      />
    </div>
  </div>
  <p style={{textAlign:"center"}}>OR</p>
    <form
      onSubmit={this.login}
      >
      <div>
    <Textfield
      type="email"
      fullWidth={true}
      floatingLabelText="Email"
      onChange={this.onChangeEmail}
    />
  </div>
  <div style={{marginBottom:'20px'}}>
    <Textfield
      type="password"
      fullWidth={true}
      floatingLabelText="Password"
      onChange={this.onChangePassword}
    />
  </div>
  <div style={{marginBottom:'20px'}}>
    <Button
      isLoading={this.props.isLoading}
      medium={true}
      label="Login"
      important={this.state.isValid}
      rounded={true}
      onClick={this.login}
    />
  </div>
  </form>
  {this.state.error ?
    <p style={{color:'red'}}>
      {this.state.error}
    </p>
  :null}
  {this.state.message ?
    <p style={{color:'green'}}>
      {this.state.message}
    </p>
  :null}
  <a onClick={this.onRequestChangePassword}>
    Forgot?
  </a>
</div>
    )
    }
    })

export default login
